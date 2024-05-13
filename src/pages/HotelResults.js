import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { gettingLocationURL, projectID, serachHOtelURL } from '../components/Constrains';
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

export default function HotelResults() {
    const searchParams = new URLSearchParams(window.location.search);
    let city = searchParams.get("city");
    let from = searchParams.get("from");
    let to = searchParams.get("to");
    console.log(city)

    const navigate = useNavigate();
    const { sethotelsearch, hotelData, HotelResults ,openLocation, setOpenLocation, hotelserach, sethotelLocationResults  } = useUser()

    // const [hotelLocation, setHotelLocation] = useState(city);
    // const [hotelserach, setHotelSearchResults] = useState([])
    const [value, setValue] = React.useState(dayjs(new Date()));
    const [checked, setChecked] = React.useState(true);



    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    //Hotel Results

    // const HotelResults = useMemo(async () => {
    //     try {
    //         let url;
    //         url = `${serachHOtelURL}?search={"location":"${city}"}`;
    //         const response = await axios.get(url, {
    //             headers: {
    //                 projectId: projectID,
    //             },
    //         });
    //         console.log("response---->", response.data.data.hotels);
    //         setHotelSearchResults(response.data.data.hotels)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, [city])
    // console.log(hotelserach);

    // useEffect(() => {
    //     HotelResults
    // }, [])

    const handleSearchHotel = () => {
        // setall(prev => ({ ...prev, inputValue: inputValue }));
        hotelserach && value && navigate(`/HotelResults/data?city=${hotelserach}&from=${value}&to=${value}`)
    }

    return (
        <div >
            <div>
                <Box sx={{ display: "flex", alignItems: 'center', flexWrap: "nowrap", padding: '30px', gap: "10px", justifyContent: "center", backgroundColor: "#2274E0", }}>

                    <Paper className="w-full h-72 p-5 ">

                        <Typography>Where</Typography>

                        <TextField sx={{ mt: 2 }} fullWidth type='text' position='relative' label='eg. - Area Landmark and Property Name'
                            value={hotelserach}
                            onChange={(e) => sethotelsearch(e.target.value)}
                            onClick={() => setOpenLocation(!openLocation)}
                        />
                        {openLocation && <Box className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg" sx={{ width: "300px", height: "auto", backgroundColor: "white", position: 'absolute', top: '150px', zIndex: '1', left: '50px' }}>
                            {hotelData && hotelData.map((item, index) => (
                                <div className='p-2 hover:bg-blue-gray-50' key={index} onClick={() => { sethotelsearch(item.location), setOpenLocation(false) }}>
                                    <div className='float-right'>
                                        <span>{item.location}</span>
                                    </div>

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
                        <Button onClick={handleSearchHotel}>Search</Button>
                    </Paper>

                </Box>

                <Grid container spacing={2}>
                    {/* =======================================Left Sidebar=============================== */}
                    <Grid item xs={3}>
                        <Paper elevation={3} >
                            <Box p={2}>
                                <Typography variant="h6" fontWeight={700}>Filters</Typography>
                                <p>showing 70 flights</p>
                                {/* Add your content here */}
                                <Typography variant="body1">
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />Hide multi check-in flights</Typography>
                                <Box>
                                    <Typography variant="body1" padding='20px' fontWeight={700}>Departure</Typography>
                                    <Typography display="flex" gap="20px" flexWrap='wrap'>
                                        <span style={{ color: "white", background: "blue", padding: "0.5rem", width: "8rem" }}>Before 6AM</span>
                                        <span style={{ color: "white", background: "blue", padding: "0.5rem", width: "8rem" }}>6AM - 12PM</span>
                                        <span style={{ color: "white", background: "blue", padding: "0.5rem", width: "8rem" }}>12PM - 6PM</span>
                                        <span style={{ color: "white", background: "blue", padding: "0.5rem", width: "8rem" }}>After 6PM</span>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" padding='20px' fontWeight={700}>Stops</Typography>
                                    <Typography display="flex" gap="20px" flexWrap='wrap'>
                                        <span style={{ color: "white", background: "blue", padding: "0.5rem", width: "8rem" }}>Direct</span>
                                        <span style={{ color: "white", background: "blue", padding: "0.5rem", width: "8rem" }}>1 Stop</span>
                                        <span style={{ color: "white", background: "blue", padding: "0.5rem", width: "8rem" }}>2+ Stop</span>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" padding='20px' fontWeight={700}>Price</Typography>
                                    <Slider />
                                </Box>
                                <Box>
                                    <Typography variant="body1" padding='20px' fontWeight={700}>Preferred Airlines</Typography>
                                    <Typography>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </Typography>
                                    <Typography>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </Typography>
                                    <Typography>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </Typography>

                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* ====================================Main Content============================== */}

                    <Grid item xs={9}>
                        <Paper elevation={3} sx={{ width: '91%', marginTop: '10px', marginLeft: '4%' }}>
                            <Box p={2} display="flex" flexDirection="row" justifyContent="space-between" >
                                <Typography variant="body1">Departure</Typography>
                                <Typography variant="body1">Duration</Typography>
                                <Typography variant="body1">Arrival</Typography>
                                <Typography variant="body1">Price</Typography>
                                <Typography variant="body1" className='pr-10'>Best</Typography>
                                {/* <Button variant="contained">Hide FARE</Button> */}
                            </Box>
                        </Paper>
                        {/* </Grid> */}

                        {/* <Grid item xs={9}> */}
                        {hotelData?.length > 0 && hotelData?.map((item, index) => (
                            <Paper key={index} elevation={5} sx={{ margin: "50px 30px", position: 'relative', width: '91%', height: '300px' }} >
                                <Box p={2} display="flex" flexDirection="row" justifyContent="space-between" >
                                    <Box sx={{ border: '1px solid red' }}>
                                        <img src={item.images[0]} className='w-48 h-48' />
                                        {item?.images.map((item, index) =>
                                            <Box key={index} display="flex" justifyContent="center">
                                                <img src={item} className='w-8 h-8' />
                                            </Box>
                                        )}
                                    </Box>

                                </Box>

                            </Paper>
                        ))}

                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
