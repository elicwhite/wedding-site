import React, { useState, useRef } from 'react';

export default function useInput(props = {}) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const input = (
    <input
      type="text"
      ref={inputRef}
      onChange={e => setValue(e.target.value)}
      value={value}
      {...props}
    />
  );

  return [value, input, inputRef];
}
