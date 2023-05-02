import React, { createContext, useState,useContext } from 'react';

// Create the context
const InteractionStateContext = createContext();

// Create a provider component
export const InteractionStateProvider = ( props ) => {

  //global useState For app.js to set user interraction
  const [userState, setUserState] = useState(null);
  const updateUserState = (newData) => {
    setUserState(newData);
  };

  //global useState For app.js to set app rendering state
  const [appState, setAppState] = useState(null);
  const updateAppState = (newData) => {
    setAppState(newData);
  };

  return (
    <InteractionStateContext.Provider value={{ 
      userState, 
      updateUserState,
      appState,
      updateAppState 
      }}>
      {props.children}
    </InteractionStateContext.Provider>
  );
};


export const useInteractionState = () => {
  return useContext(InteractionStateContext);
}