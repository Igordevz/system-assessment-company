import mongoose from "mongoose";


export async function AuthenticationDatabase(){
    try {
       await mongoose.connect("mongodb+srv://igortza98483:eo33mQjHyhUw2ZA6@cluster0.tfvokfa.mongodb.net/?retryWrites=true&w=majority") 
       console.log("conect successful database")
    } catch (error) {
        console.log(error)
    }
}
// key