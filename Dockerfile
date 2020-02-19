ARG PLATFORM
FROM --platform="${PLATFORM}" vibioh/viws:light

ARG VERSION
ENV VERSION=${VERSION}
COPY www/ /www/
