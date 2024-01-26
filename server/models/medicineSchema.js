import  { Schema, model } from 'mongoose';

const medicineSchema = new Schema({
   name:{
    type:String
   },
   fullname:{
    type:String
   },
   price:{
    type:String
   },
   discount:{
    type:String
   },
   urltoimage:{
    type:String
   }
});

const Medicine = model("MedicineData",medicineSchema);
export default Medicine;