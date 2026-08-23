# assets

`Outfit-700-subset.ttf` is the face drawn into the Open Graph card
(`src/app/opengraph-image.tsx`). It is the same display face the site uses for
its headings, cut down to the characters the card actually shows.

Any character missing from it silently falls back to a different face, so when
the card's copy changes, rebuild the subset:

```sh
curl -sL -o "/tmp/Outfit[wght].ttf" \
  "https://github.com/google/fonts/raw/main/ofl/outfit/Outfit%5Bwght%5D.ttf"
fonttools varLib.instancer /tmp/Outfit[wght].ttf wght=700 -o /tmp/frozen.ttf

pyftsubset /tmp/frozen.ttf \
  --text="react-three-toggle A three-state toggle component for React. kkweb.io light auto dark" \
  --unicodes="U+0020-007E,U+00A0-00FF" \
  --output-file=assets/Outfit-700-subset.ttf \
  --no-hinting --desubroutinize --layout-features=''
```
