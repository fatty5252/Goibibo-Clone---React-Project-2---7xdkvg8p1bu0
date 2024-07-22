import React, { useEffect, useState } from 'react'
import axios from "axios"
import { projectID } from "../components/Constrains";


export default function HotelRooms() {
    const searchparams = new URLSearchParams(window.location.search);
    const _id = searchparams.get('id')

    const [singleHotelId, setSingelHotelId] = useState("");

    const HotelIdGet = async () => {
        try {
          let url;
          url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${_id}`;
          const response = await axios.get(url, {
            headers: {
              projectId: projectID,
            },
          });
          setSingelHotelId(response.data.data);
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      };
     
      useEffect(()=>{
        HotelIdGet();
      },[_id]);
  return (
    <div>
      hii
    </div>
  )
}
