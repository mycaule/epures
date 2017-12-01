# epures

A story grammar generation library written in *Modern JS*. This library is a rewrite of the client-side library [tracery](https://github.com/galaxykate/tracery).

[![NPM](https://nodei.co/npm/epures.png)](https://nodei.co/npm/epures/)

Please note that work is still in progress.

## History

This is a 2018 update of Kate and George work on the [tracery](https://github.com/v21/tracery) grammar generation library published two years ago. Since then it is unmaintained, but new opportunities in the chatbot area make it interesting again.

Furthermore *Modern JS* techniques can now simplify the code.

I use [Node.js v6.11.5](https://cloud.google.com/functions/docs/writing) to support common [Actions on Google](https://developers.google.com/actions/) usecases with [Dialogflow](https://dialogflow.com).

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

## References

* [Kate Compton - Tracery tutorial](http://www.crystalcodepalace.com/traceryTut.html), check also the [original source code](https://github.com/galaxykate/tracery/tree/tracery2/js/tracery)
* [Nicole He - Voice Technology is an Opportunity to Make Weird Stuff](https://medium.com/@nicolehe/voice-technology-is-an-opportunity-to-make-weird-stuff-d4296ce7448a)
* [Chris Umbel - Natural library](https://github.com/NaturalNode/natural)
* [Steve Worswick - Mitsuku chatbot](http://www.mitsuku.com)
