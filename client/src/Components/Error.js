import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <div className="container">
                <div style={{ minHeight: "85vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRalrXLAzN_4qyJrdSeoawoqAzpxPfgjKJKuw&usqp=CAU" alt="error" style={{ width: "700px", marginBottom: 20 }} />
                    <h2 className="mb-3">PAGE NOT FOUND</h2>
                    <NavLink to="/" className="btn btn-primary" style={{ fontSize: 18 }}> Back To Home Page </NavLink>
                </div>
            </div>
        </>
    )
}

export default Error