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
    destdata, setdestData, opensource, setopensource, opendest, setopendest, openSrc, opendesn, FlightSearch } = useUser();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [value, setValue] = React.useState(dayjs('2022-04-17'));

  // const day = value && value.$d.split(" ").slice(0,4)
  // console.log(day)
  const day = value.$d
  const dateObj = new Date(day);
  const options = { weekday: 'short' }; // Options to display short weekday
  const dayOfWeek = dateObj.toLocaleDateString('en-GB', options); // Using 'en-GB' locale for the day of the week
  console.log(dayOfWeek)


  // const [flightFrom, setflightfrom] = useState('')



  const navigatetoflightresults = () => {
    navigate(`/FlightResult/data?source=${source}&destination=${destination}&day=${dayOfWeek}`)
  }


  return (
    <div className='home-main'>
      <div className='home-background'>
        <Typography variant='h5' sx={{ textAlign: "center", p: "12px", color: "white", fontWeight: '700' }}>Domestic and International Flights</Typography>
        <div className='home-main-section'>
          <Paper sx={{ width: '90vw', height: '50vh', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
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
                  <Box className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg" sx={{ width: "300px", height: "auto", backgroundColor: "white", position: 'absolute', top: '58px', left: '0px' }}>
                    {sourcedata && sourcedata.slice(0,6).map((item, index) => (
                      <div className='p-2  hover:bg-blue-gray-50' key={index} onClick={() => { setSource(item.iata_code), setopensource(false) }}>
                        <div className='float-right'>
                          <span className='capitalize'>{item.country.slice(0, 2)}<img className='size-5' src='flag.png' alt='flag' /></span>
                        </div>
                        <div className='flex p-1'>
                          <img className='size-7' src="https://gos3.ibcdn.com/flightIcon-1675492260.png" alt="flight Icon" />
                          <div className='flex flex-row'>
                            <p className='p-1 font-bold'>{item.city},</p>
                            <p className='p-1 font-bold'>{item.country}</p>
                            <p className='p-1'>[{item.iata_code}]</p>
                          </div>
                        </div>
                        <p className='ml-8 text-sm'>{item.name}</p>
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
                  <Box className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg" sx={{ width: "300px", height: "auto", backgroundColor: "white", position: 'absolute', top: '58px', left: '0px' }}>
                    {destdata && destdata.slice(0,6).map((item, index) => (
                      <div className='p-2 hover:bg-blue-gray-50' key={index} onClick={() => { setdestination(item.iata_code), setopendest(false) }}>
                        <div className='float-right'>
                          <span>{item.country.slice(0, 2)}</span>
                          <span><img className='size-5' src='flag.png' alt='flag' /></span>
                        </div>
                        <div className='flex p-1'>
                          <img className='size-7' src="https://gos3.ibcdn.com/flightIcon-1675492260.png" alt="flight Icon" />
                          <div className='flex flex-row'>
                            <p className='p-1 font-bold'>{item.city},</p>
                            <p className='p-1 font-bold'>{item.country}</p>
                            <p className='p-1'>[{item.iata_code}]</p>
                          </div>
                        </div>
                        <p className='ml-8 text-sm'>{item.name}</p>
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
                  <DatePicker
                    label="Return"
                    disabled="true"
                  // value={value}
                  // onChange={(newValue) => setValue(newValue)}
                  />
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
            <Box className="flex justify-center mt-7 p-10">
            <button  onClick={() => navigatetoflightresults()} className='text-white bg-orange-400 hover:bg-orange-500 p-5 text-xl font-extrabold rounded-full w-60'>SEARCH FLIGHTS</button>
          </Box>
          </Paper>
        </div>
        <Box className="flex justify-center mt-24 ">
          <img className='rounded-lg' src='homeimg.png' alt='bannerHome'/>
        </Box>
      </div>
    </div>
  )
}

