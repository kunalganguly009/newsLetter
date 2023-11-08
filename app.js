
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const nodemailer = require('nodemailer');
// const crypto = require('crypto');
const sendNewsRoute = require('./src/models/sendNewsRoute')
const callSendNewsRoute = require('./src/models/callSendNewsRoute')

// schema
const Userdata = require("./src/models/newsletterFormSchema")
// const SendNewsRequest = require("./src/models/fetch")

// middleware
const isSubscribed = require("./src/middleware/isSubscribed");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 80;

require("./src/db/conn")

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path));

const template_path = path.join(__dirname, "./templates/views");
app.set("views", template_path);

app.set("view engine", "hbs");



// for node mailer
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'myupcomingnews@gmail.com', // myupcomingnews
        pass: 'aghdykvtfnxcxwqj' // aghdykvtfnxcxwqj
    }
});
 


app.get("/" , async (req , res)=>{
res.render("subscribe")
})



app.post("/subscribe" ,isSubscribed , async(req , res)=>{
    console.log("req.isUserAllReadyExists = ", req.isUserAllReadyExists);
    
    try {
        
      
        
        if(!req.isUserAllReadyExists){
        const newUserData = new Userdata({
            userEmail:req.body.userEmail,
            bussiness:req.body.bussiness,
            sports:req.body.sports,
            technology:req.body.technology,
            entertainment:req.body.entertainment,

        })

        const userData = await newUserData.save();

        let mailDetails = {
            from: 'laljtha@gmail.com',
            to: req.body.userEmail,
            subject: 'Test mail',
            text: `Thank you for subscribing to our newsletter! 🎉 Stay tuned for the latest updates, exciting news, and valuable insights delivered right to your inbox. We appreciate your support! 

            \n
            \n
            \n

            To unsubscribe from our email newsletter, please visit the link below
            https://my-upcoming-news.vercel.app/unsubscribe
            
            `
        };
         
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs' , err);
            } else {
                console.log('Email sent successfully');
            }
        });

        

        console.log("data saved");
        res.render("thanks")
    }
    else{
        let userEmail = req.body.userEmail
        // console.log("** user allready exists **" , req.body.userEmail);
        res.render("subscribe" , {triggerToast:true , userEmail})
        
    }
} catch (error) {
    console.log("error from /subscribe " + error);
    res.render("subscribe")

    
       
    }
})





// saving user emails to different arrays

const allUserEmail = []
const userEmailBussinessArray = [];
const userEmailSportsArray = [];
const userEmailTechnologyArray = [];
const userEmailEntertainmentArray = [];

const fetchAndPopulateArray = async (criteria, array) => {
    try {
        const users = await Userdata.find(criteria, 'userEmail');
        users.forEach(user => {
            array.push(user.userEmail);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};


const main = async () => {
    // const allUserEmail = await fetchAllUserEmails();
    
    await fetchAndPopulateArray({}, allUserEmail);
    await fetchAndPopulateArray({ bussiness: 'on' }, userEmailBussinessArray);
    await fetchAndPopulateArray({ sports: 'on' }, userEmailSportsArray);
    await fetchAndPopulateArray({ technology: 'on' }, userEmailTechnologyArray);
    await fetchAndPopulateArray({ entertainment: 'on' }, userEmailEntertainmentArray);

    // show user emails
    console.log("allUserEmail = ", allUserEmail);
    console.log("userEmailBussinessArray = ", userEmailBussinessArray);
    console.log("userEmailSportsArray = ", userEmailSportsArray);
    console.log("userEmailTechnologyArray = ", userEmailTechnologyArray);
    console.log("userEmailEntertainmentArray = ", userEmailEntertainmentArray);
};

main();




// sending news to bussiness Entertainments Technology sports 
app.post("/sendNews" , async(req , res)=>{
    await sendNewsRoute(mailTransporter , userEmailBussinessArray , userEmailSportsArray , userEmailTechnologyArray , userEmailEntertainmentArray)
})




app.get("/unsubscribe" , async (req , res)=>{
    // console.log("we get it " , req.body.userEmail);
    res.render("unsubscribe")
})
   

// app.post("/unsubscribetoast " ,isSubscribed, async (req , res)=>{
    app.post("/unsubscribetoast", isSubscribed, async (req, res) => {
    try {
        if(req.isUserAllReadyExists){

            console.log("we get it " , req.body.userEmail);
            const deletedUser = await Userdata.findOneAndDelete({
                userEmail: req.body.userEmail
            });
            console.log("we deleted : " , req.body.userEmail);
            
            let userEmail = req.body.userEmail
            let msg = "unsubscribe Successfully"
            res.render("unsubscribe" , {triggerToast:true , userEmail , msg})
    
        }else{
            let userEmail = req.body.userEmail
            let msg = "Email Id do not exists"
            res.render("unsubscribe" , {triggerToast:true , userEmail , msg})
        }
    } catch (error) {
        let msg = "Something went wrong"
        res.render("unsubscribe" , {triggerToast:true , userEmail , msg})
    }
    


    })





app.listen(port , async()=>{
    // callSendNewsRoute()
    // calling sending news route in every 10 sec
    // setInterval(callSendNewsRoute, 10000); 
    setInterval(callSendNewsRoute, 4 * 60 * 60 * 1000); // Calls callSendNewsRoute every 4 hours

    
    // scheduleSendNews();
    console.log(`server is runnig at ${port}`);
}
)
