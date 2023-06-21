# Template-view-concept

Is it feasible to create our own template language for HTML?

Can this be an extension of fastview? On app load we:

1. Read the file
2. Replace everything with Javascript code
3. This makes it fast!

**Features:**
- insert variables
- if-elseif-else (conditional logic)
- for loops (map)
- partials from memory
- isomorphic
- safe like liquid
- small footprint
- make front-end programming completely low-code!

This one has some code we can use, see replaceAll:
https://www.npmjs.com/package/sprightly

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
<div elseif="something">
  {{ hello }}
</div>
<div else>
  {{ hello }}
</div>
```

Translates to:

```html
${function(){
  if (hello) {
    return `<div>${esc(hello)}</div>`
  } else if (something) {
    return `<div>${esc(hello)}</div>`
  } else {
    return `<div>${esc(hello)}</div>`
  }
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

Object:

```html
<ul>
  <li map="key in article">
    {{ key }}
  </li>
</ul>
```

Translates to:

```html
<ul>
  ${Object.keys(article).map(function(key)) {
    return `<li>${esc(key)}</li>`
  }).join('')}
</ul>
```

Object with value:
```html
<ul>
  <li map="key, value in article">
    {{ key }} {{ value }}
  </li>
</ul>
```

Translates to:

```html
<ul>
  ${products.map(function(key, value) {
    return `<li>${esc(key)} ${esc(value)}</li>`
  }).join('')}
</ul>
```

Object with value and index:
```html
<ul>
  <li map="key, value, index in article">
    {{ key }} {{ value }} {{ index }}
  </li>
</ul>
```

Translates to:

```html
<ul>
  ${products.map(function(product, index) {
    return `<li>${esc(key)} ${esc(value)} ${esc(index)}</li>`
  }).join('')}
</ul>
```

Possible easter egg with arrays, prints index, only if we get it automatically:
```html
<ul>
  <li map="index in article">
    {{ index }}
  </li>
</ul>
```

Translates to:

```html
<ul>
  ${products.map(function(product, index) {
    return `<li>${esc(index)}</li>`
  }).join('')}
</ul>
```


### Partials from memory

Not really needed since all we have to do is to include the partials in window, app, or global.

But maybe this is where we include short cuts?

```html
<a href="#" onclick="{{ $.app.views.handleClick }}">Click</a>
```

This can be used to automatically include the file on the page it is used. Translates to:

```html
<a href="#" onclick="handleClick(this);return false">Click</a>
```

with this on the page:

```
<script>
  window.handleClick = ${$.app.views.handleClick}
</script>
```

### Isomorphism

The partials are automatically isomorphic since they are translated on save. 

We may need some conventions like smaller components and no private template functions to make them work.

### Safety

Sanitizing the data using JSON.stringify (maybe need a safe version without prototypal injection).

### Small footprint

It's just as fast as writing template functions directly since they are "compiled".