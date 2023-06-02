import React, { useState } from 'react'
import './mix.css'
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate('')

    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpVal] = useState({

        email: "",
        password: ""
    })

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpVal(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = inpval;

        if (email === "") {
            alert("Please enter your email")
        }
        else if (!email.includes("@")) {
            alert("enter valid email")
        }
        else if (password === "") {
            alert("Please enter your password")
        }
        else if (password.length < 6) {
            alert("password must be 6 letters")
        }
        else {
            const data = await fetch("/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const res = await data.json();
            console.log(res);

            if (res.status === 200) {
                localStorage.setItem("usersdatatoken", res.result.token)
                alert("Login successfully !")
                navigate('/dash');
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' onChange={setVal} value={inpval.email} placeholder='Enter Your Email Address'></input>
                        </div>

                        <div className="form_input">
                            <label htmlFor='password'>Password</label>
                            <div className="two">
                                <input type={!passShow ? 'password' : 'text'} name='password' onChange={setVal} value={inpval.password} placeholder='Enter Your Password'></input>
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginUser}>Login</button>
                        <p>Don't have an Account? <NavLink to='/register'>Sign Up</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login