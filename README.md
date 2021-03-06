English | [简体中文](./README.zh-Hans.md)

# ZXSheets: A Light, Powerful & Extensible Spreadsheet

## Architecture
### Related techniques
- TypeScript
- Browser Canvas2d API
- React
- Redux



### Layers

![Layers](https://s3.bmp.ovh/imgs/2022/02/0e51fe5347ecf30d.jpg)

The project is seperated into 4 layers:

- **Core Layer**: Handles spreadsheet-related business, such as storage, query, calculation of formula, and so on. Besides, There is a `Driver Sublayer`, which provides instances for many interfaces for extending `Core Layer` and handling platform-specific business logics. It also provides a entry for `Plugin Layer` to inject code into `Core Layer`.
The final implementation is similar to IoC framework.

- **UI Layer**: Handles the operations related to spreadsheet drawing, including drawing on the computer screen (providing the user with a WYSIWYG view) and drawing on the printer. It also draws a user operation layer and emits user events to the `View Layer`.

- **View Layer**: Implemented in `React`, including Graphical User Interface, such as Ribbon, context menus, etc.

- **Plugin Layer**: Provides some peripheral modules, such as extended spreadsheet function in Javascript or Typescript, and injects drivers to `Core Layer`, changes the behaviour of three layer above.



## Running platform

- The desktop-end environment is Electron, which connects to the file system API provided by operating system and storage API provided by remote server.
- The browser environment runs in any modern browser and often connects to the server storage API. (It also works when using Browser File API to support local file editing, but is meaningless to do so, because of no OS file assosiation and other user-friendly support.)



### Desktop Support

- Windows >= 7

- macOS >= 10.11.6

- Linux platform able to run Chromium


### Browser support
All modern browsers, IE excluded.
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Opera |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |


## Build
### Building System

- NodeJS: provides the packing environment and the electron running environment

- Webpack: used to pack browser resources

- Electron: packets the project into a desktop application



### Start Building

#### Install Dependency

The dependencies are managed by `yarn`. Please type following on the console

```batch
yarn
```

#### Debug For Electron

1. Start the WebPack debugging server


```batch
npm run serve:electron
```

2. Compile electron main script and start the electron project

```batch
npm run electron
```

#### Debug For Browser

1. Start the WebPack debugging server


```batch
npm run serve
```

2. Open browser and enter http://localhost:8080/ to debug the project.

#### ~~Package~~

```batch
npm run build
```

## Contribution

This project needs too much work, and I only have a short spare time to work on this project. I look forward to your contributions, you can contribute on this project in the following ways:  
- New Issue 🐛 to report bugs or consult.
- New Pull Request to complete this project together.

### Code Style
There is no need to consider about code style and no code review. I schedule to write the comments, sort out the code style when the project can work.

### Note
- Please merge Pull Request to `dev` branch, not `master`

## Current Progress

### Core Layer

- [x] Finish interface defs.
- [x] Formula parse.
- [x] Formula caculation.
- [x] Spreadsheet function invoking. (from spreadsheet to TypeScript)
- [ ] Reactive caculation.
- [ ] Spreadsheet function implements. 
- [ ] Support merge cells.
- [ ] Implement IBook interface.
- [ ] Design a file saving format.
- [ ] Implement a command bus to receive top layers' message.
- [ ] Implement an asynchronous action center to run actions, such as sorting or filting. (Using `Web Worker`)
- [ ] Implement actions such as sorting or filting.
- [ ] Finish storage module.
- [ ] Finish a simple IOC framework.
- [ ] Implement a effective search algorithm to quickly locate any cell in a sheet (like RB tree or interval tree)  
- [ ] Support OpenXML (MS Office) parsing (aks opening) and saving.

### UI Layer

- [x] Render headings.
- [x] Render gridlines.
- [x] Support scaling.
- [ ] Implement a style rendering class.
- [x] Render plain string cells.
- [ ] Render fomated string cells.
- [ ] Render cell objects such as pictures. (MS Office not support)
- [ ] Render floating objects.
- [ ] Render merge cells.
- [ ] Custom rendering via passing different render options.
- [x] Emit mouse events.
- [ ] Emit keyboard events.
- [ ] Emit touch events. (Future support touching devices)
- [ ] Support Page Break Preview

### View Layer

- [x] Implement redux store.
- [ ] Complete Ribbon.
- [ ] Complete context menu.
- [ ] Optimize context menu in electron. (Create a new window)
- [ ] Complete dialogs such as font dialog, cell format dialog.
- [ ] Add animation.
- [ ] Connect view layer to core.
- [ ] Finish business logics.




