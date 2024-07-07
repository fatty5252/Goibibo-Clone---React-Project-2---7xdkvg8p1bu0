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
  TextField,
  Stack,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Travellers from "../components/Travellers";
import { useBususer } from "../providers/BusUser";
import { useNavigate } from "react-router-dom";
import SeatSelectionModal from "../components/SeatSelectionModal";

export default function BusResults() {
  const searchparams = new URLSearchParams(window.location.search);
  const busSource = searchparams.get("source");
  const busDestination = searchparams.get("destination");
  const busDay = searchparams.get("day");

  const navigate = useNavigate();
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
    SingleBusData, SingleBusSearch,busOpenPopup, setBusOpenPopup
  } = useBususer();

  const [busSearchData, setBusSearchData] = useState([]);
  const [busDetails, setBusDetails] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  // const [SingleBusData, setSingleBusData] = useState();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [checked, setChecked] = React.useState(true);

  const handleBusDetails = (index) => {
    if (selectedCardIndex === index) {
      setBusDetails(false);
      setSelectedCardIndex(null);
    } else {
      setBusDetails(true);
      setSelectedCardIndex(index);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const day = value.$d;
  const dateObj = new Date(day);
  const options = { weekday: "short" };
  const dayOfWeek = dateObj.toLocaleDateString("en-GB", options);

  const navigateToBusResults = () => {
    source &&
      destination &&
      navigate(
        `/BusResults/data?source=${source}&destination=${destination}&day=${dayOfWeek}`
      );
  };

  const BusSearch = useMemo(async () => {
    try {
      let url;
      url = `https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${busSource}","destination":"${busDestination}"}&day=${busDay}`;
      const response = await axios.get(url, {
        headers: {
          projectId: projectID,
        },
      });
      setBusSearchData(response.data.data.buses);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [busSource, busDestination, busDay]);
  console.log(SingleBusData);

  useEffect(() => {
    BusSearch;
  }, []);

  // const SingleBusSearch = async (busId) => {
  //   setBusOpenPopup(!busOpenPopup);
  //   try {
  //     const response = await axios.get(
  //       `https://academics.newtonschool.co/api/v1/bookingportals/bus/${busId}`,
  //       {
  //         headers: {
  //           projectId: projectID,
  //         },
  //       }
  //     );
  //     setSingleBusData(response.data.data);
  //     console.log(response.data.data);
  //   }
  //    catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "20px",
          gap: "10px",
          justifyContent: "center",
          backgroundColor: "#2274E0",
        }}
      >
        <Box sx={{ position: "relative", flexGrow: 1, minWidth: "150px" }}>
          <TextField
            required
            label="From"
            onClick={() => openSrc()}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            fullWidth
          />
          {opensource && (
            <Box
              className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg z-10 overflow-y-scroll"
              sx={{
                width: "100%",
                maxHeight: "300px",
                backgroundColor: "white",
                position: "absolute",
                top: "50px",
              }}
            >
              {sourcedata &&
                sourcedata.map((item, index) => (
                  <div
                    className="p-2 hover:bg-blue-gray-50"
                    key={index}
                    onClick={() => {
                      setSource(item.iata_code);
                      setopensource(false);
                    }}
                  >
                    <div className="float-right"></div>
                    <div className="flex p-1">
                      <div className="flex flex-row">
                        <p className="p-1 font-bold">{item.city},</p>
                        <p className="p-1 font-bold">{item.country}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </Box>
          )}
        </Box>
        <Box sx={{ position: "relative", flexGrow: 1, minWidth: "150px" }}>
          <TextField
            required
            label="To"
            onClick={() => opendesn()}
            value={destination}
            onChange={(e) => setdestination(e.target.value)}
            fullWidth
          />
          {opendest && (
            <Box
              className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll z-10"
              sx={{
                width: "100%",
                maxHeight: "300px",
                backgroundColor: "white",
                position: "absolute",
                top: "50px",
              }}
            >
              {destdata &&
                destdata.map((item, index) => (
                  <div
                    className="p-2 hover:bg-blue-gray-50"
                    key={index}
                    onClick={() => {
                      setdestination(item.iata_code);
                      setopendest(false);
                    }}
                  >
                    <div className="float-right">
                      <span>
                        <img className="size-5" src="flag.png" alt="flag" />
                      </span>
                    </div>
                    <div className="flex p-1">
                      <div className="flex flex-row">
                        <p className="p-1 font-bold">{item.city},</p>
                        <p className="p-1 font-bold">{item.country}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </Box>
          )}
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Departure"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            sx={{ flexGrow: 1, minWidth: "150px" }}
          />
        </LocalizationProvider>
        <TextField
          required
          label="Travellers and class"
          defaultValue="1 Adult"
          onClick={() => setOpen(true)}
          sx={{ flexGrow: 1, minWidth: "150px" }}
        />
        {/* <Travellers open={open} setOpen={setOpen} /> */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "orangered",
            color: "white",
            flexGrow: 1,
            minWidth: "150px",
          }}
          onClick={navigateToBusResults}
        >
          Update search
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid xs={12} md={3}>
          <Paper elevation={3} sx={{ padding: "20px", margin: "10px" }}>
            <Typography variant="h6" fontWeight={700}>
              Filters
            </Typography>
            <Typography variant="body1">
              <Checkbox checked={checked} onChange={handleChange} />
              Hide multi check-in flights
            </Typography>
            <Box>
              <Typography variant="body1" fontWeight={700}>
                Departure time
              </Typography>
              <Slider defaultValue={30} />
            </Box>
            <Box>
              <Typography variant="body1" fontWeight={700}>
                Stops
              </Typography>
              <Slider defaultValue={30} />
            </Box>
            <Box>
              <Typography variant="body1" fontWeight={700}>
                Airlines
              </Typography>
              <Slider defaultValue={30} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ display: { xs: "none", md: "block", lg: "block" } }}
          >
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
                <Typography variant="body1">Showing 2 buses</Typography>
                <Typography variant="body1">Sort by:</Typography>
                <Typography variant="body1">RATING</Typography>
                <Typography variant="body1">DEPARTURE</Typography>
                <Typography variant="body1">ARRIVAL</Typography>
                <Typography variant="body1">FASTEST</Typography>
                <Typography variant="body1">CHEAPEST</Typography>
                {/* <Typography variant="body1" className='pr-10'>Best</Typography> */}
                {/* <Button variant="contained">Hide FARE</Button> */}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            {busSearchData.map((bus, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  padding: "20px",
                  margin: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f1f1f1",
                  },
                }}
                onClick={() => handleBusDetails(index)}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  
                >
                  <Stack direction="row" alignItems="center" spacing={13}>
                    <Box sx={{width:"250px"}} variant="body3" >
                      <Typography  variant="h6" fontWeight={700}>
                        {bus.name}
                      </Typography>
                      <Typography >A/C Sleeper (2+1)</Typography>
                      <Typography>{bus.ratings}/5</Typography>
                    </Box>
                    <Box>
                    <Typography variant="body1" fontWeight={700}>{bus.departureTime}</Typography>
                    <Typography variant="body6">{bus.source}</Typography>
                    </Box>
                    <Box>
                    <Typography variant="body1" fontWeight={700}>{bus.arrivalTime}</Typography>
                    <Typography variant="body6">{bus.destination}</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={700}>₹ {bus.fare}</Typography>
                  </Stack>

                  <Stack sx={{textAlign:"center"}}>
                    <Typography variant="body7">
                      Total {bus.seats} seats left
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => SingleBusSearch(bus._id)}
                    >
                      SELECT SEAT
                    </Button>
                    {busOpenPopup && <SeatSelectionModal />}
                  </Stack>
                </Box>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
