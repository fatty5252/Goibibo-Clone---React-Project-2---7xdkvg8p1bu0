import React from 'react'
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
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  


  return (
    <div className='home-main'>
      <div className='home-background'>
        <Typography variant='h5' sx={{textAlign:"center", p:"12px", color:"white", fontWeight:'700' }}>Domestic and International Flights</Typography>
      <div className='home-main-section'>
      <Paper sx={{width:'90vw', padding:'100px 30px', height:'60vh', backgroundColor:'white', borderRadius:'20px', boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.5)'}}>  
      <Box sx={{display: "flex",alignItems:'center',}}>
      <TextField
          required
          id="outlined-required"
          label="From"
          // placeholder='Enter city airport'
          defaultValue="Enter city airport"
        />
      <CompareArrowsOutlinedIcon sx={{color:"blue", fontSize:"40px",p:'3px', backgroundColor:'white', borderRadius:'100%'}}/>
      <TextField
          required
          id="outlined-required"
          label="To"
          // placeholder='Enter city airport'
          defaultValue="Enter city airport"
        />
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider> */}
        {/* <input className='p-5' type='date'/>
        <input className='p-5' type='date'/> */}
         <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
        <DatePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
        <TextField
          required
          id="outlined-required"
          label="To"
          // placeholder='Enter city airport'
          defaultValue="1 Adult"
          onClick={handleOpen}
        />
        <Travellers open={open} setOpen={setOpen}/>
        </Box>
      </Paper>
      </div>
      </div>
    </div>
  )
}

