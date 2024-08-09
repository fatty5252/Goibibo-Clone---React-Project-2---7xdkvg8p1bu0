import {
  React,
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import axios from "axios";
import { projectID } from "../components/Constrains";
import { useUser } from "./UserProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserContext = createContext();

export const BusUser = ({ children }) => {
  const [source, setSource] = useState("");
  const [destination, setdestination] = useState("");
  const [sourcedata, setsourceData] = useState([]);
  const [destdata, setdestData] = useState([]);
  const [opensource, setopensource] = useState(false);
  const [opendest, setopendest] = useState(false);
  const [SingleBusData, setSingleBusData] = useState([]);
  const [busOpenPopup, setBusOpenPopup] = useState(false);
  const [paymentData, setPaymentData] = useState({"fare": 0});

  const {getToken} = useUser();


  const busCityObjects = [
    {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      cityWithState: "Mumbai, Maharashtra",
    },
    {
      city: "Delhi",
      state: "National Capital Territory of Delhi",
      country: "India",
      cityWithState: "Delhi, National Capital Territory of Delhi",
    },
    {
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      cityWithState: "Bangalore, Karnataka",
    },
    {
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      cityWithState: "Hyderabad, Telangana",
    },
    {
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      cityWithState: "Ahmedabad, Gujarat",
    },
    {
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      cityWithState: "Chennai, Tamil Nadu",
    },
    {
      city: "Kolkata",
      state: "West Bengal",
      country: "India",
      cityWithState: "Kolkata, West Bengal",
    },
    {
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      cityWithState: "Pune, Maharashtra",
    },
    {
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      cityWithState: "Jaipur, Rajasthan",
    },
    {
      city: "Lucknow",
      state: "Uttar Pradesh",
      country: "India",
      cityWithState: "Lucknow, Uttar Pradesh",
    },
    {
      city: "Kanpur",
      state: "Uttar Pradesh",
      country: "India",
      cityWithState: "Kanpur, Uttar Pradesh",
    },
    {
      city: "Nagpur",
      state: "Maharashtra",
      country: "India",
      cityWithState: "Nagpur, Maharashtra",
    },
    {
      city: "Indore",
      state: "Madhya Pradesh",
      country: "India",
      cityWithState: "Indore, Madhya Pradesh",
    },
    {
      city: "Thane",
      state: "Maharashtra",
      country: "India",
      cityWithState: "Thane, Maharashtra",
    },
    {
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      cityWithState: "Bhopal, Madhya Pradesh",
    },
    {
      city: "Visakhapatnam",
      state: "Andhra Pradesh",
      country: "India",
      cityWithState: "Visakhapatnam, Andhra Pradesh",
    },
    {
      city: "Pimpri-Chinchwad",
      state: "Maharashtra",
      country: "India",
      cityWithState: "Pimpri-Chinchwad, Maharashtra",
    },
    {
      city: "Patna",
      state: "Bihar",
      country: "India",
      cityWithState: "Patna, Bihar",
    },
    {
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      cityWithState: "Vadodara, Gujarat",
    },
    {
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      country: "India",
      cityWithState: "Ghaziabad, Uttar Pradesh",
    },
    {
      city: "Ludhiana",
      state: "Punjab",
      country: "India",
      cityWithState: "Ludhiana, Punjab",
    },
    {
      city: "Agra",
      state: "Uttar Pradesh",
      country: "India",
      cityWithState: "Agra, Uttar Pradesh",
    },
    {
      city: "Nashik",
      state: "Maharashtra",
      country: "India",
      cityWithState: "Nashik, Maharashtra",
    },
    {
      city: "Faridabad",
      state: "Haryana",
      country: "India",
      cityWithState: "Faridabad, Haryana",
    },
    {
      city: "Meerut",
      state: "Uttar Pradesh",
      country: "India",
      cityWithState: "Meerut, Uttar Pradesh",
    },
    {
      city: "Rajkot",
      state: "Gujarat",
      country: "India",
      cityWithState: "Rajkot, Gujarat",
    },
    {
      city: "Kalyan-Dombivli",
      state: "Maharashtra",
      country: "India",
      cityWithState: "Kalyan-Dombivli, Maharashtra",
    },
    {
      city: "Vasai-Virar",
      state: "Maharashtra",
      country: "India",
      cityWithState: "Vasai-Virar, Maharashtra",
    },
    {
      city: "Varanasi",
      state: "Uttar Pradesh",
      country: "India",
      cityWithState: "Varanasi, Uttar Pradesh",
    },
    {
      city: "Srinagar",
      state: "Jammu and Kashmir",
      country: "India",
      cityWithState: "Srinagar, Jammu and Kashmir",
    },
    {
      city: "Aurangabad",
      state: "Maharashtra",
      country: "India",
      cityWithState: "Aurangabad, Maharashtra",
    },
  ];

  const SingleBusSearch = async (busId) => {
    if (getToken){
    setBusOpenPopup(!busOpenPopup);
    }
    else {
     toast.error("Please Login First");
    }
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/bus/${busId}`,
        {
          headers: {
            projectId: projectID,
          },
        }
      );
      setSingleBusData(response.data.data);
      console.log(response.data.data);
      
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(SingleBusData);

  const openSrc = () => {
    setopensource(!opensource);
    setopendest(false);
  };

  const opendesn = () => {
    setopensource(false);
    setopendest(!opendest);
  };

  const object = {
    source,
    setSource,
    destination,
    setdestination,
    sourcedata,
    setsourceData,
    destdata,
    setdestData,
    opensource,
    setopensource,
    opendest,
    setopendest,
    openSrc,
    opendesn,
    busCityObjects,
    SingleBusData,
    setSingleBusData,
    SingleBusSearch,
    busOpenPopup,
    setBusOpenPopup,
    paymentData, setPaymentData,
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false}/>
      <UserContext.Provider value={object}>{children}</UserContext.Provider>
    </>
  );
};

export function useBususer() {
  return useContext(UserContext);
}





