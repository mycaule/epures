# epures
Epures: a Modern JS story-grammar generation library

## Interesting reading

* [Kate Compton](http://www.crystalcodepalace.com/traceryTut.html)
* [Source code from the tracery2 branch](https://github.com/galaxykate/tracery/tree/tracery2/js/tracery)
* [Nicole He - Voice Technology is an Opportunity to Make Weird Stuff](https://medium.com/@nicolehe/voice-technology-is-an-opportunity-to-make-weird-stuff-d4296ce7448a)
* [NaturalNode - natural](https://github.com/NaturalNode/natural)
* [Steve Worswick - Mitsuku chatbot](http://www.mitsuku.com)

## History

This is a 2018 update of Kate and George work on a [grammar generation library](https://github.com/v21/tracery) published two years ago. Since then it is unmaintained, but new opportunities in the chatbot area make it interesting again.

Furthermore ModernJS techniques can now simplify the code.

I use [Node.js v6.11.5](https://cloud.google.com/functions/docs/writing) to support common [Actions on Google](https://developers.google.com/actions/) usecases with [Dialogflow](https://dialogflow.com).

#### Roadmap

- [ ] Merge existing unit tests ([test1](https://github.com/galaxykate/tracery/blob/tracery2/js/test.js) [test2](https://github.com/galaxykate/tracery/blob/tracery2/js/test2.js))
- [ ] Add Unit tests (use [xo](https://github.com/sindresorhus/xo), [ava](https://github.com/avajs/ava) packages and [Modern JS](https://github.com/mbeaudru/modern-js-cheatsheet))
- [ ] Add support for more languages (notably French, German and Spanish)
- [ ] Add support for command line usage
- [ ] Add support for [Dialogflow](https://dialogflow.com) import formats

## Installation

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

grammar.addModifiers(tracery.baseEngModifiers)

console.log(grammar.flatten('#origin#'))

// I am a happy iguana.
// I am an angry fox.
// I am a sad capybara.
```
