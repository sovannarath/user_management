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
    
    getAllAttachments(meeting_id) {
        return new Promise((resolve, reject) => {
            axios.get('/meeting-agendas/' + meeting_id + '/attachments',this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    
    getAttachment(meeting_id, attachment_id) {
        return new Promise((resolve, reject) => {
            axios.get('/meeting-agendas/' + meeting_id + '/attachments' + attachment_id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    
    createAttachment(meeting_id, data) {
        return new Promise((resolve, reject) => {
            axios.post('/meeting-agendas/' + meeting_id + '/attachments', data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
        });
    },
    
    updateAttachment(meeting_id, attachment_id, data) {
        return new Promise((resolve, reject) => {
            axios.put('/meeting-agendas/' + meeting_id + '/attachments' + attachment_id, data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            });
        });
    },
    
    deleteAttachment(meeting_id, attachment_id) {
        return new Promise((resolve, reject) => {
            axios.delete('/meeting-agendas/' + meeting_id + '/attachments' + attachment_id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
}
