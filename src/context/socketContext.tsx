import api from "@/api";
import { ReactNode, createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export default function SocketContextProvider({children} : {children : ReactNode}){
    
    const [socket , setSocket] = useState();

    useEffect(() => {
        
        const socket = io(`${api}`);
        setSocket(socket);
  
        return () => {
          socket.disconnect();
        }

    } , [])
    
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>    
    )

}