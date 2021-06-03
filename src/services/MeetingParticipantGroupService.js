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
    
    getAllParticipantGroups() {
        return new Promise((resolve, reject) => {
            axios.get('/meeting-participant-groups',this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    
    getParticipantGroup(group_id) {
        return new Promise((resolve, reject) => {
            axios.get('/meeting-participant-groups' + group_id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    
    createParticipantGroup(data) {
        return new Promise((resolve, reject) => {
            axios.post('/meeting-participant-groups', data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
        });
    },
    
    updateParticipantGroup(group_id, data) {
        return new Promise((resolve, reject) => {
            axios.put('/meeting-participant-groups' + group_id, data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            });
        });
    },
    
    deleteParticipantGroup(group_id) {
        return new Promise((resolve, reject) => {
            axios.delete('/meeting-participant-groups' + group_id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
}
