import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './features/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.tsx'
import { Toaster } from './components/ui/sonner'
import { ThemeProvider } from 'next-themes'

import "./styles/main.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
