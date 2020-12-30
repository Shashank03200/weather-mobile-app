
const fetch = require('node-fetch');

module.exports =  async function (icon, description) {

    let query = "";
    const CLIENT_ID = "9hi8I_oLDrWv50uMPZ4EzCRt4Re0U_82DVaqB746DUQ";

    if (icon.endsWith('d'))
        query = description + " weather";
    else if (icon.endsWith('n'))
        query = description + " weather";
        
    const imgUrl = `https://api.unsplash.com/search/photos/?client_id=${CLIENT_ID}&query=${query}`;

    const response = await fetch(imgUrl)
    const json = await response.json();
    return json;
    
}