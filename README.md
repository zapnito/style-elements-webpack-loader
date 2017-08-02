# !!! WARNING !!! #

This doesn't work with the current release of Style Elements. It will soon though, it's just waiting for a PR to be merged.

# !!! WARNING !!! #


# The webpack loader for Style Elements

## Installation

```
$ npm install --save-dev elm-css-webpack-loader
```

## Usage

### Webpack config

```javascript
module.exports = {
  module: {
    rules: [
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          'elm-hot-loader',
          'elm-webpack-loader'
        ]
      },
      {
        test: /Styles\.elm$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'elm-css-webpack-loader',
            options: {
              stylesheetModule: "MyStyle",
              stylesheetFunction: "stylesheet",
              mode: "layout"
            }
          }
        ]
      }
    ]
  }
};
```

### In your Elm code

```

module MyStyle exposing (stylesheet)

import Style exposing (..)

...

stylesheet : StyleSheet styles variation
stylesheet =
    Style.stylesheet
        [ style None []
        ]
```

```
import MyStyle exposing (stylesheet)

view : Html Msg
view model =
    Element.toHtml stylesheet <|
        el None [] (text "Hello Style Elements!")

```

## Options

_The following options are all required_

#### stylesheetModule and stylesheetFunction

These are used to tell the webpack loader which function exposes your stylesheet. In the example above you can see that the stylesheetModule and stylesheetFunction correspond to the Elm code.

#### Mode

`"layout"` or `"viewport"`

##### layout

Includes your app's styles

##### viewport

The same as layout, but the height and width of the site is set to the height and width of the screen.



## Examples

#### Add a prefix to your Style Elements styles

Useful if you're embedding your Elm app into a page which already has it's own styles. The following configuration will prefix all of the style elements selectors with ".my-prefix".

```javascript
module.exports = {
  module: {
    rules: [
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/, /Styles\.elm$/],
        use: [
          'elm-hot-loader',
          'elm-webpack-loader'
        ]
      },
      {
        test: /Styles\.elm$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader => [
                require('postcss-prefix-selector')({prefix: '.my-prefix'})
              ])
            }
          },
          {
            loader: 'elm-css-webpack-loader',
            options: {
              stylesheetModule: "MyStyle",
              stylesheetFunction: "stylesheet",
              mode: "layout"
            }
          }
        ]
      }
    ]
  }
};
```

**Without postcss-prefix-selector**

```
.modal__281674324 {
  color: red;
}
```

**With postcss-prefix-selector**

```
.my-prefix .modal__281674324 {
  color: red;
}
```
