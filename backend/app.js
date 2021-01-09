const express = require("express");
const app = express();
const Data = require('./Data');
const Register = require("./src/db/Person.js");
const bodyParser = require('body-parser');
const path = require("path");
require("./src/db/conn.js");
const static_path = path.join(__dirname,"./");//backend folder



app.use(express.json());
app.use(express.static(static_path));  


app.use(express.urlencoded({ extended: false }));


app.set('views', './') // specify the views directory
app.set('view engine', 'ntl') // register the template engine

app.post("/register",async(req,res)=>{
    try{
        const registerUser = new Register({
            username:req.body.username,
            password:req.body.password

        })
        const r = await registerUser.save();
        res.status(201).render("login.html");
    }catch(err){
        res.status(400).send("Error");
    }
})

app.post("/login",async(req,res)=>{
    try{
        const user = req.body.username;
        const pass = req.body.password;
        const name = await Register.findOne({username:user});
        if(name.username === user){
             console.log("login success");
             res.status(201).redirect("index.html");
        }
    }catch(err){
        res.status(400).send("invalid");
    }
})

// for post api connection

/*app.get("/mens",async(req,res) =>{
    try {
        const person = await Register.find({});
        res.send(person);
    } catch (error) {
        res.send(error);
    }
})
app.post("/mens",async(req,res) =>{
    try {
        const Addperson = new Register(req.body);
        console.log(Addperson);
       const r =  await Addperson.save();

    } catch (error) {
        res.send("your error");
    }
})
*/

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server stated ad ${port}`);
})

