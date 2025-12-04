import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './shared/contexts/modal-provider.tsx'
import { Modal } from './shared/components/modal/Modal.tsx'
import { ToastProvider } from './shared/contexts/toast-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
    <ModalProvider>
      <main className='w-full h-screen bg-[#18181a] flex flex-col justify-center items-center'>
        <App />
      </main>
      <Modal/>
    </ModalProvider>
    </ToastProvider>
  </StrictMode>,
)
