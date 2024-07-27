import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { projectID } from "../components/Constrains";
import { Card, Paper, Typography, Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useBususer } from "../providers/BusUser";

export default function Bus() {
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
    BusSearch,
    openSrc,
    opendesn,
    busCityObjects,
  } = useBususer();

  // console.log(sourcedata);

  const navigateToBusResuts = () => {
    source &&
      destination &&
      navigate(
        `/BusResults/data?source=${source}&destination=${destination}&day=${dayOfWeek}`
      );
  };

  const [value, setValue] = React.useState(dayjs(new Date()));

  const day = value.$d;
  const dateObj = new Date(day);
  const options = { weekday: "short" }; // Options to display short weekday
  const dayOfWeek = dateObj.toLocaleDateString("en-GB", options); // Using 'en-GB' locale for the day of the week
  console.log(dayOfWeek);

  return (
    <>
      <div className="bg-[#EFF3F8] h-[150vh]">
        <div className="w-[70%] bg-[#2276E3] rounded-full h-[45rem] border-[20px] border-blue-300 ml-[-7rem]  mt-[-18rem]">
          <h1 className="text-white font-bold text-[quicksand] text-center text-[2.2rem] mt-72 z-20 ml-[5rem] ">
            BUS TICKET BOOKING
          </h1>
          <Paper className="relative ml-[15rem] w-[60%] h-96 p-11 mt-11 rounded-sm shadow-slate-300">
            <div className="text-xl text-gray-700 font-bold py-2">FROM</div>
            <Box sx={{ position: "relative", flexGrow: 1, minWidth: "150px" }}>
              <TextField
               required
                fullWidth               
                id="standard-basic"
                placeholder="Enter Source"
                variant="standard"
                onClick={() => openSrc()}
                value={source}
                onChange={(e) => setSource(e.target.value)}
                InputProps={{
                  sx: { fontSize: "20px" }, // Increase font size of input text
                }}
                InputLabelProps={{
                  sx: { fontSize: "18px" }, // Increase font size of label text
                }}
                
              />
              {opensource && (
                <Box
                  className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg z-10 overflow-y-scroll"
                  sx={{
                    width: "500px",
                    height: "300px",
                    backgroundColor: "white",
                    position: "absolute",
                    top: "50px",
                    left: "0px",
                  }}
                >
                  {busCityObjects &&
                    busCityObjects.map((item, index) => (
                      <div
                      className="p-2  hover:bg-blue-gray-50"
                      key={index}
                      onClick={() => {
                        setSource(item.cityWithState), setopensource(false);
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
                          <span className="p-1 font-bold">{item.cityWithState},</span>
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
            <div className="text-xl text-gray-700 font-bold py-2">To</div>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                InputProps={{
                  sx: { fontSize: "20px" }, // Increase font size of input text
                }}
                InputLabelProps={{
                  sx: { fontSize: "18px" }, // Increase font size of label text
                }}
                id="standard-basic"
                placeholder="Enter Destination"
                variant="standard"
                onClick={() => opendesn()}
                value={destination}
                onChange={(e) => setdestination(e.target.value)}
              />
              {opendest && (
                <Box
                  className="shadow-md ring-offset-2 ring-opacity-50 rounded-lg overflow-y-scroll z-10"
                  sx={{
                    width: "500px",
                    height: "300px",
                    backgroundColor: "white",
                    position: "absolute",
                    top: "50px",
                    left: "0px",
                  }}
                >
                  {busCityObjects &&
                    busCityObjects.map((item, index) => (
                      <div
                        className="p-2 hover:bg-blue-gray-50"
                        key={index}
                        onClick={() => {
                          setdestination(item.cityWithState), setopendest(false);
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
                            <p className="p-1 font-bold">{item.cityWithState},</p>
                            <p className="p-1 font-bold">{item.country}</p>
                            {/* <p className='p-1'>[{item.iata_code}]</p> */}
                          </div>
                        </div>
                        {/* <p className='ml-8 text-sm'>{item.name}</p> */}
                      </div>
                    ))}
                </Box>
              )}
            </Box>
            <div className="text-xl text-gray-700 font-bold py-2">
              Travel Date
            </div>
            <div className="flex flex-row">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <span>
                <button className="bg-[#E8F1FC] shadow-bottom-blue-800  ml-5 p-3 text-xl rounded-xl ">
                  Today,
                </button>
                <button className="bg-[#E8F1FC] shadow-bottom-blue-800  ml-5 p-3 text-xl rounded-xl">
                  Tommorow
                </button>
              </span>
            </div>
            <button
              onClick={() => navigateToBusResuts()}
              className="text-white absolute top-[21.74rem] left-40 bg-orange-400 hover:bg-orange-500 p-5 text-xl font-extrabold rounded-full w-60"
            >
              SEARCH BUS
            </button>
          </Paper>
          <div className="mt-12 ">
            <img className="ml-80 rounded-3xl" src="busBanner.jpeg" />
          </div>
        </div>
      </div>
    </>
  );
}
