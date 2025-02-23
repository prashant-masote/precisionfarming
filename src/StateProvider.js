import React, { createContext, useContext, useReducer, useMemo } from "react";

// Create Context
export const StateContext = createContext(null);

// StateProvider Component
export function StateProvider({ reducer, initialState, children }) {
    const store = useMemo(() => useReducer(reducer, initialState), [reducer, initialState]);

    return <StateContext.Provider value={store}>{children}</StateContext.Provider>;
}

// Custom Hook to Consume Context
export function useStateValue() {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useStateValue must be used within a StateProvider");
    }
    return context;
}
