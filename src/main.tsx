import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store/store.tsx'

const theme = createTheme({
  typography: {
    fontFamily: "'Mulish', sans-serif",
  },
});

const startApp = async () => {
  if (import.meta.env.DEV) {
    const { worker } = await import('../mocks/browser');
    await worker.start();
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </StrictMode>,
  )
}

startApp();
