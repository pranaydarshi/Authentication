const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Registeruser = require('./model')
const jwt = require('jsonwebtoken')
const middleware = require('./middleware')
app.use(express.json())
const data = [{
    name:"pranay",
    email:"pranay@gmail.com",
    password:1234,
    confirmpassword:1234,
    id:1
}]

// const middleware = (req, res, next) => {
//     try {

//         let token = req.header('x-token')
//         if (!token) {
//             res.status(400).send("Token Not Found")
//         }

//         let decode = jwt.verify(token, "jwtSecret");
//         req.user = decode.user
//         next()


//     } catch (err) {
//         console.error(err)
//         res.status(500).send("Server Error in Middleware")
//     }
// }
// mongoose.connect("mongodb+srv://pranaydarshi:pranaydarshi@cluster0.6bydbgh.mongodb.net/?retryWrites=true&w=majority").then(() => {
//     console.log("Database Connected Succesffuly");

// }).catch(err => console.log(err))thu
app.get('/', (req, res) => {
    res.send("Welcome Sai")
})

app.post("/register", async (req, res) => {
    try {
        const { username, email, password,confirmpassword,id } = req.body;
        // let exist = await Registeruser.findOne({ email })
        // let exist = data.find(em=>{
        //     em.email === email;
        // })
        // if (exist) {
        //     res.status(400).send("User Already Exists")
        // }
        // if (password != confirmpassword) {
        //     res.status(400).send("Passoword and confirmpassoword should be same")
        // }
        // let newUser = await Registeruser({
        //     username, email, password, confirmpassword
        // })
        data.push({username,email,password,id})

        // await newUser.save()
        res.status(200).send('Registerd Successfully')
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error")
    }
})
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // let exist = await Registeruser.findOne({ email })
        
        // if (!exist) {
        //     res.status(400).send("User Not Exists")
        // }
        // if (exist.password != password) {
        //     res.status(400).send("Invalid Credentials")
        // }
        let payload = {
            email,password
                
            }
        // }
        jwt.sign(payload, "jwtSecret", { expiresIn: 3600000 },
            (err, token) => {
                if (err) throw err
                res.json({email,token})
            }
        )
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error")
    }
})

app.post('/myprofile', middleware, async (req, res) => {
    try {
        // let exist = await Registeruser.findById(req.user.id)
        // let exist = req.user.id;
        // if (!exist) {
        //     res.status(400).send("User Not Found")
        // }
        jwt.verify(req.token,"jwtSecret",(err,data)=>{
            if(err){
                res.status(500).send("Server Error")
            }
            res.send("Hello: "+data.email)
        })
        // res.json(data)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Sever Error")
    }
})

app.listen(1234, () => {
    console.log("Server is Running");

})
