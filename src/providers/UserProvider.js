import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from 'axios';
import { projectID, serachHOtelURL, trainSearchURL } from "../components/Constrains";
import dayjs from "dayjs";

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

 
// ==============================================Login HAndlers======================================================
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

    // ================================Flight search API fetch=============================================================

    // ================================Flight search API fetch=============================================================

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
          console.log(response);

          } else if (opendest) {
            console.log(response)
            setdestData(response.data.data.airports);
          console.log(response);

          }
    
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

  // ================== Hotel Search ==================================

  const [hotelserach, sethotelsearch] = useState()
  const [hotelLocationResults, sethotelLocationResults] = useState()
  const [openLocation, setOpenLocation] = useState(false);


  const [hotelData, sethotelData] = useState([])


  const HotelSearch = useMemo(async () => {
    try {
      const response = await axios.get(hotelserach ? `${serachHOtelURL}?search={"location":"${hotelserach}"}` : `${serachHOtelURL}`, 
        {
        headers: {
          projectId: projectID,
        },
      });

      if(hotelserach){
        sethotelData(response.data.data.hotels);
      }else{
        sethotelLocationResults(response)
      }

      console.log(response.data.data.hotels);
    } catch (err) {
      console.log(err);
    }
  },[hotelserach, openLocation])

  useEffect(()=>{
    HotelSearch;
  },[])

  // // ============================Date set================================
  const [value, setValue] = useState(dayjs(new Date()));

  // Increment the date by one day
  // const nextDay = value.add(1, 'day');
  
  // Extract the date object
  const dateObj = new Date(value.$d);
  
    // Create formatter for day, month, weekday, and year
    const dayFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit' });
    const monthFormatter = new Intl.DateTimeFormat('en-GB', { month: 'short' });
    const weekdayFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'short' });
    const yearFormatter = new Intl.DateTimeFormat('en-GB', { year: 'numeric' });
  
    // Format parts
    const day = dayFormatter.format(dateObj);
    const month = monthFormatter.format(dateObj);
    const weekday = weekdayFormatter.format(dateObj);
    const year = yearFormatter.format(dateObj);
  
    // Combine into the desired format
    const formattedDate = `${day} ${month}, ${weekday} ${year}`;
  
    console.log(formattedDate); // Output: "21 Jun, Fri 2024"
  

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
        getAirlineInfo, hotelserach, sethotelsearch, hotelData, hotelLocationResults, openLocation, setOpenLocation,
        value, formattedDate,
       
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