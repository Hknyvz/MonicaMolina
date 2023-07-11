import { notification } from "antd";
import React from "react";

export const NotificationContext = React.createContext(notification);
export const NotificationProvider = ({ children }) => {
  const notificationInstance = notification.useNotification()[0];
  return (
    <NotificationContext.Provider value={notificationInstance}>
      {children}
    </NotificationContext.Provider>
  );
};
