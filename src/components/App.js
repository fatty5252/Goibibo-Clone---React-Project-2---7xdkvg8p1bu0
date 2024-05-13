import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Bus from "../pages/Bus";
import Train from "../pages/Train";
// import { Hotel } from "@mui/icons-material";
import Login from "./Login";
import FlightResults from "../pages/FlightResults";
import Footer from "./Footer.js";
import Hotels from "../pages/Hotel.js";
import CompOne from "./TrainOffrs.js";
import HotelResults from "../pages/HotelResults.js";
// import Layout from "./Layout"; // Import the Layout component


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <CompOne/> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route index path="/Flight" element={<Home/>}/> */}
        <Route path="/Bus" element={<Bus/>}/>
        <Route path="/Train" element={<Train/>}/>
        {/* <Route path="/Hotel" element={<Hotel/>}/> */}
        <Route path="/Hotel" element={<Hotels/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/FlightResult/:data" element={<FlightResults/>}/>
        <Route path="/HotelResults/:data" element={<HotelResults/>}/>

      </Routes>
    
    </BrowserRouter>
  );
}
export default App;