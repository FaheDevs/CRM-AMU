import { Route, Routes } from 'react-router-dom'

import NoMatch from './Errors/NoMatch'
import { Clients } from './pages/clients/Clients'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Clients />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  )
}
