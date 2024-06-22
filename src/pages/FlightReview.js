import { Box } from "@mui/material";
import {React, useState, useEffect} from "react";
import { TbBackground } from "react-icons/tb";
import { projectID } from "../components/Constrains";
import axios from "axios";
import dayjs from "dayjs";
import { useUser } from "../providers/UserProvider";
import { Typography } from "@material-tailwind/react";

export default function FlightReview() {

  const {getAirlineInfo, value, formattedDate} = useUser()

  const [singleFlightId, setSingleFlightId] = useState();

  const searchparams = new URLSearchParams(window.location.search);
  const _id = searchparams.get('id')
  
  // const day = searchparams.get('day')

//   const [value, setValue] = useState(dayjs(new Date()));

// // Increment the date by one day
// // const nextDay = value.add(1, 'day');

// // Extract the date object
// const dateObj = new Date(value.$d);

//   // Create formatter for day, month, weekday, and year
//   const dayFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit' });
//   const monthFormatter = new Intl.DateTimeFormat('en-GB', { month: 'short' });
//   const weekdayFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'short' });
//   const yearFormatter = new Intl.DateTimeFormat('en-GB', { year: 'numeric' });

//   // Format parts
//   const day = dayFormatter.format(dateObj);
//   const month = monthFormatter.format(dateObj);
//   const weekday = weekdayFormatter.format(dateObj);
//   const year = yearFormatter.format(dateObj);

//   // Combine into the desired format
//   const formattedDate = `${day} ${month}, ${weekday} ${year}`;

//   console.log(formattedDate); // Output: "21 Jun, Fri 2024"

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
 
  useEffect(()=>{
    FlightIdGet();
  },[]);

  return (
    <div className="bg-[#E9EEF7] h-[100vh] border-2 border-pink-500 border-solid">
      <div className="flex justify-center ">
        <div className="bg-blue-500 w-full h-72 ">
        <h1 className="text-2xl text-white md:text-3xl font-bold mb-4 pt-3 text-center">Review your booking</h1>

          <div className="flex mx-11 flex-col lg:flex-row gap-6">
          <div className="bg-white rounded-md shadow-md p-4 w-full lg:w-2/3 border border-gray-200">
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
                <div className="text-blue-600 font-semibold">Start on - {formattedDate}</div>
              </div>
              <div className="flex md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <div className="text-xl font-bold">{singleFlightId?.arrivalTime}</div>
                  <div className="text-lg">{singleFlightId?.source}</div>
                </div>
                <div className="text-center my-4 md:my-0">
                  <div className="text-lg">{singleFlightId?.duration} hr</div>
                  <div className="text-lg">{singleFlightId?.duration} min duration</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{singleFlightId?.departureTime}</div>
                  <div className="text-lg">{singleFlightId?.destination}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-md p-4 w-full lg:w-1/3 border border-gray-200">
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
                  <span className="text-blue-700 font-bold text-lg">Grand Total</span>
                  <span className="text-blue-700 font-bold text-lg">
                    {singleFlightId?.ticketPrice + Math.round(singleFlightId?.ticketPrice * 0.18)}
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md mt-4 text-center">
                <p>Tap to contribute <b>₹{Math.round(singleFlightId?.ticketPrice % 18)} towards plantation of 2 million trees</b></p>
                <a href="#" className="text-blue-700 font-bold">Know More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




//   return (
//     <div className="bg-[#E9EEF7] min-h-screen p-4">
//       <div className="max-w-5xl mx-auto">
//         <div className="bg-blue-500 text-white p-6 rounded-md shadow-md">
//           <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Review your booking</h1>
//           <div className="flex flex-col lg:flex-row gap-6">
//             <div className="bg-white rounded-md shadow-md p-4 w-full lg:w-2/3 border border-gray-200">
//               <h2 className="text-xl md:text-2xl font-bold mb-2">
//                 {singleFlightId?.source} - {singleFlightId?.destination}
//               </h2>
            //   <p className="text-gray-600 mb-4">
            //     {singleFlightId?.stop} stop | All departure/arrival times are in local time
            //   </p>
            //   <div className="bg-gray-100 rounded-md p-4 mb-4">
            //     <div className="flex items-center mb-2">
            //       <img
            //         src={getAirlineInfo(singleFlightId?.flightID.slice(0, 2)).logoSrc}
            //         alt="Airline logo"
            //         className="w-8 h-8 mr-2"
            //       />
            //       <Typography variant="body1" className="text-lg">
            //         {getAirlineInfo(singleFlightId?.flightID.slice(0, 2)).airlineName}
            //       </Typography>
            //     </div>
            //     <p className="text-gray-600">{singleFlightId?.flightID}</p>
            //     <div className="text-blue-600 font-semibold">Start on - {formattedDate}</div>
            //   </div>
            //   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            //     <div>
            //       <div className="text-xl font-bold">{singleFlightId?.arrivalTime}</div>
            //       <div className="text-lg">{singleFlightId?.source}</div>
            //     </div>
            //     <div className="text-center my-4 md:my-0">
            //       <div className="text-lg">{singleFlightId?.duration} hr</div>
            //       <div className="text-lg">{singleFlightId?.duration} min duration</div>
            //     </div>
            //     <div className="text-right">
            //       <div className="text-xl font-bold">{singleFlightId?.departureTime}</div>
            //       <div className="text-lg">{singleFlightId?.destination}</div>
            //     </div>
            //   </div>
            // </div>
            // <div className="bg-white rounded-md shadow-md p-4 w-full lg:w-1/3 border border-gray-200">
            //   <div className="border-b border-gray-300 pb-4 mb-4">
            //     <h2 className="font-bold text-lg">FARE SUMMARY</h2>
            //     <p className="text-gray-600">1 ADULT</p>
            //   </div>
            //   <div className="flex justify-between mb-4">
            //     <span className="text-lg">Base fare</span>
            //     <span className="text-lg font-bold">{singleFlightId?.ticketPrice}</span>
            //   </div>
            //   <div className="flex justify-between mb-4">
            //     <span>Adult (1 x {singleFlightId?.ticketPrice})</span>
            //     <span>{singleFlightId?.ticketPrice}</span>
            //   </div>
            //   <div className="flex justify-between mb-4">
            //     <span className="font-bold">Taxes and Surcharges</span>
            //     <span className="font-bold">{Math.round(singleFlightId?.ticketPrice * 0.18)}</span>
            //   </div>
            //   <div className="border-t border-gray-300 pt-4">
            //     <div className="flex justify-between">
            //       <span className="text-blue-700 font-bold text-lg">Grand Total</span>
            //       <span className="text-blue-700 font-bold text-lg">
            //         {singleFlightId?.ticketPrice + Math.round(singleFlightId?.ticketPrice * 0.18)}
            //       </span>
            //     </div>
            //   </div>
            //   <div className="bg-gray-100 p-4 rounded-md mt-4 text-center">
            //     <p>Tap to contribute <b>₹{Math.round(singleFlightId?.ticketPrice % 18)} towards plantation of 2 million trees</b></p>
            //     <a href="#" className="text-blue-700 font-bold">Know More</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
 
