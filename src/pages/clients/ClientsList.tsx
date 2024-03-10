export interface IClient {
  name: string
  email: string
  role: string
  imageUrl: string
}

interface ClientsListProps {
  people: IClient[]
  onClick: (person: IClient) => void // Function to be called when an item is clicked
}

export function ClientsList({ people, onClick }: ClientsListProps) {
  return (
    <ul role='list' className='divide-y divide-gray-100'>
      {people.map((person) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        <li
          key={person.email}
          className='flex justify-between items-center gap-x-6 py-5 cursor-pointer hover:bg-gray-50'
          onClick={() => onClick(person)}>
          <div className='flex items-center gap-x-4'>
            <img
              className='h-12 w-12 flex-none rounded-full'
              src={person.imageUrl}
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
          <div className='flex items-center'>
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
  )
}
