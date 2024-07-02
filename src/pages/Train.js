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
    
  } = useTrainUser();

  const navigatetoTrainresults = () => {
    trainSrc &&
      trainDest &&
      navigate(
        `/TrainResult/data?source=${trainSrc}&destination=${trainDest}&day=${dayOfWeek}`
      );
  };

  const [value, setValue] = React.useState(dayjs(new Date()));

  // const day = value && value.$d.split(" ").slice(0,4)
  // console.log(day)
  const day = value.$d;
  const dateObj = new Date(day);
  const options = { weekday: "short" }; // Options to display short weekday
  const dayOfWeek = dateObj.toLocaleDateString("en-GB", options); // Using 'en-GB' locale for the day of the week
  console.log(dayOfWeek);

 

  return (
    <div className="Train-main bg-blue-100">
      <div className="train-bg bg-blue-100">
        <div className="relative top-10 h-auto border-spacing-5 flex justify-between ml-40 mt-20 w-3/4 text-white font-bold font-sans">
          <div className="text-white font-extrabold font-rubik font-sans text-xl">
            Train Ticket Booking
          </div>
          <div className="flex items-center text-white font-extrabold font-rubik font-sans text-xl">
            <img
              className="bg-white w-15 h-15 items-center rounded-full mr-1 "
              alt="Irctc text logo"
              src="https://gos3.ibcdn.com/irctcWithTxt-1668596751.svg"
              width="45"
              height="45"
            />
            <div> IRCTC Authorized Partner</div>
          </div>
        </div>
        {/* ======================paper==================================== */}
        <Paper
          sx={{
            width: "80vw",
            height: "40vh",
            mr: "200px",
            ml: "200px",
            mt: "50px",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* ======================Radio buttons=================================== */}
          <FormControl sx={{ padding: "40px 20px" }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Book Train tickets"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Check PNR Status"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Live Trains Status"
              />
            </RadioGroup>
          </FormControl>

          {/* ================input Box ============================= */}
          <Box className="flex items-center flex-nowrap gap-3 justify-center ">
            <Box sx={{ position: "relative" }}>
              <TextField
                required
                id="outlined-required"
                label="From"
                onClick={() => trainOpenSource()}
                value={trainSrc}
                onChange={(e) => setTrainSrc(e.target.value)}
              />
              {trainOpenSrc && (
                <Box
                  className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll h-[500px] w-80"
                  sx={{
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
                            <span className="p-1 font-bold">
                              {item.station}
                            </span>
                            <span className="p-1 font-bold">{item.city},</span>
                            <span className="p-1 font-bold">
                              {item.country}
                            </span>
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
              />
              {trainOpenDest && (
                <Box
                  className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll h-[500px] w-80"
                  sx={{
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
                        <div className="float-right">
                          <span>{item.country.slice(0, 2)}</span>
                          <span>
                            <img className="size-5" src="flag.png" alt="flag" />
                          </span>
                        </div>
                        <div className="flex p-1">
                          <div className="flex flex-row">
                            <span className="p-1 font-bold">
                              {item.station}
                            </span>
                            <span className="p-1 font-bold">{item.city},</span>
                            <span className="p-1 font-bold">
                              {item.country}
                            </span>
                          </div>
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
            <Box className="relative">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  {/* <span className='bg-green-700 rounded-xl border-1 border-solid border-yellow-300'>TATKAL OPEN</span> */}
                  <FormControlLabel
                    className="bg-gray-100 p-2 rounded-lg"
                    value="today"
                    control={<Radio />}
                    label="Today"
                  />
                  <FormControlLabel
                    className="bg-gray-100 p-2 rounded-lg"
                    value="tommorow"
                    control={<Radio />}
                    label="Tommorow"
                  />
                  <FormControlLabel
                    className="bg-gray-100 p-2 rounded-lg"
                    value="dayAfterTommorow"
                    control={<Radio />}
                    label="Day after tommorow"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box className="flex justify-center mt-4 p-10">
            <button
              onClick={() => navigatetoTrainresults()}
              className="text-white bg-orange-400 hover:bg-orange-500 p-5 text-xl font-extrabold rounded-full w-60"
            >
              SEARCH TRAIN
            </button>
          </Box>
        </Paper>
      </div>
      <Box sx={{ marginTop: "30rem", background: "#EFF3F8" }}>
        <Box className=" border-2 border-solid border-black rounded-xl w-3/4 ml-32">
          <img src="trainposter1.jpeg" alt="bannerimg" />
        </Box>
        <h1 className="font-bold font-rubik text-4xl text-center mt-6">
          1 million+ customers
        </h1>
        <p className="text-center text-xl font-rubik font-normal">
          book train tickets with us because
        </p>
        <Box className="flex justify-evenly flex-wrap m-20  ">
          <Box className="flex justify-center w-80 ">
            <Box className=" mr-3 items-center">
              {" "}
              <img
                className="w-36"
                src="https://gos3.ibcdn.com/no_can_fee-1668596842.svg"
              />
            </Box>
            <Box>
              <p className="font-rubik font-bold text-2xl">
                No Cancellation Fee
              </p>
              <p className="font-rubik flex flex-wrap text-xl font-normal text-gray-600">
                You can opt for free cancellation & get full refund
              </p>
              <p className="text-blue-500 text-lg ">
                <a href="https://www.goibibo.com/offers/free-train-cancellation/">
                  Learn more about cancellation
                </a>
              </p>
            </Box>
          </Box>
          <Box className="flex justify-center w-80">
            <Box className="mr-3 items-center">
              {" "}
              <img
                className="w-36"
                src="https://gos3.ibcdn.com/go_cnfrm-1668596688.svg"
              />
            </Box>
            <Box>
              <p className="font-rubik font-bold text-2xl">goConfirmed Trip</p>
              <p className="font-rubik text-xl font-normal text-gray-600 flex flex-wrap ">
                Guaranteed confirmed tickects or we give you 2x refund
              </p>
              <p className="text-blue-500 text-lg ">
                <a href="https://www.goibibo.com/offers/go-confirmed-trip-2x/">
                  Learn more about goConfirmed
                </a>
              </p>
            </Box>
          </Box>
          <Box className="flex justify-center w-80">
            <Box className="mr-3 items-center">
              {" "}
              <img
                className="w-36"
                src="https://gos3.ibcdn.com/no_pg_fee_icon-1673341757.png"
              />
            </Box>
            <Box>
              <p className="font-rubik font-bold text-2xl">No PG Fee via UPI</p>
              <p className="font-rubik text-xl flex flex-wrap font-normal text-gray-600">
                Zero Payment Gateway Charges via UPI mode
              </p>
              <p></p>
            </Box>
          </Box>
        </Box>
        {/* <Box className="flex justify-center w-3/4 border-spacing-1 border-"> */}

        <Box className="flex justify-center rounded-3xl">
          <Paper className="w-[60%] bg white h-96 flex justify-center rounded-[30%] shadow-md">
            {/* <h2 className=' text-blue-500 h-11 text-2xl flex justify-center underline'>Offers</h2> */}
            <CompOne />
          </Paper>
        </Box>

        <Box>
          <h1 className="font-bold font-rubik text-4xl text-center mt-6">
            Railways inquiry just a click away!
          </h1>
        </Box>

        {/* </Box> */}
      </Box>
    </div>
  );
}
