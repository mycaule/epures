# epures
Epures: a Modern JS story-grammar generation library

## Reading

* [Galaxy Kate](http://www.crystalcodepalace.com/traceryTut.html)
* [Source code from the tracery2 branch](https://github.com/galaxykate/tracery/tree/tracery2/js/tracery)
* [Nicole He - Voice Technology is an Opportunity to Make Weird Stuff](https://medium.com/@nicolehe/voice-technology-is-an-opportunity-to-make-weird-stuff-d4296ce7448a)
* [NaturalNode - natural](https://github.com/NaturalNode/natural)

## History

This is a 2018 update of Kate and George work on a [grammar generation library](https://github.com/v21/tracery) published two years ago. Since then it is unmaintained, but new opportunities in the chatbot area make it interesting again.

Furthermore [Modern JS](https://github.com/mbeaudru/modern-js-cheatsheet) capabilities can now simplify the code.

#### Roadmap

- [ ] Add Unit tests (Use [xo](https://github.com/sindresorhus/xo) and [ava](https://github.com/avajs/ava) packages)
- [ ] Add support Misses unit tests and support for more languages (notably French)
- [ ] Add support for command line Usage
- [ ] Add support for [Dialogflowhttps://dialogflow.com import formats

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
