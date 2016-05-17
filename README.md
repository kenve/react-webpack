# react-webpack

## Demo说明
1. [Demo01](demo01/) webpack和react 整合开发的 HelloWorld Demo , 也可作为同类项目的Starter Kit。
2. [Demo02](demo02/) 使用ES6的`Promise`搜索Github用户信息,并且展示出来搜索出来的信息,具体查看该[Demo](demo02/)的README。
3. [Demo03](demo03/) 列表内容的增删改查的例子。

## 初始化项目

```bash
$ npm init
```
## 安装webpack及开发服务器
```bash
$ npm i webpack --save-dev

$ npm i webpack-dev-server --save-dev
```
## 配置Babel让React支持ES6
#### 安装babel
需要安装babel和babel的两个preset:
```bash
//install babel core
$ npm i babel-loader babel-core --save-dev

//install es6 support and react support
$ npm i babel-preset-es2015 babel-preset-react --save-dev
```
这里安装了babel的主体和两个babel的preset, 什么是preset呢，你可以把preset看成一个包，里面有各种各样一系列的插件。

babel-preset-es2015 es6语法包，有了这个，你的代码可以随意的使用es6的新特性啦，const,箭头操作符等信手拈来。
babel-preset-react react语法包，这个包，是专门作为react的优化，让你在代码中可以使用React ES6 classes的写法，同时直接支持JSX语法格式。 更多详情，请到[Babel Plugins](https://babeljs.io/docs/plugins/)看一下这两个语法包都包括什么插件，每个插件都有什么特性。

#### 配置webpack
项目更目录创建 `webpack.config.js`文件，并
```js
const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
// const PATHS = {
//   app: path.join(__dirname, 'app'),
//   build: path.join(__dirname, 'build')
// };

module.exports = {
    //项目入口文件目录及文件名
    entry: {
        app: path.resolve(APP_PATH, 'index.jsx')
    },
    //项目文件输出目录
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    //各种loader（预处理）
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: APP_PATH
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    },
    //插件
    plugins: [

    ]
}

```
需要添加一个resolve的参数，把jsx这种扩展名添加进去，这样就可以在js中import加载jsx这种扩展名的脚本：
```js
  ...
  resolve: {
      extensions: ['', '.js', '.jsx']
  }
  ...
```
#### npm中添加webpack启动命令
配置 `package.json` 文件：
package.js
```js
 ...
  "scripts": {
    "dev": "webpack-dev-server --devtool eval --progress --profile --colors --hot --content-base build",
    "build": "webpack --progress --profile --colors",
    "test": "karma start"
  },
  ...
```
`webpack-dev-server` - 在 localhost:8080 建立一个 Web 服务器
`--devtool eval` - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
`--progress` - 显示合并代码进度
`--colors` - Yay，命令行中显示颜色！
`--content-base build` - 指向设置的输出目录


## 安装CSS 相关预处理器

需要两种loader，css-loader 和 style－loader，css-loader会遍历css文件，找到所有的url(...)并且处理。style-loader会把所有的样式插入到你页面的一个style tag中。

```bash
 npm install css-loader style-loader --save-dev
```
添加node-sass来解析sass文件,安装相关的loader:

```bash
 npm install sass-loader node-sass --save-dev
```
配置webpack 的`webpack.config.js`文件：

```js
 ...
  module: {
    loaders: [
    ...
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ...
    ]
  },
  ...
```

## 处理图片
安装loader，处理文件。安装url-loader:
```bash
 npm install url-loader --save-dev
```
配置`webpack.config.js`:

```js
...
  module: {
    loaders: [
    ...
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      }
    ...
    ]
  },
  ...
```
注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片。

## 安装 React
安装React和React-Dom:

```bash
npm install react react-dom --save
```

## 添加React Transform支持
现在每次修改一个component的代码，页面都会重新刷新，这会造成一个很不爽的问题，程序会丢失状态，当然现在在简单的程序中这个完全无所谓，但是假如程序变得越来越复杂，想要返回这种状态你可能又要经历一系列的点击等操作，会耗费一些时间。如果更新代码以后可以只更新局部的组件，而对全局的页面不是直接强制刷新，那岂不是非常美妙？
安装一个babel的preset就可以轻松的完成这个工作:
```bash
 npm install babel-preset-react-hmre --save-dev
```
这个preset里面其实包括两方面的东西：
 
 * react-transform-hmr 用来实现上面所说的热加载。
 * react-transform-catch-errors 用来捕获render里面的方法，并且直接展示在界面上。

项目根目录新建`.babelrc`文件，并配一下：
```js
{
  "presets": ["react", "es2015"],
  //在开发的时候才启用HMR和Catch Error
  "env": {
   "development": {
     "presets": ["react-hmre"]
   }
  }
}
```

 * 该作者合并了`react-transform-hmr`和`react-hot-loader`的代码推出了：[react-hot-loader3](https://github.com/gaearon/react-hot-loader/pull/240)

## 开发技巧
#### 启用source-map
现在的代码是合并以后的代码，不利于排错和定位，只需要在`webpack.config.js`中添加
```js
  ...
  devtool: 'eval-source-map',
  ...
```
这样出错以后就会采用source-map的形式直接显示你出错代码的位置。
为css启用`source-map`
javascript有了这个特性，css自然不能落后，其实很简单，只要在loader里面添加一个参数即可
```js
  ...
  {
    test: /\.scss$/,
    loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
    include: APP_PATH
  },
  ...
```
#### 配置webpack-dev-server代理

既然常用webpack做React一类的SPA，那么一个典型的例子就是前后端分离。后端是一个RESTful的server不管用什么写的。假定在本机他是类似http://localhost:5000/api/*这类的请求，现在添加配置让ajax请求可以直接proxy过去。
```js
    devServer: {
        hot: true,
        inline: true,
        //其实很简单的，只要配置这个参数就可以了
        proxy: {
          '/api/*': {
              target: 'http://localhost:5000',
              secure: false
          }
        }
    },
```
重启以后 发现`/api/*`的请求都代理到http://localhost:5000去了～
更多的方法可以看官方文档 [Webpack dev server proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy)

#### 和express配合
如果你前后端都使用express作为框架，那么`wepack-dev-middleware`就是你的最佳选择，他可以完美的和express配合起来。这个一步一步的说起来比较复杂，大家可以自己查看下面那个链接，来配置你的express。

配置[webpack-dev-middleware](http://madole.github.io/blog/2015/08/26/setting-up-webpack-dev-middleware-in-your-express-application/)

#### 分离app.js和第三方库

现在我们build出来的只有一个`bundle.js` 如果第三方库很多的话，会造成这个文件非常大，减慢加载速度，现在我们要把第三方库和我们app本身的代码分成两个文件。

修改entry入口文件
```js
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
    //添加要打包在vendors里面的库
    vendors: ['jquery', 'moment']
  },
```
添加`CommonsChunkPlugin`插件：
```js
  plugins: [
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlwebpackPlugin({
      title: 'Hello World app'
    })
  ]
```
#### 生成Hash名称的script来防止缓存
```js
output: {
  path: BUILD_PATH,
  //只要再加上hash这个参数就可以了
  filename: '[name].[hash].js'
},
```







Directory per Concept

```
.
├── actions
│   ├── LaneActions.js
│   └── NoteActions.js
├── components
│   ├── App.jsx
│   ├── Editable.jsx
│   ├── Lane.jsx
│   ├── Lanes.jsx
│   ├── Note.jsx
│   └── Notes.jsx
├── constants
│   └── itemTypes.js
├── index.jsx
├── libs
│   ├── alt.js
│   ├── persist.js
│   └── storage.js
├── main.css
└── stores
    ├── LaneStore.js
    └── NoteStore.js
```

Directory per Component
```

├── actions
│   ├── LaneActions.js
│   └── NoteActions.js
├── components
│   ├── App
│   │   ├── App.jsx
│   │   ├── app.css
│   │   ├── app_test.jsx
│   │   └── index.js
│   ├── Editable
│   │   ├── Editable.jsx
│   │   ├── editable.css
│   │   ├── editable_test.jsx
│   │   └── index.js
...
│   └── index.js
├── constants
│   └── itemTypes.js
├── index.jsx
├── libs
│   ├── alt.js
│   ├── persist.js
│   └── storage.js
├── main.css
└── stores
    ├── LaneStore.js
    └── NoteStore.js
```

Directory per View:
```
├── components
│   ├── Note
│   │   ├── Note.jsx
│   │   ├── index.js
│   │   ├── note.css
│   │   └── note_test.jsx
│   ├── Routes
│   │   ├── Routes.jsx
│   │   ├── index.js
│   │   └── routes_test.jsx
│   └── index.js
...
├── index.jsx
├── main.css
└── views
    ├── Home
    │   ├── Home.jsx
    │   ├── home.css
    │   ├── home_test.jsx
    │   └── index.js
    ├── Register
    │   ├── Register.jsx
    │   ├── index.js
    │   ├── register.css
    │   └── register_test.jsx
    └── index.js
```



## Redux
安装：
```bash
npm install --save react-redux
```


```bash
npm i --save redux-thunk
```
安装react-router
```bash
npm install --save react-router
```