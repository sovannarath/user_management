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
        /*
        if (window.$cookies.isKey('access_token')) {
            header = {Authorization: "Bearer " + jwt.verify(cookie.get('access_token'), key).access_token};
        } else {
            header = {}
        }
        */
        return {headers: header}
    },
    
    getAllParticipants(meeting_id) {
        return new Promise((resolve, reject) => {
            axios.get("/meeting/" + meeting_id + "/participants",this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    
    getParticipant(meeting_id,user_id) {
        return new Promise((resolve, reject) => {
            axios.get("/meeting/" + meeting_id + "/participants/" + user_id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    
    createParticipant(meeting_id, data) {
        return new Promise((resolve, reject) => {
            axios.post("/meeting/" + meeting_id + "/participants/", data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
        });
    },
    
    updateParticipant(meeting_id, user_id, data) {
        return new Promise((resolve, reject) => {
            axios.put("/meeting/" + meeting_id + "/participants/" + user_id, data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            });
        });
    },
    
    deleteParticipant(meeting_id, user_id) {
        return new Promise((resolve, reject) => {
            axios.delete("/meeting/" + meeting_id + "/participants/" + user_id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
}
