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

    // ==============================TrainAPIfetch==============================

    const TrainSearch = useMemo(async ()=>{
        try{
          let url;
          if (trainOpenSrc){
            url = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${trainSrc}"}`;
          }
          else if (trainOpenDest){
            url = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${trainDest}"}`;
          }
          const responce = await axios.get(url, {
            headers: {
              projectId : projectID,
            },
          });
          if (trainOpenSrc){
            setTrainOpenSrcData(responce.data.data.airports)
          console.log(responce);
    
          }
          else if (trainOpenDest){
            setTrainOpenDestData(responce.data.data.airports)
          console.log(responce);
    
          }
        }
        catch(err){
           console.log(err);
        }
      },[trainSrc, trainDest, trainOpenSrc, trainOpenDest]);
      console.log("traindat-----> ", trainOpenSrcData);
    
      useEffect(()=>{
        TrainSearch;
      },[]);
    
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
        TrainSearch, trainOpenSource, trainOpenDestination,
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