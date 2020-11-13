import * as React from 'react'
import '../styles/global.scss'

import Button from '../components/Button'

export default {
  argTypes: {
    disabled: { type: 'boolean' },
    error: { type: 'boolean' },
    inline: { type: 'boolean' },
    loading: { type: 'boolean' },
    secondary: { type: 'boolean' },
    size: { control: { options: ['', 'small', 'large'], type: 'select' }, defaultValue: '' },
    success: { type: 'boolean' }
  },
  component: Button,
  title: 'Components/Button'
}

const Template = (arguments_) => <Button {...arguments_} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Primary'
}

export const Small = Template.bind({})
Small.args = {
  children: 'Small',
  size: 'small'
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Secondary',
  secondary: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Disabled',
  disabled: true
}

export const Loading = Template.bind({})
Loading.args = {
  children: 'Please wait',
  loading: true
}
