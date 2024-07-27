import React, { useEffect, useState } from "react";
import axios from "axios";
import { projectID } from "../components/Constrains";
import { useUser } from "../providers/UserProvider";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Box, Button, CardContent, CardMedia, Grid, Rating } from "@mui/material";
import { Card, CardHeader, Tab, TabPanel, Tabs, Typography } from "@material-tailwind/react";
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';

export default function HotelRooms() {
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

  const navigate = useNavigate();
  const [value, setValue] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const searchparams = new URLSearchParams(window.location.search);
  const _id = searchparams.get("id");

  const [singleHotelId, setSingelHotelId] = useState("");

  const HotelIdGet = async () => {
    try {
      const url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${_id}`;
      const response = await axios.get(url, {
        headers: {
          projectId: projectID,
        },
      });
      setSingelHotelId(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(singleHotelId);
  useEffect(() => {
    HotelIdGet();
  }, [_id]);

  const handleSearchHotel = () => {
    if (hotelserach && value) {
      navigate(
        `/HotelRooms/data?city=${hotelserach}&from=${value}&to=${value}`
      );
    }
  };

const navigateToPayment = ()=>{
  navigate(`/FlightPayment/data?payment=${singleHotelId.rooms?.length >= 0 && singleHotelId?.rooms[0].price}`)
}

console.log("data", singleHotelId.rooms?.length >= 0 && singleHotelId?.rooms[0].price)
  return (
    <div className="pt-20">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "200px",
          flexWrap: "nowrap",
          padding: "30px",
          gap: "10px",
          justifyContent: "center",
          backgroundColor: "#FE6E37",
        }}
      >
        <div className="flex items-center flex-col">
          <span className="text-white font-bold text-xl">
            AREA, LANDMARK OR PROPERTY NAME
          </span>
          <input
            className="p-5 border text-xl font-bold outline-none rounded-3xl"
            style={{ marginTop: "20px", width: "400px" }}
            type="text"
            placeholder="eg. - Area Landmark and Property Name"
            value={hotelserach}
            onChange={(e) => sethotelsearch(e.target.value)}
            onClick={() => setOpenLocation(!openLocation)}
          />
        </div>
        {openLocation && (
          <div
            className="overflow-y-scroll"
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: "white",
              position: "absolute",
              top: "220px",
              zIndex: "1",
              left: "240px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
              borderRadius: "5px",
            }}
          >
            {Array.from(hotelData).map((item, index) => (
              <div
                className="p-5 hover:bg-blue-gray-50 font-rubik text-xl"
                key={index}
                onClick={() => {
                  sethotelsearch(item), setOpenLocation(false);
                }}
              >
                <div className="float-right">
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center flex-col">
          <span className="text-white font-bold text-xl">CHECKIN</span>
          <input
            className="p-5 border text-xl font-bold outline-none rounded-3xl"
            type="date"
            style={{ marginTop: "20px" }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min={new Date()}
          />
        </div>
        <div className="flex items-center flex-col">
          <span className="text-white font-bold text-xl">CHECKOUT</span>
          <input
            className="p-5 border text-xl font-bold outline-none rounded-3xl"
            type="date"
            style={{ marginTop: "20px" }}
            disabled
            value={value}
          />
        </div>
        <button
          onClick={handleSearchHotel}
          style={{
            marginTop: "40px",
            padding: "20px 30px",
            backgroundColor: "white",
            color: "#2877D6",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "800",
            fontSize: "20px",
          }}
        >
          Update Search
        </button>
      </div>
      <Grid container sx={{width:"80vw"}} spacing={2} component="center" ml={10} mt={3}>
        <Grid sx={{ padding: "20px" }} item xs={12} sm={4} md={7}>
          <Card className="p-5">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Rating
                  name="read-only"
                  value={singleHotelId.rating}
                  readOnly
                />
                <Box
                  sx={{ color: "black", fontWeight: "800", fontSize: "20px" }}
                >
                  {singleHotelId.name}
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <img
                  className=" w-20 h-20 rounded-[20px]"
                  src="https://gos3.ibcdn.com/mapDweb-1638795011.png"
                />
                <Box className="bg-[#11998E] w-20 h-20 rounded-[20px]">
                  {singleHotelId.rating}/5
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                component="img"
                // height="194"
                image={
                  singleHotelId.images?.length >= 0 && singleHotelId?.images[0]
                }
                alt="Room Image"
                sx={{
                  width: "80%",
                  height: "300px",
                  mt: "10px",
                  borderRadius: "20px",
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  // height="194"
                  image={
                    singleHotelId.images?.length >= 1 && singleHotelId.images[1]
                  }
                  alt="Room Image"
                  sx={{ width: "100%", height: "160px", borderRadius: "20px", padding:"10px" }}
                />
                <CardMedia
                  component="img"
                  // height="194"
                  image={
                    singleHotelId.images?.length >= 2 && singleHotelId.images[2]
                  }
                  alt="Room Image"
                  sx={{ width: "100%", height: "160px", borderRadius: "20px", padding:"10px" }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <Box className="flex justify-between p-3">
              <Box>
                <Box className="text-bold p-2">Deluxe Room</Box>
                <Box>
                  <span className="text-[#73757C] p-2 ">2 Guest | </span>
                  <span>1 Room</span>
                </Box>
                <Box>Free Breakfast Included</Box>
              </Box>
              <Box>
                <Box className="text-2xl font-extrabold p-2">Price</Box>
                <Box className=" text-[#73757C]">+ ₹ 2443 taxes & fees </Box>
                <Box className=" text-[#73757C]">1 Room per night</Box>
              </Box>
            </Box>
            <Box className="flex justify-center p-5">
            <Button className="hover-bg-[#FF6D38]" sx={{background:"#FF6D38",  color:"white", fontSize:"15px", fontWeight:"800", padding:"5"}}
            fullWidth
            >VIEW ROOM OPTION</Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ width: "98.7vw", padding:"10px" }} className="w-full shadow-black border bg-white">
<button className="p-2 text-xl ml-40 hover:border-blue-500">Room Options</button>
<button className="p-2 text-xl ml-10 hover:border-b-blue-500">Amenities</button>
<button className="p-2 text-xl ml-10 hover:border-b-blue-500">Guest Reviews</button>
<button className="p-2 text-xl ml-10 hover:border-b-blue-500">Property Policies</button>
<button className="p-2 text-xl ml-10 hover:border-b-blue-500">Location</button>
<button className="p-2 text-xl ml-10 hover:border-b-blue-500">question & answers</button>
<button className="p-2 text-xl ml-10 hover:border-b-blue-500">Similar Properties</button>
      </Box>
   <Box className="flex justify-center p-4">
    <Box className="w-[30%] border ">
      <Box className="bg-[#D1E5FF] p-3">Room Type</Box>
      <img style={{height:"400px", width:"100%"}} src={singleHotelId.images?.length >= 1 && singleHotelId.images[1]}/>
      </Box>
    <Box className="w-[30%] border">
       <Box className="bg-[#D1E5FF] p-3">Room Options</Box>    
       <Box p={5}>
        <label>1. Free Breakfast | Free Cancellation</label>
        <ul style={{listStyle:"initial"}}>
          <li style={{padding:"20px"}}>Breakfast</li>
          <Box>{singleHotelId.rooms?.length >= 0 && singleHotelId?.rooms[0].cancellationPolicy}</Box>
        </ul>
       </Box>
    </Box>
    <Box className="w-[30%] border">
       <Box className="bg-[#D1E5FF] p-3">Price</Box>
       <Box className="p-20">
                <Box className="text-2xl font-extrabold p-2">{ singleHotelId.rooms?.length >= 0 && singleHotelId?.rooms[0].price}</Box>
                <Box className=" text-[#73757C]">+ ₹ 2443 taxes & fees </Box>
                <Box className=" text-[#73757C]">1 Room per night</Box>
                <Box className="p-4 ">
              <Button onClick={()=>navigateToPayment()} className="hover-bg-[#FF6D38]" sx={{background:"#FF6D38", color:"white", fontSize:"15px", fontWeight:"800", padding:"10"}}>Select Room</Button>
              </Box>
              </Box>
       </Box>
    </Box>   
    </div>
  );
}
