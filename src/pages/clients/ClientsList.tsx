export interface IClient {
  name: string
  email: string
  role: string
  image_url: string
}

interface ClientsListProps {
  people: IClient[]
  onClick: (person: IClient) => void
}

export function ClientsList({ people, onClick }: ClientsListProps) {
  return (
    <>
      <ul className='divide-y divide-gray-100'>
        {people.map((person) => (
          <li
            key={person.email}
            className='md:flex justify-between items-center gap-x-6 py-5 cursor-pointer hover:bg-gray-100'
            onClick={() => onClick(person)}>
            <div className='flex items-center gap-x-4'>
              <img
                className='h-12 w-12 flex-none rounded-full ml-4'
                src={person.image_url}
                alt={person.name}
              />
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
              <p className='text-sm leading-6 text-gray-900'>{person.role}</p>
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
