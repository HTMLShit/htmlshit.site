---
title: CSS-in-JS. Начало
date: '2021-01-30'
tags:
  - css
  - cssinjs
  - react
  - styledcomponents
  - glamorous
  - emotion
  - jss
---

ПОСМОТРЕТЬ ПРЕЗЕНТАЦИЮ https://speakerdeck.com/vjeux/react-css-in-js?slide=2

Это пролог к статье о Styled Components. Если вам интересно, как мы дошли до жизни такой, рекомендую начать именно отсюда.

Сразу задам тон повествования: я предполагаю, что с JavaScript и React вы уже знакомы. Вам сейчас придётся согласиться, что HTML в JS это нормально, а CSS в JS, как минимум, тоже.

## Атрибут style

Если вы сверстали хотя бы пару страниц в последние несколько лет, вы наверняка видели аббревиатуру CSS-in-JS. Старый добрый CSS, но написанный в JavaScript? Звучит как бред, но давайте разбираться.

Мы и раньше могли обращаться к стилям DOM-узлов через свойство style, считывая и устанавливая значение атрибута style связанного с узлом элемента:

```javascript
el.style.color = 'white';
el.style.backgroundColor = 'cyan';
```

В итоге мы получаем генерированный атрибут style, который ещё называют инлайновыми стилями:

```html
<div style="color: white; background-color: red">
  Hello Styles!
</div>
```

Минусы? Никаких вам псевдоклассов, никаких вам псевдоэлементов, никакой развитой анимации. Об отсутствии централизованного управления внешним видом множества элементов единовременно и объединения стилей (кажется, это худшая в мире ода CSS-классам). И с браузерным префиксами множество не относящихся к делу нюансов. Плюсы? Это бронебойно и точно работает (пока кто-нибудь !important не наставил).

## А что в React?

В React (JSX) можно проделать практически то же самое, но чуть более изысканно:

```jsx
const divStyle = {
  color: 'white',
  backgroundColor: 'cyan',
}

function HelloStylesComponent() {
  return (
    <div style={divStyle}>
      Hello React Styles!
    </div>
  );
}
```

## CSS в JS

Да, выглядит получше. Да, можно переиспользовать. Нет, остальное всё точно так же. Но этот раздел называется CSS-in-JS, а не просто Style-in-JS. Подход CSS-in-JS предполагает, что описанные вами стили – неважно, будут они реализованы на CSS-подобном языке или через JS-объекты – применятся к вашим элементам через обычные классы. Вы получаете всё, что имели в CSS, плюс динамические возможности JavaScript.

ПРИМЕР

Плюсы:

- Соблюдается принцип единой ответственности: компонент полностью отвечает за свой внешний вид
- Самоудаление "мёртвого" (неиспользуемого) кода
- Динамические возможности ограничены лишь вашими умениями
- Никаких проблем с именованием классов (вы же уже подумали об имени компонента, наверное)

Минусы:

- Требуется некоторое время на привыкание (например, к синтаксису)
- Лучшие возможности требуют дополнительной настройки сборки
- Сложности с поддержкой редакторами кода (верно не всегда)
- Стили не применятся, пока не выполнится JS (верно не всегда)
- Производительность ниже, чем у классического подхода (верно не всегда)
- Очевидно, стили кешироваться отдельно от скриптов не станут (верно не всегда)

## Что в наличии?

### JSS

Само понятие CSS-in-JS узурпировал [JSS](cssinjs.org). Первый известный релиз на GitHub датируется 2014 годом сразу с версии 0.2.1, можно предположить, что сама идея зародилась и раньше. Если вы хоть раз использовали [Material UI](https://material-ui.com/), вы использовали и JSS. Но наверняка не все пытались переопределить стили встроенных в этот кит компонентов, потому давайте взглянем на пример, взят из документации с упрощениями:

```javascript
import jss from 'jss'
import preset from 'jss-preset-default'
import color from 'color'

// One time setup with default plugins and settings.
jss.setup(preset())

const styles = {
  '@global': {
    body: {
      color: 'green'
    },
    a: {
      textDecoration: 'underline'
    }
  },
  button: {
    fontSize: 12,
    '&:hover': {
      background: 'blue'
    }
  },
  ctaButton: {
    extend: 'button',
    '&:hover': {
      background: color('blue')
        .darken(0.3)
        .hex()
    }
  },
  '@media (min-width: 1024px)': {
    button: {
      width: 200
    }
  }
}

const {classes} = jss.createStyleSheet(styles).attach()

document.body.innerHTML = `
  <button class="${classes.button}">Button</button>
  <button class="${classes.ctaButton}">CTA Button</button>
`
```

Сразу бросается в глаза, что больше похоже на какую-то дикую смесь, чем на CSS. Тут вам на одном уровне даются простые свойства объекта, которые можно переиспользовать и расширять, псевдоклассы/элементы, at-правила, селекторы... Честно говоря, выглядит это всё довольно жутковато. Но многим понравилось, а недостатки и условная сложность JSS открыли дорогу иным решениям. Кстати, всё в том же Material UI [рассматривают](https://github.com/mui-org/material-ui/issues/20012) возможность замены JSS на Styled Components.

### jsxstyle

[Появился](https://github.com/jsxstyle/jsxstyle) в 2015 году специально для React (и Preact). 

```jsx
<Row alignItems="center" padding={15}>
  <Block
    backgroundColor="#EEE"
    boxShadow="inset 0 0 0 1px rgba(0,0,0,0.15)"
    borderRadius={5}
    height={64}
    width={64}
    marginRight={15}
    backgroundSize="contain"
    backgroundImage="url(http://graph.facebook.com/justinbieber/picture?type=large)"
  />
  <Col fontFamily="sans-serif" fontSize={16} lineHeight="24px">
    <Block fontWeight={600}>Justin Bieber</Block>
    <Block fontStyle="italic">Canadian</Block>
  </Col>
</Row>
```


```jsx
const RedBlock = (props) => <Block {...props} color="red" />;
```


### Radium

https://github.com/FormidableLabs/radium 2015 год

### Aphrodite

https://github.com/Khan/aphrodite 2016 год

### Styled Components

https://github.com/styled-components/styled-components 2016 год

## Итого

Как видим, существует множество CSS-in-JS фреймворков и библиотек, но лишь одна из них, благодаря своей потрясающе простой идее, создала вокруг себя некий культ. И это – Styled Components. Вся идея, как было сказано в прологе, укладывается в названии, а число подражателей и последователей – весьма велико: [Emotion](https://emotion.sh/), [astroturf](https://github.com/4Catalyzer/astroturf), [linaria](https://linaria.dev/). В следующей статье познакомимся со Styled Components поближе.