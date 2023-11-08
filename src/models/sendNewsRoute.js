// https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d75684fc60254ba496c22a99b9257939

const axios = require("axios");
// var requests = require('requests');

async function getText(cat) {
  const apiKey = "d75684fc60254ba496c22a99b9257939";
  const userAgent = "YourAppName/1.0"; // Replace with your application's name and version

  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=${apiKey}`,
    {
      headers: {
        "User-Agent": userAgent,
      },
    }
  );

  const data = response.data;
  // console.log("Response data:", data.articles[0].title);
  const randomNumber = Math.floor(Math.random() * 6); 
  // console.log("rand num = " , randomNumber);
  let returnData = data.articles[randomNumber]; 
  return returnData;
}

async function SendNewsRoute(
  mailTransporter,
  userEmailBusinessArray,
  userEmailSportsArray,
  userEmailTechnologyArray,
  userEmailEntertainmentArray
) {
  try {
    // sending mails to business
    const bussinessText = await getText("business");
    const sportsText = await getText("sports");
    const technologyText = await getText("technology");
    const entertainmentText = await getText("entertainment");

    let businessMailDetails = {
      from: "myupcomingnews@gmail.com",
      bcc: userEmailBusinessArray,
      subject: `\n${bussinessText.title}`,
      text: ` \n ${bussinessText.description}
            \n
            \n
            \nTo unsubscribe from our email newsletter, please visit the link below
            /unsub
            
      `,
    };

    if (userEmailBusinessArray.length != 0) {
      await mailTransporter.sendMail(businessMailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs", err);
        } else {
          console.log(
            "Email sent successfully from /sendNews to userEmailBusinessArray "
          );
        }
      });
    }

    // sending mails to sports
    let sportsMailDetails = {
      from: "myupcomingnews@gmail.com",
      bcc: userEmailSportsArray,
      subject: `\n${sportsText.title}`,
      text: `\n${sportsText.description}
            \n
            \n
            \n
            To unsubscribe from our email newsletter, please visit the link below
            /unsub
      `,
    };

    if (userEmailSportsArray.length != 0) {
      await mailTransporter.sendMail(sportsMailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs", err);
        } else {
          console.log(
            "Email sent successfully from /sendNews userEmailSportsArray "
          );
        }
      });
    }

    // sending mails to technology
    let technologyMailDetails = {
      from: "myupcomingnews@gmail.com",
      bcc: userEmailTechnologyArray,
      subject: `\n${technologyText.title}`,
      text: `\n ${technologyText.description}
      
            \n
            \n
            \n
            To unsubscribe from our email newsletter, please visit the link below
            /unsub
      `,
    };

    if (userEmailTechnologyArray.length != 0) {
      await mailTransporter.sendMail(
        technologyMailDetails,
        function (err, data) {
          if (err) {
            console.log("Error Occurs", err);
          } else {
            console.log(
              "Email sent successfully from /sendNews technologyMailDetails "
            );
          }
        }
      );
    }

    // sending mails to entertainment
    let entertainmentMailDetails = {
      from: "myupcomingnews@gmail.com",
      bcc: userEmailEntertainmentArray,
      subject: `Title ... \n${entertainmentText.title}`,
      text: `\n ${entertainmentText.description}
      
            \n
            \n
            \n
            To unsubscribe from our email newsletter, please visit the link below
            /unsub
      `,
    };

    if (userEmailEntertainmentArray.length != 0) {
      await mailTransporter.sendMail(
        entertainmentMailDetails,
        function (err, data) {
          if (err) {
            console.log("Error Occurs", err);
          } else {
            console.log(
              "Email sent successfully from /sendNews userEmailentertainmentArray "
            );
          }
        }
      );
    }
  } catch (error) {
    console.log("error on route /sendNews", error);
  }
}

module.exports = SendNewsRoute;
