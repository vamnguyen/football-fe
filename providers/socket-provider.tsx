import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children: React.ReactNode;
}

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000",
  {
    withCredentials: true,
  }
);

// Add connection event listeners
socket.on("connect", () => {
  console.log("Socket connected successfully");
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

const SocketContext = createContext<Socket>(socket);

export const SocketProvider = ({ children }: SocketProviderProps) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
