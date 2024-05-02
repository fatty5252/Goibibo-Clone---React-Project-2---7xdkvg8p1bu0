import React, { useEffect, useMemo, useState } from 'react'
import { projectID } from '../components/Constrains';
import axios from 'axios';
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


export default function FlightResults() {

  const { source, setSource, destination, setdestination, sourcedata, setsourceData,
    destdata, setdestData, opensource, setopensource, opendest, setopendest, openSrc, opendesn, getAirlineInfo } = useUser();

  const searchparams = new URLSearchParams(window.location.search);
  const flightsource = searchparams.get('source')
  const flightdestination = searchparams.get('destination')
  const day = searchparams.get('day')

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  // console.log(flightFrom)
  const [checked, setChecked] = React.useState(true);
  const [flightSerchData, setFlightsearch] = useState([]);
  const [singleFlightData, setSingleFlightData] = useState({})

  const [flightDetails, setFlightDetails] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleFlightDetails = (index) => {
    if (selectedCardIndex === index) {
      setFlightDetails(false);
      setSelectedCardIndex(null);
    } else {
      setFlightDetails(true);
      setSelectedCardIndex(index);
    }
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const FlightSearch = useMemo(async () => {
    try {
      let url;
      url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${flightsource}","destination":"${flightdestination}"}&day=${day}`;
      const response = await axios.get(url, {
        headers: {
          projectId: projectID,
        },
      });
      setFlightsearch(response.data.data.flights);
      console.log(response.data.data.flights);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, [flightsource, flightdestination, day])

  const SingleFlightSearch = async (flightId) => {
    try {
      let url;
      url = `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId}`;
      const response = await axios.get(url, {
        headers: {
          projectId: projectID,
        },
      });
      setSingleFlightData(response.data.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FlightSearch
  }, [])
  
  const navigatetoflightresults = () => {
    navigate(`/FlightResult/data?source=${source}&destination=${destination}&day=${day}`)
  }


  return (
    <div>
      <Box sx={{ display: "flex", alignItems: 'center', flexWrap: "nowrap", padding: '30px', gap: "10px", justifyContent: "center", backgroundColor: "#2274E0", }}>
        <Box sx={{ position: 'relative' }}>
          <TextField
            required
            id="outlined-required"
            label="From"
            // placeholder='Enter city airport'
            // defaultValue="Enter city airport"
            onClick={() => openSrc()}
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          {opensource &&
            <Box sx={{ width: "300px", height: "300px", backgroundColor: "grey", position: 'absolute', top: '50px', left: '0px' }}>
              {sourcedata && sourcedata.map((item, index) => (
                <div key={index} onClick={() => { setSource(item.iata_code), setopensource(false) }}>
                  <div>
                    <img src="https://gos3.ibcdn.com/flightIcon-1675492260.png" alt="flight Icon" />
                    <p>{item.city}</p>
                    <p>{item.country}</p>
                    <p>{item.iata_code}</p>
                    <p>{item.country.slice(0, 2)}</p>
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </Box>}
        </Box>
        <Box sx={{ position: "relative" }}>
          {/* <CompareArrowsOutlinedIcon sx={{ color: "blue", fontSize: "40px", backgroundColor: 'white', borderRadius: '100%' }} /> */}
          <TextField sx={{ transform: "initial", transition: "ease-out 3s" }}
            required
            id="outlined-required"
            label="To"
            onClick={() => opendesn()}
            value={destination}
            onChange={(e) => setdestination(e.target.value)}
          // placeholder='Enter city airport'
          // defaultValue="Enter city airport"
          />
          {opendest &&
            <Box sx={{ width: "300px", height: "300px", backgroundColor: "red", position: "absolute", top: "50px", left: "0px" }}>
              {destdata && destdata.map((item, index) => (
                <div key={index} onClick={() => { setdestination(item.iata_code), setopendest(false) }}>
                  <div>
                    <img src="https://gos3.ibcdn.com/flightIcon-1675492260.png" alt="flight Icon" />
                    <p>{item.city}</p>
                    <p>{item.country}</p>
                    <p>{item.iata_code}</p>
                    <p>{item.country.slice(0, 2)}</p>
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </Box>}
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
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
        <TextField
          required
          id="outlined-required"
          label="Travellers and class"
          // placeholder='Enter city airport'
          defaultValue="1 Adult"
          onClick={handleOpen}
        />
        {/* Travellers component call */}

        <Travellers open={open} setOpen={setOpen} />

        {/* Travellers component call */}

        <Button variant='contained' onClick={()=>navigatetoflightresults()}>Update search</Button>
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
          <Paper elevation={3}>
            <Box p={2} display="flex" flexDirection="row" justifyContent="space-between" >
              <Typography variant="body1">Departure</Typography>
              <Typography variant="body1">Duration</Typography>
              <Typography variant="body1">Arrival</Typography>
              <Typography variant="body1">Price</Typography>
              <Typography variant="body1">Best</Typography>
              {/* <Button variant="contained">Hide FARE</Button> */}
            </Box>
          </Paper>
          {/* </Grid> */}

          {/* <Grid item xs={9}> */}
          {flightSerchData && flightSerchData.map((item, index) => (

            <Paper elevation={3} sx={{ margin: "50px", height: `${flightSerchData && selectedCardIndex === index ? '300px' : '100px'}`, position: 'relative' }} key={index}>
              <Box p={2} display="flex" flexDirection="row" justifyContent="space-between" >
                <img src={getAirlineInfo(item.flightID.slice(0, 2)).logoSrc} />
                <Typography variant="body1">{getAirlineInfo(item.flightID.slice(0, 2)).airlineName}</Typography>
                <Typography variant="body1">{item.departureTime}</Typography>
                <Typography variant="body1">{item.duration}</Typography>
                <Typography variant="body1">{item.arrivalTime}</Typography>
                <Typography variant="body1">{item.ticketPrice}</Typography>
                <Button variant="contained">BOOK</Button>

                <Typography variant="body1" onClick={() => { handleFlightDetails(index), SingleFlightSearch(item._id) }}>Flight Details</Typography>
              </Box>

             {flightSerchData && singleFlightData && selectedCardIndex === index && 
             <Paper elevation={3} sx={{ margin: "50px"}} key={index}>
                <Box p={2} display="flex" flexDirection="row" justifyContent="space-between" >
                  <img src={getAirlineInfo(singleFlightData?.flightID?.slice(0, 2)).logoSrc} />
                  <Typography variant="body1">{getAirlineInfo(singleFlightData?.flightID?.slice(0, 2)).airlineName}</Typography>
                  <Typography variant="body1">{singleFlightData.departureTime}</Typography>
                  <Typography variant="body1">{singleFlightData.duration}</Typography>
                  <Typography variant="body1">{singleFlightData.arrivalTime}</Typography>
                  <Typography variant="body1">{singleFlightData.ticketPrice}</Typography>
                </Box>
              </Paper>}
            </Paper>
          ))}
          {/* {flightSerchData && selectedCardIndex===index &&
            <Paper elevation={3} sx={{ width:'200px', height:'300px', margin: "50px", bgcolor:'red', position:'absolute', zIndex:'1' }}></Paper>
          } */}
          {/* <Typography variant="body1">Best</Typography> */}
        </Grid>
      </Grid>
    </div>
  )
}
