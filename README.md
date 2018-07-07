# notes-ui

> Notes UI Application

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


## Component/Tool Information

Vue CLI
``` bash
npm install -g @vue/cli
```

Vue INIT
``` bash
npm install -g @vue/init
```

## Component Generation

From the root of the project run

``` bash
npm run gc {Component Name}

```

Example:

``` bash
npm run gc ForgotPassword

```

## Quick Start

``` bash

git clone git@github.com:virtualadrian/notes-ui.git && \
cd notes-ui && \
npm install && \
npm run dev

```

## Styling

Styles: SCSS


## Additional tools

*Global*
``` bash

sudo npm install -g @vue/init
sudo npm install -g @vue/cli
sudo npm install -g vue-generate-component
 
```

*Project Dependencies*
``` bash

npm install --save axios 
npm install --save jwt-decode 

```


*Project Dev Dependencies*

``` bash

npm install --save-dev vue-class-component vue-property-decorator 
npm install --save-dev babel-plugin-transform-decorators-legacy
npm install --save-dev vue-style-loader css-loader
npm install --save-dev node-sass sass-loader

```

*Babel Plugin For ES6*


Add "transform-decorators-legacy" to the .babelrc file so we can use @Component annotations.

``` json
{
  "plugins": ["transform-vue-jsx", "transform-runtime", "transform-decorators-legacy"]
}  
```


WIP: More to come...
