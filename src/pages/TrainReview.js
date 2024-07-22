import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { projectID } from '../components/Constrains';

export default function TrainReview() {
  const navigate = useNavigate();
  const navigateToTrainPayment = () => {
    navigate("/TrainPayment");
  }
  const [singleTrainData, setSingleTrainData] = useState("");

  const searchParams = new URLSearchParams(window.location.search);
  const _id = searchParams.get("id");
  console.log(_id);

  const SingleTrainGet = async () => {
    try {
     const resopnse = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train/${_id}`, {
      headers: {
        projectId: projectID,
      },
     });
     setSingleTrainData(resopnse.data);
     console.log(resopnse);
  }
  catch(err){
    console.log(err);
  }
  }
  useEffect(()=>{
    SingleTrainGet();
  },[_id])


  return (
    <>
      <Box className='bg-[#FF6D38] pt-24 pl-24 h-60'>
        <h1 className='text-white font-rubik text-2xl py-2 text-wrap text-start font-bold '> 1295, Ndls </h1>
        <Box sx={{display:"flex"}}>
        <div className='text-white font-rubik text-2xl py-2 text-wrap text-start font-semibold, ml-2'> AC 3Tier </div>
        <div className='text-white font-rubik text-2xl py-2 text-wrap text-start font-semibold, ml-2'> General Quota </div>
        <div className='text-white font-rubik text-2xl py-2 text-wrap text-start font-semibold, ml-2'> Available </div>
        </Box>
      </Box>
      <Box className="flex gap-5 justify-center mt-[-40px]">
      <Box sx={{ width: '50%' }}>
        <Box className="flex flex-col">
        <Paper sx={{ width: '100%', padding:"20px"  }}>
          {/* Content for the left Paper */}
          <Box className="flex row justify-between ">
            <Box className="flex flex-col">
          <Typography sx={{fontSize:"14px", fontWeight:"400", color:"#8C8CBF"}}>Boarding from</Typography>
          <Box className="flex row-auto gap-5">
          <Box>
          <Box sx={{fontWeight:"500", fontSize:"16px"}}>5.00 PM</Box>
          <Box sx={{color:"#838383", fontSize:"14px"}}>9 Jul</Box>
          </Box>
          <Box>
          <Box sx={{fontWeight:"500", fontSize:"16px"}}>Mumbai Central</Box>
          <Box sx={{color:"#228BEA", fontSize:"14px"}} >Change Boarding Station</Box>
          </Box>
          </Box>
          </Box>
          <Box sx={{textAlign: "center", padding:"20px"}}>Hrs to reach</Box>
          <Box>
          <Typography sx={{fontSize:"14px", fontWeight:"400", color:"#8C8CBF"}}>Destination to</Typography>
          <Box className="flex row-auto gap-5">
          <Box>
          <Box sx={{fontWeight:"500", fontSize:"16px"}}>5.00 PM</Box>
          <Box sx={{color:"#838383", fontSize:"14px"}}>9 Jul</Box>
          </Box>
          <Box>
          <Box sx={{fontWeight:"500", fontSize:"16px"}}>Nagpur</Box>         
          </Box>
          </Box>
          </Box>
          </Box>
        </Paper>
        </Box>
        <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', padding:"20px", mt:"20px" }}>
          <Box sx={{fontWeight:"700", fontSize:"20px"}}>Your booking details will be sent to</Box>
          <TextField sx={{margin:"20px", width:"40%"}} id="outlined-search" label="Contact Number" type="search" />
          <TextField sx={{margin:"20px", width:"40%"}} id="outlined-search" label="Email ID (optional)" type="search" />
        </Paper>
        </Box>
        </Box>
      <Box sx={{ width: '30%' }}>
        <Paper sx={{ width: '100%', padding:"20px" }}>
          {/* Content for the right Paper */}
          <Box className="flex  justify-between ">
            <Box sx={{fontWeight:"700", fontSize:"20px"}} >Base Fare <span className='text-[#838383] text-lg'>Per Person</span></Box>
          <Box sx={{fontWeight:"700", fontSize:"20px"}}>Rs. 399</Box>
          </Box>
          <Button onClick={()=>navigateToTrainPayment()} sx={{background:"#FF6D38", width:"80%", textAling:"center", margin:"20px"}} variant="contained">Proceed to Payment</Button>
          <Box className="bg-[#E0E4EA] p-5">By proceeding to payment, I confirm that I agree to the <a className='text-blue-700' href='https://gotrains.goibibo.com/v1/cancellation/policy'>Cancellation Policy</a>  and <a className='text-blue-700' href='https://www.goibibo.com/info/terms-of-services/'> Terms of Service </a></Box>
        </Paper>
      </Box>
    </Box>
    </>
  )
}
