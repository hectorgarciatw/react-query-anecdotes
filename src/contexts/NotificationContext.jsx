import React, { createContext, useReducer, useContext, useEffect } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return { message: action.payload.message, type: action.payload.type };
        case "CLEAR_NOTIFICATION":
            return { message: null, type: null };
        default:
            return state;
    }
};

export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, { message: null, type: null });

    useEffect(() => {
        if (state.message) {
            const timer = setTimeout(() => {
                dispatch({ type: "CLEAR_NOTIFICATION" });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [state.message]);

    const setNotification = (message, type = "info") => {
        dispatch({ type: "SET_NOTIFICATION", payload: { message, type } });
    };

    return <NotificationContext.Provider value={{ state, setNotification }}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => useContext(NotificationContext);
