import  { Schema, model } from 'mongoose';

const patientSchema = new Schema({
   
    // unique email to be asked for at time of registration
    email: {
        type: String,
        required: true,
        unique: true
    },
   
    patientName:{
        type:String,
        required: true,
    },
    // password to be asked at the time of registration
    password:{
        type:String,
        required: true
    },
    dateofBirth:{
        type :Date
    }
    ,
    phoneNo :{
        type : Number
    },
    gender : {
        type:String ,
        enum : ["M" , "F" , "O"]
    }
    ,
    //will be stored in cloud
    patientImage:{
        type : String
    }
    ,
    bloodGroup:{
        type:String ,
    }, 
    disease:{
        type : String ,
    },
    carts: [
        {
            itemId: {
                type: Schema.Types.ObjectId,
                ref: 'Medicine'
            },
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
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
} , {timestamps:true});


patientSchema.methods.addtocart = async function(cart) {
    try {
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts;
    } catch (error) {
        console.error(error)
    }
};
patientSchema.methods.removeFromCart = async function(itemToRemove) {
    try {
        this.carts = this.carts.filter(item => item._id.toString() !== itemToRemove);
        await this.save();
        return this.carts;
    } catch (error) {
        console.error(error)
    }
};

patientSchema.methods.updateCartItemQuantity = async function(itemId, newQuantity) {
    try {
        this.carts.forEach(item => {
            if (item._id.toString() === itemId) {
                item.quantity = newQuantity;
            }
        });
        await this.save();
        return this.carts;
    } catch (error) {
        console.error(error)
    }
};

const Patient = model("Patient",patientSchema);
export default Patient;