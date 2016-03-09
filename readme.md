# to-react [![Build Status](https://secure.travis-ci.org/johnotander/to-react.png?branch=master)](https://travis-ci.org/johnotander/to-react) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Convert an HTML/CSS component into a functional React component with inline styles.
This is useful for importing existing code into the React ecosystem.

Used to create [`tachyons-react`](https://github.com/tachyons-react) from [Tachyons](https://github.com/tachyons-css).

## Installation

```bash
npm install --save to-react
```

## Usage

```javascript
const toReact = require('to-react')

toReact({
  html: `<dl className="dib mr4 mt0">
          <dd className="db pl0 ml0 f4 f2-ns b" prop="description">
            This is something that is really awesome.
          </dd>
          <dt className="f6 db" prop="title">
            Awesome Title
          </dt>
        </dl>`,
  css: `.dib { display: inline-block; }
        .mr4 { margin-right: 4em; }
        /* ... */`,
  name: 'Dl'
}) // => Functional React component string
```

#### Output

```js
import React from 'react'

const Dl = ({ title, description }) => {
  return (
    <dl style={...}>
      <dd style={...}>{description}</dd>
      <dt style={...}>{title}</dt>
    </dl>
  )
}

export default Dl
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
