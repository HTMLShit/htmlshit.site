---
title: Styled Components
date: '2021-01-19'
tags:
  - css
  - cssinjs
  - react
  - styledcomponents
  - emotion
---

## Пролог

Сразу задам тон повествования: я предполагаю, что с JavaScript и React вы уже знакомы и мне не придётся убеждать кого-либо в том, что JSX есть хорошо, а компонентный подход – удобно. Вам сейчас придётся не только принять, что HTML в JS это хорошо, но и что CSS в JS, как минимум, не плохо.

Итак, [Styled Components](https://www.styled-components.com/). Буквально – стилизованные компоненты. Собственно, в этом вся суть и статью можно завершать.

Шучу. Продолжаем.

## CSS-in-JS

### Атрибут style

Если вы сверстали хотя бы пару страниц в последние несколько лет, вы не могли не замечать аббревиатуру CSS-in-JS изо всех щелей. Старый добрый CSS, но написанный в JavaScript. Мы и раньше могли обращаться к стилям DOM-узлов через свойство style, считывая и устанавливая значение атрибута style связанного с узлом элемента.

```javascript
el.style.color = 'white';
el.style.backgroundColor = 'cyan';
```

В итоге мы получаем генерированный атрибут style, который ещё называют инлайновыми стилями:

```html
<div style="color: white; background-color: red">Hello Styles!</div>
```

Минусы? Никаких вам псевдоклассов, никаких вам псевдоэлементов, никакой развитой анимации. Об отсутствии централизованного управления внешним видом множества элементов единовременно и объединения стилей (кажется, это худшая в мире ода CSS-классам). И с браузерным префиксами множество не относящихся к делу нюансов. Плюсы? Это бронебойно и точно работает (пока кто-нибудь !important не наставил).

### А что в React?

В React (JSX) можно проделать практически то же самое, но чуть более изысканно:

```jsx
const divStyle = {
  color: 'white',
  backgroundColor: 'cyan',
}

function HelloStylesComponent() {
  return <div style={divStyle}>Hello Styles!</div>
}
```

### CSS в JS

Да, выглядит получше. Да, можно переиспользовать. Нет, остальное всё точно так же. Но этот раздел называется CSS-in-JS, а не просто Style-in-JS. Подход CSS-in-JS предполагает, что описанные вами стили – неважно, будут они реализованы на CSS-подобном языке или через JS-объекты – применятся к вашим элементам через динамические классы. Вы получаете всё, что имели в CSS, плюс динамические возможности JavaScript.

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

### Что в наличии?

ПРИМЕРЫ БИБЛИОТЕК

Как видим, существует множество CSS-in-JS фреймворков и библиотек, но лишь одна из них, благодаря своей потрясающе простой идее, создала вокруг себя некий культ. И это – Styled Components. Вся идея, как было сказано в прологе, укладывается в названии, а число подражателей и последователей – весьма велико. Давайте просто попробуем.

## Styled Components

Возьмём пример выше и превратим в классический React-компонент, для упрощения процесса я буду использовать SCSS:

```scss
.hello {
  color: white;
  background-color: cyan;

  &:hover {
    background-color: black;
  }
}
```

```jsx
function HelloClassNameComponent() {
  return <div className="hello">Hello Class Name!</div>
}
```

А теперь то же самое, но при помощи Styled Components (далее – SC):

```jsx
import styled from 'styled-components';

const Div = styled.div`
  color: white;
  background-color: red;

  &:hover {
    background-color: black;
  }
`;

function HelloStyledComponent() {
  return <Div>Hello Styled!</Div>
}
```

<small>Сразу видна проблема с подсветкой кода, но это уже по моей вине: я пока не очень разобрался с настройками [Prism](https://prismjs.com/) в [Eleventy](https://www.11ty.dev/). Просто имейте это в виду.</small>

### Прокидываем props'ы

Пока напоминает всё тот же SCSS, не правда ли? Зато уже избавились от назойливого className. Давайте попробуем усложнить:

```jsx
import styled from 'styled-components';

const Div = styled.div`
  color: ${(props) => props.color || 'white'};
  background-color: cyan;

  &:hover {
    background-color: black;
  }
`;

function HelloStyledComponent() {
  return <Div color="green">Hello Styled!</Div>
}
```

Что мы сделали? Мы передали цвет текста через свойства компонента (properties, props... *пробросили через пропсы*, в общем). Ничего не передаём – получаем красный, вот так просто. Теперь можно, например, поступить вот так:

```jsx
const colors = ['red', 'green', 'blue'];

function HelloPropsComponent() {
  return (
    <article>
      {colors.map(color => <Div color={color}>Hello Styled!</Div>)}
    </article>
  );
}
```

Получим три компонента с разным цветом текста, но одинаковыми остальными свойствами и реакцией на наведение мыши. Вся тяжёлая работа по генерации стилей и классов была выполнена библиотекой SC, обратите внимание на классы: общее вынесено в один, различающееся – в другие. Чтобы повторить подобное на классическом CSS пришлось бы сначала, как минимум, определить классы для разных цветов, а после воспользоваться или библиотекой classnames или склеивать строки названий классов вручную:

```scss
.hello {
  color: white;
  background-color: cyan;

  &:hover {
    background-color: black;
  }
}

.hello--red {
  color: red;
}

.hello--green {
  color: green;
}

.hello--blue {
  color: blue;
}
```

```jsx
const colors = ['red', 'green', 'blue'];

function HelloClassComponent() {
  return (
    <article>
      {colors.map(color => {
        return (
          <div className={`hello hello--${color}`}>
            Hello Class Name!
          </div>
        );
      })}
    </article>
  );
}
```

Как-то не очень выразительно. Да, можно попробовать пользовательские свойства CSS (*переменные*, Custom Properties), будет гораздо гибче, но при работе "в лоб" всё ещё достаточно неудобно:

```scss
.hello {
  color: var(--color);
  background-color: cyan;

  &:hover {
    background-color: black;
  }
}
```

```jsx
const colors = ['red', 'green', 'blue'];

function HelloVarComponent() {
  return (
    <article>
      {colors.map((color) => {
        const colorStyle = {"--color": color};

        return (
          <div className="hello" style={colorStyle}>
            Hello Custom Properties!
          </div>
        );
      })}
    </article>
  );
}
```

Впрочем, в комбинации со Styled Components пользовательские свойства могут раскрыться в полной мере и дать неограниченный простор для темизации. Об этом чуть позже.

### Переиспользование и css``

Ладно одно свойство, а если у вас их с десяток? А если вам поддержка темизации нужна? А если это свойство не просто должно определять значение правила, а переопределять стили едва ли не целиком? Разным ситуациям – разный внешний вид по переданному одному лишь свойству, разве это не прекрасно? Введём ещё одну функцию, помимо styled, css. Название говорит само за себя:

```jsx
import styled, { css } from 'styled-components';

const flexStyles = css`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: center;
  color: ${({color}) => color || 'red'}
`;

const blockStyles = css`
  display: block;
`;

const Div = styled.div`
  ${({isAlt}) => {
    isAlt ? blockStyles : flexStyles;
  }}
`;

function HelloCssComponent() {
  return <Div isAlt color="green">Hello Styled!</Div>
}
```

Мы не только получили независимый переиспользуемый блок стилей, но и вынесли описание представления за пределы минимальной, но всё же логики блока. И таких комбинаций свойств и стилей может быть множество даже в пределах одного элемента.

Конструкция, кстати, называется [теговым шаблоном (taggeg template)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/template_strings#%D1%82%D0%B5%D0%B3%D0%BE%D0%B2%D1%8B%D0%B5_%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D1%8B) и является встроенной возможностью последних версий JavaScript под общим названием ESNext (ES6, 2015, 2019... ну и TypeScript туда же, не судите строго). Сама директива styled – тоже не что иное как фабрика этих самых теговых шаблонов. Если вы ещё не поняли, что это вам даёт, позже я покажу.

### Анимации и keyframes``

Если с переходами всё просто – transition это лишь ещё одно правило – то с keyframes всё интереснее. Ведь keyframes – это at-rule, иначе говоря – оператор, указывающий CSS какие конкретно правила и когда применять. Ещё и переиспользовать можно – создали в одном месте, используем других. Напрямую написать @keyframes внутри описания styled-компонента нельзя, но можно воспользоваться ещё одним помощником – функцией @keyframes.

```jsx
import styled, { css, keyframes } from 'styled-components';

/* © Nick Pettit, https://github.com/nickpettit/glide */

const wobbleKey = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  15% {
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
  }

  30% {
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
  }

  45% {
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
  }

  60% {
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
  }

  75% {
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const wobbleAnimation = props => css`
  ${wobbleKey} ${props.animationLength} ease-in-out infinite;
`;

const WobbledDiv = styled.div`
  animation: ${wobbleAnimation};
`;

function HelloAnimatedComponent() {
  return <WobbleDiv animationLength="0.8s">Hello Wobble!</WobbleDiv>
}
```

Удобно? По-моему, очень даже. Но вы точно знаете как минимум ещё одно at-rule, если хоть раз занимались адаптивной разработкой.

### Адаптивная вёрстка и media``

Естественно, это @media. И вот здесь всё очень удобно, вы просто описываете все правила непосредственно в описании стилизованного компонента. Естественно, мы получаем возможность использовать любые доступные нам переменные, наверное, даже с некоторой пользой:

```jsx
import styled from 'styled-components';

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

const Div = styled.div`
  color: white;
  background-color: red;

  &:hover {
    background-color: black;
  }

  @media ${device.mobileS} {
    color: green;
  }
`;

function HelloMediaComponent() {
  return <Div>Hello Media!</Div>
}
```

Мы создали говорящие за себя константы со списками разрешений экранов и определили под них устройства. Они могут быть экспортированы из любого места в проекте и, соответственно, использованы где угодно. Теперь вы знаете достаточно чтобы начать применять SC в реальных проектах.

### Композиция

"Подожди, дядя, – скажете вы. – У нас тут в CSS есть композиция классов, а с SCSS это вообще в культ возведено и композицию классов мы определяем вложенностью. Амперсанд наше всё!". И будете правы в своём вопросе. Но, кажется, вы забыли, что цель CSS-in-JS в итоге – создать всё те же классы. И вот здесь внезапно композиция классов на наших глазах превращается в композицию компонентов:

```jsx
import styled from 'styled-components';
import icon from './icon.png';

const Icon = styled.i`
  width: 16px;
  height: 16px;
  background: trasnsparent url(${icon}) center/contain no-repeat;
`;

const Button = styled.button``;
```




Тут начнутся различные ухищрения, собственные утилиты и библиотеки, их документирование... В общем, удачи вам в поиске хорошего архитектора. Естественно, если вы хорошо знакомы с принципами БЭМ, OOCSS и иными и способны правильно спроектировать API ваших компонентов – никто этого не запрещает.

styled(Component)

https://medium.com/swlh/creating-react-styled-components-with-dynamic-tags-and-props-ef965c839e64

https://www.reddit.com/r/reactjs/comments/l4o5k5/the_styledcomponents_happy_path/?%24deep_link=true&correlation_id=51dbefb7-8915-41e7-be36-2de0bfe9e30c&ref=email_digest&ref_campaign=email_digest&ref_source=email&%243p=e_as&%24original_url=https%3A%2F%2Fwww.reddit.com%2Fr%2Freactjs%2Fcomments%2Fl4o5k5%2Fthe_styledcomponents_happy_path%2F%3F%24deep_link%3Dtrue%26correlation_id%3D51dbefb7-8915-41e7-be36-2de0bfe9e30c%26ref%3Demail_digest%26ref_campaign%3Demail_digest%26ref_source%3Demail&_branch_match_id=745291558627751109

https://www.joshwcomeau.com/css/styled-components/
https://jsramblings.com/how-to-use-media-queries-with-styled-components/