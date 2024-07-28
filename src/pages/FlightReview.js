import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField } from "@mui/material";
import { React, useState, useEffect } from "react";
import { TbBackground } from "react-icons/tb";
import { projectID } from "../components/Constrains";
import axios from "axios";
import dayjs from "dayjs";
import { useUser } from "../providers/UserProvider";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FlightReview() {

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState]= useState("");

  const navigate = useNavigate();

  const { getAirlineInfo, value, formattedDate } = useUser();

  const [singleFlightId, setSingleFlightId] = useState();

  const searchparams = new URLSearchParams(window.location.search);
  const _id = searchparams.get("id");

  const FlightIdGet = async () => {
    try {
      let url;
      url = `https://academics.newtonschool.co/api/v1/bookingportals/flight/${_id}`;
      const response = await axios.get(url, {
        headers: {
          projectId: projectID,
        },
      });
      setSingleFlightId(response.data.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FlightIdGet();
  }, []);

  const ValidateData=()=>{
    if (address === "" || pincode === "" || state === "") {
      toast.error("Please fill all the fields")
      return false;
    }
    else {
      navigate(`/FlightPayment/data?payment=${singleFlightId?.ticketPrice + Math.round(singleFlightId?.ticketPrice * 0.18)}`)
    }
  }

  return (
    <div className="bg-[#E9EEF7] h-[100vh] ">
      <ToastContainer position="top-right"/>
      <div className="flex justify-center ">
        <div className="bg-blue-500 w-full h-72 ">
          <h1 className="text-2xl text-white md:text-3xl font-bold mb-4 pt-24 text-center">
            Review your booking
          </h1>
        <Grid
            container
            gap={10}
            spacing={2}
            columns={16}
            paddingLeft={20}
            paddingRight={20}
            paddingTop={5}
          >
            <Grid item xs={10}>
        <Paper className="p-5" style={{ marginBottom: 16 }}>
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {singleFlightId?.source} - {singleFlightId?.destination}
          </h2>
          <p className="text-gray-600 mb-4">
            {singleFlightId?.stop} stop | All departure/arrival times are in local time
          </p>
          <div className="bg-gray-100 rounded-md p-4 mb-4">
            <div className="flex items-center mb-2">
              <img
                src={getAirlineInfo(singleFlightId?.flightID.slice(0, 2)).logoSrc}
                alt="Airline logo"
                className="w-8 h-8 mr-2"
              />
              <Typography variant="body1" className="text-lg">
                {getAirlineInfo(singleFlightId?.flightID.slice(0, 2)).airlineName}
              </Typography>
            </div>
            <p className="text-gray-600">{singleFlightId?.flightID}</p>
            <div className="text-blue-600 font-semibold">
              Start on - {formattedDate}
            </div>
          </div>
          <div className="flex md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <div className="text-xl font-bold">{singleFlightId?.arrivalTime}</div>
              <div className="text-lg">{singleFlightId?.source}</div>
            </div>
            <div className="text-center my-4 md:my-0">
              <div className="text-lg">
                ------------------------{singleFlightId?.duration} hr---------------------------
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">{singleFlightId?.departureTime}</div>
              <div className="text-lg">{singleFlightId?.destination}</div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-md p-4">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600 mb-2">Baggage -</span>
              <span className="mr-2 text-gray-600 mb-2"><span className="text-black font-bold" >8 Kgs</span> Cabin</span>
              <span className="mr-2 text-gray-600 mb-2"><span className="text-black font-bold" >25 Kgs</span>  Check-In</span>
            </div>
          </div>
        </Paper>

        <Paper className="p-5">
          <h1 className="font-extrabold text-xl ">YOUR PINCODE AND STATE</h1>
          <h4 className="pb-5">(Required for GST purpose on your tax invoice. You can edit this anytime later in your profile section. )</h4>
          <Box display="flex" flexDirection="row" gap={2}>
      <TextField
        id="outlined-basic"
        placeholder="Enter Billing Address"
        variant="outlined"
        onChange={(e)=>setAddress(e.target.value)}
        value={address}
      />
      <TextField
        id="outlined-basic"
        placeholder="Enter Pincode"
        variant="outlined"
        onChange={(e)=>setPincode(e.target.value)}
        value={pincode}
      />
      <TextField
        id="outlined-basic"
        placeholder="Enter State"
        variant="outlined"
        onChange={(e)=>setState(e.target.value)}
        value={state}
      />
    </Box>
    <FormControlLabel required control={<Checkbox />} label="Confirm and save billing details to your profile" />
    <Box padding={2} textAlign={"center"}>
    <Button onClick={()=>ValidateData()} padding={4} color="primary" fullWidth variant="contained">Proceed</Button>
    </Box>
        </Paper>
      </Grid>
            <Grid item xs={6} position={"fixed"} right={100}>
              <Paper className="p-5">
              <div className="border-b border-gray-300 pb-4 mb-4">
                <h2 className="font-bold text-lg">FARE SUMMARY</h2>
                <p className="text-gray-600">1 ADULT</p>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-lg">Base fare</span>
                <span className="text-lg font-bold">{singleFlightId?.ticketPrice}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Adult (1 x {singleFlightId?.ticketPrice})</span>
                <span>{singleFlightId?.ticketPrice}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold">Taxes and Surcharges</span>
                <span className="font-bold">{Math.round(singleFlightId?.ticketPrice * 0.18)}</span>
              </div>
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between">
                  <span className="text-blue-700 font-extrabold text-2xl">Grand Total</span>
                  <span className="text-blue-700 font-extrabold text-2xl">
                   ₹ {singleFlightId?.ticketPrice + Math.round(singleFlightId?.ticketPrice * 0.18)}
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md mt-4 text-center">
                <p>Tap to contribute <b>₹{Math.round(singleFlightId?.ticketPrice % 18)} towards plantation of 2 million trees</b></p>
                <a href="#" className="text-blue-700 font-bold">Know More</a>
              </div>           
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
