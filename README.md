<p align="center">
	<img width="250" src="https://www.staedtler.fr/fr/mandala-creator/assets/elements/jess_meleragni_7.svg" alt="Epures">
</p>
<p align="center">
  Story grammar generation
</p>

<p align="center">
  <a href="http://travis-ci.org/mycaule/epures"><img src="https://api.travis-ci.org/mycaule/epures.svg?branch=master" alt="Build Status"></a>
  <a href="https://david-dm.org/mycaule/epures"><img src="https://david-dm.org/mycaule/epures/status.svg" alt="dependencies Status"></a>
  <a href="https://david-dm.org/mycaule/epures?type=dev"><img src="https://david-dm.org/mycaule/epures/dev-status.svg" alt="devDependencies Status"></a>
	<br>
	<a href="https://www.npmjs.com/package/epures"><img src="https://img.shields.io/npm/v/epures.svg" alt="npm package"></a>
	<a href="https://www.npmjs.com/package/epures"><img src="https://img.shields.io/npm/dw/epures.svg" alt="npm package"></a>
	<a href="https://www.npmjs.com/package/epures"><img src="https://img.shields.io/npm/l/epures.svg" alt="npm package"></a>
  <br>
  <br>
</p>

A story grammar generation library written in ES6. This is a repackaging of the client-side library [tracery](https://github.com/galaxykate/tracery).

My goal is to provide more tests and structure to the project to make it scalable, and to [document interesting usecases](https://github.com/mycaule/epures/wiki) properly.
I would also like it to be able to support more languages such as French, Spanish and German.

## History

This is a 2018 update of Kate and George work on the [tracery](https://github.com/v21/tracery) grammar generation library published two years ago. Since then it is unmaintained, but new opportunities in the chatbot area make it interesting for server side usage.

This library must be used with *Node.js 6 Boron*, or above:
* this LTS version will be active until April 2018, see [LTS Schedule](https://github.com/nodejs/Release#release-schedule),
* if you stick to that version, it will also allow you to use it with [Cloud Functions](https://cloud.google.com/functions/docs/writing) for popular usecases with [Actions on Google](https://developers.google.com/actions/) and [Dialogflow](https://dialogflow.com).

## Setup

```bash
$ npm install epures --save
```

##  Usage

See [the samples folder](/samples) for more usecases.

### Running with Node.js

#### Basic example
```bash
$ node samples/quickstart.js
```
```javascript
var epures = require('epures')

var grammar = epures.createGrammar({
  'animal': ['panda','fox','capybara','iguana'],
  'emotion': ['sad','happy','angry','jealous'],
  'origin':['I am #emotion.a# #animal#.'],
})

grammar.addModifiers(epures.modifiers.en_US)

console.log(grammar.flatten('#origin#'))

// I am an angry fox.
```

#### Custom modifier

A modifier in a JavaScript object with functions of map a string to a new string.

The base collection of modifiers supports common transformations on strings from the library [VocaJS](https://vocajs.com) and is available for `en_US` and `fr_FR` localizations. Feel free to add more supported language to contribute to the library!

You can reuse existing modifiers using `epures.modifiers` or define your own like in this example.

```bash
$ node samples/custom-modifier.js
```
```javascript
const epures = require('../index')

const grammar = epures.createGrammar({
  animal: ['panda', 'fox', 'capybara', 'iguana'],
  emotion: ['sad', 'happy', 'angry', 'jealous'],
  origin: ['The #animal# is #emotion.passwordify#.']
})

const myModifier = {
  passwordify: s => new Array(s.length + 1).join('*')
}

grammar.addModifiers(myModifier)

console.log(grammar.flatten('#origin#'))

// The iguana is *****.
```

#### More usecases

More usecases can be found in the [unit tests](index.test.js). You will also find more detailed information in the [documentation](https://github.com/mycaule/epures/wiki).

### Running with the browser

[A bundle library](/dist/epures.webpack.js) can be generated using [Webpack](https://webpack.js.org).

```bash
npm run build
```
```bash
$ open /samples/quickstart.html
```

```html
<script src="../dist/epures.webpack.js"></script>

<script>
  let grammar = epures.createGrammar({
    animal: ['panda', 'fox', 'capybara', 'iguana'],
    emotion: ['sad', 'happy', 'angry', 'jealous'],
    origin: ['I am #emotion.a# #animal#.']
  })

  grammar.addModifiers(epures.modifiers.en_US)

  console.log(grammar.flatten('#origin#'))
</script>
```

## Contributions

[Changes and improvements](https://github.com/mycaule/epures/wiki) are welcome! Feel free to fork and open a pull request into `master`.

### Roadmap

- [x] Fix the build (use [xo](https://github.com/sindresorhus/xo), [ava](https://github.com/avajs/ava) packages and [Modern JS](https://github.com/mbeaudru/modern-js-cheatsheet))
- [x] [Webpack](https://webpack.js.org) support for client-side code.
- [x] Merge existing unit tests ([test1](https://github.com/galaxykate/tracery/blob/tracery2/js/test.js), [test2](https://github.com/galaxykate/tracery/blob/tracery2/js/test2.js))
- [x] Better documentation using [/samples](/samples)
- [x] Add support for more languages (notably French, German and Spanish). See [faker.js](https://github.com/Marak/faker.js/tree/master/lib/locales) for file structure and samples.
- [ ] Add tests for the [/utils](/utils) classes
- [ ] Add support for [command line usage](https://github.com/mattallty/Caporal.js)
- [ ] Add support for [Dialogflow](https://dialogflow.com) import formats

### Bugs

- [ ] Check why `UglifyJsPlugin` breaks the library
- [ ] Check why 'Maximum call stack size exceeded' in the *Create a grammar that can itself create valid grammars* unit test. Appears randomly. Restarting Travis job solves the problem.

### Running the tests

You can lint the code and run all unit tests using that script.
```bash
npm test
```

To run only one file, I would suggest you using `ava` command. For example, if you work on the English modifier only `modifiers/en_US/base.js`, the good practice is to run the corresponding test continuously.

```bash
ava modifiers/en_US/base.test.js --watch
```

### Publishing
```
npm version [patch, minor, major]
npm publish
```

### License
`epures` is licensed under the [Apache 2.0 License](https://github.com/mycaule/epures/blob/master/LICENSE).

## References

* [Kate Compton - Tracery tutorial](http://www.crystalcodepalace.com/traceryTut.html), check also the [original source code](https://github.com/galaxykate/tracery/tree/tracery2/js/tracery)
* [Nicole He - Voice Technology is an Opportunity to Make Weird Stuff](https://medium.com/@nicolehe/voice-technology-is-an-opportunity-to-make-weird-stuff-d4296ce7448a)
* [Chris Umbel - Natural library](https://github.com/NaturalNode/natural)
* [Steve Worswick - Mitsuku chatbot](http://www.mitsuku.com)
