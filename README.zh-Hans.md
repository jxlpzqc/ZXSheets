[English](./README.md) | 简体中文

# ZXSheets: 轻量、功能强大、可扩展的电子表格框架

## 架构
### 相关技术
- TypeScript
- 浏览器 Canvas2d API
- React
- Redux

### 分层
该项目分为4层：
- **Core层**：处理电子表格相关的业务，比如存储，查询，公式计算等。其中有一个Driver子层，给很多接口提供实例化的模块（最终实现类似于IoC），供Core层的扩展和平台区分业务的兼容，也给Plugin层向Core注入相关的代码提供通道。  
- **UI层**：处理电子表格绘制相关的业务，包括在电脑屏幕中的绘制（给用户提供所见即所得的电子表格）和打印机中绘制（用于打印），同时绘制一个用户操作层，并将用户事件上报到View层。  
- **View层**：主要采用React技术实现，相关的图形用户接口，包括Ribbon，上下文菜单等等。  
- **Plugin层**：提供一些外围功能，比如函数的扩展，注入驱动以修改Core层以及其他两层的行为。  

## 运行平台

- 桌面端运行，宿主环境为Electron，用于对接操作系统的文件系统API和服务器存储API  
- 浏览器运行，用于对接服务器存储API  

### 桌面支持
- Windows >= 7
- macOS >= 10.11.6
- 能够运行chromium的Linux平台  

### 浏览器支持
所有的现代浏览器，不支持IE  
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Opera |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |

## 构建

### 构建平台

- NodeJS: 用于提供打包环境和electron端运行环境
- Webpack: 用于浏览器端资源的打包
- Electron: 用于将项目打包为桌面应用

### 打包脚本

#### 安装依赖  
依赖模块通过yarn包管理程序管理，在控制台执行
```batch
yarn
```

#### 桌面端调试
1. 启动webpack调试服务器
```batch
npm run serve:electron
```
2. 编译Electron主进程脚本并启动Electron项目
```batch
npm run electron
```


#### 浏览器调试
1. 启动webpack调试服务器
```batch
npm run serve
```
2. 启动浏览器，访问http://localhost:8080/

#### ~~用于打包~~
```batch
npm run build
```

## 贡献
这个项目具有很多的功能和代码量，我只有很短的业余时间去完成这个项目，我非常欢迎你的贡献，你可以通过以下方式和我们一起共建：
- 通过 Issue 报告🐛或进行咨询。
- 提交 Pull Request 以共同完成代码。

### 代码风格  
实现功能就好，没有代码评审，等完工了再整理相关的注释、代码风格等。

### 注意事项
- Pull Request 合并到dev分支

## 当前开发进度

ToDo列表请参见 [英文版](./README.md#current-progress)
