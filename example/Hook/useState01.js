import React, { useState } from 'react';

export default function Button() {
  const [text, setText] = useState('click me')

  function handleClick() {
    setText('clicked')
  }

  return (
    <button onClick={handleClick}>{text}</button>
  )
}