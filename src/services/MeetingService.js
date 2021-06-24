import Axios from 'axios'
import ServerURL from '../services/BaseUrl'

var baseURL = ServerURL.url;
const axios = Axios.create({
    baseURL: baseURL,
    timeout: 10000,
});

/*
const no_timeout_http = Axios.create({
    baseURL: baseURL,
});
*/
//var key = "zillennium_key";

export default {
    httpHeader() {
        let header = {};
        /*
        if (window.$cookies.isKey('access_token')) {
            header = {Authorization: "Bearer " + jwt.verify(cookie.get('access_token'), key).access_token};
        } else {
            header = {}
        }
        */
        return {headers: header}
    },
    
    allMeetings() {
        return new Promise((resolve, reject) => {
            axios.get('/meetings',this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    
    getMeeting(id) {
        return new Promise((resolve, reject) => {
            axios.get('/meetings/' + id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    
    createMeeting(data) {
        return new Promise((resolve, reject) => {
            axios.post('/meetings', data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        });
    },
    
    updateMeeting(data, id) {
        return new Promise((resolve, reject) => {
            axios.put('/meetings/' + id , data, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
    
    deleteMeeting(id) {
        return new Promise((resolve, reject) => {
            axios.delete('/meetings/' + id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
}
