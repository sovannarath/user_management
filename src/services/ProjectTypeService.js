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
    // retrieve all organizations 
    all_projectTypes() {
        return new Promise((resolve, reject) => {
            axios.get('/project-types',this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    // get a organization
    get_projectTypes(id) {
        return new Promise((resolve, reject) => {
            axios.get('/project-types/' + id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    // create a organization
    create_projectTypes(data) {
        return new Promise((resolve, reject) => {
            axios.post('/project-types', data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        });
    },
    //update organization
    update_projectTypes(data, id) {
        return new Promise((resolve, reject) => {
            axios.put('/project-types/' + id, data, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
    // Delete organization
    delete_projectTypes(id) {
        return new Promise((resolve, reject) => {
            axios.delete('/project-types/' + id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
}
