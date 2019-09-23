import React, { useState, useEffect } from 'react';

const Test2 = () => {
  useEffect(() => {
    console.log('unmounted');
  })
  return (
    <p>Show Me</p>
  )
}

const Test = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    document.title = `Current count: ${count}`;
    console.log(text);
  }, [text]);

  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)}/>
      <button onClick={() => setCount(count+1)}>Click me</button>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <h1>{count}</h1>
      {toggle && <Test2/>}
    </div>
  )
}

export default Test;