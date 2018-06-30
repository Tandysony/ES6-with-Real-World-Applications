# Declarative Programming vs Imperative Programming

**Declarative programming** abstracts the flow control process, and instead spend lines of code describing the data flow: **What to do**. The how gets abstracted away.

Declarative code relies more on expressions. An **expression** is a piece of code which evaluates to some value. Expressions are usually some combination of function calls, values, and operators which are evaluated to produce the resulting value.

**Imperative programming** describes the specific steps used to achieve the desired results — the flow control: **How to do things**.

Imperative code frequently utilizes statements. A **statement** is a piece of code which performs some action. Examples of commonly used statements include `for`, `if`, `switch`, `throw`, etc…

Let's look at the following example:

```js
/* --- imperative */
const doubleMap = numbers => {
  const doubled = [];
  for (let i = 0; i < numbers.length; i++) {
    doubled.push(numbers[i] * 2);
  }
  return doubled;
};
console.log(doubleMap([2, 3, 4])); // [4, 6, 8]

/* --- declarative */
const doubleMap = numbers => numbers.map(n => n * 2);
console.log(doubleMap([2, 3, 4])); // [4, 6, 8]
```

These two make DOM manipulation in completely different ways. Let's look at the imperative example first:

```js
/* --- imperative */
const container = document.getElementById(‘container’);
const btn = document.createElement(‘button’);
btn.className = ‘btn red’;
btn.onclick = function(event) {
 if (this.classList.contains(‘red’)) {
   this.classList.remove(‘red’);
   this.classList.add(‘blue’);
 } else {
   this.classList.remove(‘blue’);
   this.classList.add(‘red’);
 }
};
container.appendChild(btn);
```

And the declarative React example:

```js
/* --- declarative */
class Button extends React.Component{
  this.state = { color: 'red' }
  handleChange = () => {
    const color = this.state.color === 'red' ? 'blue' : 'red';
    this.setState({ color });
  }
  render() {
    return (<div>
      <button
         className=`btn ${this.state.color}`
         onClick={this.handleChange}>
      </button>
    </div>);
  }
}
```

The differences here may be subtle. We still have logic that says if red then blue, but there’s one huge difference. The React example never actually touches an element. it simply declares an element should be rendered given our current state. It does not actually manipulate the DOM itself.

When writing React or Vue, it’s often good not to think of how you want to accomplish a result, but instead what the component should look like in it’s new state. This sets us up for a good control flow where state goes through a series of predictable and replicable mutations.

## References

- [Imperative vs Declarative Programming](https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2/)
- [Imperative vs Declarative Programming](https://tylermcginnis.com/imperative-vs-declarative-programming/)
