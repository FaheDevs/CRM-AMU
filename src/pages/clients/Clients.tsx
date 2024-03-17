import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

import { fetchClients } from '../../api/clients/api'
import { ClientsList, IClient } from './ClientsList'

export function Clients() {
  const [page, setPage] = useState(0)
  const limit = 10

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['clients', page],
    queryFn: () => fetchClients(page, limit)
  })

  const handlePersonClick = (person: IClient) => {
    console.log(`You clicked on ${person.name}`)
  }

  const handleCreateClient = () => {
    console.log('Creating new client')
  }

  // Calculating total number of pages
  const totalPages = data ? Math.ceil(data.total / limit) : 0

  return (
    <>
      <div className='flex flex-col items-center mb-8 md:mb-4'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-4'>
          Liste des clients
        </h1>
        <button
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded'
          onClick={handleCreateClient}>
          Créer un client
        </button>
      </div>
      <div className='bg-gray-200 rounded-lg shadow-md overflow-hidden my-4 md:my-8 mx-2 md:mx-8 p-4 md:p-6'>
        {isLoading ? (
          <div>Loading clients...</div>
        ) : isError ? (
          <div>
            Error:{' '}
            {error instanceof Error ? error.message : 'An error occurred'}
          </div>
        ) : (
          <ClientsList people={data?.data || []} onClick={handlePersonClick} />
        )}
        <div className='mt-6 flex justify-between items-center'>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
            className='bg-blue-500 text-white disabled:opacity-50 px-4 py-2 rounded hover:bg-blue-700 transition-colors'>
            Previous
          </button>
          <div className='flex'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                className={`mx-1 px-4 py-2 ${
                  page === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500'
                } rounded hover:bg-blue-500 hover:text-white transition-colors`}>
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              if (!data?.total || data.total > (page + 1) * limit) {
                setPage((old) => old + 1)
              }
            }}
            disabled={page >= totalPages - 1}
            className='bg-blue-500 text-white disabled:opacity-50 px-4 py-2 rounded hover:bg-blue-700 transition-colors'>
            Next
          </button>
        </div>
      </div>
    </>
  )
}
