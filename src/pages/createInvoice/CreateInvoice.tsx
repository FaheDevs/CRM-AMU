import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function CreateInvoice() {
  const { clientId } = useParams()
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('Envoyée')
  const navigate = useNavigate()

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    try {
      const issuedDate = new Date()
      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + 30)
      const response = await fetch(
        'https://rspsrfygtvevqgthkktz.supabase.co/rest/v1/invoices',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: `${import.meta.env.VITE_API_KEY}`,
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({
            client_id: clientId,
            amount: amount,
            status: status,
            issued_date: issuedDate.toISOString().split('T')[0], // Format as "YYYY-MM-DD"
            due_date: dueDate.toISOString().split('T')[0] // Format as "YYYY-MM-DD"
          })
        }
      )

      if (!response.ok) throw new Error('Failed to create invoice')
      navigate(`/${clientId}`)
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      alert(`Error: ${err.message}`)
    }
  }

  return (
    <div className='max-w-md mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-md mt-8'>
      <h2 className='text-lg font-semibold mb-4'>Créer une facture</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <input
            type='number'
            name='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Montant de la facture'
            required
          />
        </div>
        <div className='mb-6'>
          <select
            name='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            required>
            <option value='PAID'>Envoyée</option>
            <option value='SENT'>Payée</option>
            {/* Add more options based on your needs */}
          </select>
        </div>
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>
            Enregistrer la facture
          </button>
        </div>
      </form>
    </div>
  )
}
