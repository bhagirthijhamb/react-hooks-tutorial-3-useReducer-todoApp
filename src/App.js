import React, { useReducer, useState } from 'react';
import './App.css';

// useReducer hook is for storing state ans is an alternative to the useState hooks.
// how useReducer works - you pass in two parameters - reducer(a function) and initial state (or you can pass a function that return the initial state as well).

// we are currying this function outside of the component, because this function is pure (on purpose)
// reducer takes current state and an action
// state is what ever the current value is inthte state.
// action is a function that gets called and the value is gonna be stored here
const reducer = (state, action) => {
  switch(action.type){
    // case 'increment':
    //   return state + 1;
    // case 'decrement':
    //   return state - 1;
    case 'add-todo':
      return {
        todos: [...state.todos, {text: action.text, completed: false}],
        todoCount: state.todoCount + 1
      };
    case 'toggle-todo':
      return {
        todos: state.todos.map((t, idx) => idx === action.idx ? {...t, completed: !t.completed} : t),
        todoCount: state.todoCount
      }
    default: 
      return state;
  }
}

function App() {
  // state is called count here and action is called dispatch here
  // const [count, dispatch] = useReducer(reducer, 0) // call useReducer
  // const [count, dispatch] = useReducer(reducer, () => 0) // call useReducer

  // const [state, dispatch] = useReducer(reducer, { todos: []}) 
  // destructure state like this
  const [{ todos, todoCount }, dispatch] = useReducer(reducer, { todos: [], todoCount: 0}) // or [state.todos, dispatch]
  // we can mix hooks the way we want. Even though we have useReducer here we can use useState to store the value of input field
  const [text, setText] = useState();

  return (
    <div>
      {/* <div>Count: {count}</div> */}
      {/* what ever we pass to dispatch here is the action (second parameter or reducer) */}
      {/* <button onClick={() => dispatch({ type: 'increment' })}>Increment</button> */}
      {/* <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button> */}

      <form onSubmit={e => {
            e.preventDefault();
            dispatch({ type: 'add-todo', text })
            setText('');
      }}>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
      </form>

      <pre>
        {JSON.stringify(todos, null, 2)}
      </pre>

      <div>Number of todos: {todoCount}</div>
      {todos.map((t, idx) => (
          <div 
            key={t.text} 
            onClick={() => dispatch({type: 'toggle-todo', idx})} 
            style={{textDecoration: t.completed ? 'line-through' : ''}}
          >
            {t.text}
          </div>))}
    </div>
  );
}

export default App;

// The gist of useReducer
// to useReducer you pass iniitial state and reducer
// you have initial state of some sort ({ todos: []})
// reducer - function that is gonna handle different actions throughout your application
// and you are gonna call dispatch to trigger those actions
// You are gonna pass any data yuo may have, also pass the type
// and reducer is gonna handle updating the state.
// So all your logic of updating the state goes in reducer

// Why do people like using useReducer over useState? What is nice about it
// For More complex state its nice to be able to change multiple things in the state based on actions
// As we have more complex state,  a single action might map to multiple things inthe state changing. So its very simple to put the logic in the state like this
