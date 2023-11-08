let mongoose = require("mongoose")



// mongoose.connect("mongodb://0.0.0.0:27017/newsletterSignup", {
mongoose.connect("mongodb+srv://newsletterUserName:newsletterPassword@cluster0.orz21ti.mongodb.net/", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(()=>{
    console.log("connected");
}).catch((e)=>{
    console.log(e);
})

