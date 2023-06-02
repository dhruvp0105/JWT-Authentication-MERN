const express = require('express');
const userdb = require('../model/userSchema');
const bcrypt = require("bcryptjs");
const authenticate = require('../middleware/Authenticate');

const route = new express.Router();

route.post("/register", async (req, res) => {
    // console.log(req.body)
    const { fname, email, password, cpassword } = req.body;
    try {
        const preuser = await userdb.findOne({ email: email })
        if (preuser) {
            res.status(422).json({ error: "This email is already exist." })
        }
        else {
            const finalUser = await userdb({
                fname, email, password, cpassword
            })

            //here password hashing...
            const storedata = await finalUser.save();
            // console.log(storedata);
            res.status(200).json({ status: 200, storedata });
        }

    }
    catch (error) {
        res.status(422).json(error);
    }
})

route.post("/login", async (req, res) => {
    // console.log(req.body);   
    const { email, password } = req.body;
    try {
        const uservalid = await userdb.findOne({ email: email })
        if (uservalid) {
            const isMatch = await bcrypt.compare(password, uservalid.password)
            if (!isMatch) {
                res.status(422).json({ error: 'Please enter correct password' });
            }
            else {
                //token generate...
                const token = await uservalid.generateAuthtoken();
                // console.log(token);

                // cookie generate...
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                });

                const result = {
                    uservalid, token
                }

                res.status(200).json({ status: 200, result })

            }
        }
    } catch (error) {
        res.status(422).json(error);
    }

})

// user valid

route.get("/validuser", authenticate, async (req, res) => {
    // console.log("done")
    try {
        const ValidUserOne = await userdb.findOne({ _id: req.userId })
        if (!ValidUserOne) {
            res.status(401).json({ status: 401, error: "User not found" });
            console.log("user not found")
        }
        else {
            res.status(200).json({ status: 200, ValidUserOne });
        }
    } catch (error) {
        res.status(401).json({ status: 401, error });

    }
})

//user logout ...
route.get('/logout', authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        })
        res.clearCookie("usercookie", { path: '/' })
        req.rootUser.save();
        res.status(200).json({ status: 200 })

    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
})

module.exports = route;