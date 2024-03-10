import { cleanup, render } from '@testing-library/react'

import App from './App'

afterEach(cleanup)

it('App Component testing', () => {
  const { getAllByText } = render(<App />)
  expect(getAllByText('Welcome to React Boilerplate')).toBeTruthy()
})
