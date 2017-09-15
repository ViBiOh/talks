#!/usr/bin/env bash

curl -X DELETE \
     -H "X-Algolia-API-Key: ${ALGOLIA_KEY}" \
     -H "X-Algolia-Application-Id: ${ALGOLIA_APP}" \
    "https://${ALGOLIA_APP}.algolia.net/1/indexes/${ALGOLIA_INDEX}"

for file in ./doc/*/index.md; do
  ./bin/algolia -name `echo "${file}" | sed -e "s|^\./doc/\(.*\)/index\.md$|\1|"` -source "${file}" -app "${ALGOLIA_APP}" -key "${ALGOLIA_KEY}" -index "${ALGOLIA_INDEX}"
done
