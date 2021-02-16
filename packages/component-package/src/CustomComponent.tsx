import * as React from 'react';

export interface CustomComponentProps {
  /** Title of the component */
  title: string;

  /** Current value */
  value: number;
}

export const CustomComponent: React.FC<CustomComponentProps> = props => {
  return (
    <div>
      <h1 data-testid="title">{props.title}</h1>
      <p>Value is {props.value}</p>
    </div>
  );
};
