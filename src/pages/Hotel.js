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
    const {hotelserach, sethotelsearch, hotelData, hotelResults} = useUser();
    console.log("hotelData--->", hotelData);
    console.log("hotelResults--->", hotelResults);

  const [value, setValue] = React.useState(dayjs('2022-04-17'));

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
                        
                        <TextField sx={{mt:2}}  fullWidth type='text' label='eg. - Area Landmark and Property Name'
                        value={hotelserach}
                        onChange={(e)=>sethotelsearch(e.target.value)}
                        />
                        
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{mt:2}} components={['DatePicker', 'DatePicker']}>
                                <DatePicker  label="Departure"
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