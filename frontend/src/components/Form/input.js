import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <div>
      {error && <span className="error">{error}</span>}
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        className={error ? 'haserror' : ''}
        {...rest}
      />
    </div>
  );
}
