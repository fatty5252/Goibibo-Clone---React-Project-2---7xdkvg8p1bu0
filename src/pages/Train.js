
import { Carousel } from '@material-tailwind/react'
import { Typography } from '@mui/material'
import React from 'react'

export default function Train() {
  return (
    <div className="Train-main">
            <div className="train-bg">
              <div className='relative top-10 border-spacing-5 bg-front'>
                <Typography style={{color:"black"}}> 
                  Train Ticket Booking
                </Typography>
                <div className='flex items-center'>
                <Typography>
                <img alt="Irctc text logo" src="https://gos3.ibcdn.com/irctcWithTxt-1668596751.svg" width="45" height="45"/>
                  IRCTC Authorized Partner
                </Typography>
                </div>
                </div>
            </div>
{/* 
            <Carousel className="rounded-xl w-30 h-30">
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel> */}
        
        </div>
  )
}


