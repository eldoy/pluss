const regexp = {
  esc: /\{\{(.+?)\}\}/g,
  raw: /\{\{\{(.+?)\}\}\}/g,
  if: /<.+?(\s+if="(.+?)")(.+?)?>.*?<\/.*>/g,
  map: /<.+?(\s+map="(.+?)")(.+?)?>.*?<\/.*>/g
}

function compile(str) {
  str = str.replaceAll(regexp.raw, function (a, b) {
    return `\${${b.trim()}}`
  })
  str = str.replaceAll(regexp.esc, function (a, b) {
    return `\${esc(${b.trim()})}`
  })

  str = str.replaceAll(regexp.if, function (a, b, c) {
    return [
      `\${(function() {`,
      `  if (${c}) {`,
      `    return \`${a.replace(b, '')}\``,
      `  }`,
      `  return ''`,
      `}())}`
    ].join('\n')
  })

  str = str.replaceAll(regexp.map, function (a, b, c) {
    let [names, type, obj] = c.split(' ').map((x) => x.trim())
    let [name, index = 'i'] = names.split(',').map((x) => x.trim())
    return [
      `\${${obj}.map(function(${name}, ${index}) {`,
      `  return \`${a.replace(b, '')}\``,
      `})}`
    ].join('\n')
  })

  return str
}

module.exports = { compile }
