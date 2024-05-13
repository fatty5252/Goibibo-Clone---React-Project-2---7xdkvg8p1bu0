import React, { useState } from 'react';
import { Box, Paper, TextField, Typography } from "@mui/material";
import { Button, Card } from '@material-tailwind/react';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUser } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';


export default function Hotels() {

    const navigate = useNavigate();
    const { hotelserach, sethotelsearch, hotelData, hotelLocationResults } = useUser();
    const [openLocation, setOpenLocation] = useState(false);

    console.log("hotelData--->", hotelData);
    console.log("hotelLocationResults--->", hotelLocationResults);

    const [value, setValue] = React.useState(dayjs(new Date()));

    const handleSearchHotel = () => {
        // setall(prev => ({ ...prev, inputValue: inputValue }));
        hotelserach && value && navigate(`/HotelResults/data?city=${hotelserach}&from=${value}&to=${value}`)
        // console.log("search clicked");
    }

    return (
       
        <div className=''>
            <div className="bg-orange-400 rounded-full h-3/5 absolute w-3/5 -ml-5 rounded-tl-lg rounded-tr-lg ">
                <div className=" w-2/4">

                    <Typography className=''>Book Hotels & Homestays
                    </Typography>
                    <div className='ml-60'>
                        <Paper style={{ width: "220%" }} className=" h-96 mt-11 p-5  ">

                            <Typography>Where</Typography>

                            <TextField sx={{ mt: 3 }} fullWidth type='text' position='relative' label='eg. - Area Landmark and Property Name'
                                value={hotelserach}
                                onChange={(e) => sethotelsearch(e.target.value)}
                                onClick={() => setOpenLocation(!openLocation)}
                            />
                            {openLocation && <Box className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg" sx={{ width: "300px", height: "auto", backgroundColor: "white", position: 'absolute', top: '150px', zIndex: '1', left: '50px' }}>
                                {hotelData && hotelData.map((item, index) => (
                                    <div className='p-2 hover:bg-blue-gray-50' key={index} onClick={() => { sethotelsearch(item.location), setOpenLocation(false) }}>
                                        <div className='float-right'>
                                            <span>{item.location}</span>
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
                                    <DatePicker label="Departure"
                                        // defaultValue={dayjs('2022-04-17')}
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                    />
                                    <DatePicker
                                        label="Return"
                                    // value={value}
                                    // onChange={(newValue) => setValue(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            {/* <Button onClick={handleSearchHotel}>Search</Button> */}
                            <Box className="flex justify-center mt-4 p-10">
                                <button onClick={handleSearchHotel} className='text-white bg-orange-400 hover:bg-orange-500 p-5 text-xl font-extrabold rounded-full mt-20 w-60'>SEARCH</button>
                            </Box>
                        </Paper>
                    </div>
                </div>
            </div>



        </div>
    )
}