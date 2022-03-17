# Maai Cursor

Visualize relative position from cursor position.  
Hilight realtive N line up and N line down.  
Enhance vertical moving of cursor.  
Enhance command of vim's `{N}j` and `{N}k`.

<div><video controls src="https://raw.githubusercontent.com/elzup/vscode-jet-cursor/main/images/maai-cursor-v2.mp4" muted="true" width="600"></video></div>

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

**WIP**

- `maaiCursor.distance`: Distance of marker.
- `maaiCursor.mode`: Hilight pattern `point` or `line`.

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
