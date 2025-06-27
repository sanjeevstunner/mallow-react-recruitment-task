import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './features/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.tsx'
import { Toaster } from './components/ui/sonner'

import "./styles/main.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
