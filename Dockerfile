# Използва се само от Railway. GitHub Pages игнорира този файл.
FROM ruby:3.3 AS build
WORKDIR /site
ENV JEKYLL_NO_BUNDLER_REQUIRE=true
RUN gem install jekyll -v 3.10.0 --no-document \
 && gem install kramdown-parser-gfm webrick --no-document
COPY . .
RUN jekyll build --config _config.yml,_config.railway.yml -d /out

FROM nginx:1.27-alpine
COPY deploy/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /out /usr/share/nginx/html
ENV PORT=8080
