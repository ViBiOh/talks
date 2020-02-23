FROM vibioh/viws:light

ENV VIWS_CSP "default-src 'self'; base-uri 'self'; script-src 'self' cdn.jsdelivr.net/algoliasearch/3/; style-src 'self' 'unsafe-inline'; connect-src 'self' *.algolia.net *.algolianet.com"
ENV VIWS_ENV ALGOLIA_APP,ALGOLIA_KEY,ALGOLIA_INDEX
ENV VIWS_HEADERS X-UA-Compatible:ie=edge~content-language:fr
ENV VIWS_SPA true

ARG VERSION
ENV VERSION=${VERSION}

COPY www/ /www/
