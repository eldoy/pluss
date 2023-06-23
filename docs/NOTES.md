### Object map

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
