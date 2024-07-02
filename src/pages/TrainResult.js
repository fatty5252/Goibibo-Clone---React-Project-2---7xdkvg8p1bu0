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
import { useTrainUser } from "../providers/TrainUser";
import { grey, orange } from "@mui/material/colors";
import DropDown from "../components/DropDown";

export default function TrainResult() {
const navigate = useNavigate();

  const {
    trainOpenSrc,
    setTrainOpenSrc,
    trainOpenDest,
    setTrainOpenDest,
    trainOpenDestData,
    setTrainOpenDestData,
    trainOpenSrcData,
    setTrainOpenSrcData,
    trainSrc,
    setTrainSrc,
    trainDest,
    setTrainDest,
    trainOpenSource,
    trainOpenDestination,
    trainCityObjects,
  } = useTrainUser();

  const [value, setValue] = React.useState(dayjs(new Date()));

  // const day = value && value.$d.split(" ").slice(0,4)
  // console.log(day)
  const day = value.$d;
  const dateObj = new Date(day);
  const options = { weekday: "short" }; // Options to display short weekday
  const dayOfWeek = dateObj.toLocaleDateString("en-GB", options); // Using 'en-GB' locale for the day of the week
  console.log(dayOfWeek);

  const [trainSearch, setTrainSearch] = useState([]);

  const searchParams = new URLSearchParams(window.location.search);
  const trainSource = searchParams.get("source");
  const trainDestination = searchParams.get("destination");
  const trainDay = searchParams.get("day");
  console.log(trainSource, trainDestination, trainDay);
  console.log(trainSrc, trainDest, trainDay);

  const TrainSearch = useMemo(async () => {
    try {
      let url;
      url = `https://academics.newtonschool.co/api/v1/bookingportals/train?&day=${trainDay}&search={"source":"${trainSource}","destination":"${trainDestination}"}`;
      const responce = await axios.get(url, {
        headers: {
          projectId: projectID,
        },
      });
      setTrainSearch(responce.data.data.trains);
      console.log(responce.data);
      console.log(trainSearch);
    } catch (err) {
      console.log(err);
    }
  }, [trainDay, trainSource, trainDestination]);

  useEffect(() => {
    TrainSearch;
  }, [TrainSearch]);

  const navigatetoTrainresults = () => {
    trainSrc &&
      trainDest &&
      navigate(
        `/TrainResult/data?source=${trainSrc}&destination=${trainDest}&day=${dayOfWeek}`
      );
  };

  return (
    <>
      <Box bgcolor="#EFF3F8">
        <Box className="flex items-center flex-nowrap gap-5 p-4 bg-orange-400 justify-center  ">
          <Box sx={{ position: "relative" }}>
            <TextField
              required
              id="outlined-required"
              label="From"
              onClick={() => trainOpenSource()}
              value={trainSrc}
              onChange={(e) => setTrainSrc(e.target.value)}
              style={{
                color: "white",
                borderColor: "white",
              }}
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "#EB6125",
                  font: "bold",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              variant="outlined"
            />
            {trainOpenSrc && (
              <Box
                className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll h-48 w-11"
                sx={{
                  width: "300px",
                  height: "auto",
                  backgroundColor: "white",
                  position: "absolute",
                  top: "58px",
                  left: "0px",
                }}
              >
                {trainCityObjects &&
                  trainCityObjects.map((item, index) => (
                    <div
                      className="p-2  hover:bg-blue-gray-50"
                      key={index}
                      onClick={() => {
                        setTrainSrc(item.station), setTrainOpenSrc(false);
                      }}
                    >
                      <div className="float-right">
                        <span className="capitalize">
                          {item.country.slice(0, 2)}
                          <img className="size-5" src="flag.png" alt="flag" />
                        </span>
                      </div>
                      <div className="flex p-1">
                        <div className="flex flex-row">
                          <span className="p-1 font-bold">{item.station}</span>
                          <span className="p-1 font-bold">{item.city},</span>
                          <span className="p-1 font-bold">{item.country}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </Box>
            )}
          </Box>
          <Box sx={{ position: "relative" }}>
            <TextField
              sx={{ transform: "initial", transition: "ease-out 3s" }}
              required
              id="outlined-required"
              label="To"
              onClick={() => trainOpenDestination()}
              value={trainDest}
              onChange={(e) => setTrainDest(e.target.value)}
              style={{
                color: "white",
                borderColor: "white",
              }}
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "#EB6125",
                  font: "bold",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              variant="outlined"
            />
            {trainOpenDest && (
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
                {trainCityObjects &&
                  trainCityObjects.map((item, index) => (
                    <div
                      className="p-2 hover:bg-blue-gray-50"
                      key={index}
                      onClick={() => {
                        setTrainDest(item.station), setTrainOpenDest(false);
                      }}
                    >
                      <div className="flex flex-row flex-nowrap p-1 w-16">
                        <span className="p-1 font-bold">{item.station}</span>
                        <span className="p-1 font-bold">{item.city},</span>
                        <span className="p-1 font-bold">{item.country}</span>
                      </div>
                    </div>
                  ))}
              </Box>
            )}
          </Box>
          {/* //=====================DateInput=================// */}

          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Departure"
                  // defaultValue={dayjs('2022-04-17')}
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box className="flex justify-center mt-4 p-5 items-end">
            <button
              onClick={() => navigatetoTrainresults()}
              className="text-black bg-white hover:cursor-pointer p-4 text-xl font-extrabold rounded-xl w-60"
            >
              SEARCH TRAIN
            </button>
          </Box>
        </Box>
        {/* =======================Bottom Grid========================== */}
        <Grid container spacing={2} component="center" ml={3} mt={3}>
          <Grid xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: "20px" }}>
              <Typography variant="h6">Filter By</Typography>
              <Box sx={{ marginTop: "20px" }}></Box>
            </Paper>
          </Grid>
          <Grid xs={12} md={9}>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ display: { xs: "none", md: "block", lg: "block" } }}
            >
              <Box
                p={2}
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Typography variant="h6" color="#647A97">
                  We have found 18 trains on or near this route
                </Typography>
                <Typography
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  variant="h6"
                  color="#647A97"
                >
                  Sorted by
                  <DropDown />
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={11}>
              {trainSearch.map((item, index) => (
                <Paper
                  key={index}
                  sx={{
                    backgroundColor: "#F8F8F8",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                  }}
                >
                 
                  <Box className="flex row justify-between">
                    <Box className="flex row gap-3 ">
                      <Typography variant="h6">{item.trainNumber}</Typography>
                      <Typography variant="h6">{item.trainName}</Typography>
                    </Box>
                    <Box className="flex row gap-3 ">
                      <Typography>VIEW ROUTE</Typography>
                      <Typography>Runs in: {item.data.trains.daysOfOperation}</Typography>
                    </Box>
                  </Box>
                  <Box className="flex justify-between">
                    <Box className="flex justify-between w-60">
                      <Typography variant="body1">
                      {item.arrivalTime}
                      </Typography>
                      <Typography variant="body1">{item.source}</Typography>
                    </Box>
                   
                    <Box>
                      <span>*----------------------{item.travelDuration}</span>
                      <span> ----------------------------*</span>
                    </Box>
                    <Box className="flex justify-between w-60">
                      <Typography variant="body1">
                        {item.departureTime}
                      </Typography>
                      <Typography variant="body1">
                        {item.destination}
                      </Typography>
                    </Box>
                  </Box>
                  {/* <Typography variant="body1">{item.fare}</Typography> */}  
                  <Box className="flex gap-5">
                  <Box className="flex justify-between items-start flex-col">
                      <Box className="flex gap-48 row w-64 bg-[#F4FAF4] p-1">
                      <Typography >3A</Typography>
                      <Typography >3085</Typography>
                      </Box>
                      <Box className="flex justify-between gap-28 row w-64 p-2 bg-[#E9F6EA] ">
                      <Typography >AVL 134</Typography>
                      <Typography >1hr ago</Typography>
                      </Box>
                    </Box> 
                    <Box className="flex justify-between items-start flex-col">
                      <Box className="flex gap-48 row w-64 bg-[#F4FAF4] p-1">
                      <Typography >3A</Typography>
                      <Typography >3085</Typography>
                      </Box>
                      <Box className="flex justify-between gap-28 row w-64 p-2 bg-[#E9F6EA] ">
                      <Typography >AVL 134</Typography>
                      <Typography >1hr ago</Typography>
                      </Box>
                    </Box>
                    <Box className="flex justify-between items-start flex-col">
                      <Box className="flex gap-48 row w-64 bg-[#FEFBF2] p-1">
                      <Typography >3A</Typography>
                      <Typography >3085</Typography>
                      </Box>
                      <Box className="flex justify-between gap-28 row w-64 p-2 bg-[#FEF5E1] ">
                      <Typography >AVL 134</Typography>
                      <Typography >1hr ago</Typography>
                      </Box>
                    </Box>                   
                    </Box>
                </Paper>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
