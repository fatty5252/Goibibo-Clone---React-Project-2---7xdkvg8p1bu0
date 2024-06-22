import { React, useState, useEffect, useMemo, useContext, createContext }from "react";
import axios from "axios";

const UserContext = createContext();

export const BusUser = ({children})=>{

 const object = {
    
 } 
    return (
        <>
           <UserContext.Provider value={object}>
            {children}
           </UserContext.Provider>
        </>
    )
}

export function useBususer(){
    return useContext(UserContext);
}