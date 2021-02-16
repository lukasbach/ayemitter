import React from 'react';
import { Meta } from '@storybook/react';
import { useCustomHook } from '.';

export default {
  title: 'useCustomHook',
} as Meta;

export const HookExample: React.FC = () => {
  const [state, increase, decrease] = useCustomHook();

  return (
    <div>
      <p>State is {state}.</p>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
};
