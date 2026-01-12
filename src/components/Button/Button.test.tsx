import React from 'react'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import Button from './Button'

test('renders button with children text', () => {
  render(<Button>Click Me</Button>)
  const buttonElement = screen.getByRole('button', { name: /Click Me/i })
  expect(buttonElement).toBeInTheDocument()
})

test('handles click event', async () => {
  const handleClick = jest.fn()
  const user = userEvent.setup()
  
  render(<Button onClick={handleClick}>Click Me</Button>)
  const buttonElement = screen.getByRole('button', { name: /Click Me/i })
  
  await user.click(buttonElement)
  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('renders as link when href is provided', () => {
  render(<Button href="/test">Link Button</Button>)
  const linkElement = screen.getByRole('link', { name: /Link Button/i })
  expect(linkElement).toBeInTheDocument()
  expect(linkElement).toHaveAttribute('href', '/test')
})

test('applies variant classes correctly', () => {
  render(<Button variant="reverse">Reverse Button</Button>)
  const buttonElement = screen.getByRole('button', { name: /Reverse Button/i })
  expect(buttonElement).toHaveClass('reverse')
})

test('applies compact prop', () => {
  render(<Button compact>Compact Button</Button>)
  const buttonElement = screen.getByRole('button', { name: /Compact Button/i })
  expect(buttonElement).toHaveClass('compact')
})




