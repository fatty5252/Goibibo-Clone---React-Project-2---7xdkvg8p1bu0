import {createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { projectID, serachHOtelURL, trainSearchURL } from "../components/Constrains";

const UserContext = createContext();

export const TrainUser = ({children})=>{


    const [trainOpenSrc, setTrainOpenSrc] = useState(false);
    const [trainOpenDest, setTrainOpenDest] = useState(false);
    const [trainOpenDestData, setTrainOpenDestData] = useState();
    const [trainOpenSrcData, setTrainOpenSrcData] = useState();
    const [trainSrc, setTrainSrc] = useState("");
    const [trainDest, setTrainDest] = useState("");  
    const [payment, setPayment] = useState(0);

    const trainCityObjects = [
      { station: "Delhi Junction", city: "Delhi", country: "India" },
      { station: "Dhanbad Junction", city: "Dhanbad", country: "India" },
      { station: "Surat", city: "Surat", country: "India" },
      { station: "Katpadi Junction", city: "Katpadi", country: "India" },
      { station: "Kanpur Central", city: "Kanpur", country: "India" },
      { station: "Kharagpur Junction", city: "Kharagpur", country: "India" },
      {
        station: "Thiruvananthapuram Central",
        city: "Thiruvananthapuram",
        country: "India",
      },
      { station: "Indore Junction", city: "Indore", country: "India" },
      { station: "Chandigarh", city: "Chandigarh", country: "India" },
      { station: "Gwalior Junction", city: "Gwalior", country: "India" },
      { station: "Agra Cantonment", city: "Agra", country: "India" },
      { station: "Ambala Cantonment", city: "Ambala", country: "India" },
      { station: "Bhusaval Junction", city: "Bhusaval", country: "India" },
      { station: "Manmad Junction", city: "Manmad", country: "India" },
      { station: "Thrissur", city: "Thrissur", country: "India" },
      {
        station: "Visakhapatnam Junction",
        city: "Visakhapatnam",
        country: "India",
      },
      { station: "Khurda Road Junction", city: "Khurda Road", country: "India" },
      { station: "Ahmedabad Junction", city: "Ahmedabad", country: "India" },
      { station: "Moradabad Junction", city: "Moradabad", country: "India" },
      {
        station: "Secunderabad Junction",
        city: "Secunderabad",
        country: "India",
      },
      { station: "Nagpur Junction", city: "Nagpur", country: "India" },
      { station: "Howrah Junction", city: "Howrah", country: "India" },
      { station: "Mysuru Junction", city: "Mysuru", country: "India" },
      { station: "Amritsar Junction", city: "Amritsar", country: "India" },
      { station: "Pune Junction", city: "Pune", country: "India" },
      { station: "Raipur Junction", city: "Raipur", country: "India" },
      { station: "New Delhi", city: "New Delhi", country: "India" },
      { station: "Jhansi Junction", city: "Jhansi", country: "India" },
      { station: "Varanasi Junction", city: "Varanasi", country: "India" },
      { station: "Guwahati", city: "Guwahati", country: "India" },
      { station: "Asansol Junction", city: "Asansol", country: "India" },
      { station: "Nadiad Junction", city: "Nadiad", country: "India" },
      { station: "Bhopal Junction", city: "Bhopal", country: "India" },
      { station: "Yesvantpur Junction", city: "Yesvantpur", country: "India" },
      { station: "Kollam Junction", city: "Kollam", country: "India" },
      { station: "Ludhiana Junction", city: "Ludhiana", country: "India" },
      { station: "Bengaluru Cantt", city: "Bengaluru", country: "India" },
      { station: "Vijayawada Junction", city: "Vijayawada", country: "India" },
      { station: "Warangal", city: "Warangal", country: "India" },
      { station: "Anand Junction", city: "Anand", country: "India" },
      { station: "Hubli Junction", city: "Hubli", country: "India" },
      { station: "Jodhpur Junction", city: "Jodhpur", country: "India" },
    ];
    // ==============================TrainAPIfetch==============================

    // const TrainSearch = useMemo(async ()=>{
    //     try{
    //       let url;
    //       if (trainOpenSrc){
    //         url = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${trainSrc}"}`;
    //       }
    //       else if (trainOpenDest){
    //         url = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${trainDest}"}`;
    //       }
    //       const responce = await axios.get(url, {
    //         headers: {
    //           projectId : projectID,
    //         },
    //       });
    //       if (trainOpenSrc){
    //         setTrainOpenSrcData(responce.data.data.airports)
    //       console.log(responce);
    
    //       }
    //       else if (trainOpenDest){
    //         setTrainOpenDestData(responce.data.data.airports)
    //       console.log(responce);
    
    //       }
    //     }
    //     catch(err){
    //        console.log(err);
    //     }
    //   },[trainSrc, trainDest, trainOpenSrc, trainOpenDest]);
    //   console.log("traindat-----> ", trainOpenSrcData);
    
    //   useEffect(()=>{
    //     TrainSearch;
    //   },[]);
    
      const trainOpenSource=()=>{
        setTrainOpenSrc(!trainOpenSrc)
        setTrainOpenDest(false);
      }
    
      const trainOpenDestination=()=>{
        setTrainOpenDest(!trainOpenDest);
        setTrainOpenSrc(false);
      }
    

    const object = {
        trainOpenSrc, setTrainOpenSrc,trainOpenDest, setTrainOpenDest,trainOpenDestData, setTrainOpenDestData,
        trainOpenSrcData, setTrainOpenSrcData,trainSrc, setTrainSrc,trainDest, setTrainDest,
         trainOpenSource, trainOpenDestination,trainCityObjects,
    }

return (
    <>
    <UserContext.Provider value={object}>
        {children}
    </UserContext.Provider>
    </>
)

}

export function useTrainUser(){
    return useContext(UserContext);
}