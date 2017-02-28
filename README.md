NeXML JavaScript libraries
--------------------------
The JavaScript libraries use the [badgerfish](http://badgerfish.ning.com/) mapping of (Ne)XML onto JSON. 
The [nexml.js](jsonlib/nexml.js) library wraps around such JSON objects and 
exposes them with getters (no setters, though you can poke around the JSON data structure anyway if 
you must update it). Example usage is shown in `jsonlib/nexml-js.html`

Library design
==============
The library is a single file but it uses JavaScript mix-ins quite extensively. If you were to draw an 
inheritance tree of these mix-ins and child classes it would mirror the classes in 
[the NeXML schema](https://github.com/nexml/nexml/tree/master/xsd).

The library is used by instantiating a document object, like so:

    var doc = new NeXML.Document(json);

Where `json` is a badgerfish mapping of a valid NeXML document, i.e. a JSON data structure. What then 
happens is that a cascade of constructors springs into action to decorate the appropriate parts of the 
JSON tree as JavaScript classes. For example, each `otu` structure in JSON becomes accessible as an 
instance of the `OTU` class in the library, with all the behaviours of that class, and its 
'superclasses', in this case `Base` and `Labeled` (which, transitively, may have 'superclasses' as 
well).

To understand how this is implemented in the library, the `var` statements for variables that start 
with capital letters such as `var Labeled` declare mix-ins/roles/something akin to superclasses in the 
form of Object declarations whose properties serve as method names and values as functions. JavaScript's
object model is a bit different (being charitably, here) so this is the way in which the library 
approximates the behaviour that programmers in more orthodox object-oriented languages might expect.

The Object properties and values (i.e. the methods) are attached to chield instances in their 
constructors by copying over the properties and values of superclasses using the `copyFields` function 
call. Because child instance might be data structures that holds different types (i.e. Array, Object 
or scalar) the function `normalizeList` is then called in order to invoke constructors for the data
held by the focal object correctly. 

Example data files
==================
- [nexml-trees.js](jsonlib/nexml-trees.js) - is the equivalent of the file
  [trees.xml](https://github.com/nexml/nexml/blob/master/examples/trees.xml) in the 'core' repository 
  of NeXML files. It demonstrates tree and network structures.
- [nexml-characters.js](jsonlib/nexml-characters.js) - is the equivalent of
  the file [characters.xml](https://github.com/nexml/nexml/blob/master/examples/characters.xml) in the 
  'core' repository of NeXML files. It demonstrates character state matrices.
  
Example browser demo
====================
- [nexml-js.html](jsonlib/nexml-js.html) - an HTML file that shows how data
  can be accessed and displayed in a browser.
- [json2.js](jsonlib/json2.js) - a 3rd party JavaScript file (public domain)
  that the demo uses to serialize JSON to text with `JSON.stringify`.
- [nexml2html.css](jsonlib/nexml2html.css) - a simple CSS stylesheet that
  the demo needed to make it super pretty.
  
There is also the file [nexml2html.js](jsonlib/nexml2html.js), which once
upon a time featured in a browser demo. It's not used now as such but it shows how to access metadata
annotations using CURIEs, which is a pretty useful feature.
