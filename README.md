# eslint-plugin-actionable-elements

Ensures id&#39;s are provided for actionable JSX elements

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-actionable-elements`:

```
$ npm install eslint-plugin-actionable-elements --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-actionable-elements` globally.

## Usage

Add `actionable-elements` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "actionable-elements"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "actionable-elements/rule-name": 2
    }
}
```

## Installation

```
$ npm test
```


## Supported Rules

* Fill in provided rules here
