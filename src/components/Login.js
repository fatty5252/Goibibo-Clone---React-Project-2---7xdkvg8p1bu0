
import * as React from 'react';
// import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useUser } from '../providers/userProvider';
import { useUser } from "../providers/UserProvider";
import { logInURL, singUpURL } from './Constrains';


function Login() {

    let isAuthenticated;

    const { onTokenHandler, onNameHandler, loginpop, setLoginpop } = useUser();
    const [toggle, setToggle] = useState(true);

    const [getData, setData] = useState({
        name: "",
        email: '',
        password: '',
        appType: 'ecommerce'
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [getError, setError] = useState(null);
    const navigate = useNavigate();
    const onChangeHandler = (event) => {
        setData({ ...getData, [event.target.name]: event.target.value })
    }
    const onLoginSubmitHandler = (event) => {
        event.preventDefault();
        setError(null);
        if (!getData.email) {
            setError('Email is mandatory');
            return;
        }
        else if (!getData.password) {
            setError('Password cannot be empty');
            return;
        }
        axios.post(logInURL, getData, {
            headers: {
                projectID: 'qw7c96xhq4ll'
            }
        }).then((result) => {
            onTokenHandler(result.data.token);
            onNameHandler(result.data.data.user.name);
            isAuthenticated = true;
            navigate('/');
            setLoginpop(false)
            console.log(isAuthenticated);
        }).catch((error) => {
            setError("Internal server error. Please try again later.");
        })
    }

    //   ====================== Register submit handeler========================

    const onRegisterSubmitHandler = (event) => {
        console.log("hello")
        event.preventDefault();
        setError(null);
        if (!getData.name) {
            setError("UserName is mandatory");
            return;
        } else if (!getData.email) {
            setError("Email is mandatory");
            return;
        } else if (!getData.password) {
            setError("Password cannot be empty");
            return;
        }
        axios
            .post(
                singUpURL,
                getData,
                {
                    headers: {
                        projectID: "qw7c96xhq4ll",
                    },
                }
            )
            .then((result) => {
                console.log(result);
                // navigate("/login");
                setToggle(true)
            })
            .catch(() => {
                setError("This email ID is already registered.");
            });
    };

    return (
        <>
            <div className='login-main-container '>
                {/* <div className='inline ml-12'>
                    <button onClick={() => setLoginpop(false)}>1006</button>
                </div> */}
                {/* if toggle Login */}
                {
                    toggle && <div style={{ height: "100vh", width: "70vw" }} className='flex justify-end items-center'>
                        <div className="w-1/3 border rounded-3xl bg-white shadow-lg p-8" style={{ width: "25pc" }}>
                            <button className='text-black' onClick={() => setLoginpop(false)}>&#x2716;</button>
                            <h2 className="text-2xl mb-4 text-center  font-bold text-black">Login</h2>
                            {getError && <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">{getError}</div>}
                            <form onSubmit={onLoginSubmitHandler} className="space-y-4">
                                <div className="form-group">
                                    <TextField id="standard-basic" label="Enter your email" variant="standard" className=" form-input bg-transparent border p-1 mt-1 block w-full rounded-md text-white border-gray-300" value={getData.email} onChange={onChangeHandler} name="email" />
                                </div>
                                <div className="form-group">
                                    <FormControl sx={{ m: 1, width: '38ch' }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={getData.password} onChange={onChangeHandler}
                                            name="password"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="appType" className="block font-semibold text-black">App Type</label>
                                    <select className=" text-black mt-1 p-1 block w-full bg-transparent border rounded border-gray-300" value={getData.appType} onChange={onChangeHandler} name="appType">
                                        <option value="ecommerce" className=' bg-inherit'>bookingportals</option>
                                    </select>
                                </div>
                                <div className='inline ml-12'>
                                    {/* <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-20 rounded-md mt-8 ">Log in</button>
                                    <button type="submit" className=" bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-md mt-8 ml-8" >Sign Up</button> */}
                                    <button onClick={() => { setToggle(true) }}
                                        type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-8  ">Log in</button>
                                    <button onClick={() => { setToggle(false) }}
                                        type="submit" className=" bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-md mt-8 ml-8">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }

                {/* if Not toggle singIn */}

                {
                    !toggle && <div style={{ height: "100vh", width: "70vw" }} className='flex justify-end items-center'>
                        <div className="w-1/3 border rounded-3xl bg-white shadow-lg p-8" style={{ width: "25pc" }}>
                            <button className='text-black' onClick={() => setLoginpop(false)}>&#x2716;</button>
                            <h2 className="text-2xl mb-4 text-center  font-bold text-black">SignUp</h2>
                            {getError && <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">{getError}</div>}
                            <form onSubmit={onRegisterSubmitHandler} className="space-y-4">
                                <div className="form-group">
                                    <TextField id="standard-basic" label="Enter your name" variant="standard" className=" form-input bg-transparent border p-1 mt-1 block w-full rounded-md text-white border-gray-300" value={getData.name} onChange={onChangeHandler} name="name" />
                                </div>
                                <div className="form-group">
                                    <TextField id="standard-basic" label="Enter your email" variant="standard" className=" form-input bg-transparent border p-1 mt-1 block w-full rounded-md text-white border-gray-300" value={getData.email} onChange={onChangeHandler} name="email" />
                                </div>
                                <div className="form-group">
                                    <FormControl sx={{ m: 1, width: '38ch' }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={getData.password} onChange={onChangeHandler}
                                            name="password"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="appType" className="block font-semibold text-black">App Type</label>
                                    <select className=" text-black mt-1 p-1 block w-full bg-transparent border rounded border-gray-300" value={getData.appType} onChange={onChangeHandler} name="appType">
                                        <option value="ecommerce" className=' bg-inherit'>bookingportals</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button 
                                    // onClick={() => { setToggle(true) }}
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default Login;
