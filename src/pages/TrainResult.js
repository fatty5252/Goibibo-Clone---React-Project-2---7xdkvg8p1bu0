import React, { useEffect, useMemo, useState } from 'react'
import { projectID } from '../components/Constrains';
import axios from 'axios';
import { Box, Paper, Typography, Grid, Button, Checkbox, Slider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useUser } from '../providers/UserProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import Travellers from '../components/Travellers'
import { useNavigate } from 'react-router-dom';
import { useTrainUser } from '../providers/TrainUser';

export default function TrainResult() {

    const {trainOpenSrc, setTrainOpenSrc,trainOpenDest, setTrainOpenDest,trainOpenDestData, setTrainOpenDestData, trainOpenSrcData, setTrainOpenSrcData,trainSrc, setTrainSrc,trainDest, setTrainDest, trainOpenSource, trainOpenDestination} = useTrainUser();

    const [trainSearch, setTrainSearch] = useState([]);


    const searchParams = new URLSearchParams(window.location.search);
    const trainSource = searchParams.get("trainSrc");
    const trainDestination = searchParams.get("trainDest");
    const day = searchParams.get("day");

    const TrainSearch = useMemo(async()=>{
        try {
            let url;
            url = `https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${trainSource}"},{"destination":"${trainDestination}"}&day=${day}`;
            const responce = await axios.get(url, {
                headers: {
                    projectId: projectID,
                },
        });
         setTrainSearch(responce.data.data.trains);
         console.log(responce.data)



        }
        catch(err){
            console.log(err);
        }
    })


  return (
    <div>
      TrainRsult
    </div>
  )
}
