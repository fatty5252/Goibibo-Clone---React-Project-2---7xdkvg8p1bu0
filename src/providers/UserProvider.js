import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [getToken, setToken] = useState(localStorage.getItem('token'));
    const [getName, setName] = useState(localStorage.getItem('name'));
    const [loginpop, setLoginpop] = useState(false);
    const [source, setSource] = useState([])
    const [destination, setdestination] = useState([])
    const [sourcedata, setsourceData] = useState([]);
    const [destdata, setdestData] = useState([]);
    const [opensource, setopensource] = useState(false);
    const [opendest, setopendest] = useState(false);


    const onTokenHandler = (data) => {
        setToken(data);
        localStorage.setItem('token', data);
    }
    // console.log(getToken)

    const onNameHandler = (data) => {
        setName(data);
        localStorage.setItem('name', data);
    }
    // console.log(getName)
      
  const openSrc = () => {
    setopensource(!opensource)
    setopendest(false)
  }

  const opendesn = () => {
    setopensource(false)
    setopendest(!opendest)
  }

    const object = {
        getToken,getName, onTokenHandler, onNameHandler, loginpop, setLoginpop, source, setSource,destination, setdestination,sourcedata, setsourceData,
        destdata, setdestData, opensource, setopensource,opendest, setopendest,  openSrc, opendesn
        
    }
    return (<div>
        <UserContext.Provider value={object}>
            {children}
        </UserContext.Provider>
    </div>)
}
export function useUser() {
    return useContext(UserContext);
}