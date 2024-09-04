import React from "react";
import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
    const { state } = useNotification();

    if (!state.message) {
        return null;
    }

    const notificationStyle = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
        color: state.type === "error" ? "red" : "green",
        backgroundColor: state.type === "error" ? "#ffdddd" : "#ddffdd",
    };

    return <div style={notificationStyle}>{state.message}</div>;
};

export default Notification;
