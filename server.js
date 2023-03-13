const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Registeruser = require('./model')
const jwt = require('jsonwebtoken')
// const middleware = require('./middleware')
app.use(express.json())
const middleware = (req, res, next) => {
    try {

        let token = req.header('x-token')
        if (!token) {
            res.status(400).send("Token Not Found")
        }

        let decode = jwt.verify(token, "jwtSecret");
        req.user = decode.user
        next()


    } catch (err) {
        console.error(err)
        res.status(500).send("Server Error in Middleware")
    }
}
mongoose.connect("mongodb+srv://pranaydarshi:pranaydarshi@cluster0.6bydbgh.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Database Connected Succesffuly");

}).catch(err => console.log(err))
app.get('/', (req, res) => {
    res.send("Welcome Sai")
})

app.post("/register", async (req, res) => {
    try {
        const { username, email, password, confirmpassword } = req.body;
        let exist = await Registeruser.findOne({ email })
        if (exist) {
            res.status(400).send("User Already Exists")
        }
        if (password != confirmpassword) {
            res.status(400).send("Passoword and confirmpassoword should be same")
        }
        let newUser = await Registeruser({
            username, email, password, confirmpassword
        })
        await newUser.save()
        res.status(200).send('Registerd Successfully')
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error")
    }
})
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let exist = await Registeruser.findOne({ email })
        if (!exist) {
            res.status(400).send("User Not Exists")
        }
        if (exist.password != password) {
            res.status(400).send("Invalid Credentials")
        }
        let payload = {
            user: {
                id: exist.id
            }
        }
        jwt.sign(payload, "jwtSecret", { expiresIn: 3600000 },
            (err, token) => {
                if (err) throw err
                res.json({ token })
            }
        )
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error")
    }
})

app.get('/myprofile', middleware, async (req, res) => {
    try {
        let exist = await Registeruser.findById(req.user.id)
        if (!exist) {
            res.status(400).send("User Not Found")
        }
        res.json(exist)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Sever Error")
    }
})

app.listen(1234, () => {
    console.log("Server is Running");

})