import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { AppRouter } from './app/app-router'
import { SocketProvider } from './contexts/SocketContext'

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <AppRouter>
        </AppRouter>
      </SocketProvider>
    </QueryClientProvider>
  )
}

export default App
