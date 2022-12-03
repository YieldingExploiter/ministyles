# ministyles
Mini-Styles for sites to avoid re-writing common styles too often, useful for making simple HTML that doesn't look complete garbage.

## Styles
Below, you can find a semi-complete (excluding ones with >3 stylesheets combined) list of style files available.

To load these, copy the URL & use one of the following in your HEAD tag:

###### Option 1

```html
<style>@import url('PUT THE URL YOU COPIED HERE');</style>
```

###### Option 2
```html
<link rel="stylesheet" href="PUT THE URL YOU COPIED HERE" />
```

### Uncombined
You can combine any of these' filenames (excluding .css; add .css at the end of the list of styles) with `+` to get a single css file with all of their contents - the contents are in the order you specify them in. You can combine up to **5** styles at once. Any more than that will 404.

You can also import `all.css` to load all stylesheets at tonce

%IMPORTLIST%


## License
"THE BEER-WARE LICENSE" (Revision 42):<br/>
<pleasego@nuke.africa> wrote this file. As long as you retain this notice you<br/>
can do whatever you want with this stuff. If we meet some day, and you think<br/>
this stuff is worth it, you can buy me a beer in return | YieldingExploiter<br/>

(file = all files in this repository - the notice can be found in all css files in this repo & doesn't need to manually be added by you)

<style>
  @import url('https://ministyles.astolfo.gay/background+links+gh-kbd+padding-kbd+code.css');
  @import url('https://ministyles.astolfo.gay/inter-font-by-default.css');
  .markdown-body .highlight pre, .markdown-body pre, .highlight {
    background: #181926;
    border-radius: 8px;
  }
  .markdown-body .highlight pre code, .markdown-body pre code {
    filter: invert() hue-rotate(180deg);
  }
</style>

