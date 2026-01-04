import React from 'react'
import './App.module.css'
import { CalculatorProvider } from './context/CalculatorContext'
import { AppLayout } from './components/Layout/AppLayout'

function App() {
  return (
    <CalculatorProvider>
      <AppLayout />
    </CalculatorProvider>
  )
}

export default App
