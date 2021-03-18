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
    allMeetingActions(meeting_id) {
        return new Promise((resolve, reject) => {
            axios.get('/current-meeting-actions/' + meeting_id,this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    // get a organization
    getMeetingAction(id) {
        return new Promise((resolve, reject) => {
            axios.get('/meeting-actions/' + id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    // create a organization
    createMeetingAction(data) {
        return new Promise((resolve, reject) => {
            axios.post('/meeting-actions', data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        });
    },
    //update organization
    updateMeetingAction(data, id) {
        return new Promise((resolve, reject) => {
            axios.put('/meeting-actions/' + id, data, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
    // Delete organization
    deleteMeetingAction(id) {
        return new Promise((resolve, reject) => {
            axios.delete('/meeting-actions/' + id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
}
