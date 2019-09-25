# 💅 styled-media-query-helper

`styled-media-query-helper` is a powerful package that helps you handle media queries, when using [styled-components](https://github.com/styled-components/styled-components), with easy to learn and read syntax.

## Installation

### Yarn

`yarn add styled-media-query-helper`

### npm

`npm install styled-media-query-helper`

## Usage

- [Basic example](#basic-example)
- [Media](#media)
  - [constructor(breakpoints)](#media)
  - [Base functions](#base-functions)
    - [up(breakpointName)](#upbreakpointname)
    - [upAnd(breakpointName)](#upandbreakpointname)
    - [down(breakpointName)](#downbreakpointname)
    - [downAnd(breakpointName)](#downandbreakpointname)
    - [only(breakpointName)](#onlybreakpointname)
    - [not(breakpointName)](#notbreakpointname)
    - [between(start, end)](#betweenstart-end)
    - [betweenAnd(start, end)](#betweenandstart-end)
    - [outside(start, end)](#outsidestart-end)
    - [outsiteAnd(start, end)](#outsiteandstart-end)
  - [Extension functions](#extension-functions)
    - [with(breakpointName)](#withbreakpointname)
    - [without(breakpointName)](#withoutbreakpointname)
  - [Condition functions](#condition-functions)
    - [and(boolean)](#andboolean)
    - [or(boolean)](#orboolean)
  - [Special functions](#special-functions)
    - [spread(styles)](#spreadstyles)

### Basic Example

```javascript
import styled from "styled-components";
import Media from "styled-media-query-helper";

const media = new Media([
  { name: "tiny", rangeEnd: 375 },
  { name: "small", rangeStart: 376, rangeEnd: 757 },
  { name: "medium", rangeStart: 758, rangeEnd: 991 },
  { name: "large", rangeStart: 992, rangeEnd: 1399 },
  { name: "extraLarge", rangeStart: 1400 },
]);

const Button = styled.button`
  width: 100px;
  hegiht: 50px;
  background-color: red;

  ${media
    .upAnd("medium")
    .with("tiny")
    .without("extraLarge")`
    background-color: blue;
  `}
`;

// ⬇⬇⬇⬇⬇⬇⬇⬇⬇
//
// const Button = styled.button`
//   width: 100px;
//   hegiht: 50px;
//   background-color: red;
//
//   /* Tiny */
//   @media (max-width: 375px)
//     background-color: blue;
//   }
//
//   /* Medium, Large */
//   @media (min-width: 758px) and (max-width: 1400px) {
//     background-color: blue;
//   }
// `;
```

## Media

To use `styled-media-query-helper` first you need to create instance of Media as such:

```javascript
import Media from 'styled-media-query-helper';

const media = Media([{
  { name: "tiny", rangeStart: 0, rangeEnd: 375 },
  { name: "small", rangeStart: 376, rangeEnd: 757 },
  { name: "medium", rangeStart: 758, rangeEnd: 991 },
  { name: "large", rangeStart: 992, rangeEnd: 1399 },
  { name: "extraLarge", rangeStart: 1400, rangeEnd: Infinity }
}])
```

Constructor takes one argument that is array of objects with this shape:

```javascript
{
  // Name for the breakpoint. Must be unique
  name: String,

  // Number of pixels that will mark the start of this breakpoint. Can be ommited for the first breakpoint.
  rangeStart: Number,

  // Number of pixels that will mark the end of this breakpoint. Can be ommited for the last breakpoint.
  rangeEnd: Number,
}
```

**⚠️ Breakpoint ranges must be continuous from `0` to `Infinity`. ⚠️**

### Base functions

Base fucntions are on media object directly and can be used to specify base ranges for breakpoints.

#### up(breakpointName)

Captures every breakpoint that is higher than specified, not including specified.

`media.up("small")` ➡ `@media (min-width: 758px)`

#### upAnd(breakpointName)

Captures every breakpoint that is higher than specified, including specified.

`media.upAnd("small")` ➡ `@media (min-width: 376px)`

#### down(breakpointName)

Captures every breakpoint that is lower than specified, not including specified.

`media.down("large")` ➡ `@media (max-width: 991px)`

#### downAnd(breakpointName)

Captures every breakpoint that is lower than specified, including specified.

`media.downAnd("large")` ➡ `@media (max-width: 1399px)`

#### only(breakpointName)

Captures only specified breakpoint.

`media.only("medium")` ➡ `@media (min-width: 758px) and (max-width: 991px)`

#### not(breakpointName)

Captures every breakpoint exept specified.

`media.not("medium")` ➡ `@media (max-width: 757px)`, `@media (min-width: 992px)`

#### between(start, end)

Captures every breakpoint within speficied reange, not including specified breakpoints.

`media.between("small", "large")` ➡ `@media (min-width: 758px) and (max-width: 991px)`

#### betweenAnd(start, end)

Captures every breakpoint within speficied reange, including specified breakpoints.

`media.betweenAnd("small", "large")` ➡ `@media (min-width: 376px) and (max-width: 1399px)`

#### outside(start, end)

Captures every breakpoint outside of speficied reange, not including specified breakpoints.

`media.outside("small", "large")` ➡ `@media (max-width: 375px)`, `@media (min-width: 1400px)`

#### outsiteAnd(start, end)

Captures every breakpoint outside of speficied reange, including specified breakpoints.

`media.outsideAnd("small", "large")` ➡ `@media (max-width: 757px)`, `@media (min-width: 992px)`

### Extension functions

Extension functions are included on functions returned from `base fucntions` and can be used to extend or narrow specified range.

#### with(breakpointName)

Adds breakpoint to specified range.

`media.up("medium")` ➡ `@media (min-width: 992px)`

`media.up("medium").with("tiny")` ➡ `@media (max-width: 375px)`, `@media (min-width: 992px)`

#### without(breakpointName)

Removed breakpoint to specified range.

`media.up("medium")` ➡ `@media (min-width: 992px)`

`media.up("medium").without("extraLarge")` ➡ `@media (min-width: 992px) and (max-width: 1399px)`

### Condition functions

These functions allow you to render styles based on conditions.

**⚠️ If you chain multiple condition functions, only the last one is applied. ⚠️**

#### and(boolean)

Applies _and_ logic to your styles.

`media.up("medium").and(true)` ➡ `@media (min-width: 992px)`

`media.up("medium").and(false)` ➡ `null`

#### or(boolean)

Applies _or_ logic to your styles.

```javascript
const Button = styled.div`
  ${media.up("medium").or(false)`
    color: blue;
  `}
`;

// ⬇⬇⬇⬇⬇⬇⬇⬇⬇

const Button = styled.div`
  @media (min-width: 992px) {
    color: blue;
  }
`;
```

```javascript
const Button = styled.div`
  ${media.up("medium").or(true)`
    color: blue;
  `}
`;

// ⬇⬇⬇⬇⬇⬇⬇⬇⬇

const Button = styled.div`
  color: blue;
`;
```

### Special functions

#### spread(styles)

This function can be used to autoamticaly generate different styles for different media-queries from object.

```javascript
const styles = {
  default: {
    color: blue,
    background-color: red
  },
  medium: {
    color: green,
    background-color: white
  }
}

const Button = styled.div`
  ${media.spread(styles)`
    color: ${styles => styles.color};
    background-color: ${styles => styles.background-color};
  `}
`;

// ⬇⬇⬇⬇⬇⬇⬇⬇⬇

const Button = styled.div`
  // tiny and small screens are rendered with "default" style
  @media (max-width: 757) {
    color: blue,
    background-color: red,
  }

  // medium screens are rendered with "medium" style
  @media (min-width: 758) and (max-width: 991) {
    color: green,
    background-color: white,
  }

  // large and extraLarge screens are rendered with "default" style
  @media (max-width: 757) {
    color: blue,
    background-color: red,
  }
`;
```

## TO-DO

- [x] Rewrite in typescript
- [ ] Minificate output code
- [ ] Add support for em and rem
- [ ] Add tests using jest

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
