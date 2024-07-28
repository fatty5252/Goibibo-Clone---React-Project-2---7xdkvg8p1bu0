import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  gettingLocationURL,
  projectID,
  serachHOtelURL,
} from "../components/Constrains";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Checkbox,
  Slider,
  Rating,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { useUser } from "../providers/UserProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import Travellers from "../components/Travellers";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HotelResults() {
  const searchParams = new URLSearchParams(window.location.search);
  let city = searchParams.get("city");
  let from = searchParams.get("from");
  let to = searchParams.get("to");
  // console.log(city);

  const navigate = useNavigate();
  const {
    sethotelsearch,
    hotelData,
    HotelResults,
    openLocation,
    setOpenLocation,
    hotelserach,
    sethotelLocationResults,
    hotelLocationResults,
  } = useUser();

  const navigateToHotelRooms = (id) => {
    localStorage.getItem("token") ? 
    navigate(
      `/HotelRooms/data?search=${hotelserach}&id=${id}`
    ) :
    toast("Please Login First");

  }

  const HotelSearch = useMemo(async () => {
    try {
      const response = await axios.get(`${serachHOtelURL}?search={"location":"${hotelserach}"}`, 
        {
        headers: {
          projectId: projectID,
        },
      });
        sethotelLocationResults(response.data.data.hotels)
    } catch (err) {
      console.log(err);
    }
  },[hotelserach, openLocation])
  console.log("hotel Location data====>", hotelLocationResults);
  useEffect(() => {
    sethotelsearch(city);
    HotelSearch; 
    HotelFilter("+1");
  }, [city]);

  


  // const [hotelLocation, setHotelLocation] = useState(city);
  // const [hotelserach, setHotelSearchResults] = useState([])
  const [value, setValue] = React.useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const HotelFilter=async(value)=>{
    try{
        let url;
        url = `${serachHOtelURL}?search={"location":"${hotelserach}"}&sort={"avgCostPerNight":${Number(value)}}`;
        const responce = await axios.get(url, {
          headers: {
            projectId: projectID,
          },
        });  
        sethotelLocationResults(responce.data.data.hotels);           
        console.log(HotelFilter);
    }
    catch(err) {
       console.log(err);
    }
  }


  const handleSearchHotel = () => {
    // setall(prev => ({ ...prev, inputValue: inputValue }));
    hotelserach &&
      value &&
      navigate(
        `/HotelResults/data?city=${hotelserach}&from=${value}&to=${value}`
      );
  };

  return (
    <div>
      <ToastContainer position="top-right"/>
      <div className="pt-20">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          padding: '30px',
          gap: '10px',
          justifyContent: 'center',
          backgroundColor: '#FE6E37',
        }}
      >
        <div className='flex items-center flex-col'>
          <span className='text-white font-bold text-xl'>
            AREA, LANDMARK OR PROPERTY NAME
          </span>
          <input className='p-5 border text-xl font-bold outline-none rounded-3xl'
            style={{ marginTop: '20px', width: '400px' }}
            type='text'
            placeholder='eg. - Area Landmark and Property Name'
            value={hotelserach}
            onChange={(e) => sethotelsearch(e.target.value)}
            onClick={() => setOpenLocation(!openLocation)}
          />
        </div>
        {openLocation && (
          <div className='overflow-y-scroll'
            style={{
              width: '400px',
              height: '400px',
              backgroundColor: 'white',
              position: 'absolute',
              top: '220px',
              zIndex: '1',
              left: '240px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
              borderRadius: '5px',
            }}
          >
            {Array.from(hotelData).map((item, index) => (
             <div className='p-5 hover:bg-blue-gray-50 font-rubik text-xl' key={index} onClick={() => { sethotelsearch(item), setOpenLocation(false) }}>
             <div className='float-right'>
                 <span>{item}</span>
             </div>
             </div>
            ))}
          </div>
        )}
        <div className='flex items-center flex-col'>
          <span className='text-white font-bold text-xl'>CHECKIN</span>
          <input  className='p-5 border text-xl font-bold outline-none rounded-3xl'
            type='date'
            style={{ marginTop: '20px' }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min={new Date()}
          />
        </div>
        <div className='flex items-center flex-col'>
          <span className='text-white font-bold text-xl'>CHECKOUT</span>
          <input className='p-5 border text-xl font-bold outline-none rounded-3xl'
            type='date'
            style={{ marginTop: '20px' }}
            disabled
            value={value}
          />
        </div>
        <button
          onClick={handleSearchHotel}
          style={{
            marginTop: '40px',
            padding: '20px 30px',
            backgroundColor: 'white',
            color: '#2877D6',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: "800",
            fontSize: "20px"
            
          }}
        >
          Update Search
        </button>
      </div>

        <Grid container spacing={2}>
          {/* =======================================Left Sidebar=============================== */}
          <Grid item xs={3}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6" fontWeight={700}>
                  Filters
                </Typography>
                <p>showing 70 flights</p>
                {/* Add your content here */}
                {/* <Typography variant="body1">
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Hide multi check-in flights
                </Typography> */}
                {/* <Box>
                  <Typography variant="body1" padding="20px" fontWeight={700}>
                    Departure
                  </Typography>
                  <Typography display="flex" gap="20px" flexWrap="wrap">
                    <span
                      style={{
                        color: "white",
                        background: "blue",
                        padding: "0.5rem",
                        width: "8rem",
                      }}
                    >
                      Before 6AM
                    </span>
                    <span
                      style={{
                        color: "white",
                        background: "blue",
                        padding: "0.5rem",
                        width: "8rem",
                      }}
                    >
                      6AM - 12PM
                    </span>
                    <span
                      style={{
                        color: "white",
                        background: "blue",
                        padding: "0.5rem",
                        width: "8rem",
                      }}
                    >
                      12PM - 6PM
                    </span>
                    <span
                      style={{
                        color: "white",
                        background: "blue",
                        padding: "0.5rem",
                        width: "8rem",
                      }}
                    >
                      After 6PM
                    </span>
                  </Typography>
                </Box> */}
                {/* <Box>
                  <Typography variant="body1" padding="20px" fontWeight={700}>
                    Stops
                  </Typography>
                  <Typography display="flex" gap="20px" flexWrap="wrap">
                    <span
                      style={{
                        color: "white",
                        background: "blue",
                        padding: "0.5rem",
                        width: "8rem",
                      }}
                    >
                      Direct
                    </span>
                    <span
                      style={{
                        color: "white",
                        background: "blue",
                        padding: "0.5rem",
                        width: "8rem",
                      }}
                    >
                      1 Stop
                    </span>
                    <span
                      style={{
                        color: "white",
                        background: "blue",
                        padding: "0.5rem",
                        width: "8rem",
                      }}
                    >
                      2+ Stop
                    </span>
                  </Typography>
                </Box> */}
                      <Box>
                <Typography variant="body1" padding="20px" fontWeight={700}>
                  Price
                </Typography>
                <Typography display="flex" gap="20px" flexWrap="wrap">
                  <Button onClick={()=>{HotelFilter("-1")}}
                    style={{
                      color: "white",
                      background: "blue",
                      padding: "0.5rem",
                      width: "8rem",
                    }}
                  >
                    High To Low
                  </Button>
                  <Button onClick={()=>{HotelFilter("1")}}
                    style={{
                      color: "white",
                      background: "blue",
                      padding: "0.5rem",
                      width: "8rem",
                    }}
                  >
                    Low To High
                  </Button>
                  
                </Typography>
              </Box>
                {/* <Box>
                  <Typography variant="body1" padding="20px" fontWeight={700}>
                    Price
                  </Typography>
                  <Slider />
                </Box> */}
                {/* <Box>
                  <Typography variant="body1" padding="20px" fontWeight={700}>
                    Preferred Airlines
                  </Typography>
                  <Typography>
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Typography>
                  <Typography>
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Typography>
                  <Typography>
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Typography>
                </Box> */}
              </Box>
            </Paper>
          </Grid>

          {/* ====================================Main Content============================== */}

          <Grid item xs={9}>
            <Box>
              {hotelLocationResults?.length > 0 &&
                hotelLocationResults?.map((item, index) => (
                  <Paper onClick={()=>navigateToHotelRooms(item._id)}
                    key={index}
                    elevation={5}
                    sx={{
                      margin: "50px 30px",
                      position: "relative",
                      width: "91%",
                      height: "300px",
                      "&:hover": {
                        cursor: "pointer",
                        border: "2px solid blue",
                      },
                    }}
                  >
                    <Box
                      p={2}
                      display="flex"
                      flexDirection="row"
                      justifyContent="start"
                    >
                      <Box
                        sx={{
                          // border:"2px solid blue",
                          gap: "30px",
                          width: "18rem",
                        }}
                      >
                        <img
                          src={item.images[0]}
                          className=" h-48 rounded-lg w-[100%]"
                        />
                        <div className="flex justify-between row h-20 ">
                          {item?.images.map((item, index) => (
                            <Box
                              key={index}
                              display="flex"
                              flexDirection="row"
                              justifyContent="center"
                            >
                              <img
                                src={item}
                                className="w-12 rounded-lg ml-2 m-1"
                              />
                            </Box>
                          ))}
                        </div>
                      </Box>
                      <Box sx={{ marginLeft: "30px" }}>
                        <span className="flex items-center gap-2 text-xl font-bold">
                          <Rating
                            name="read-only"
                            value={item.rating}
                            readOnly
                          />
                          HOTEL
                        </span>
                        <Box className="text-2xl p-3 font-bold ">
                          {item.name}
                        </Box>
                        <Box className="text-xl text-blue-600">
                          <img src="https://gos3.ibcdn.com/map-1626422501.png"/>
                          {item.location}
                        </Box>
                      </Box>
                      <Box className="flex flex-col justify-end ml-32">
                        <Box className="text-xl">
                          <strike className="text-gray-950 opacity-50 text-l">
                            ₹{Math.round(item.avgCostPerNight + 2000)}
                          </strike>
                          <b className="ml-3 text-2xl">
                            {" "}
                            ₹{Math.round(item.avgCostPerNight)}
                          </b>
                        </Box>
                        <p>+ ₹{Math.round(item.avgCostPerNight/18)} TAXES & FEES</p>
                        <p className="text-gray-950 opacity-55 text-xl">
                          <b>1 room</b> per night
                        </p>
                      </Box>
                    </Box>
                  </Paper>
                ))}
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
