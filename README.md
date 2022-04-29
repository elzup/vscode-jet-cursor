# Maai Cursor

Visualize relative position from cursor position.  
Hilight realtive N line up and N line down.  
Enhance vertical moving of cursor.  
Enhance command of vim's `{N}j` and `{N}k`.

<div><video controls src="https://user-images.githubusercontent.com/2284908/158838703-534ce903-d020-4101-b8ff-5d08382e08e1.mp4" muted="true" width="600"></video></div>

## Recommend Config

example with [vscodevim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)

`.vsvimrc`

```
nnoremap <C-j> 5j
nnoremap <C-k> 5k
vnoremap <C-j> 5j
vnoremap <C-k> 5k
```

## Extension Settings

This extension contributes the following settings:

- `maaiCursor.distance`: Distance of marker.
- `maaiCursor.mode`: Hilight pattern `point` or `line` or `para`.

```
  "maaiCursor.distance": 5
  "maaiCursor.mode": "point"
```

<!-- ## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension. -->

## Commands

**WIP**

- `extension.maaiCursor.toggle`: Toggle maaiCursor on/off

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of Base feature.
