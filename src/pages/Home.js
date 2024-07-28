import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Travellers from '../components/Travellers';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

export default function Home() {
  const navigate = useNavigate();
  const { source, setSource, destination, setdestination, sourcedata, setsourceData,
    destdata, setdestData, opensource, setopensource, opendest, setopendest, openSrc, opendesn, FlightSearch, getToken } = useUser();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [value, setValue] = useState(dayjs(new Date()));
  const day = value.$d;
  const dateObj = new Date(day);
  const options = { weekday: 'short' };
  const dayOfWeek = dateObj.toLocaleDateString('en-GB', options);
  console.log(dayOfWeek);

  const navigatetoflightresults = () => {

    if (!source && !destination){
      toast.error('Please select source and destination');
    }
    else if (source === destination){
      toast.error('Source and destination cannot be same');
    }
    else if (source && destination && dayOfWeek){
      navigate(`/FlightResult/data?source=${source}&destination=${destination}&day=${dayOfWeek}`);
    }
  }

  return (
    <div className='home-main pt-20 min-h-screen'>
      <ToastContainer position="top-right" />
      <div className='home-background'>
        <h5 className='home-heading text-2xl text-center py-3 text-white font-bold'>
          Domestic and International Flights
        </h5>
        <div className='home-main-section '>
          <div className='w-full lg:w-4/5 bg-white rounded-lg shadow-lg mx-auto p-5'>
            {/* Radio buttons top */}
            <FormControl className='w-full py-5'>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                className='flex justify-center space-x-5'
              >
                <FormControlLabel value="one-way" control={<Radio />} label="One-way" />
                <FormControlLabel value="round-trip" control={<Radio />} label="Round-trip" />
                <FormControlLabel value="multi-city" control={<Radio />} label="Multi-city" />
              </RadioGroup>
            </FormControl>
            <div className='flex flex-wrap items-center justify-center gap-5 p-5'>
              <div className='relative border border-black p-3 rounded-lg w-full sm:w-72'>
                <input className='outline-none w-full'
                  required
                  placeholder="From"
                  onClick={() => openSrc()}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
                {opensource &&
                  <div className="shadow-md z-20 ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll bg-white absolute top-full left-0 w-full h-72 lg:h-80">
                    {sourcedata && sourcedata.map((item, index) => (
                      <div className='p-2 hover:bg-blue-gray-50 ' key={index} onClick={() => { setSource(item.iata_code); setopensource(false); }}>
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
              <div className='relative border border-black p-3 rounded-lg w-full sm:w-72'>
                <input className='outline-none w-full'
                  required
                  placeholder="To"
                  onClick={() => opendesn()}
                  value={destination}
                  onChange={(e) => setdestination(e.target.value)}
                />
                {opendest &&
                  <div className="shadow-md ring-offset-2 z-20 ring-opacity-50 rounded-lg overflow-y-scroll bg-white absolute top-full left-0 w-full h-72 lg:h-80">
                    {destdata && destdata.slice(0, 6).map((item, index) => (
                      <div className='p-2 hover:bg-blue-gray-50' key={index} onClick={() => { setdestination(item.iata_code); setopendest(false); }}>
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
                <div className='w-full sm:w-72'>
                  <DatePicker
                    label="Departure"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    minDate={dayjs()}
                    className='w-full'
                  />
                </div>
                <div className='w-full sm:w-72'>
                  <DatePicker
                    label="Return"
                    disabled
                    className='w-full'
                  />
                </div>
              </LocalizationProvider>
              <div className='w-full sm:w-72'>
                <input className='border p-3 rounded-lg outline-none w-full'            
                  required
                  placeholder="Travellers and class"
                  value="1 Adult"
                  onClick={handleOpen}
                />
              </div>
              {/* <Travellers open={open} setOpen={setOpen} /> */}
            </div>
            <div className="flex justify-center mt-7 pb-4">
              <button onClick={() => navigatetoflightresults()} className='text-white bg-orange-400 hover:bg-orange-500 p-5 text-xl font-extrabold rounded-full w-full md:w-60'>
                SEARCH FLIGHTS
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-24">
          <img className='rounded-lg w-full lg:w-4/5' src='homeimg.png' alt='bannerHome' />
        </div>
      </div>
    </div>
  );
}
