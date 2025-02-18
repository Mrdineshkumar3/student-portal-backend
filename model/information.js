const mongoose = require('mongoose')

const studentdata =new mongoose.Schema(
    {
        sname:String,
        sregno:String,
        sbranch:String,
        sdept:String,
        syear:String
    }
)
const Studentdatamodel =mongoose.model('StudentData',studentdata)
module.exports = Studentdatamodel