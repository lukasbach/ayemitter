import React from 'react';
import { CustomComponent } from './CustomComponent';
import { render, RenderResult } from '@testing-library/react';
import { screen } from '@testing-library/dom';

test('Custom component properly sets title', () => {
  const comp = render(<CustomComponent title="Title" value={42} />);
  const titleTag = screen.getByTestId('title');
  expect(titleTag.innerHTML).toBe('Title');
});
