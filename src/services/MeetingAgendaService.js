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
    
    getAllAgendas(meeting_id) {
        return new Promise((resolve, reject) => {
            axios.get('/meetings/' + meeting_id + '/agendas',this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    
    getAgenda(meeting_id, agenda_id) {
        return new Promise((resolve, reject) => {
            axios.get('/meetings/' + meeting_id + '/agendas/' + agenda_id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    
    createAgenda(meeting_id, data) {
        return new Promise((resolve, reject) => {
            axios.post('/meetings/' + meeting_id + '/agendas/', data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
        });
    },
    
    updateAgenda(meeting_id, agenda_id, data) {
        return new Promise((resolve, reject) => {
            axios.put('/meetings/' + meeting_id + '/agendas/' + agenda_id, data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            });
        });
    },
    
    deleteAgenda(meeting_id, agenda_id) {
        return new Promise((resolve, reject) => {
            axios.delete('/meetings/' + meeting_id + '/agendas/' + agenda_id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
}
