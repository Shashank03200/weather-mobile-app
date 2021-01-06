const fetch = require('node-fetch');

module.exports = async function (icon, description) {


    const CLIENT_ID = "9hi8I_oLDrWv50uMPZ4EzCRt4Re0U_82DVaqB746DUQ";

    const imgUrl = `https://api.unsplash.com/search/photos/?client_id=${CLIENT_ID}&query=${description}&orientation=landscape&w=720`;

    const response = await fetch(imgUrl)
    const json = await response.json();
    return json;

}