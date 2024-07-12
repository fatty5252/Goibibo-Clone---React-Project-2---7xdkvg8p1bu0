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
import { faWeight } from "@fortawesome/free-solid-svg-icons";

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

 useMemo(async () => {
    try {
      let url;
      url = `https://academics.newtonschool.co/api/v1/bookingportals/train?&day=${trainDay}&search={"source":"${trainSource}","destination":"${trainDestination}"}`;
      const responce = await axios.get(url, {
        headers: {
          projectId: projectID,
        },
      });
      setTrainSearch(responce?.data?.data?.trains);
      console.log(responce.data.data.trains);
    } catch (err) {
      console.log(err);
    }
  }, [trainDay, trainSource, trainDestination]);
   
  useEffect(()=>{
    TrainFilter("+1");
  },[])
  const TrainFilter=async(value)=>{
    let url;
    url = `https://academics.newtonschool.co/api/v1/bookingportals/train?&day=${trainDay}&search={"source":"${trainSource}","destination":"${trainDestination}"}&sort={"fare":${Number(value)}}`
  }

  const navigatetoTrainresults = () => {
    trainSrc &&
      trainDest &&
      navigate(
        `/TrainResult/data?source=${trainSrc}&destination=${trainDest}&day=${dayOfWeek}`
      );
  };
  const navigateToTrainReview = (id) => {
    localStorage.getItem("token") ? 
    navigate(
      `/TrainReview/data?source=${trainSrc}&destination=${trainDest}&day=${dayOfWeek}&id=${id}`
    ) :
    alert("Please Login to Continue");

  }
  

  return (
    <>
      <Box bgcolor="#EFF3F8" >
        <Box className="flex items-center flex-nowrap gap-5 p-4 pt-24 bg-orange-400 justify-center  ">
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
                  minDate={dayjs()} // Disable previous dates
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box className="flex justify-center p-5 items-end">
            <button
              onClick={() => navigatetoTrainresults()}
              className="text-black bg-white hover:cursor-pointer p-4 text-xl font-extrabold rounded-xl w-60"
            >
              SEARCH TRAIN
            </button>
          </Box>
        </Box>
        {/* =======================Bottom Grid========================== */}
        <Grid container spacing={2} component="center" mt={3}>
          <Grid xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: "20px" }}>
            <Box>
                <Typography variant="body1" padding="20px" fontWeight={700}>
                  Filter By Price
                </Typography>
                <Typography display="flex" gap="20px" flexWrap="wrap">
                  <Button onClick={()=>{TrainFilter("-1")}}
                    style={{
                      color: "white",
                      background: "blue",
                      padding: "0.5rem",
                      width: "8rem",
                    }}
                  >
                    High To Low
                  </Button>
                  <Button onClick={()=>{TrainFilter("1")}}
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
                  We have found {trainSearch.length} trains on or near this route
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
            <Grid item xs={9} md={11}>
              {trainCityObjects && trainSearch.map((item, index) => (
                <Paper
                  key={index}
                  sx={{
                    backgroundColor: "white",
                    padding: "30px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                  }}
                >

                  <Box className="flex row py-3 items-center justify-between">
                    <Box className="flex row gap-3 ">
                      <Typography sx={{ fontWeight: "600", fontSize: "20px" }} variant="h6">{item.trainNumber}</Typography>
                      <Typography sx={{ fontWeight: "600", fontSize: "20px" }} variant="h6">{item.trainName}</Typography>
                    </Box>
                    <Box className="flex py-1 row gap-3 ">
                      <Button className="p-3">VIEW ROUTE</Button>
                      <Box className="p-1 text-lg ">Runs in: {item.daysOfOperation.map((days, index) => (
                        <span key={index} className="p-1 text-gray-400">{days}</span>
                      ))} </Box>
                    </Box>
                  </Box>
                  <Box className="flex justify-between pb-10 gap-8 items-center">
                    <Box className="flex justify-between gap-8 ">
                      <Typography sx={{ fontWeight: "400", fontSize: "18px" }} variant="body1">
                        {item.arrivalTime}
                      </Typography>
                      <Typography sx={{ fontWeight: "400", fontSize: "18px" }} variant="body1">{item.source}</Typography>
                    </Box>
                    <Box>
                      <span>*----------------------{item.travelDuration}</span>
                      <span> ----------------------------*</span>
                    </Box>
                    <Box className="flex justify-between gap-8 ">
                      <Typography sx={{ fontWeight: "400", fontSize: "18px" }} variant="body1">
                        {item.departureTime}
                      </Typography>
                      <Typography sx={{ fontWeight: "400", fontSize: "18px" }} variant="body1">
                        {item.destination}
                      </Typography>
                    </Box>
                  </Box>
                  {/* <Typography variant="body1">{item.fare}</Typography> */}

                  <Box className="flex flexDirectionRow gap-5  flex-wrap">
                    {item.coaches.map((items, index) => (
                      <Box
                        key={index}
                        onClick={() => navigateToTrainReview(items.id)}
                        className="flex gap-5 cursor-pointer"
                      >
                        <Box className="flex flex-col justify-between items-start">
                          <Box className="flex justify-center gap-48 bg-[#F4FAF4] p-1">
                            <Typography>{items.coachType}</Typography>
                            <Typography >{item.fare}</Typography>
                          </Box>
                          <Box className="flex justify-between gap-28 w-64 p-2 bg-[#E9F6EA]">
                            <Typography>AVL {items.numberOfSeats}</Typography>
                            <Typography>1hr ago</Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
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
