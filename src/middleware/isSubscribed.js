const Userdata = require("../models/newsletterFormSchema")
let isUserAllReadyExists = false
const isSubscribed = async (req , res , next)=>{
    try {
        var doExists = await Userdata.findOne({ userEmail:req.body.userEmail })
        
        if(doExists !== null){
            // console.log("subscribedUsers = >" , ans);
            req.isUserAllReadyExists = true;
            
        }else{
            req.isUserAllReadyExists = false;
                        
            console.log("do not exists");
        }
        next();
    } catch (error) {
        
    }
}
module.exports = isSubscribed;