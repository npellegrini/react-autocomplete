1.	What is the difference between Component and PureComponent? give an
example where it might break my app.
2.	Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?
3.	Describe 3 ways to pass information from a component to its PARENT.
4.	Give 2 ways to prevent components from re-rendering.
5.	What is a fragment and why do we need it? Give an example where it might
break my app.
6.	Give 3 examples of the HOC pattern.
7.	what's the difference in handling exceptions in promises, callbacks and
async...await.
8.	How many arguments does setState take and why is it async.
9.	List the steps needed to migrate a Class to Function Component.
10.	List a few ways styles can be used with components.
11.	How to render an HTML string coming from the server.

---
1.	The difference between them is Component doesn’t apply shouldComponentUpdate() by default, while PureComponente does apply shouldComponentUpdate() by default. Component is going to re-render every time that the props or state has changed. With PureComponent we can avoid this re-render. We can use PureComponent if the component will stay static  or pure. On this way we increase our application performance.
The problem might come due to React does a shallow equality check for the PureComponent.
----
2.	Context is used to communicate with deeply contained components. Context works in a tree way in which we have a <Top /> level component, then <Midle/ >, then <SecondMidle/>, so on and so on,  and finally we have our <Buttom/> component. If in that Tree Herarchy we have a <Midle/> component that implements shouldComponentUpdate(), that <Midle/> components cuts the circuits of re-rendering including children. 
For example, a root component defines a theme, and any component in the component tree might be interested in this information. If we have some component in the middle that Implements shouldComponentUpdate(), that component is blocking the correct context propagation.
---
3.	You can pass information from your child component to its parents:
a.	Passing a callback function from parent to child
b.	Using context
c.	Using third party library as a single source of truth
---
4.	Using Reac.PureCompent or shouldComponentUpdate(), UseMemo(), React.memo()
---
5.	In React when we have to return a list of elements we must do it using a tag where wrap all of them. Using a Fragment we can do it in a generic way without using unnecessary HTML code and once is rendered none extra tag is rendered.
a.	A common example is when we have to render a table and we have an specific component to render a td. So we need to group all of them into an element to follow React specification. If we do that using a div tag we are going to break the application due to we are not returning a valid HTML code.
---
6.	HOC is a technique in React for reusing component logic. Some examples where we can use are:
a.	Login validation. When we need to validate if a component can be rendered if the login is active or not
b.	Toggling:
    -- i.	Showing/hiding
    -- ii.	Colapsing/expanding
    -- iii.	Highlight/unhighlight a message
c.	Infinite Scroll
d.	Product lists with search
---
7.	
-- a.	Promises has 3 differents states
-----i.	Pending
-----ii.	Fulfilled
-----iii.	Rejected
After the Promise has been resolved we may use .then() and whatever we have inside .then() we only be executed when the promise resolves. The same happens when occurs some exeption or the if the Promise has executed a rejection. To catch that state we should use .catch() and whatever we have inside it , it will be only executed once the Promise rejects or throw an exeption.
-- b.	Async/Await
Async keyword gives you a way to work with asynchronous promise-base code. And inside an async function you can use await keyword before a call a promise. Said that await makes the code wait until the promise has been resolved or reject. In that case to handle the exception we need write ours lines of code inside a try…catch block.
-- c.	Callback
----i.	In Javascript there is a common pattern used to handle error and it’s called error-first callback, where in the callback function that we are providing the first argument usually is the error and when we don’t have any error the first argument will be null

---
8.	setState can accept two arguments, the first is to modify or process the currently state and the second one is a callback that it will be executed once the state’s been changed. The reason under the hood is setState modify the state and causes a reconciliation. Making it synchronous might leave the browser unresponsive. In other words, setState works in that way to gain performance and UI experience.
---
9.	The steps to convert a React Class to a Function Component
a.	Change the class ketword to function and remove the extends React.Component
b.	Remove the constructor
c.	Remove the render() method and use return instead
d.	Convert all methods on the class to functions
e.	Remove this.state throughout the component and use object destructuring to get props or takes directly from argument
f.	Get rid of any use of this.
g.	Remove event handler bindings
h.	Set initial state with useState() and replace all this.setState() for the new setState function provide by useState()
i.	Replace componentDidUpdate, componentWilUnmount and componentDiMount with useEffect
---
10.	Ways components can be styled
a.	Styled-Components
b.	Using  regular Css with css stylesheets
c.	Inline Css
d.	Css in Javascript
e.	CSS Modules
f.	Sass or Less
---
11.	We should use some 3rd party library to avoid XSS one of them could be react-html-parser or using Regex expressions to process all tag need it and then re-mark them up or dangerouslySetInnerHTML that is a React’s replacement for using innerHTML.