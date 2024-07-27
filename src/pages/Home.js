import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Travellers from '../components/Travellers'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
export default function Home() {
  const navigate = useNavigate();
  const { source, setSource, destination, setdestination, sourcedata, setsourceData,
    destdata, setdestData, opensource, setopensource, opendest, setopendest, openSrc, opendesn, FlightSearch } = useUser();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [value, setValue] = useState(dayjs(new Date()));
  const day = value.$d;
  const dateObj = new Date(day);
  const options = { weekday: 'short' };
  const dayOfWeek = dateObj.toLocaleDateString('en-GB', options);
  console.log(dayOfWeek);
  const navigatetoflightresults = () => {
    source && destination ? navigate(`/FlightResult/data?source=${source}&destination=${destination}&day=${dayOfWeek}`)
      : toast.error('Please select source and destination');
  }
  return (
    <div className='home-main pt-20 h-screen'>
      <ToastContainer position="top-right" />
      <div className='home-background'>
        <h5 className='home-heading text-2xl' style={{ textAlign: "center", padding: "12px", color: "white", fontWeight: '700' }}>
          Domestic and International Flights
        </h5>
        <div className='home-main-section'>
          <div style={{
            width: '90vw', height: 'auto', backgroundColor: 'white', borderRadius: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'
          }}>
            {/* Radio buttons top */}
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
            <div style={{
              display: "flex", alignItems: 'center', flexWrap: "wrap", padding: '30px',
              gap: "10px", justifyContent: "center"
            }}>
              <div style={{ position: 'relative' }} className='border border-black p-3 rounded-lg'>
                <input className='outline-none'
                  required
                  placeholder="From"
                  onClick={() => openSrc()}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  
                />
                {opensource &&
                  <div className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll"
                    style={{ width: "350px", height: "300px", backgroundColor: "white", position: 'absolute', top: '58px', left: '0px' }}>
                    {sourcedata && sourcedata.map((item, index) => (
                      <div className='p-2  hover:bg-blue-gray-50' key={index} onClick={() => { setSource(item.iata_code); setopensource(false) }}>
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
                  </div>}
              </div>
              <div style={{ position: "relative" }} className='border border-black p-3 rounded-lg'>
                <input className='outline-none'
                  required
                  placeholder="To"
                  onClick={() => opendesn()}
                  value={destination}
                  onChange={(e) => setdestination(e.target.value)}
                />
                {opendest &&
                  <div className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll"
                    style={{ width: "350px", height: "300px", backgroundColor: "white", position: 'absolute', top: '58px', left: '0px' }}>
                    {destdata && destdata.slice(0, 6).map((item, index) => (
                      <div className='p-2 hover:bg-blue-gray-50' key={index} onClick={() => { setdestination(item.iata_code); setopendest(false) }}>
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
                  </div>}
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Departure"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  minDate={dayjs()}
                />
                <DatePicker
                  label="Return"
                  disabled
                />
              </LocalizationProvider>
              <input className='border p-3 rounded-lg outline-none'
              
                required
                placeholder="Travellers and class"
                defaultValue="1 Adult"
                onClick={handleOpen}
              />
              <Travellers open={open} setOpen={setOpen} />
            </div>
            <div className="flex justify-center mt-7 pb-4">
              <button onClick={() => navigatetoflightresults()} className='text-white bg-orange-400 hover:bg-orange-500 p-5 text-xl font-extrabold rounded-full w-60'>
                SEARCH FLIGHTS
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-24 ">
          <img className='rounded-lg' src='homeimg.png' alt='bannerHome' />
        </div>
      </div>
    </div>
  )
}