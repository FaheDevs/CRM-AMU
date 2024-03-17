import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'

import { fetchClients } from '../../api/clients/api'
import { ClientsList } from './ClientsList'

export function Clients() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['clients'],
    queryFn: () => fetchClients()
  })

  return (
    <>
      <div className='flex flex-col items-center mb-8 md:mb-4'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-4'>
          Liste des clients
        </h1>
        <Link to='/create'>
          <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded'>
            Créer un client
          </button>
        </Link>
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
          <ClientsList people={data || []} />
        )}
      </div>
    </>
  )
}
