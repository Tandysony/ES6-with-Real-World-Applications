# Transpiling ES6 to ES5

**Transpiling** means converting a _source code_ to a _target code_ at the **same level**. For example, converting a Java code to JavaScripts code is considered **transpiling**.

On the other hand, **compiling** means converting a _source code_ to a _target code_ at a lower level. For example, converting a C++ code to machine code is considered **compiling**.

## Transpiling ES6 to ES5

The most popular JavaScript transpiler is called [Babel](https://babeljs.io/).

### Uing Babel

Babel's original name was slightly more descriptive - 6to5. This was because, originally, Babel converted ES6 code to ES5 code. Now, Babel does a lot more. It'll convert ES6 to ES5, JSX to JavaScript, and Flow to JavaScript.

### Transpiling project in repo

The easies way to do this, is to use the [ES2015 preset](http://babeljs.io/docs/plugins/preset-es2015/). That is a collection of all the plugins we'll need to convert all of our ES6 code to ES5.

Add a `.babelrc` file to your repo, and put the preset into the file:

```js
{
    "presets": ["es2015"]
}
```

> **WARNING:** Babel uses both Node and NPM to distribute its plugins. So before you can install anything, make sure you have both of these tools installed.
