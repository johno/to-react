'use strict'

var isBlank = require('is-blank')
var cheerio = require('cheerio')

// Pseudocode
//
// Parse HTML
//   Find elements with prop attr
//   Change text of element to {prop.value}
//   Remove prop attr
// Parse CSS
//   Find declarations of an element based off classes
//   Inline style declarations
//   Remove class attribute
// Place in React component template

module.exports = function toReact (component) {
  component = component || {}

  if (typeof component !== 'object' || isBlank(component) || isBlank(component.html)) {
    throw new TypeError('to-react expected an object with an html string')
  }

  var props = []

  var html = cheerio.load(component.html)
  html('*').each(function (_, element) {
    var _this = html(this)

    if (_this.attr('prop') === 'childrenWrap') {
      _this.text('{children}')
      _this.removeAttr('prop')
    }

    if (_this.attr('prop')) {
      var propVal = _this.attr('prop')
      props.push(propVal)
      _this.text('{' + propVal + '}')
      _this.removeAttr('prop')
    }

    if (_this.attr('class')) {
      var classAttr = _this.attr('class')
      _this.removeAttr('class')
      _this.attr('className', classAttr)
    }
  })

  const comp = "import React from 'react'\n\n" +
    'const ' + component.name + ' = ({ ' + props.join(', ') + ' }) => {\n' +
    '  render (\n' +
      html.html() +
    '   )\n' +
    '}\n\n' +
    'export default ' + component.name

  console.log('----------\n' + comp + '\n----------')
  return comp
}
