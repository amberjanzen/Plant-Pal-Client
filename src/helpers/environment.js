  let APIURL = '';



switch(window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000'
        break;
    case 'plant-pal-app.herokuapp.com/':
        APIURL = 'https://my-plant-pal-app.herokuapp.com/'
}
export default APIURL;
