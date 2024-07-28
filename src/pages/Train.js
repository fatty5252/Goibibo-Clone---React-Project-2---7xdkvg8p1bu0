import { Carousel } from "@material-tailwind/react";
import { Box, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TrainOffrsCarousel from "../components/TrainOffrs";
import Slider from "react-slick";
import { useUser } from "../providers/UserProvider";
import CompOne from "../components/TrainOffrs";
import { projectID, trainSearchURL } from "../components/Constrains";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useTrainUser } from "../providers/TrainUser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Train() {
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
    TrainSearch,
    trainOpenSource,
    trainOpenDestination,
    trainCityObjects,
    getToken,
  } = useTrainUser();

  const navigatetoTrainresults = () => {
    if (trainSrc && trainDest && dayOfWeek) {
      trainSrc && trainDest && dayOfWeek && navigate(`/TrainResult/data?source=${trainSrc}&destination=${trainDest}&day=${dayOfWeek}`)     
    } else if (!trainSrc) {
      toast.error("Please Enter City Name");
    } else if (!trainDest) {
      toast.error("Please Select Date");
    } else if (!dayOfWeek) {
      toast.error("Please Select Date");
    } 
  };

  const [value, setValue] = React.useState(dayjs(new Date()));

  const day = value.$d;
  const dateObj = new Date(day);
  const options = { weekday: "short" }; 
  const dayOfWeek = dateObj.toLocaleDateString("en-GB", options); 
  console.log(dayOfWeek);

  return (
    <div className="Train-main bg-blue-100 sm:min-h-screen min-h-screen">
      <ToastContainer position="top-right"/>
      <div className="train-bg bg-blue-100">
        <div className="relative top-10 h-auto border-spacing-5 flex flex-col lg:flex-row justify-between lg:ml-40 mt-10 lg:mt-20 w-full lg:w-3/4 text-white font-bold font-sans">
          <div className="text-white font-extrabold font-rubik font-sans text-xl text-center lg:text-left mb-4 lg:mb-0">
            Train Ticket Booking
          </div>
          <div className="flex items-center justify-center lg:justify-start text-white font-extrabold font-rubik font-sans text-xl">
            <img
              className="bg-white w-15 h-15 items-center rounded-full mr-1"
              alt="Irctc text logo"
              src="https://gos3.ibcdn.com/irctcWithTxt-1668596751.svg"
              width="45"
              height="45"
            />
            <div> IRCTC Authorized Partner</div>
          </div>
        </div>
        <Paper
          sx={{
            width: "90%",
            lg: "80vw",
            height: "auto",
            minHeight: "45vh",
            mx: "auto",
            mt: "30px",
            lg: "50px",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
            padding: "20px",
          }}
        >
          <FormControl sx={{ padding: "20px" }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="book"
                control={<Radio />}
                label="Book Train tickets"
              />
              <FormControlLabel
                value="pnr"
                control={<Radio />}
                label="Check PNR Status"
              />
              <FormControlLabel
                value="live"
                control={<Radio />}
                label="Live Trains Status"
              />
            </RadioGroup>
          </FormControl>
          <Box className="flex flex-col lg:flex-row items-center lg:flex-nowrap gap-3 justify-center mt-0">
            <Box sx={{ position: "relative", width: "100%", lg: "auto" }}>
              <TextField
                required
                id="outlined-required"
                label="From"
                fullWidth
                onClick={() => trainOpenSource()}
                value={trainSrc}
                onChange={(e) => setTrainSrc(e.target.value)}
              />
              {trainOpenSrc && (
                <Box
                  className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll h-60 lg:h-[500px] w-full lg:w-80"
                  sx={{
                    backgroundColor: "white",
                    position: "absolute",
                    top: "58px",
                    left: "0px",
                    zIndex: "20"
                  }}
                >
                  {trainCityObjects &&
                    trainCityObjects.map((item, index) => (
                      <div
                        className="p-2 hover:bg-blue-gray-50"
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
            <Box sx={{ position: "relative", width: "100%", lg: "auto" }}>
              <TextField
                required
                id="outlined-required"
                label="To"
                fullWidth
                onClick={() => trainOpenDestination()}
                value={trainDest}
                onChange={(e) => setTrainDest(e.target.value)}
              />
              {trainOpenDest && (
                <Box
                  className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll h-60 lg:h-[500px] w-full lg:w-80"
                  sx={{
                    backgroundColor: "white",
                    position: "absolute",
                    top: "58px",
                    left: "0px",
                    zIndex: "20"
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
                        <div className="float-right">
                          <span>{item.country.slice(0, 2)}</span>
                          <span>
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
            <Box sx={{ width: "100%", lg: "auto" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Departure"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    minDate={dayjs()}
                    fullWidth
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box className="relative flex row">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    className="bg-gray-100 p-2 rounded-lg"
                    value="today"
                    control={<Radio />}
                    label="Today"
                  />
                  <FormControlLabel
                    className="bg-gray-100 p-2 rounded-lg"
                    value="tomorrow"
                    control={<Radio />}
                    label="Tomorrow"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box className="flex text-center justify-center mt-6 lg:mt-12">
            <button
              onClick={() => navigatetoTrainresults()}
              className="text-white bg-orange-400 hover:bg-orange-500 p-4 lg:p-5 text-lg lg:text-xl font-extrabold rounded-full w-48 lg:w-60"
            >
              SEARCH TRAIN
            </button>
          </Box>
        </Paper>
      </div>
      <Box className="lg:pt-80" sx={{ marginTop: "30rem", background: "#EFF3F8", pt: "50px" }}>
        <Box className="border-2 border-solid border-black rounded-xl w-full lg:w-3/4 mx-auto">
          <img src="trainposter1.jpeg" alt="bannerimg" className="w-full" />
        </Box>
        <h1 className="font-bold font-rubik text-3xl lg:text-4xl text-center mt-6">
          1 million+ customers
        </h1>
        <p className="text-center text-lg lg:text-xl font-rubik font-normal">
          book train tickets with us because
        </p>
        <Box className="flex flex-wrap justify-center lg:justify-evenly m-6 lg:m-20 gap-6 lg:gap-0">
          <Box className="flex justify-center w-80">
            <Box className="mr-3 items-center">
              <img
                className="w-36"
                src="https://gos3.ibcdn.com/no_can_fee-1668596842.svg"
                alt="No Cancellation Fee"
              />
            </Box>
            <Box>
              <p className="font-rubik font-bold text-xl lg:text-2xl">No Cancellation Fee</p>
              <p className="font-rubik text-lg lg:text-xl font-normal text-gray-600">
                You can opt for free cancellation & get full refund
              </p>
              <p className="text-blue-500 text-lg">
                <a href="https://www.goibibo.com/offers/free-train-cancellation/">
                  Learn more about cancellation
                </a>
              </p>
            </Box>
          </Box>
          <Box className="flex justify-center w-80">
            <Box className="mr-3 items-center">
              <img
                className="w-36"
                src="https://gos3.ibcdn.com/go_cnfrm-1668596688.svg"
                alt="goConfirmed Trip"
              />
            </Box>
            <Box>
              <p className="font-rubik font-bold text-xl lg:text-2xl">goConfirmed Trip</p>
              <p className="font-rubik text-lg lg:text-xl font-normal text-gray-600">
                Guaranteed confirmed tickets or we give you 2x refund
              </p>
              <p className="text-blue-500 text-lg">
                <a href="https://www.goibibo.com/offers/go-confirmed-trip-2x/">
                  Learn more about goConfirmed
                </a>
              </p>
            </Box>
          </Box>
          <Box className="flex justify-center w-80">
            <Box className="mr-3 items-center">
              <img
                className="w-36"
                src="https://gos3.ibcdn.com/no_pg_fee_icon-1673341757.png"
                alt="No PG Fee via UPI"
              />
            </Box>
            <Box>
              <p className="font-rubik font-bold text-xl lg:text-2xl">No PG Fee via UPI</p>
              <p className="font-rubik text-lg lg:text-xl font-normal text-gray-600">
                Zero Payment Gateway Charges via UPI mode
              </p>
            </Box>
          </Box>
        </Box>
        <Box className="flex justify-center rounded-3xl mb-10">
          <Paper className="w-full lg:w-[60%] bg-white h-80 flex justify-center rounded-[30%] shadow-md">
            <CompOne />
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
