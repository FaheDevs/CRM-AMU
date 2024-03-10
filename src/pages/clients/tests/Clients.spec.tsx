import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { ClientsList } from '../ClientsList'

describe('ClientsList', () => {
  const mockOnClick = jest.fn()
  const mockPeople = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Software Engineer',
      imageUrl: 'https://example.com/john.jpg'
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Project Manager',
      imageUrl: 'https://example.com/jane.jpg'
    }
  ]

  beforeEach(() => {
    render(<ClientsList people={mockPeople} onClick={mockOnClick} />)
  })

  it('renders the list of people', () => {
    const listItemElements = screen.getAllByRole('listitem')
    expect(listItemElements).toHaveLength(mockPeople.length)
    expect(screen.getByText(mockPeople[0].name)).toBeInTheDocument()
    expect(screen.getByText(mockPeople[1].name)).toBeInTheDocument()
  })

  it('calls onClick prop when a list item is clicked', () => {
    const firstListItem = screen
      .getByText(mockPeople[0].name)
      .closest('li') as HTMLElement
    fireEvent.click(firstListItem)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith(mockPeople[0])
  })
})
