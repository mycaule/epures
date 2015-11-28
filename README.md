# tracery
Tracery: a story-grammar generation library for javascript

This is my attempt to package up [Tracery](https://github.com/galaxykate/tracery/) as a Node library.

## Installation

This is not hosted on [npmjs.org](http://npmjs.org) but you can install any node module directly from a Github repository using npm on the command line:

```bash
$ npm install v21/tracery --save
```

## Example usage

```javascript
var tracery = require('tracery-grammar');

var grammar = tracery.createGrammar({
  'animal': ['panda','fox','capybara','iguana'],
  'emotion': ['sad','happy','angry','jealous'],
  'origin':['I am #emotion.a# #animal#.'],
});

console.log(grammar.flatten('#origin#'));
```

Sample output:

```plaintext
I am a happy iguana.
I am an angry fox.
I am a sad capybara.
```
