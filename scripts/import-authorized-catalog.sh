#!/bin/zsh
set -euo pipefail

source_dir=${1:-/tmp/rayray-product-json}
asset_root="assets/rayray-authorized/products"
manifest_path="assets/rayray-authorized/catalog.json"

mkdir -p "$asset_root"
work_file=$(mktemp)
trap 'rm -f "$work_file"' EXIT

for product_json in "$source_dir"/*.json; do
  handle=$(jq -r '.handle' "$product_json")
  case "$handle" in
    order-from-live-stream|order-from-ayi) continue ;;
  esac

  product_dir="$asset_root/$handle"
  mkdir -p "$product_dir"
  image_index=0
  local_images=()

  while IFS= read -r image_url; do
    [[ "$image_url" == //* ]] && image_url="https:$image_url"
    image_index=$((image_index + 1))
    clean_url=${image_url%%\?*}
    extension=${clean_url##*.}
    case "$extension" in
      jpg|jpeg|png|webp|gif) ;;
      *) extension=jpg ;;
    esac
    local_path=$(printf '%s/%02d.%s' "$product_dir" "$image_index" "$extension")
    if [[ ! -s "$local_path" ]]; then
      curl -L --fail --silent --show-error --connect-timeout 20 --max-time 90 "$image_url" -o "$local_path"
    fi
    local_images+=("$local_path")
  done < <(jq -r '.images[]?' "$product_json")

  title=$(jq -r '.title | gsub("RayRay\\s*"; "") | gsub(" - 复制$"; "")' "$product_json")
  price=$(jq -r '.price / 100' "$product_json")
  variants=$(jq -c '[.variants[] | {id, title, option1, option2, option3, available, price:(.price / 100)}]' "$product_json")
  images=$(printf '%s\n' "${local_images[@]}" | jq -Rsc 'split("\n") | map(select(length > 0))')
  jq -nc --arg handle "$handle" --arg title "$title" --argjson price "$price" --argjson images "$images" --argjson variants "$variants" \
    '{handle:$handle,title:$title,price:$price,images:$images,variants:$variants}' >> "$work_file"
done

jq -s 'sort_by(.title)' "$work_file" > "$manifest_path"
printf 'Imported %s products and %s local images.\n' \
  "$(jq 'length' "$manifest_path")" \
  "$(jq '[.[].images | length] | add' "$manifest_path")"
