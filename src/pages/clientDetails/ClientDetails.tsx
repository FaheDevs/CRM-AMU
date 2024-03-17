import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

import {
  fetchClientById,
  fetchInvoicesByClientId
} from '../../api/clientDetails/api'
import { IClient } from '../clients/ClientsList'
import { ClientInvoices } from './clientInvoices/ClientInvoices'

export interface Invoice {
  amount: number
  status: 'Paid' | 'Pending' | 'Unpaid'
  issued_date: string
  due_date: string
}
interface IClientDetails {
  client: IClient
  invoices: Invoice[]
}
export function ClientDetails() {
  const { clientId } = useParams()
  const navigate = useNavigate()

  const {
    data: clientDetails,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => fetchClientById(clientId)
  })

  const {
    data: clientInvoices,
    isLoading: isLoadingInvoices,
    isError: isErrorInvoices,
    error: errorInvoices
  } = useQuery({
    queryKey: ['invoices', clientId],
    queryFn: () => fetchInvoicesByClientId(clientId)
  })

  if (isLoading) return <div>Loading...</div>
  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'An error occurred'}
      </div>
    )

  if (!clientDetails) return <div>No client found</div>

  return (
    <div className='max-w-4xl mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold'>
        Fiche de {clientDetails?.name} ({clientDetails?.email})
      </h2>
      <button
        className='mt-4 text-blue-600 hover:text-blue-800'
        onClick={() => navigate(-1)}>
        Retour aux clients
      </button>
      <div className='mt-6 w-full'>
        <ClientInvoices
          invoices={clientInvoices}
          errorInvoices={errorInvoices}
          isErrorInvoices={isErrorInvoices}
          isLoadingInvoices={isLoadingInvoices}
        />
        <button
          className='mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700'
          onClick={() => console.log('Créer une facture')}>
          Créer une facture
        </button>
      </div>
    </div>
  )
}
