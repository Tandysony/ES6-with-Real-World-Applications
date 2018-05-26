# Prototype Chains

Javascript has an interesting inheritance model, which happens to be completely different from most OOP languages. While it is object-oriented, _an object doesn't have a type or a class_ that it gets its methods from, **_it has a prototype_**. It is important to understand the differences between these two, as they are not equivalent, and lead to much confusion down the line. As learnt before, the keyword `class` introduced in ES6 is **syntactical sugar**, JavaScript remains **prototype-based**.

**Prototype Chains** are mechanisms for making objects the resemble other objects. This makes one object behaves as if it has all the properties of the other object, by _delegating the fields lookups from the first object to the other object_.

Nearly all objects in JavaScript are instances of `Object` which sits on the top of a _prototype chain_.
