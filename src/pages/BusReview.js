import React, { useState } from 'react';
import { useBususer } from '../providers/BusUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function BusReview() {

    const navigate = useNavigate();
    const { paymentData } = useBususer();
    const [paymentdone, setpaymentdone] = useState(false);
    const [debitdata, setdebitdata] = useState({
        cardno: "",
        Expirymonth: "",
        Expiryyear: "",
        CVV: "",
        name: "",
    });
    const [openUPI, setOpenUPI] = useState(false);
    const [openDebit, setOpendebit] = useState(false);
    const [upi, setupi] = useState('');

    function AddressInfo(key, value) {
        setdebitdata((prev) => ({ ...prev, [key]: value }));
    }

    const handlepaymentfromUpi = () => {
        if (upi !== '' && upi.includes("@")) {
            setpaymentdone(!paymentdone);
            setpaymentdone(false);
            navigate('/SuccessPayment');
        } else {
            toast.error("Enter correct UPI");
        }
    };

    const handlepaymentfromdebit = () => {
        let cardNum = /^[0-9]{16}$/;
        let resultCardNum = cardNum.test(debitdata.cardno);
        if (!resultCardNum) {
            toast.error("Invalid Card Number");
            return;
        }

        let monthExp = /^(0[1-9]|1[0-2])$/;
        let resultExp = monthExp.test(debitdata.Expirymonth);
        if (!resultExp) {
            toast.error("Invalid Month of Expiry");
            return;
        }

        let yearExp = /^(20[2-9][0-9]|2[1-9][0-9]{2}|30[0-5][0-9]|3060)$/;
        let resultExpYear = yearExp.test(debitdata.Expiryyear);
        if (!resultExpYear) {
            toast.error("Invalid Year of Expiry");
            return;
        }

        let cvv = /^[0-9]{3}$/;
        let resultCVV = cvv.test(debitdata.CVV);
        if (!resultCVV) {
            toast.error("Invalid CVV");
            return;
        }

        if (resultCardNum && resultCVV && resultExp) {
            setpaymentdone(!paymentdone);
            setTimeout(() => {
                setpaymentdone(false);
                navigate('/SuccessPayment');
            }, 3000);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" />
            <div className='flex justify-center items-center flex-col p-8 md:p-16 lg:p-32'>
                <div className='flex flex-col items-start p-6 md:p-9 shadow-2xl rounded-2xl w-full max-w-xl'>
                    <h3 className='review-head p-2 font-bold text-lg md:text-xl lg:text-2xl flex items-start text-blue-400'>
                        Payment Details: {paymentData?.fare}
                    </h3>

                    {/* UPI DETAILS */}
                    <div className='main-upi-ctn p-2'>
                        <p
                            className='p-2 font-bold text-md md:text-lg lg:text-xl cursor-pointer'
                            onClick={() => { setOpenUPI(!openUPI); setupi(""); setOpendebit(false); }}
                        >
                            Pay with UPI
                        </p>
                        {openUPI && (
                            <input
                                className='h-10 w-full border-[1px] border-solid text-lg my-1'
                                type='text'
                                onChange={(e) => setupi(e.target.value)}
                                value={upi}
                                placeholder='Enter UPI'
                            />
                        )}
                    </div>

                    {/* DEBIT DETAILS */}
                    <p
                        className='p-2 font-bold text-md md:text-lg lg:text-xl cursor-pointer'
                        onClick={() => { setOpendebit(!openDebit); setdebitdata(""); setOpenUPI(false); }}
                    >
                        Pay with any Debit card
                    </p>
                    {openDebit && (
                        <div className='w-full rounded-2xl p-8 border-none bg-slate-300'>
                            <div className='card-num-ctn'>
                                <input
                                    className='h-10 w-full border-[1px] border-solid text-lg my-1'
                                    type='text'
                                    maxLength={16}
                                    value={debitdata.cardno}
                                    onChange={(e) => AddressInfo("cardno", e.target.value)}
                                    placeholder='xxxx xxxx xxxx'
                                />
                            </div>
                            <div className='grid gap-2 grid-cols-1 md:grid-cols-3'>
                                <input
                                    className='w-full h-10 border-[1px] border-solid text-lg my-1'
                                    type='text'
                                    value={debitdata.Expirymonth}
                                    onChange={(e) => AddressInfo("Expirymonth", e.target.value)}
                                    placeholder='MM'
                                />
                                <input
                                    className='w-full h-10 border-[1px] border-solid text-lg my-1'
                                    type='text'
                                    value={debitdata.Expiryyear}
                                    onChange={(e) => AddressInfo("Expiryyear", e.target.value)}
                                    placeholder='YEAR'
                                />
                                <input
                                    className='w-full h-10 border-[1px] border-solid text-lg my-1'
                                    type='text'
                                    value={debitdata.CVV}
                                    onChange={(e) => AddressInfo("CVV", e.target.value)}
                                    placeholder='CVV'
                                />
                            </div>
                            <div className='atm-card-name'>
                                <input
                                    className='h-10 w-full border-[1px] border-solid  text-lg my-1'
                                    type='text'
                                    value={debitdata.name}
                                    onChange={(e) => AddressInfo("name", e.target.value)}
                                    placeholder='Cardholder name'
                                />
                            </div>
                            <div className='img-debit-ctn flex justify-start'>
                                <img
                                    style={{ width: '40px' }}
                                    src="https://prod-img.thesouledstore.com/public/theSoul/images/credit-card.png?format=webp&amp;w=768&amp;dpr=1.0"
                                    alt="Credit Card"
                                />
                            </div>
                        </div>
                    )}

                    {/* CONFIRM BUTTON */}
                    <div className='flex justify-center items-center mt-4'>
                        {openUPI && (
                            <button
                                onClick={handlepaymentfromUpi}
                                className='p-2 text-center text-white bg-orange-500 w-[100%] md:w-[70%] lg:w-[100%] rounded-lg'
                            >
                                CONFIRM ORDER
                            </button>
                        )}
                        {openDebit && (
                            <button
                                onClick={handlepaymentfromdebit}
                                className='p-2 text-center text-white bg-orange-500 w-[100%] md:w-[70%] lg:w-[100%] rounded-lg'
                            >
                                CONFIRM ORDER
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
