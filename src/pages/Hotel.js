import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Button, Card } from '@material-tailwind/react';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUser } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { AddBoxOutlined } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Hotels() {

    const navigate = useNavigate();
    const { hotelserach, sethotelsearch, hotelData, hotelLocationResults, getToken } = useUser();
    const [openLocation, setOpenLocation] = useState(false);

    // console.log("hotelData--->", hotelData);
    // console.log("hotelLocationResults--->", hotelLocationResults);

    const [value, setValue] = React.useState(dayjs(new Date()));

    const handleSearchHotel = () => {
        if (getToken && hotelserach && value){
        hotelserach && value && navigate(`/HotelResults/data?city=${hotelserach}&from=${value}&to=${value}`)     
    }
    else if (!hotelserach){
        toast.error("Please Enter City Name")
    }
    else if (!value){
        toast.error("Please Select Date")
    }
    else if (!getToken){
        toast.error("Please Login First")
    }
    }

    return (

        <div className='pt-16 h-screen'>
            <ToastContainer position='top-right'/>
            <div className="bg-orange-400 rounded-full h-3/5 absolute w-3/5 -ml-5 rounded-tl-lg rounded-tr-lg border-[10px] border-solid border-[#FFE4DC]">
                <div className=" w-2/4">

                    <Box className="text-white font-bold font-rubik font-sans text-center text-xl pt-10">Book Hotels & Homestays
                    </Box>
                    <div className='ml-16'>
                        <Paper sx={{ width: "150%", height:"350px", borderRadius:"20px" }} className="relative mt-5 p-5" >
                            {/* =========================Radio buttons=================== */}
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="checked"
                                        control={<Radio />}
                                        label="India"
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="International"
                                    />                                  
                                </RadioGroup>
                            </FormControl>
                            <Typography sx={{ color: "#858585" }}>Where</Typography>
                            <TextField id="standard-basic" fullWidth type='text' placeholder='eg. - Area Landmark and Property Name' variant="standard" sx={{ paddingTop: "10px" }}
                                value={hotelserach}
                                onChange={(e) => sethotelsearch(e.target.value)}
                                onClick={() => setOpenLocation(!openLocation)} />
                            {openLocation &&
                                <Box className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll" sx={{ width: "400px", height: "350px", backgroundColor: "white", position: 'absolute', top: '135px', zIndex: '20', left: '30px' }}>
                                    {Array.from(hotelData).map((item, index) => (
                                        <div className='p-5 hover:bg-blue-gray-50 font-rubik text-xl' key={index} onClick={() => { sethotelsearch(item), setOpenLocation(false) }}>
                                            <div className='float-right'>
                                                <span>{item}</span>
                                                {/* <span><img className='size-5' src='flag.png' alt='flag' /></span> */}
                                            </div>
                                            {/* <div className='flex p-1'>
                                        <img className='size-7' src="https://gos3.ibcdn.com/flightIcon-1675492260.png" alt="flight Icon" />
                                        <div className='flex flex-row'>
                                            <p className='p-1 font-bold'>{item.city},</p>
                                            <p className='p-1 font-bold'>{item.country}</p>
                                            <p className='p-1'>[{item.iata_code}]</p>
                                        </div>
                                    </div> */}
                                            {/* <p className='ml-8 text-sm'>{item.name}</p> */}
                                        </div>
                                    ))}
                                </Box>}

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer sx={{ mt: 2 }} components={['DatePicker', 'DatePicker']}>
                                    <DatePicker label="Cheack-In"
                                        // defaultValue={dayjs('2022-04-17')}
                                        placeholder={value}
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                        minDate={dayjs()} // Disable previous dates
                                    />
                                    <DatePicker
                                        label="Cheack-out"
                                        placeholder={value}
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                          disabled="true"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <Box className="p-3" >Guest & Adults</Box>
                            {/* <Button onClick={handleSearchHotel}>Search</Button> */}
                            <Box className="flex justify-center mt-4 p-10">
                                <button onClick={handleSearchHotel} className='text-white bg-[#FF6D38] text-center p-5 text-xl font-extrabold rounded-full w-60'>SEARCH</button>
                            </Box>
                        </Paper>
                    </div>
                </div>
            </div>



        </div>
    )
}