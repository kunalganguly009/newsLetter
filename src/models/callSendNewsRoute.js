
const axios = require('axios');
const BASE_URL = process.env.PORT || 'http://localhost:80';

async function SendNewsRequest() {

    try {
        const response = await axios.post(`${BASE_URL}/sendNews`, {
            // Add any necessary request data here
        });

        if (response.status === 200) {
            // Handle successful response here
            console.log('News sent successfully');
        } else {
            // Handle error response here
            console.error('Error sending news');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


module.exports = SendNewsRequest;
