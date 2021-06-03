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
    
    getAllGroupUsers(group_id) {
        return new Promise((resolve, reject) => {
            axios.get("/meeting-group/" + group_id + "/user",this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    
    getGroupUser(group_id,user_id) {
        return new Promise((resolve, reject) => {
            axios.get("/meeting-group/" + group_id + "/user/" + user_id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    
    createGroupUser(group_id, data) {
        return new Promise((resolve, reject) => {
            axios.post("/meeting-group/" + group_id + "/user", data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
        });
    },
    
    updateGroupUser(group_id, user_id, data) {
        return new Promise((resolve, reject) => {
            axios.put("/meeting-group/" + group_id + "/user/" + user_id, data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            });
        });
    },
    
    deleteGroupUser(group_id, user_id) {
        return new Promise((resolve, reject) => {
            axios.delete("/meeting-group/" + group_id + "/user/" + user_id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
}
