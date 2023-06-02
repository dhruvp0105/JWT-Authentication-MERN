import React, { useState } from 'react'
import './mix.css'
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {

  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setcPassShow] = useState(false);

  const navigate = useNavigate('');

  const [inpval, setInpVal] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: ""
  })

  // console.log(inpval);

  const setVal = (e) => {
    // console.log(e.target.value)
    const { name, value } = e.target;

    setInpVal(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  }

  const addUserData = async (e) => {
    e.preventDefault();   //when we click to the button then page not loaded...

    const { fname, email, password, cpassword } = inpval;
    if (fname === "") {
      alert("Please enter your name")
    }
    else if (email === "") {
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
    else if (cpassword === "") {
      alert("Please enter your confirm password")
    }
    else if (cpassword.length < 6) {
      alert("password must be 6 letters")
    }
    else if (password !== cpassword) {
      alert("password and confirm password not match")
    }
    else {
      const data = await fetch("/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname, email, password, cpassword
        })
      })

      const res = await data.json();
      // console.log(res);

      if (res.status === 200) {
        alert("user register successfully !")
        navigate('/');
      }
    }

  }

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: 'center' }}>We are glad that you will be using Project Cloud to manage <br />your tasks! We hope that you will get like it.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor='fname'>Name</label>
              <input type='text' onChange={setVal} name='fname' value={inpval.fname} placeholder='Enter Your Name'></input>
            </div>

            <div className="form_input">
              <label htmlFor='email'>Email</label>
              <input type='email' onChange={setVal} name='email' value={inpval.email} placeholder='Enter Your Email Address'></input>
            </div>

            <div className="form_input">
              <label htmlFor='password'>Password</label>
              <div className="two">
                <input type={!passShow ? 'password' : 'text'} onChange={setVal} name='password' value={inpval.password} placeholder='Enter Your Password'></input>
                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <div className="form_input">
              <label htmlFor='password'>Confirm Password</label>
              <div className="two">
                <input type={!cpassShow ? 'password' : 'text'} onChange={setVal} name='cpassword' value={inpval.cpassword} placeholder='Confirm Password'></input>
                <div className="showpass" onClick={() => setcPassShow(!cpassShow)}>
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className='btn' onClick={addUserData}>Sign Up</button>
            <p>Already have an account? <NavLink to='/'>Login</NavLink></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register