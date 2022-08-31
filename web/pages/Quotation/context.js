import React, { useRef } from 'react'

const steps = [
  'step 1',
  'step 2',
  'step 3',
  'step 4',
  'step 5',
  'step 6',
]

export const QuotationContext =React.createContext({
})

const Provider =QuotationContext.Provider;

export const QuotationProvider = ({children}) => {
  const stepsRef = useRef([]);

  return <Provider value = {{stepsRef}}>
    {children}
  </Provider>
}
