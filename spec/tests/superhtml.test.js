const superhtml = require(process.cwd() + '/index.js')
const assert = require('assert')

const it = {}

it['should do some stuff'] = async function () {
  assert.deepEqual(true, true)
}

module.exports = it
