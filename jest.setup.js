/* eslint-disable @typescript-eslint/no-require-imports, react/display-name */
require('@testing-library/jest-dom')

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})