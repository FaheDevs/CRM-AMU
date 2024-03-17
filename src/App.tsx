import { Route, Routes } from 'react-router-dom'

import NoMatch from './Errors/NoMatch'
import { ClientDetails } from './pages/clientDetails/ClientDetails'
import { Clients } from './pages/clients/Clients'
import CreateClient from './pages/createClient/CreateClient'
import CreateInvoice from './pages/createInvoice/CreateInvoice'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Clients />} />
        <Route path='/:clientId' element={<ClientDetails />} />
        <Route path='/create' element={<CreateClient />} />
        <Route path='/:clientId/invoices/add' element={<CreateInvoice />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  )
}
