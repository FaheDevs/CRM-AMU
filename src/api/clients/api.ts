import { IClient } from '../../pages/clients/ClientsList'

export const fetchClients = async (): Promise<IClient[]> => {
  const response = await fetch(
    'https://rspsrfygtvevqgthkktz.supabase.co/rest/v1/clients?select=*',
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

  return await response.json()
}
