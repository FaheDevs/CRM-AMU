// api.ts

import { Invoice } from '../../pages/clientDetails/ClientDetails'
import { IClient } from '../../pages/clients/ClientsList'

export const VITE_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzcHNyZnlndHZldnFndGhra3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1NDM2ODUsImV4cCI6MjAyNjExOTY4NX0.qBJ2heWcV29Axzr1eKHNJPWzTlgQnfotRn952Z0WaoY'

export const fetchClientById = async (
  clientId: string | undefined
): Promise<IClient> => {
  if (!clientId) {
    throw new Error('Client ID is required')
  }

  const response = await fetch(
    `https://rspsrfygtvevqgthkktz.supabase.co/rest/v1/clients?id=eq.${clientId}&select=*`,
    {
      headers: {
        'Content-Type': 'application/json',
        apikey: VITE_API_KEY,
        Authorization: `Bearer ${VITE_API_KEY}`
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
        apikey: VITE_API_KEY,
        Authorization: `Bearer ${VITE_API_KEY}`
      }
    }
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
