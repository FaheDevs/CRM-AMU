// api.ts

import { Invoice } from '../../pages/clientDetails/ClientDetails'
import { IClient } from '../../pages/clients/ClientsList'

export const fetchClientById = async (
  clientId: string | undefined
): Promise<IClient> => {
  if (!clientId) {
    throw new Error('Client ID is required')
  }

  const response = await fetch(
    `https://rspsrfygtvevqgthkktz.supabase.co/rest/v1/clients?id=eq.${clientId}&select=*`, // Corrected URL
    {
      headers: {
        'Content-Type': 'application/json',
        apikey: `${import.meta.env.VITE_API_KEY}`, // Replace with your Supabase API key
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` // Replace with your Supabase anon/public key
      }
    }
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  if (data.length === 0) {
    throw new Error('Client not found')
  }

  return data[0]
}

export const fetchInvoicesByClientId = async (
  clientId: string | undefined
): Promise<Invoice[]> => {
  const response = await fetch(
    `https://rspsrfygtvevqgthkktz.supabase.co/rest/v1/invoices?select=*&client_id=eq.${clientId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        apikey: `${import.meta.env.VITE_API_KEY}`,
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    }
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
