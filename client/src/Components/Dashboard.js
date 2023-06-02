import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Dashboard = () => {

    const navigate = useNavigate('');
    const [data, setData] = useState(false);


    const { loginData, setLoginData } = useContext(LoginContext)
    // console.log(loginData.ValidUserOne.email);
    // const userEmail = loginData.ValidUserOne.email;


    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken")
        // console.log(token);  
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data1 = await res.json();
        // console.log(data);

        if (data1.status === 401 || !data1) {
            navigate('*');
        }
        else {
            // console.log("user verified")
            setLoginData(data1);
            navigate("/dash")
        }
    }


    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true);
        }, 1000)
    }, []);

    return (
        <>
            {
                data ?

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qRhi1Ll_fblcMHTG0UEWeKrEC-gr8cgYeg&usqp=CAU' alt='img' style={{ width: '380px', marginTop: 40 }} />
                        <h1>User Email : {loginData ? loginData.ValidUserOne.email : ""} </h1>
                    </div>

                    :

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh" }}>
                        Loading... &nbsp;
                        <CircularProgress />
                    </Box>
            }
        </>
    )
}

export default Dashboard