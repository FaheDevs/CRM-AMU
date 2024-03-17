import { Route, Routes } from 'react-router-dom'

import NoMatch from './Errors/NoMatch'
import { ClientDetails } from './pages/clientDetails/ClientDetails'
import { Clients } from './pages/clients/Clients'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Clients />} />
        <Route path='/:clientId' element={<ClientDetails />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  )
}
