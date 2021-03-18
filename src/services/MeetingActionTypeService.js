import Axios from 'axios'
import ServerURL from './BaseUrl'

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
    // retrieve all organizations
    allMeetingActionTypes() {
        return new Promise((resolve, reject) => {
            axios.get('/meeting-action-types',this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    // get a organization
    getMeetingActionType(id) {
        return new Promise((resolve, reject) => {
            axios.get('/meeting-action-types/' + id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    // create a organization
    createMeetingActionType(data) {
        return new Promise((resolve, reject) => {
            axios.post('/meeting-action-types', data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        });
    },
    //update organization
    updateMeetingActionType(data, id) {
        return new Promise((resolve, reject) => {
            axios.put('/meeting-action-types/' + id, data, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
    // Delete organization
    deleteMeetingActionType(id) {
        return new Promise((resolve, reject) => {
            axios.delete('/meeting-action-types/' + id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
}
