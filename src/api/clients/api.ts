// api.ts

import { IClient } from '../../pages/clients/ClientsList'

export interface PaginationResult<T> {
  data: T[]
  total: number
}

export const fetchClients = async (
  page: number,
  limit = 10
): Promise<PaginationResult<IClient>> => {
  // Calculate the range based on the page and limit
  const startRange = page * limit
  const endRange = startRange + limit - 1

  const response = await fetch(
    'https://rspsrfygtvevqgthkktz.supabase.co/rest/v1/clients?select=*',
    {
      headers: {
        'Content-Type': 'application/json',
        apikey: `${import.meta.env.VITE_API_KEY}`,
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        Range: `${startRange}-${endRange}`
      }
    }
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  // Supabase includes total count in the "content-range" header
  const contentRange = response.headers.get('content-range')
  const total = contentRange ? parseInt(contentRange.split('/').pop()!, 10) : 0 // Extract total count from content-range

  return {
    data: await response.json(),
    total: total
  }
}
