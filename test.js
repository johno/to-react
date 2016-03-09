import test from 'ava'
import toReact from './'

test('to-react converts a simple component', t => {
  t.plan(1)

  const component = toReact({
    html: `    <dl class="dib mr4 mt0">
      <dd class="db pl0 ml0 f4 f2-ns b" prop="description">
        This is something that is really awesome.
      </dd>
      <dt class="f6 db" prop="title">
        Awesome Title
      </dt>
    </dl>
`,
    css: `.dib { display: inline-block; }
          .mr4 { margin-right: 4em; }
          /* ... */`,
    name: 'Dl'
  })

  const expected = `import React from 'react'

const Dl = ({ description, title }) => {
  render (
    <dl className="dib mr4 mt0">
      <dd className="db pl0 ml0 f4 f2-ns b">{description}</dd>
      <dt className="f6 db">{title}</dt>
    </dl>
   )
}

export default Dl`
  t.same(component, expected)
})

test('to-react handles a more complex component', t => {
  t.plan(1)

	const html = `<nav class="pa3 pa4-ns">
  <a class="link dim black b f1 f-headline-ns tc db mb3 mb4-ns" href="#" title="Home" prop="title">Site Name</a>
  <div class="tc pb3" prop="childrenWrap">
    <a class="link dim gray f6 f5-ns dib mr3" href="#" title="Home">Home</a>
    <a class="link dim gray f6 f5-ns dib mr3" href="#" title="About">About</a>
    <a class="link dim gray f6 f5-ns dib mr3" href="#" title="Store">Store</a>
    <a class="link dim gray f6 f5-ns dib" href="#" title="Contact">Contact</a>
  </div>
</nav>
`

	const component = toReact({ html: html, css: '', name: 'LargeTitleNav' })

  const expected = `import React from 'react'

const LargeTitleNav = ({ title }) => {
  render (
<nav className="pa3 pa4-ns">
  <a href="#" title="Home" className="link dim black b f1 f-headline-ns tc db mb3 mb4-ns">{title}</a>
  <div className="tc pb3">{children}</div>
</nav>
   )
}

export default LargeTitleNav`
  t.same(component, expected)
})
