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
      <div className='fixed top-0 left-0 w-full bg-[#67e8f9] bg-opacity-60 z-10 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4 md:justify-start md:space-x-10'>
            <h1
              className='text-2xl lg:text-3xl font-bold'
              style={{ color: '#155e75' }}>
              Liste des clients
            </h1>
            <Link to='/create'>
              <button className='bg-[#075985] hover:bg-[#0c96d6] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out'>
                Créer un client
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className='pt-20'>
        <div
          className='bg-white rounded-lg shadow-xl overflow-hidden my-4 md:my-8 mx-2 md:mx-8 p-4 md:p-8'
          style={{ borderColor: '#dbeafe' }}>
          {isLoading ? (
            <div className='text-center font-medium text-lg'>
              Loading clients...
            </div>
          ) : isError ? (
            <div className='text-red-500 text-center font-medium text-lg'>
              Error:{' '}
              {error instanceof Error ? error.message : 'An error occurred'}
            </div>
          ) : (
            <ClientsList people={data || []} />
          )}
        </div>
      </div>
    </>
  )
}
