import React from 'react';

// Corrected prop destructuring: use 'props' directly, not 'this.props'
const Input = ({ className = "", ...props }) => {
  return (
    <input
      type='text'
      // Apply the passed className and spread the rest of the props
      className={className}
      {...props}
    />
  );
};

export default Input;
