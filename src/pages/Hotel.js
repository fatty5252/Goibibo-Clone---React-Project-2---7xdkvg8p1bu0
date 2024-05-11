import React from 'react';
import { Paper, TextField, Typography } from "@mui/material";
import { Card } from '@material-tailwind/react';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUser } from '../providers/UserProvider';


export default function Hotels() {
    const { hotelserach, sethotelsearch, hotelData, hotelResults } = useUser();
    console.log("hotelData--->", hotelData);
    console.log("hotelResults--->", hotelResults);

    const [value, setValue] = React.useState(dayjs('2022-04-17'));
    const [openLocation, setOpenLocation] = useState(false);

    

    return (
        // <div className="Train-main absolute" style={{marginTop:"100px"}}>
        //     <div className="train-bg">
        //         <Typography className='relative top-10 m-10'>hellooo</Typography>

        //     </div>

        // </div>
        <div className='hotel-bg' style={{ marginTop: "100px" }}>
            <div className="hotel-bg-front">
                <div className=" w-2/4">

                    <Typography className=''>Book Hotels & Homestays
                    </Typography>

                    <Paper className="w-full h-72 p-5 ">

                        <Typography>Where</Typography>

                        <TextField sx={{ mt: 2 }} fullWidth type='text' label='eg. - Area Landmark and Property Name'
                            value={hotelserach}
                            onChange={(e) => sethotelsearch(e.target.value)}
                        />

                        {openLocation &&
                            <Box className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg" sx={{ width: "300px", height: "auto", backgroundColor: "white", position: 'absolute', top: '58px', left: '0px' }}>
                                {destdata && destdata.slice(0, 6).map((item, index) => (
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
                    </Paper>
                </div>
            </div>



        </div>
    )
}