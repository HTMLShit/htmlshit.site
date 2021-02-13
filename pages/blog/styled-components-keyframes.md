---
draft: true
title: Styled Components. Keyframes
date: '2021-02-01'
tags:
  - css
  - cssinjs
  - react
  - styledcomponents
  - emotion
  - keyframes
---

Если с переходами всё просто – transition это лишь ещё одно правило – то с keyframes всё интереснее. Ведь keyframes – это [at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule), иначе говоря – оператор, указывающий CSS какие конкретно правила и когда применять. Ещё и переиспользовать можно – создали в одном месте, используем других.

Напрямую написать @keyframes внутри описания styled-компонента нельзя, но можно воспользоваться ещё одним помощником – функцией @keyframes.

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
  return (
    <WobbleDiv animationLength="0.8s">
      Hello Wobble!
    </WobbleDiv>
  );
}
```

Удобно? По-моему, очень даже. Но вы точно знаете как минимум ещё одно at-rule, если хоть раз занимались адаптивной разработкой.