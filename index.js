const express =require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const StudentModel = require('./model/Students')
const Studentdatamodel= require('./model/information')
require('dotenv').config();
console.log(process.env.PORT)
console.log(process.env.APPLICATION_URL)
const PORT =process.env.PORT || 3001
const corsCofig = {
    origin:process.env.APPLICATION_URL,
    credentials:true,
    methods: ["GET","POST","PUT","DELETE"],
}

const { data } = require('react-router-dom')
app.use(express.json())
app.use(cors(corsCofig))

mongoose.connect(process.env.MONGO_URI)

app.post('/createuser',(req,res)=>{
    Studentdatamodel.create(req.body)
    .then(infodata => {res.json(infodata)
       
    })
})
app.post('/getallstudent',(req,res)=>{
    Studentdatamodel.find()
    .then(infodata0 => {res.json(infodata0)
       
    })
})
app.post('/getuser/:id',(req,res)=>{
    const id = req.params.id
    Studentdatamodel.findById({_id:id})
    .then(infodata0 => {res.json(infodata0)
       
    })
})
app.put('/upadteuser/:id',(req,res)=>{
    const id = req.params.id
    Studentdatamodel.findByIdAndUpdate({_id:id},{ 
        sname:req.body.sname,
        sregno:req.body.sregno,
        sbranch:req.body.sbranch,
        sdept:req.body.sdept,
        syear:req.body.syear
    }).then( source => {res.json(source)})
})
app.delete('/deletestudent/:id',(req,res)=>{
    const id = req.params.id
    Studentdatamodel.findByIdAndDelete({_id:id})
    .then(sas =>{res.json(sas)})
})
app.post('/',(req,res)=>{
   
        const {name,email,password}=req.body
        StudentModel.findOne({email:email})
        .then(userx =>{
            if(userx){
                res.json("email already exist")
            }
            else{
                StudentModel.create(req.body)
                .then(Students =>{       
              res.json(Students)})
             }
            
        })
        
       
    .catch(err =>res.json(err))
})
app.post('/login',(req,res)=>{
    const {email, password}=req.body
    StudentModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("success")
              }
              else{
                  res.json("the password is incorrect")
              }
        }
        else{
            res.json("No record existed")
        }
 
    })
})

app.listen(PORT,()=>{
    console.log('server running on  port 3001')
})