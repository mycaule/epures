## Library Concepts
### Grammar
A grammar is:

* *a dictionary of symbols*: a key-value object matching keys (the names of symbols) to expansion rules
* optional metadata such as a title, edit data, and author
* optional connectivity graphs describing how symbols call each other

*clearState*: symbols and rulesets have state (the stack, and possible ruleset state recording recently called rules).  This function clears any state, returning the dictionary to its original state;

Grammars are usually created by feeding in a raw JSON grammar, which is then parsed into symbols and rules.  You can also build your own Grammar objects from scratch, without using this utility function, and can always edit the grammar after creating it.

### Symbol
A symbol is a **key** (usually a short human-readable string) and a set of expansion rules
* the key
* rulesetStack: the stack of expansion **rulesets** for this symbol.  This stack records the previous, inactive rulesets, and the current one.
* optional connectivity data, such as average depth and average expansion length

Putting a **key** in hashtags, in a Tracery syntax object, will create a expansion node for that symbol within the text.

Each top-level key-value pair in the raw JSON object creates a **symbol**.  The symbol's *key* is set from the key, and the *value* determines the **ruleset**.

### Modifier
A function that takes a string (and optionally parameters) and returns a string.  A set of these is included in mods-eng-basic.js.  Modifiers are applied, in order, after a tag is fully expanded.

To apply a modifier, add its name after a period, after the tag's main symbol:
	#animal.capitalize#
	#booktitle.capitalizeAll#
	Hundreds of #animal.s#

Modifiers can have parameters, too! (soon they will can have parameter that contain tags, which will be expanded when applying the modifier, but not yet)
	#story.replace(he,she).replace(him,her).replace(his,hers)#

### Action
An action that occurs when its node is expanded.  Built-in actions are
* Generating some rules "[key:#rule#]" and pushing them to the "key" symbol's rule stack.  If that symbol does not exist, it creates it.
* Popping rules off of a rule stack, "[key:POP]"
* Other functions

### Ruleset
A ruleset is an object that defines a *getRule* function.  Calling this function may change the internal state of the ruleset, such as annotating which rules were most recently returned, or drawing and removing a rule from a shuffled list of available rules.
