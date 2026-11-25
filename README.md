# Сайт за фотография

Модерен сайт-портфолио с галерия, статии и админ панел.

- **Сайт:** https://yordank.github.io/photo-site/
- **Админ панел:** https://yordank.github.io/photo-site/admin/

## Как работи

Сайтът е статичен (Jekyll) и се хоства безплатно в GitHub Pages. Админ панелът ([Sveltia CMS](https://github.com/sveltia/sveltia-cms)) записва снимките и статиите директно в това хранилище, а GitHub публикува промените автоматично след около минута.

## Вход в админ панела

1. Отворете `/admin/` и изберете **Sign In with Token**.
2. Създайте токен в GitHub: Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.
   - Repository access: само `photo-site`
   - Permissions → Contents: **Read and write**
3. Поставете токена в админ панела. Браузърът го помни, така че това се прави веднъж.

## Какво може да се редактира

- **Снимки** — заглавие, файл, категория, дата, описание и дали да се показва на началната страница.
- **Статии** — заглавие, дата, корична снимка и текст.
- **Настройки** — име на сайта, подзаглавие, голямата снимка, текст „За мен“, имейл и социални мрежи.

Качените файлове отиват в `assets/uploads/`. Примерните снимки идват от picsum.photos и трябва да се заменят.

## Локален преглед

```bash
bundle install
bundle exec jekyll serve
```
