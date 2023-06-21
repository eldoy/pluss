const test = require('spekky')

async function run() {
  // ... start a server or do some setup

  // Start timer
  console.time('Test run')

  // Test the file 'spec/tests/superhtml.test.js
  await test('superhtml')

  // End timer
  console.timeEnd('Test run')
}
run()
