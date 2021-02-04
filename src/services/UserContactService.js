import Axios from 'axios'
import ServerURL from '../services/BaseUrl'

var baseURL = ServerURL.url;
const axios = Axios.create({
    baseURL: baseURL,
    timeout: 10000,
});

/*const no_timeout_http = Axios.create({
    baseURL: baseURL,
});*/
//var key = "zillennium_key";

export default {
    httpHeader() {
        let header = {};
        /*if (window.$cookies.isKey('access_token')) {
            header = {Authorization: "Bearer " + jwt.verify(cookie.get('access_token'), key).access_token};
        } else {
            header = {}
        }*/
        return {headers: header}
    },
    // retrieve all contact type 
    getAllUserContacts() {
        return new Promise((resolve, reject) => {
            axios.get('/user-contacts',this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    // get a contact type
    getUserContact(id) {
        return new Promise((resolve, reject) => {
            axios.get('/user-contacts/' + id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    // create a contact type
    createUserContact(data) {
        return new Promise((resolve, reject) => {
            axios.post('/user-contacts', data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        });
    },
    //update contact type
    updateUserContact(data, id) {
        return new Promise((resolve, reject) => {
            axios.put('/user-contacts/' + id, data, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
    // Delete contact type
    deleteUserContact(id) {
        return new Promise((resolve, reject) => {
            axios.delete('/user-contacts/' + id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
}
