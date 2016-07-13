# eslint-plugin-actionable-ids

Ensures id&#39;s are provided for actionable JSX elements

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-actionable-ids`:

```
$ npm install eslint-plugin-actionable-ids --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-actionable-ids` globally.

## Usage

Add `actionable-ids` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "actionable-ids"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "actionable-ids/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





