---
title: Введение в Styled Components
date: '2021-03-20'
tags:
  - css
  - cssinjs
  - react
  - styledcomponents
  - emotion
  - linaria
---

Итак, [Styled Components](https://www.styled-components.com/). Буквально – стилизованные компоненты. Собственно, в этом вся суть и статью можно завершать.

Шучу. Продолжаем.

## TL;DR

```jsx
const sharedText = css`
  color: white;
  margin: 1rem;
`;

const Title = styled.h1`
  ${sharedText};
  font-size: 2rem;
`;

const Text = styled.p`
  ${sharedText};
  font-size: 1rem;
`;

const TextBase = styled.p`
  font-size: 1rem;
  text-align: center;
`;

const BlueText = styled(TextBase)`
  color: blue;
`;

const PinkText = styled(TextBase)`
  color: pink;
`;

const Container = styled.div`
  margin: ${({ isLarge }) => (isLarge ? '5rem' : '1rem')};
`;

const TextBase = styled.p`
  font-size: 1rem;
  text-align: center;
  color: ${(props) => props.color};
`;

const MyComponent = function () {
  return (
    <Container isLarge>
      <TextBase color="#0000FF">I'm Blue</TextBase>
      <TextBase color="pink">I'm Pink</TextBase>
    </Container>
  );
};
```

## Поехали

Давайте напишем простенький React-компонент, для упрощения процесса я буду использовать SCSS (_ведь его все любят_):

```scss
.hello {
  color: white;
  background-color: cyan;

  &:hover {
    background-color: black;
  }
}
```

И JSX:

```jsx
function HelloClassNameComponent() {
  return <div className="hello">Hello Class Name!</div>;
}
```

Теперь то же самое, но при помощи Styled Components:

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
  return <Div>Hello Styled!</Div>;
}
```

<small>Сразу видна проблема с подсветкой кода, но это уже по моей вине: я пока не очень разобрался с настройками [Prism](https://prismjs.com/) в [Eleventy](https://www.11ty.dev/). Просто имейте это в виду.</small>

Выглядит весьма похоже. Используя свежие фишки JavaScript под названием [шаблонные строки](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/template_strings) и [теговые шаблоны](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/template_strings#%D1%82%D0%B5%D0%B3%D0%BE%D0%B2%D1%8B%D0%B5_%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D1%8B) Styled Components буквально позволяет писать привычный CSS прямо в JS-модулях и таким образом теперь ваш компонент целиком и полностью отвечает не только за свою структуру и визуальную логику, но и за внешнее оформление тоже.

И привычный и такой любимый родительский селектор (&, амперсанд) имеется.

### Песочница

Установка и настройка Styled Components будет описана в следующей статье цикла, поскольку нюансов и фишек слишком много. Здесь я познакомлю вас с синтаксисом и основными приёмами работы. Чтобы было проще стартовать, я подготовил песочницу на [CodeSandbox](https://codesandbox.io/s/competent-noether-21coi?file=/src/App.js), в рамках которой можно просто запускать код из статьи. Да, я ленивый: остальные примеры будут даны просто текстом.

<iframe src="https://codesandbox.io/embed/competent-noether-21coi?fontsize=14&hidenavigation=1&moduleview=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="competent-noether-21coi"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Прокидываем props'ы

Продолжаем.

Одного только исчезновения `className` явно недостаточно чтобы набрать новых сторонников. Усложняем:

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
  return <Div color="green">Hello Styled!</Div>;
}
```

Что мы сделали? Мы передали цвет текста через свойства компонента (properties, props... _пробросили через пропсы_, в общем). Ничего не передаём – получаем красный, вот так просто. Теперь можно поступить вот так:

```jsx
const colors = ['red', 'green', 'blue'];

function HelloPropsComponent() {
  return (
    <article>
      {colors.map((color) => (
        <Div color={color}>Hello Styled!</Div>
      ))}
    </article>
  );
}
```

Получим три компонента с разным цветом текста, но одинаковыми остальными свойствами и реакцией на наведение мыши. Чтобы повторить подобное на классическом CSS без привлечения сторонних инструментов, пришлось бы сначала определить классы для разных цветов, а после воспользоваться или библиотекой classnames или склеивать строки названий классов вручную:

```scss
.hello {
  color: white;
  background-color: cyan;

  &:hover {
    background-color: black;
  }

  &--red {
    color: red;
  }

  &--green {
    color: green;
  }

  &--blue {
    color: blue;
  }
}
```

```jsx
const colors = ['red', 'green', 'blue'];

function HelloClassComponent() {
  return (
    <article>
      {colors.map((color) => {
        return <div className={`hello hello--${color}`}>Hello Class Name!</div>;
      })}
    </article>
  );
}
```

Да, можно попробовать пользовательские свойства CSS (_переменные_, Custom Properties), будет гораздо гибче. Но при работе «в лоб» всё ещё достаточно неудобно.

Задаём свойство:

```scss
.hello {
  color: var(--color);
  background-color: cyan;

  &:hover {
    background-color: black;
  }
}
```

И меняем в нужный нам момент:

```jsx
const colors = ['red', 'green', 'blue'];

function HelloVarComponent() {
  return (
    <article>
      {colors.map((color) => {
        const colorStyle = { '--color': color };

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

Впрочем, в комбинации со Styled Components пользовательские свойства могут раскрыться в полной мере и дать неограниченный простор для темизации.

Чтобы не навлечь на себя гнев апологетов CSS-подхода я сразу должен отметить: написанный вручную CSS изначально является более эффективным. Styled Components (и Emotion, например) не умеют объединять похожие классы самостоятельно. Т. е. на каждый `div` будет сгенерирован свой класс, с одинаковым фоном и `:hover`-ом. Кто-то вполне имеет право поморщиться от такого подхода.

Но это автоматизируется и давайте будем честны: в CSS мы всё же создали три разных класса, а в SC – нет. И это можно будет исправить, расскажу чуть далее.

### Переиспользование и css``

Ладно одно свойство, а если у вас их с десяток? А если вам поддержка темизации нужна? А если это свойство должно полностью преобразить компонент? Разным ситуациям – разный внешний вид по переданному одному лишь параметру. Введём ещё одну функцию, css.

Название говорит само за себя:

```jsx
import styled, { css } from 'styled-components';

const flexStyles = css`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: center;
  color: ${({ color }) => color || 'red'};
`;

const blockStyles = css`
  display: block;
`;

const Div = styled.div`
  ${({ isAlt }) => {
    isAlt ? blockStyles : flexStyles;
  }}
`;

function HelloCssComponent() {
  return (
    <Div isAlt color="green">
      Hello Styled!
    </Div>
  );
}
```

Мы получили независимый переиспользуемый блок стилей и вынесли описание представления за пределы минимальной, но всё же логики блока. И таких комбинаций свойств и стилей может быть множество даже в пределах одного элемента. А ещё можно и просто вот так:

```jsx
const sharedStyles = css`
  color: white;
  margin: 1rem;
`;

const Title = styled.h1`
  ${sharedStyles};
  font-size: 2rem;
`;

const Text = styled.p`
  ${sharedStyles};
  font-size: 1rem;
`;
```

Конструкция, напомню, называется теговым шаблоном. Я писал выше, что библиотека Styled Components на них основана. Сама директива styled – фабрика этих самых теговых шаблонов и это первая подсказка к самой крутой фишке библиотеки.

### Адаптивная вёрстка и media``

Как и в SCSS, вы просто описываете все правила непосредственно в описании стилизованного компонента:

```jsx
import styled from 'styled-components';

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
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
  return <Div>Hello Media!</Div>;
}
```

Мы создали говорящие за себя константы со списками разрешений экранов и определили под них устройства. Они могут быть экспортированы из любого места в проекте и, соответственно, использованы где угодно. Теперь вы знаете достаточно чтобы начать применять SC в реальных проектах.

### Композиция

«Подожди, дядя, – скажете вы. – У нас тут в CSS есть композиция классов, а с SCSS это вообще в культ возведено и композицию классов мы определяем вложенностью. Амперсанд наше всё!», – и будете правы в своём вопросе. Но, кажется, вы забыли, что цель CSS-in-JS в итоге – создать всё те же классы. И вот здесь, внезапно, композиция классов на наших глазах превращается в композицию компонентов:

```jsx
import styled from 'styled-components';
import icon from './icon.png';

const Icon = styled.i`
  display: block;
  width: 16px;
  height: 16px;
  background: trasnsparent url(${icon}) center/contain no-repeat;
`;

const Button = styled.button`
  background: none;
  border: 1px cyan solid;

  ${Icon} {
    display: inline-block;
    width: 12px;
    height: 12px;
  }
`;
```

Можете прийти в [@htmlshitchat](https://t.me/htmlshitchat) и рассказать мне про использование тега i для иконки, но... суть в том, что мы получили такую желанную и привычную композицию классов, да ещё и в виде всеми любимой вложенности. Родительский селектор тоже работает как надо:

```jsx
import styled from 'styled-components';
import {Menu} from ‘../Menu’;
import {Dropdown} from ‘../Dropdown’;

const Button = styled.button`
  border: 1px solid darkgreen;
  background: darkkhaki;

  ${Menu} & {
    border: none;
    background: transparent;
  }

  ${Dropdown} & {
    text-indent: -9999px;

    &::after {
      // create some arrow maybe
    }
}`;
```

Что произошло? Мы использовали родительский селектор (в нашем случае компонент, Button) и заставили его выглядеть иначе при использовании внутри компонентов Menu и Dropdown. Вот так вот просто.

Вот только я сразу хочу предупредить, что так пишут довольно редко: это нарушает принцип единственной ответственности (насколько он вообще применим для компонентов). Гораздо чаще делают следующее:

```jsx
import styled from 'styled-components';
import Icon from '@/ui/Icon';

const ButtonIcon = styled(Icon)`
  display: inline-block;
  width: 12px;
  height: 12px;
`;
```

То есть мы просто передаём в styled ваш компонент в качестве аргумента и получаем теговый шаблон, который генерирует новый класс на основе уже существующего класса, принадлежащего стилизуемому элементу, и новых передаваемых стилей. _Магическим_ образом рождается новый компонент. Мне кажется, на этом месте у самых внимательных должна щёлкнуть в голове весьма очевидная идея: «Раз Styled Components заведует классами, можно ли подмешать их к обычным компонентам?».

И ответ – да!

До тех пор пока ваши компоненты могут принимать класс (className) через переданные свойства (props) – SC может собрать композицию! В таком случае я придерживаюсь именования из документации: добавляю префикс `Styled` к имени компонента. Это позволяет избежать любых неоднозначностей и сложностей в именовании.

Следующий пример взят из [документации](https://styled-components.com/docs/basics#styling-any-component) с изменениями. Я вообще крайне рекомендую её прочесть, если владеете английским. Интерактивные примеры там – шик, пройдите и попробуйте.

```jsx
import styled from "styled-components";

const Link = ({ className, children }) => (
  <a href="/" className={className}>
    {children}
  </a>
);

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

const Styled2Link = styled(StyledLink)`
  color: red;
`;

export default function App() {
  return (
    <div>
      <Link>Unstyled, boring Link</Link>
      <br />
      <StyledLink>Styled, exciting Link</StyledLink>
      <br />
      <Styled2Link>Styled, exciting Link 2</Styled2Link>
    </div>
  );
}
```

И вот теперь обратите внимание. Помните я сказал, что Styled Components из коробки не умеет объединять ваши CSS-правила? Так вот в данном примере вы, фактически, объединили их сами. Как и в классическом подходе:

![Генерация классов](/images/classes.png 'Генерация классов')

### Магия

Напоследок немного обещанной магии. Возьмём популярный фреймворк [Material UI](https://material-ui.com/) и [обратим его на свою сторону](https://codesandbox.io/s/broken-wave-24je9). Компоненты MUI принимают классы? Значит, принимают и правила SC.

<iframe src="https://codesandbox.io/embed/broken-wave-24je9?fontsize=14&hidenavigation=1&moduleview=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="broken-wave-24je9"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Есть только одна хитрая проблема. Вы же не забыли, что правила CSS применяются по-порядку? Нам нужно быть уверенными, что стили SC загрузятся __после__ стилей JSS (который применяется в MUI по-умолчанию). Вот для этого и нужен провайдер контекста стилей `StylesProvider`. Он гарантирует, что правила JSS будут загружены первыми. А SC, соответственно, уже после них. Ну ещё есть хак с &&. Догадайтесь уже сами, что он сделает.

## Полезно и познавательно

На этом наш краткий экскурс в Styled Components закончен. В следующих статьях я разберу установку, работу с анимациями, темами и Typescript. А пока рекомендую ознакомиться со следующими ресурсами:

- <https://styled-components.com/>
- <https://emotion.sh/>
- <https://compiledcssinjs.com/>
- <https://linaria.dev/>
- <https://www.joshwcomeau.com/css/styled-components/>
- <https://medium.com/swlh/creating-react-styled-components-with-dynamic-tags-and-props-ef965c839e64>
- <https://www.reddit.com/r/reactjs/comments/l4o5k5/the_styledcomponents_happy_path/>
- <https://jsramblings.com/how-to-use-media-queries-with-styled-components/>
- <https://mxstbr.blog/2016/11/styled-components-magic-explained/>
