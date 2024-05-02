import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from 'axios';
import { projectID } from "../components/Constrains";

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
        localStorage.setItem('name', data.user);
    }
    // console.log(getName)

    const FlightSearch = useMemo(async () => {
        try {
          let url;
          if (opensource) {
            // If opensource is true, fetch the source airport
            url = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${source}"}`;
          } else if (opendest) {
            // If opendest is true, fetch the destination airport
            url = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${destination}"}`;
          }
    
          const response = await axios.get(url, {
            headers: {
              projectId: projectID,
            },
          });
    
          if (opensource) {
            setsourceData(response.data.data.airports);
          } else if (opendest) {
            console.log(response)
            setdestData(response.data.data.airports);
          }
    
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      },[source, destination, opensource, opendest])
    
      useEffect(()=>{
        FlightSearch;
      },[])
      
  const openSrc = () => {
    setopensource(!opensource)
    setopendest(false)
  }

  const opendesn = () => {
    setopensource(false)
    setopendest(!opendest)
  }

    //get flight image and name

   const getAirlineInfo = (flightIDs) => {
    let logoSrc, airlineName;
    switch (flightIDs?.slice(0, 2)) {
      case '6E': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/6E.svg'; airlineName = 'Indigo'; break;
      case 'AI': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/AI.svg'; airlineName = 'Air India'; break;
      case 'QP': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/QP.svg'; airlineName = 'Akasa Air'; break;
      case 'UK': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/UK.svg'; airlineName = 'Vistara'; break;
      case 'SG': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/SG.svg'; airlineName = 'Spicejet'; break;
      case 'IX': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/IX.svg'; airlineName = 'Air India Express'; break;
      case 'G8': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/G8.svg'; airlineName = 'GoAir'; break;
      case 'I5': logoSrc = 'https://fastui.cltpstatic.com/image/upload/resources/images/logos/air-logos/svg_logos/I5.svg'; airlineName = 'AirAsia India'; break;
      default: logoSrc = ''; airlineName = '';
    }
    return { logoSrc, airlineName };
};

    const object = {
        getToken,getName, onTokenHandler, onNameHandler, loginpop, setLoginpop, source, setSource,destination, setdestination,sourcedata, setsourceData,
        destdata, setdestData, opensource, setopensource,opendest, setopendest,  openSrc, opendesn,FlightSearch,
        getAirlineInfo
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