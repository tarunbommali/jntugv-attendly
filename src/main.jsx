import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
// import { AppProvider } from './context/AppContext';
// import AppRoutes from './routes/AppRoutes';
import App from './App';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//      <BrowserRouter>
//           <AppProvider>
//             <AppRoutes />
//           </AppProvider>
//         </BrowserRouter>
//   </StrictMode>,
// )

createRoot(document.getElementById('root')).render(<App />);