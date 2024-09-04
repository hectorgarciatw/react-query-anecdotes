import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider } from "react-query";
import { NotificationProvider } from "./contexts/NotificationContext"; // Asegúrate de que esta ruta es correcta
import queryClient from "./queryClient";

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </QueryClientProvider>
);
