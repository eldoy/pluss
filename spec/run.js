const test = require('spekky')

async function run() {
  // ... start a server or do some setup

  // Start timer
  console.time('Test run')

  await test('pluss')

  // End timer
  console.timeEnd('Test run')
}
run()
