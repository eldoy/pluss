const superhtml = require(process.cwd() + '/index.js')
const assert = require('assert')

const it = {}

it['should support escaped variable replacement'] = async function () {
  let result = superhtml.compile(`{{ 'hello' }}`)
  assert.deepEqual(result, `\${esc('hello')}`)
}

it['should support raw variable replacement'] = async function () {
  let result = superhtml.compile(`{{{ 'hello' }}}`)
  assert.deepEqual(result, `\${'hello'}`)
}

it['should support if attributes'] = async function () {
  let result = superhtml.compile(`<div if="something">Hello</div>`)
    .split('\n')
    .map(x => x.trim())
    .join('')
  let expect = "${(function() {if (something) {return `<div>Hello</div>`}return ''}())}"
  assert.deepEqual(result, expect)
}

it['should support map attributes'] = async function () {
  let result = superhtml.compile(`<div map="product of products">Hello</div>`)
    .split('\n')
    .map(x => x.trim())
    .join('')
  let expect = "${products.map(function(product, i) {return `<div>Hello</div>`})}"
  assert.deepEqual(result, expect)
}

module.exports = it
