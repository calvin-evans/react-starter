import React from 'react'
import { render } from '@testing-library/react'
import Button from '../../components/Button'

describe('<Button />', () => {
  const { getByTestId: $ } = render(<Button data-testid="button">testing</Button>)

  assert({
    given: 'some jsx',
    should: 'render markup',
    actual: $('button').textContent,
    expected: 'testing'
  })
})
