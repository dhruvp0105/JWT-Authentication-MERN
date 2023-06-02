import Header from "./Components/Header";
import Login from "./Components/Login";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Error from "./Components/Error";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./Components/ContextProvider/Context";

function App() {

  const [data, setData] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext)
  const navigate = useNavigate();


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
      navigate('/');
      // console.log("user not found");
    }
    else {
      // console.log("user verified")
      setLoginData(data1);
      navigate('/dash')
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
        data ? (
          <>
            <Header />
            <Routes>
              <Route exact path="/" element={<Login />}></Route>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/dash" element={<Dashboard />}></Route>
              <Route exact path="*" element={<Error />}></Route>
            </Routes>
          </>
        )
          :
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh" }}>
            Loading... &nbsp;
            <CircularProgress />
          </Box>
      }

    </>
  );
}

export default App;
