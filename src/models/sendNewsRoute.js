const axios = require("axios");

async function getText(cat) {
  const apiKey = "d75684fc60254ba496c22a99b9257939";
  const userAgent = "YourAppName/1.0"; 

  const response = await axios.get(
   
 
    `https://newsapi.org/v2/top-headlines?category=${cat}&apiKey=${apiKey}`,
    {
      headers: {
        "User-Agent": userAgent,
      },
    }
  );


  const data = response.data.articles;
  if (!data || data.length === 0) {
    throw new Error(`No news found for category "${cat}"`);
  }

  const randomIndex = Math.floor(Math.random() * Math.min(data.length, 6));
  return data[randomIndex];
}
 
async function SendNewsRoute(
  mailTransporter,
  userEmailBusinessArray,
  userEmailSportsArray,
  userEmailTechnologyArray,
  userEmailEntertainmentArray
) {
  try {
    const [businessText, sportsText, technologyText, entertainmentText] = await Promise.all([
      getText("business"),
      getText("sports"),
      getText("technology"),
      getText("entertainment")
    ]);

    const unsubscribeText = `
      
      
To unsubscribe from our email newsletter, please visit:
https://newsletter-ijrv.onrender.com/unsubscribe`;

    const mailConfigs = [
      {
        recipients: userEmailBusinessArray,
        title: businessText.title,
        description: businessText.description,
        label: "userEmailBusinessArray"
      },
      {
        recipients: userEmailSportsArray,
        title: sportsText.title,
        description: sportsText.description,
        label: "userEmailSportsArray"
      },
      {
        recipients: userEmailTechnologyArray,
        title: technologyText.title,
        description: technologyText.description,
        label: "userEmailTechnologyArray"
      },
      {
        recipients: userEmailEntertainmentArray,
        title: entertainmentText.title,
        description: entertainmentText.description,
        label: "userEmailEntertainmentArray"
      }
    ];

    for (const config of mailConfigs) {
      if (config.recipients.length === 0) continue;

      const mailDetails = {
        from: "myupcomingnews@gmail.com",
        bcc: config.recipients,
        subject: config.title,
        text: `${config.description}${unsubscribeText}`
      };

      try {
        await mailTransporter.sendMail(mailDetails);
        console.log(`Email sent successfully to ${config.label}`);
      } catch (err) {
        console.error(`Failed to send mail to ${config.label}`, err);
      }
    }
  } catch (error) {
    console.error("Error in SendNewsRoute:", error.message);
  }
}

module.exports = SendNewsRoute;
