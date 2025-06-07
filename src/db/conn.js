let mongoose = require("mongoose")
mongoose.connect("mongodb+srv://newsLetterProject:newsLetterProjectPassword@cluster0.des80pz.mongodb.net/newsLetterProject?retryWrites=true&w=majority&appName=Cluster0", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(()=>{
    console.log("connected");
}).catch((e)=>{
    console.log(e);
})

