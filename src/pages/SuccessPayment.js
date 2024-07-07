import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/SuccessPayment.css'



export default function SuccessPayment() {
    return (
        <body class="flex items-center justify-center h-screen bg-gray-100">

    <div class="flex p-6  w-1/2 h-1/2 items-center justify-center">
        <div class="w-full h-full bg-white shadow-inherit flex flex-col items-center justify-center p-4 space-y-4">
            <h2 class="text-green-500 text-center text-2xl animate-line-1">Payment Successful</h2>
            <h2 class="text-center text-xl animate-line-2">Dear User,</h2>
            <p class="text-center animate-line-3">Booking Confirmed 🙂</p>
            <a href="/" class="text-blue-500 text-center animate-line-4">Continue Bookings</a>
        </div>
    </div>

</body>

    )
}