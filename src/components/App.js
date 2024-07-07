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
import FlightReview from "../pages/FlightReview.js";
import TrainResult from "../pages/TrainResult.js";
import BusResults from "../pages/BusResults.js";
import BusReview from "../pages/BusReview.js";
import SuccessPayment from "../pages/SuccessPayment.js";
import TrainReview from "../pages/TrainReview.js";

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
        <Route path="/FlightReview/:data" element={<FlightReview/>}/>
        <Route path="/TrainResult/:data" element={<TrainResult/>}/>
        <Route path='/TrainReview/:data' element={<TrainReview/>}/>
        <Route path="/BusResults/:data" element={<BusResults/>}/>
        <Route path="/BusReview" element={<BusReview/>}/>
        <Route path='/SuccessPayment' element={<SuccessPayment/>}/>
      </Routes>
    
    </BrowserRouter>
  );
}
export default App;