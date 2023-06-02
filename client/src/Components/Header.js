import React, { useContext } from 'react'
import './header.css';
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate('');

    const { loginData, setLoginData } = useContext(LoginContext)

    const [anchorEl, setAnchorEl] = React.useState();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken")
        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        })

        const data = await res.json();

        if (data.status === 200) {
            localStorage.removeItem("usersdatatoken")
            setLoginData(false);
            alert("logout Successfull")
            navigate('/')
        }
        else {
            navigate('*');

        }
    }

    const goDash = () => {
        navigate('/dash');
    }

    const goError = () => {
        navigate("*");
    }

    return (
        <>
            <header>
                <nav>
                    <h1>Home</h1>
                    <div className="avtar" >
                        {
                            loginData.ValidUserOne ? <Avatar onClick={handleClick} style={{ background: "salmon" }}>{loginData.ValidUserOne.fname[0].toUpperCase()}</Avatar>
                                :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }
                    </div>

                    <Menu
                        style={{ marginTop: '50px' }}
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {
                            loginData.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }

                    </Menu>

                </nav>
            </header>
        </>
    )
}

export default Header