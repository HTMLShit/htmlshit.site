---
layout: 'home'
title: Будни верстальщика
templateEngineOverride: njk,md
---

[Telegram-канал](https://t.me/htmlshit) про HTML, CSS и фронтенд вообще. Шпаргалки, ссылки, разбор багов и авторские статьи. Начинался как набор забавных и странных ситуаций из мира аутсорса.

---

## Последние записи

{% for item in collections.posts.reverse().slice(0, 5) %}
- [{{ item.data.title }}]({{ item.url }})
{% endfor %}

---

## Что дальше?

- Дизайн
- О переезде на Eleventy
- Обратная постраничная навигация в блоге
- Интерактив
- Примеры кода
