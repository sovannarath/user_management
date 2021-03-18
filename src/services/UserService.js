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
    // retrieve all users 
    user_list() {
        return new Promise((resolve, reject) => {
            axios.get('/list',this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    // get a user
    get_user(id) {
        return new Promise((resolve, reject) => {
            axios.get('/users/' + id, this.httpHeader)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    // create a user
    create_user(data) {
        return new Promise((resolve, reject) => {
            axios.post('/users', data, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        });
    },
    //update user
    update_user(data, id) {
        return new Promise((resolve, reject) => {
            axios.put('/users/' + id, data, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
    // Delete user
    delete_user(id) {
        return new Promise((resolve, reject) => {
            axios.delete('/users/' + id, this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
    // Get all reference
    reference_list() {
        return new Promise((resolve, reject) => {
            axios.get('/list', this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },

    // Organization
    organization_list() {
        return new Promise((resolve, reject) => {
            axios.get('/organizations',this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    // Role
    role_list() {
        return new Promise((resolve, reject) => {
            axios.get('/roles', this.httpHeader())
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        });
    },
    search(data) {
        return new Promise((resolve, reject) => {
            axios.get('/users/search', {params: data}, this.httpHeader())
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        });
    }
}
