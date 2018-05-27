# Object Decorator Pattern

In OOP, the **decorator pattern** (also known as **Wrapper**, an alternative naming shared with the **Adapter** pattern) is _a design pattern that allows behavior to be added to an individual object, either statically or dynamically, without affecting the behavior of other objects from the same class_. ([source](https://en.wikipedia.org/wiki/Decorator_pattern))

In python (I personally know), a decorator is **a function** that _takes another function_ and _extends the behavior_ of the latter function without explicitly modifying it.

Put simply, **_decorators wrap a function, modifying its behavior_**. A decorator in python

```python
// python
def viking_chorus(myfunc):
    def inner_func(*args, **kwargs):
        for i in range(8):
            myfunc(*args, **kwargs)
    return inner_func

@viking_chorus  # <-- decorator
def menu_item():
    print("spam")
```

The above code translates to:

```python
# python
def menu_item():
    print("spam")
menu_item = viking_chorus(menu_item)
```

As can be seen, the decorator is basically just a cool kid’s way of calling higher-order functions, which is _beyond_ easy in JavaScript.

JavaScript is setting its sights on something else — **classes** and **properties**.
