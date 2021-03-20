---
layout: 'home'
title: Будни верстальщика
templateEngineOverride: njk,md
---

[Telegram-канал](https://t.me/htmlshit){target="_blank"} про HTML, CSS и фронтенд вообще. Начинался как набор забавных и странных ситуаций из мира аутсорса. Шпаргалки, ссылки, разбор багов и авторские статьи. 

---

## Последние записи

{% set postList = collections.posts | reverse %}
{% for item in postList.slice(0, 2) %}
- [{{ item.data.title }}]({{ item.url }})
{% endfor %}

---

## Что дальше?

- Дизайн
- О переезде на Eleventy
- Интерактив
- Обратная постраничная навигация в блоге
- Живые примеры кода
- <del>Instant View</del><ins><b>готово</b></ins>
