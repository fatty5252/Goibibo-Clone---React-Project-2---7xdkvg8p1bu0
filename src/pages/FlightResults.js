import React, { useEffect, useMemo, useState } from "react";
import { projectID } from "../components/Constrains";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Checkbox,
  Slider,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FlightResults() {
  const {
    source,
    setSource,
    destination,
    setdestination,
    sourcedata,
    setsourceData,
    destdata,
    setdestData,
    opensource,
    setopensource,
    opendest,
    setopendest,
    openSrc,
    opendesn,
    getAirlineInfo,
    getToken,
  } = useUser();

  const searchparams = new URLSearchParams(window.location.search);
  const flightsource = searchparams.get("source");
  const flightdestination = searchparams.get("destination");
  const day = searchparams.get("day");

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [value, setValue] = React.useState(dayjs(new Date()));
  // console.log(flightFrom)
  const [checked, setChecked] = React.useState(true);
  const [flightSerchData, setFlightsearch] = useState([]);
  const [singleFlightData, setSingleFlightData] = useState({});

  const [flightDetails, setFlightDetails] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleFlightDetails = (index) => {
    if (selectedCardIndex === index) {
      setFlightDetails(false);
      setSelectedCardIndex(null);
    } else {
      setFlightDetails(true);
      setSelectedCardIndex(index);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useMemo(async () => {
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
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, [flightsource, flightdestination, day]);

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
    FlightFilter("+1");
    setSource(flightsource);
    setdestination(flightdestination);
  }, [flightsource, flightdestination]);

  const FlightFilter = async (value) => {
    try {
      let url;
      url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${flightsource}","destination":"${flightdestination}"}&day=${day}&sort={"ticketPrice":${Number(
        value
      )}}`;
      const responce = await axios.get(url, {
        headers: {
          projectId: projectID,
        },
      });
      setFlightsearch(responce.data.data.flights);
    } catch (err) {
      console.log(err);
    }
  };

  const navigatetoflightresults = () => {
    source &&
      destination &&
      navigate(
        `/FlightResult/data?source=${source}&destination=${destination}&day=${day}`
      );
  };
  const navigatetoflightReview = (id) => {
    if (getToken && source && destination && day) {
      navigate(
        `/FlightReview/data?source=${source}&destination=${destination}&day=${day}&id=${id}`
      );
    } else if (!getToken) {
      toast.error("Please Login to continue");
    }

    //  getToken ? navigate(
    //     `/FlightReview/data?source=${source}&destination=${destination}&day=${day}&id=${id}`
    //   ) : toast("Please Login to continue");
  };

  return (
    <div className="h-[200vh]">
      <ToastContainer position="top-right" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          padding: "30px",
          gap: "10px",
          justifyContent: "center",
          backgroundColor: "#2274E0",
          paddingTop: "120px",
        }}
      >
        <Box sx={{ position: "relative" }}>
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
          {opensource && (
            <Box
              className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg"
              sx={{
                width: "300px",
                height: "auto",
                backgroundColor: "white",
                position: "absolute",
                top: "58px",
                left: "0px",
              }}
            >
              {sourcedata &&
                sourcedata.slice(0, 6).map((item, index) => (
                  <div
                    className="p-2  hover:bg-blue-gray-50"
                    key={index}
                    onClick={() => {
                      setSource(item.iata_code), setopensource(false);
                    }}
                  >
                    <div className="float-right">
                      <span className="capitalize">
                        {item.country.slice(0, 2)}
                        <img className="size-5" src="flag.png" alt="flag" />
                      </span>
                    </div>
                    <div className="flex p-1">
                      <img
                        className="size-7"
                        src="https://gos3.ibcdn.com/flightIcon-1675492260.png"
                        alt="flight Icon"
                      />
                      <div className="flex flex-row">
                        <p className="p-1 font-bold">{item.city},</p>
                        <p className="p-1 font-bold">{item.country}</p>
                        <p className="p-1">[{item.iata_code}]</p>
                      </div>
                    </div>
                    <p className="ml-8 text-sm">{item.name}</p>
                  </div>
                ))}
            </Box>
          )}
        </Box>
        <Box sx={{ position: "relative" }}>
          {/* <CompareArrowsOutlinedIcon sx={{ color: "blue", fontSize: "40px", backgroundColor: 'white', borderRadius: '100%' }} /> */}
          <TextField
            sx={{ transform: "initial", transition: "ease-out 3s" }}
            required
            id="outlined-required"
            label="To"
            onClick={() => opendesn()}
            value={destination}
            onChange={(e) => setdestination(e.target.value)}
            // placeholder='Enter city airport'
            // defaultValue="Enter city airport"
          />
          {opendest && (
            <Box
              className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg"
              sx={{
                width: "300px",
                height: "auto",
                backgroundColor: "white",
                position: "absolute",
                top: "58px",
                left: "0px",
                zIndex: "40",
              }}
            >
              {destdata &&
                destdata.slice(0, 6).map((item, index) => (
                  <div
                    className="p-2 hover:bg-blue-gray-50"
                    key={index}
                    onClick={() => {
                      setdestination(item.iata_code), setopendest(false);
                    }}
                  >
                    <div className="float-right">
                      <span>{item.country.slice(0, 2)}</span>
                      <span>
                        <img className="size-5" src="flag.png" alt="flag" />
                      </span>
                    </div>
                    <div className="flex p-1">
                      <img
                        className="size-7"
                        src="https://gos3.ibcdn.com/flightIcon-1675492260.png"
                        alt="flight Icon"
                      />
                      <div className="flex flex-row">
                        <p className="p-1 font-bold">{item.city},</p>
                        <p className="p-1 font-bold">{item.country}</p>
                        <p className="p-1">[{item.iata_code}]</p>
                      </div>
                    </div>
                    <p className="ml-8 text-sm">{item.name}</p>
                  </div>
                ))}
            </Box>
          )}
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Departure"
              // defaultValue={dayjs('2022-04-17')}
              value={value}
              onChange={(newValue) => setValue(newValue)}
              minDate={dayjs()} // Disable previous dates
            />
            <DatePicker
              label="Return"
              disable="true"
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
          value="1 Adult"
          onClick={handleOpen}
        />
        {/* Travellers component call */}

        {/* <Travellers open={open} setOpen={setOpen} /> */}

        {/* Travellers component call */}

        <Button
          variant="contained"
          style={{ backgroundColor: "orangered", color: "white" }}
          onClick={() => navigatetoflightresults()}
        >
          Update search
        </Button>
      </Box>

      <Grid p={2} container spacing={2}>
        {/* =======================================Left Sidebar=============================== */}
        <Grid item xs={3}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h6" fontWeight={700}>
                Filters
              </Typography>
              <p className="p-2 font-semibold text-xl">
                Showing {flightSerchData.length} Flights
              </p>
              {/* Add your content here */}
              <Typography variant="body1">
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                Hide multi check-in flights
              </Typography>
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
                  <Button
                    onClick={() => {
                      FlightFilter("-1");
                    }}
                    style={{
                      color: "white",
                      background: "blue",
                      padding: "0.5rem",
                      width: "8rem",
                    }}
                  >
                    High To Low
                  </Button>
                  <Button
                    onClick={() => {
                      FlightFilter("1");
                    }}
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
          <Paper
            elevation={3}
            sx={{ width: "91%", marginTop: "10px", marginLeft: "4%" }}
          >
            <Box
              p={2}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="body1">Departure</Typography>
              <Typography variant="body1">Duration</Typography>
              <Typography variant="body1">Arrival</Typography>
              <Typography variant="body1">Price</Typography>
              <Typography variant="body1" className="pr-10">
                Best
              </Typography>
              {/* <Button variant="contained">Hide FARE</Button> */}
            </Box>
          </Paper>
          {/* </Grid> */}

          {/* <Grid item xs={9}> */}
          {flightSerchData &&
            flightSerchData.map((item, index) => (
              <Paper
                elevation={3}
                sx={{
                  margin: "50px",
                  height: `${
                    flightSerchData && selectedCardIndex === index
                      ? "300px"
                      : "110px"
                  }`,
                  position: "relative",
                }}
                key={index}
              >
                <Box
                  p={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Box>
                    <Box>
                      <Box display="flex" flexDirection="row">
                        <img
                          src={
                            getAirlineInfo(item.flightID.slice(0, 2)).logoSrc
                          }
                          className="w-5"
                        />
                        <Typography variant="body1" className=" p-1">
                          {
                            getAirlineInfo(item.flightID.slice(0, 2))
                              .airlineName
                          }
                        </Typography>
                      </Box>
                      <Typography variant="p" className="text-gray-400 pl-4">
                        {item.source}
                      </Typography>
                    </Box>
                    <Typography
                      variant="p"
                      className=" text-black bold pl-2 text-xl"
                    >
                      {item.departureTime}
                    </Typography>
                  </Box>

                  <Typography variant="p" className="p-4 pl-16 text-xl">
                    {item.duration}
                  </Typography>
                  <Box>
                    <Box>
                      <Box display="flex" flexDirection="row">
                        <img
                          src={
                            getAirlineInfo(item.flightID.slice(0, 2)).logoSrc
                          }
                          className="w-5"
                        />
                        <Typography variant="body1" className=" p-1">
                          {
                            getAirlineInfo(item.flightID.slice(0, 2))
                              .airlineName
                          }
                        </Typography>
                      </Box>
                      <Typography variant="p" className="text-gray-400 pl-4">
                        {item.destination}
                      </Typography>
                    </Box>
                    <Typography
                      variant="p"
                      className=" text-black bold pl-2 text-xl"
                    >
                      {item.arrivalTime}
                    </Typography>
                  </Box>
                  <Typography variant="p" className=" pl-10 p-4  text-xl ">
                    &#8377;{item.ticketPrice}
                  </Typography>
                  <Box className="ml-10">
                    <Button
                      onClick={() => navigatetoflightReview(item._id)}
                      variant="contained"
                      style={{
                        backgroundColor: "orangered",
                        color: "white",
                        padding: "1px 30px",
                      }}
                    >
                      BOOK
                    </Button>
                    {/* <Button variant="contained" className="bg-orange-500 text-white px-30 py-1">BOOK</Button> */}

                    <Typography
                      variant="body1"
                      className="pt-6 text-blue-500"
                      style={{ fontSize: "15px", fontWeight: 800 }}
                      onClick={() => {
                        handleFlightDetails(index),
                          SingleFlightSearch(item._id);
                      }}
                    >
                      Flight Details
                    </Typography>
                  </Box>
                </Box>

                {/* =================flightSearch======================= */}

                {flightSerchData &&
                  singleFlightData &&
                  selectedCardIndex === index && (
                    <Paper elevation={3} sx={{ margin: "50px" }} key={index}>
                      <Box
                        p={2}
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Box>
                            <img
                              src={
                                getAirlineInfo(
                                  singleFlightData?.flightID?.slice(0, 2)
                                ).logoSrc
                              }
                            />
                            <Typography variant="p" className="text-gray-400">
                              {
                                getAirlineInfo(
                                  singleFlightData?.flightID?.slice(0, 2)
                                ).airlineName
                              }
                            </Typography>
                          </Box>
                          <Typography variant="p" className="text-gray-400">
                            {singleFlightData.flightID}
                          </Typography>
                        </Box>
                        <box display="flex" flexDirection="row" className="p-4">
                          <Typography variant="p" className="text-xl px-3">
                            {singleFlightData.source}
                          </Typography>
                          <Typography variant="p" className="text-gray-400">
                            {singleFlightData.departureTime}
                          </Typography>
                        </box>
                        <Box className="p-4">
                          <Typography
                            variant="p"
                            className="text-orange-500 font-extrabold"
                          >
                            Duration
                          </Typography>
                          <Typography variant="body1" className=" px-6">
                            {singleFlightData.duration}
                          </Typography>
                        </Box>
                        <box display="flex" flexDirection="row" className="p-4">
                          <Typography variant="p" className="text-xl px-3">
                            {singleFlightData.destination}
                          </Typography>
                          <Typography variant="p" className="text-gray-400">
                            {singleFlightData.arrivalTime}
                          </Typography>
                        </box>
                        <Typography
                          variant="p"
                          className="p-4 text-green-500  text-xl font-bold"
                        >
                          `&#8377;{singleFlightData.ticketPrice}`
                        </Typography>
                        <Button
                          onClick={() => navigatetoflightReview(item._id)}
                          variant="contained"
                          style={{
                            backgroundColor: "orangered",
                            color: "white",
                            height: "50px",
                          }}
                        >
                          BOOK
                        </Button>
                      </Box>
                    </Paper>
                  )}
              </Paper>
            ))}
          {/* {flightSerchData && selectedCardIndex===index &&
            <Paper elevation={3} sx={{ width:'200px', height:'300px', margin: "50px", bgcolor:'red', position:'absolute', zIndex:'1' }}></Paper>
          } */}
          {/* <Typography variant="body1">Best</Typography> */}
        </Grid>
      </Grid>
    </div>
  );
}
