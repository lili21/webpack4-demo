webpack-4-demo
==============
> migrate guide

Simple yet complete config.

Get Start
---------

```bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm build
```

Knowing Issue
-------------

- `mini-css-webpack-plugin` does support HMR
- `mini-css-webpack-plugin` does support content hash. [issue](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/1)
- `extract-text-webpack-plugin` emit empty css files [issue](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/738)
