import axios from "axios";

const baseURL = "http://520ef708.ngrok.io/";
// let token = "bcf345d20cbf13d5ab6fe67cf44f58e1745107b5";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

let token = localStorage.getItem('ACCESS_TOKEN');
instance.defaults.headers = {
  Authorization: 'Token ' + token
}

// instance.defaults.headers['Access-Control-Allow-Origin'] = '*'

export default instance
