
import * as React from 'react';
import './App.css';
import Dashboard from './Pages/DashBoard/Dashboard.js'
import theme from './modules/theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { InteractionStateProvider } from './modules/components/userInteractionState';





function App() {



  return (
    <InteractionStateProvider>
        <Dashboard />
    </InteractionStateProvider>
  )
}
export default App;
