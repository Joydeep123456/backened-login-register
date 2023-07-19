import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import sendEmail from "./controllers/emailController.js"
const PORT=process.env.PORT||9002;


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Login-Register").then(() => {
    console.log("Connected to MongoDb succesfully")
}).catch((err) => {
    console.log(`Your error is ${err}`);
})
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String

})
const User = new mongoose.model("User", userSchema)




app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    User.findOne({ email: email }).then((users, err) => {
        if (users) {
            if(password===users.password){
                res.status(200).send({message:'You logged inside!! ',name:users.name})

            }
            else{
                res.status(202).send({ message: "Password didn't match"})
            }
        }
        else {
            res.status(207).send({message: "User not registered"})

        }
    })
})

app.post("/register", (req, res) => {
    // res.send("My API Register")
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = new User({
        name: name,
        email: email,
        password: password
    })
    User.findOne({ email: email }).then((users, err) => {
        sendEmail(req);
        if (users) {
            res.send("You r already registered!!");
        }
        else {
            
            
            user.save().then(res.send("You r sucessfully registered!!"));

        }
    })


})

app.listen(PORT, () => {
    console.log(`BE started at port ${PORT}`)
})
