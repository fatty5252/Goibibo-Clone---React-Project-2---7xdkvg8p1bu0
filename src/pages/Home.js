import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/Home.css'
import { Box, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Travellers from '../components/Travellers'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { projectID } from '../components/Constrains';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export default function Home() {

  const navigate = useNavigate();

  const { source, setSource, destination, setdestination, sourcedata, setsourceData,
    destdata, setdestData, opensource, setopensource, opendest, setopendest, openSrc, opendesn, FlightSearch} = useUser();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [value, setValue] = React.useState(dayjs('2022-04-17'));

  // const day = value && value.$d.split(" ").slice(0,4)
  // console.log(day)
  const day = value.$d
  const dateObj = new Date(day);
  const options = { weekday: 'short' }; // Options to display short weekday
  const dayOfWeek = dateObj.toLocaleDateString('en-GB', options); // Using 'en-GB' locale for the day of the week
  console.log(dayOfWeek); // Output: "Sun"

  // const [flightFrom, setflightfrom] = useState('')

  

  const navigatetoflightresults = () => {
    navigate(`/FlightResult/data?source=${source}&destination=${destination}&day=${dayOfWeek}`)
  }

// ============function for flight search ======================================================== 
  // const FlightSearch = async () => {
  //   try {
  //     let url;
  //     if (opensource) {
  //       // If opensource is true, fetch the source airport
  //       url = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${source}"}`;
  //     } else if (opendest) {
  //       // If opendest is true, fetch the destination airport
  //       url = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${destination}"}`;
  //     } else {
  //       // If neither is true, return early or handle appropriately
  //       console.log("Please specify either source or destination");
  //       return;
  //     }

  //     const response = await axios.get(url, {
  //       headers: {
  //         projectId: projectID,
  //       },
  //     });

  //     if (opensource) {
  //       setsourceData(response.data.data.airports);
  //     } else if (opendest) {
  //       console.log(response)
  //       setdestData(response.data.data.airports);
  //     }

  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(()=>{
  //   FlightSearch();
  // },[source, destination, opensource, opendest])



  return (
    <div className='home-main'>
      <div className='home-background'>
        <Typography variant='h5' sx={{ textAlign: "center", p: "12px", color: "white", fontWeight: '700' }}>Domestic and International Flights</Typography>
        <div className='home-main-section'>
          <Paper sx={{ width: '90vw', height: '60vh', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
           {/*=========radio buttons top==============  */}
            <FormControl sx={{ padding: "40px 20px" }}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="One-way" />
                <FormControlLabel value="male" control={<Radio />} label="Round-trip" />
                <FormControlLabel value="other" control={<Radio />} label="Multi-city" />
              </RadioGroup>
            </FormControl>
            
            <Box sx={{ display: "flex", alignItems: 'center', flexWrap: "nowrap", padding: '30px', gap: "10px", justifyContent: "center" }}>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  required
                  id="outlined-required"
                  label="From"

                  // placeholder='Enter city airport'
                  // defaultValue="Enter city airport"
                  onClick={() => openSrc()}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
                {opensource &&
                  <Box sx={{ width: "300px", height: "300px", backgroundColor: "red", position: 'absolute', top: '58px', left: '0px' }}>
                    {sourcedata && sourcedata.map((item, index) => (
                      <div key={index} onClick={() => {setSource(item.iata_code), setopensource(false)}}>
                        <div>
                          <img src="https://gos3.ibcdn.com/flightIcon-1675492260.png" alt="flight Icon" />
                          <p>{item.city}</p>
                          <p>{item.country}</p>
                          <p>{item.iata_code}</p>
                          <p>{item.country.slice(0, 2)}</p>
                        </div>
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </Box>}
              </Box>
              <Box sx={{ position: "relative" }}>
                {/* <CompareArrowsOutlinedIcon sx={{ color: "blue", fontSize: "40px", backgroundColor: 'white', borderRadius: '100%' }} /> */}
                <TextField sx={{ transform: "initial", transition: "ease-out 3s" }}
                  required
                  id="outlined-required"
                  label="To"
                  onClick={() => opendesn()}
                  value={destination}
                  onChange={(e) => setdestination(e.target.value)}
                // placeholder='Enter city airport'
                // defaultValue="Enter city airport"
                />
                {opendest &&
                  <Box sx={{ width: "300px", height: "300px", backgroundColor: "red", position: "absolute", top: "58px", left: "0px" }}>
                    {destdata && destdata.map((item, index) => (
                      <div key={index} onClick={() => {setdestination(item.iata_code), setopendest(false)}}>
                        <div>
                          <img src="https://gos3.ibcdn.com/flightIcon-1675492260.png" alt="flight Icon" />
                          <p>{item.city}</p>
                          <p>{item.country}</p>
                          <p>{item.iata_code}</p>
                          <p>{item.country.slice(0, 2)}</p>
                        </div>
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </Box>}
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker label="Departure"
                    // defaultValue={dayjs('2022-04-17')}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                  {/* <DatePicker
                    label="Return"
                  // value={value}
                  // onChange={(newValue) => setValue(newValue)}
                  /> */}
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                required
                id="outlined-required"
                label="Travellers and class"
                // placeholder='Enter city airport'
                defaultValue="1 Adult"
                onClick={handleOpen}
              />
              <Travellers open={open} setOpen={setOpen} />
            </Box>
            <Button sx={{
              padding: "1.5rem", margin: "70px", borderRadius: "50px", fontSize: "20px", fontWeight: "700", marginLeft: "40%"
              , background: "#FF6D38",
            }} variant="contained" disableElevation
              onClick={() => navigatetoflightresults()}
            >
              SEARCH FLIGHTS
            </Button>
          </Paper>
        </div>
      </div>
    </div>
  )
}

