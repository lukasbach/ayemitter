import React from 'react';
import { Meta } from '@storybook/react';
import { CustomComponent, CustomComponentProps } from '.';

export default {
  title: 'CustomComponent',
  component: CustomComponent,
} as Meta;

const Template = (args: CustomComponentProps) => <CustomComponent {...args} />;

export const CustomComponentDefault = Template.bind({});
CustomComponentDefault.args = {
  title: 'Example title',
  value: 42,
} as CustomComponentProps;

export const CustomComponentWithNegativeValue = Template.bind({});
CustomComponentWithNegativeValue.args = {
  title: 'Example title',
  value: -42,
} as CustomComponentProps;

export const CustomComponentWithZeroValue = Template.bind({});
CustomComponentWithZeroValue.args = {
  title: 'Example title',
  value: 0,
} as CustomComponentProps;
