import { useNavigate } from 'react-router-dom'

export interface IClient {
  id: number
  name: string
  email: string
  role: string
}

interface ClientsListProps {
  people: IClient[]
}

export function ClientsList({ people }: ClientsListProps) {
  const navigate = useNavigate()
  return (
    <>
      <ul className='divide-y divide-gray-100'>
        {people.map((person) => (
          <li
            key={person.id}
            className='md:flex justify-between items-center gap-x-6 py-5 cursor-pointer hover:bg-gray-100'
            onClick={() => {
              navigate(`/${person.id}`)
            }}>
            <div className='flex items-center gap-x-4'>
              <div className='flex flex-col min-w-0 flex-auto'>
                <p className='text-sm font-semibold leading-6 text-gray-900'>
                  {person.name}
                </p>
                <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                  {person.email}
                </p>
              </div>
            </div>
            <div className='flex items-center mt-4 md:mt-0'>
              <svg
                className='ml-4 h-5 w-5 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
