# Pluss

Superset of HTML.

**Features:**
- insert variables
- conditional logic
- for loops (map)
- isomorphic

### Insert variables

Escaped:
```html
{{ hello }}
```

Translates to:

```html
${ esc(hello) }
```

Raw:
```html
{{{ hello }}}
```

Translates to:

```html
${ hello }
```

### Conditional logic

```html
<div if="hello">
  {{ hello }}
</div>
```

Translates to:

```html
${function(){
  if (hello) {
    return `<div>${esc(hello)}</div>`
  }
  return ''
}()}
```

### For loops

Array:
```html
<ul>
  <li map="product of products">
    {{ product }}
  </li>
</ul>
```

Translates to:

```html
<ul>
  ${products.map(function(product) {
    return `<li>${esc(product)}</li>`
  }).join('')}
</ul>
```

Array with index:
```html
<ul>
  <li map="product, index of products">
    {{ product }} {{ index }}
  </li>
</ul>
```
Translates to:

```html
<ul>
  ${products.map(function(product, index) {
    return `<li>${esc(product)} ${esc(index)}</li>`
  }).join('')}
</ul>
```

Array with index, contained:
```html
<ul>
  <li map="product, index of products" class="n-{{ index }}">
    {{ product }} {{ index }}
  </li>
</ul>
```
Translates to:

```html
<ul>
  ${products.map(function(product, index) {
    return `<li class="n-${esc(index)}">${esc(product)} ${esc(index)}</li>`
  }).join('')}
</ul>
```

MIT licensed.

Created by Eldøy Projects. Enjoy!
