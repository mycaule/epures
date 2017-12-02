<h1 align="center">
	<img width="400" src="https://www.staedtler.fr/fr/mandala-creator/assets/elements/jess_meleragni_7.svg" alt="Epures">
</h1>

> Story grammar generation

A story grammar generation library written in ES6. This library is a rewrite of the client-side library [tracery](https://github.com/galaxykate/tracery).

[![NPM](https://nodei.co/npm/epures.png)](https://nodei.co/npm/epures/)

The library name comes from the french word *épures*, which is a pun on the word *tracery*.

## History

This is a 2018 update of Kate and George work on the [tracery](https://github.com/v21/tracery) grammar generation library published two years ago. Since then it is unmaintained, but new opportunities in the chatbot area make it interesting for server side usage.

This library is build using Node.js 6 Boron :
* this LTS version will be active until April 2018, see [LTS Schedule](https://github.com/nodejs/Release#release-schedule),
* it will also allow you to use it with [Cloud Functions](https://cloud.google.com/functions/docs/writing) for popular usecases with [Actions on Google](https://developers.google.com/actions/) and [Dialogflow](https://dialogflow.com).

## Roadmap

- [x] Fix the build (use [xo](https://github.com/sindresorhus/xo), [ava](https://github.com/avajs/ava) packages and [Modern JS](https://github.com/mbeaudru/modern-js-cheatsheet))
- [ ] Merge existing unit tests ([test1](https://github.com/galaxykate/tracery/blob/tracery2/js/test.js), [test2](https://github.com/galaxykate/tracery/blob/tracery2/js/test2.js))
- [ ] [Webpack](https://webpack.js.org) support for client-side code.
- [ ] Add support for more languages (notably French, German and Spanish)
- [ ] Add support for [command line usage](https://github.com/mattallty/Caporal.js)
- [ ] Add support for [Dialogflow](https://dialogflow.com) import formats

## Setup

```bash
$ npm install epures --save
```

##  Usage

See [the samples folder](/samples) for more code samples.

```
$ node samples/quickstart.js
```
```javascript
var epures = require('epures')

var grammar = epures.createGrammar({
  'animal': ['panda','fox','capybara','iguana'],
  'emotion': ['sad','happy','angry','jealous'],
  'origin':['I am #emotion.a# #animal#.'],
})

grammar.addModifiers(epures.baseEngModifiers)

console.log(grammar.flatten('#origin#'))

// I am a happy iguana.
// I am an angry fox.
// I am a sad capybara.
```

### Contributions

[Changes and improvements](https://github.com/mycaule/epures/wiki) are more than welcome! Feel free to fork and open a pull request. Please make your changes in a specific branch and request to pull into `master`!

#### Running the tests

```
npm test
```

#### Publishing
```
npm version [patch, minor, major]
npm publish
```

#### License
`epures` is licensed under the [Apache 2.0 License.](https://github.com/mycaule/epures/blob/master/LICENSE)

## References

* [Kate Compton - Tracery tutorial](http://www.crystalcodepalace.com/traceryTut.html), check also the [original source code](https://github.com/galaxykate/tracery/tree/tracery2/js/tracery)
* [Nicole He - Voice Technology is an Opportunity to Make Weird Stuff](https://medium.com/@nicolehe/voice-technology-is-an-opportunity-to-make-weird-stuff-d4296ce7448a)
* [Chris Umbel - Natural library](https://github.com/NaturalNode/natural)
* [Steve Worswick - Mitsuku chatbot](http://www.mitsuku.com)
