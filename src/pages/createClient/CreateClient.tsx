import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateClient() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        'https://rspsrfygtvevqgthkktz.supabase.co/rest/v1/clients',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: `${import.meta.env.VITE_API_KEY}`,
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({ name: name, email: email })
        }
      )

      if (!response.ok) throw new Error('Failed to create client')

      alert('Client successfully created!')
      navigate('/')
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setError(err.message || 'An error occurred')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      alert(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-md mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-md mt-8'>
      <h2 className='text-lg font-semibold mb-4'>Créer un client</h2>
      {error && <div className='mb-4 text-red-600'>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='fullname'
            className='block text-gray-700 text-sm font-bold mb-2'>
            fullname
          </label>
          <input
            type='text'
            id='fullname'
            name='fullName'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Nom complet'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='block text-gray-700 text-sm font-bold mb-2'>
            email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='email'
            required
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            disabled={loading}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>
            {loading ? 'En cours...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  )
}
