import React, { useState, useEffect } from 'react';

export default function useInput(props = {}) {
  const [value, setValue] = useState('');
  const input = (
    <input type="text" onChange={e => setValue(e.target.value)} value={value} {...props} />
  );

  return [value, input];
}
