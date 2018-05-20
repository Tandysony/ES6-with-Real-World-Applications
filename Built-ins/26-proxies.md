# Proxies

The **Proxy** object is used to _define custom behavior for fundamental operations_ (e.g. property lookup, assignment, enumeration, function invocation, etc).

To create a proxy object, we use the Proxy constructor - `new Proxy();`. The proxy constructor takes two items:

* the object that it will be the proxy for. It is called the **target**.
* an object containing the list of methods it will handle for the proxied object. It is called the **handler**.

```js
let p = new Proxy(target, handler);
```

##A Pass Through Proxy

The simplest way to create a proxy is to provide an object and then an empty handler object.

```js
var richard = { status: "looking for work" };
var agent = new Proxy(richard, {});

agent.status; // returns 'looking for work'
```

> **Returns:** `"looking for work"`

The above doesn't actually do anything special with the proxy - it just passes the request directly to the source object! If we want the proxy object to actually intercept the request, that's what the handler object is for!

The key to making Proxies useful is **_the handler object that's passed as the second object to the Proxy constructor_**. The handler object is made up of a methods that will be used for property access. Let's look at the `get`:

## Get Trap

The `get` trap is used to "intercept" calls to properties:

```js
const richard = { status: "looking for work" };
const handler = {
  get(target, propName) {
    console.log(target); // the `richard` object, not `handler` and not `agent`
    console.log(propName); // the name of the property the proxy (`agent` in this case) is checking
  }
};

const agent = new Proxy(richard, handler);
agent.status; // logs out the richard object (not the agent object!) and the name of the property being accessed (`status`)
```

In the code above, the `handler` object has a `get` method (called a "**trap**" since it's being used in a Proxy). When the code `agent.status;` is run on the last line, because the `get` trap exists, it "**intercepts**" the call to get the `status` property and runs the `get` trap function. This will log out the target object of the proxy (the `richard` object) and then logs out the name of the property being requested (the `status` property). _And that's all it does!_ It doesn't actually log out the property! This is important - _if a trap is used, you need to make sure you provide all the functionality for that specific trap_.

## Accessing the Target object from inside the proxy

If we wanted to actually provide the real result, we would need to **_return_** the property on the target object:

```js
const richard = { status: "looking for work" };
const handler = {
  get(target, propName) {
    console.log(target);
    console.log(propName);
    return target[propName];
  }
};
const agent = new Proxy(richard, handler);
agent.status; // (1)logs the richard object, (2)logs the property being accessed, (3)returns the text in richard.status
```

Notice we added the return `target[propName]`; as the last line of the `get` trap. This will access the property on the target object and will return it.

## Having the proxy return info, directly

Alternatively, we could use the proxy to provide direct feedback:

```js
const richard = { status: "looking for work" };
const handler = {
  get(target, propName) {
    return `He's following many leads, so you should offer a contract as soon as possible!`;
  }
};
const agent = new Proxy(richard, handler);
agent.status; // returns the text `He's following many leads, so you should offer a contract as soon as possible!`
```

> `"He's following many leads, so you should offer a contract as soon as possible!"`

With this code, the Proxy doesn't even check the target object, it just directly responds to the calling code.

So the `get` trap will take over whenever any property on the proxy is accessed. If we want to intercept calls to _change_ properties, then the `set` trap needs to be used!

The `set` trap is used for intercepting code that will _change a property_. The set trap receives: the object it proxies the property that is being set the new value for the proxy

```js
const richard = { status: "looking for work" };
const handler = {
  set(target, propName, value) {
    if (propName === "payRate") {
      // if the pay is being set, take 15% as commission
      value = value * 0.85;
    }
    target[propName] = value;
  }
};
const agent = new Proxy(richard, handler);
agent.payRate = 1000; // set the actor's pay to $1,000
agent.payRate; // $850 the actor's actual pay
```

> `850`

In the code above, notice that the `set` trap checks to see if the `payRate` property is being set. If it is, then the proxy (the agent) takes 15 percent off the top for her own commission! Then, when the actor's pay is set to one thousand dollars, since the `payRate` property was used, the code took 15% off the top and set the actual `payRate` property to `850`;

## Other Traps

So we've looked at the `get` and `set` traps (which are probably the ones you'll use most often), but there are actually a total of [13 different traps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler) that can be used in a handler!

## Proxies vs. ES5 Getter/Setter

Initially, it can be a bit unclear as to why proxies are all that beneficial when there are already getter and setter methods provided in ES5. With ES5's getter and setter methods, you need to know _before hand_ the properties that are going to be get/set:

```js
var obj = {
  _age: 5,
  _height: 4,
  get age() {
    console.log(`getting the "age" property`);
    console.log(this._age);
  },
  get height() {
    console.log(`getting the "height" property`);
    console.log(this._height);
  }
};
```

With the code above, notice that we have to set `get age()` and `get height()` when initializing the object. So when we call the code below, we'll get the following results:

```js
obj.age; // logs 'getting the "age" property' & 5
obj.height; // logs 'getting the "height" property' & 4
```

> **Prints:**  
> `getting the "age" property`  
> `5`  
> `getting the "height" property`  
> `4`

But look what happens when we now **_add a new property_** to the object:

```js
obj.weight = 120; // set a new property on the object
obj.weight; // logs just 120
```

> **Prints:**  
> `120`

Notice that a `getting the "weight" property` message wasn't displayed like the `age` and `height` properties produced.

With ES6 **Proxies**, _we do not need to know the properties beforehand_:

```js
const proxyObj = new Proxy(
  { age: 5, height: 4 },
  {
    get(target, property) {
      console.log(`getting the ${property} property`);
      console.log(target[property]);
    }
  }
);

proxyObj.age; // logs 'getting the age property' & 5
proxyObj.height; // logs 'getting the height property' & 4
```

> **Prints:**  
> `getting the age property`  
> `5`  
> `getting the height property`  
> `4`

All well and good, just like the ES5 code, but look what happens when we add a new property:

```js
proxyObj.weight = 120; // set a new property on the object
proxyObj.weight; // logs 'getting the weight property' & 120
```

> **Prints:**  
> `getting the weight property`  
> `120`

See that?!? A `weight` property was added to the proxy object, and when it was later retrieved, **it displayed a log message**!

So some functionality of proxy objects may seem similar to existing ES5 getter/setter methods. But with proxies, you do not need to initialize the object with getters/setters for each property when the object is initialized.
