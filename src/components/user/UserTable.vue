<template>
    <div class="sufee-alert alert with-close alert-success alert-dismissible fade show" v-if="!is_succ_hide">
        <span class="badge badge-pill badge-success">Success</span> Data has been deleted.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeSucc">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

<div class="user-data m-b-30">
    <div class="row">
        <div class="col col-sm-3">
            <h3 class="title-3 m-b-30 pull-left"><i class="zmdi zmdi-account-calendar"></i>Users</h3>
        </div>
        <div class="col col-sm-6">
            <div class="row">
                <div class="form-group col-sm-6">
                    <input type="text" class="form-control" placeholder="Search">
                </div>
                <div class="form-group col-sm-6">
                    <select class="form-control" name="time">
                        <option selected="selected">By Name</option>
                        <option value="">By Contact</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col col-sm-3">
            <router-link style="margin-right:35px;" class="btn btn-sm btn-primary pull-right" to="/users/create">
                <i class="fa fa-plus"></i> New Record
            </router-link>
        </div>
    </div>

    <div class="table-responsive table-data">
        <table class="table">
            <thead>
                <tr>
                    <td>
                        <label class="au-checkbox">
                            <input type="checkbox">
                            <span class="au-checkmark"></span>
                        </label>
                    </td>
                            <td>name</td>
                            <td>email</td>
                            <td>Organization</td>
                            <td>Occupation</td>
                            <td></td>
                </tr>
            </thead>
            <tbody>
                        <tr v-for="user in userData" v-bind:key="user" v-bind:id="'user-id-' + user.id">
                            <td>
                                <label class="au-checkbox">
                                    <input type="checkbox">
                                    <span class="au-checkmark"></span>
                                </label>
                            </td>
                            <td>{{user.name}}</td>
                            <td>
                                <span class="block-email">{{user.email}}</span>
                            </td>
                            <td>{{user.organization.name}}</td>
                            <td>{{user.role.name}}</td>
                            <td>
                                <div class="table-data-feature">
                                    <!--button class="item" data-toggle="tooltip" data-placement="top" title="Send">
                                        <i class="zmdi zmdi-mail-send"></i>
                                    </button-->
                                    <router-link class="item" data-toggle="tooltip" data-placement="top" title="Edit" v-bind:to="'/users/'+user.id+'/edit'">
                                        <i class="zmdi zmdi-edit"></i>
                                    </router-link>
                                    <!--button class="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                        <i class="zmdi zmdi-edit"></i>
                                    </button-->
                                    <button class="item tmp-btn-del" v-bind:id="'tmp-btn-del-' + user.id" data-toggle="tooltip" v-bind:value="user.id" data-placement="top" v-on:click="btnDelClick(user.id)" title="Delete">
                                        <i class="zmdi zmdi-delete"></i>
                                    </button>
                                    <!--button class="item" data-toggle="tooltip" data-placement="top" title="More">
                                        <i class="zmdi zmdi-more"></i>
                                    </button-->
                                </div>
                            </td>
                        </tr>
            </tbody>
        </table>
    </div>
    <!---div class="user-data__footer">
        <button class="au-btn au-btn-load">load more</button>
    </div-->
</div>
<!-- END USER DATA-->

<!-- modal static -->
<div class="modal fade" id="staticModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true" data-backdrop="static">
<div class="modal-dialog modal-sm" role="document">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="staticModalLabel">Delete</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body center">
<p>Are you sure to delete it?</p>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
<button type="button" class="btn btn-danger btn-del" v-on:click="deleteRecord">Yes</button>
</div>
</div>
</div>
</div>
<!-- end modal static -->
</template>

<script>
import UserAPI from '../../services/UserService'
import $ from 'jquery'

export default {
    name:"UserTable",
    components: {
    },
    data() {
        return {
            users : null,
            deleted : false,
            is_succ_hide : true,
            userData : [
                {
                    'id': 1,
                    'name' : 'Thorn Sovannarath',
                    'role' : {
                        'id': 1,
                        'name': 'Developer',
                    },
                    'organization': {
                        'id': 1,
                        'name' : 'Secretary'
                    }, 
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 2,
                    'name' : 'Duy Panharith',
                    'role' : {
                        'id': 2,
                        'name' : 'Director',
                    },
                    'organization': {
                        'id' : 1,
                        'name' : 'Secretary',
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 3,
                    'name' : 'Kim Chong',
                    'role' : {
                        'id' : 3,
                        'name' : 'Manager'
                    },
                    'organization': {
                        'id' : 1,
                        'name' : 'Secretary',
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 4,
                    'name' : 'Heng Sophat',
                    'role' : {
                        'id' : 4,
                        'name' : 'Coordinator',
                    },
                    'organization': {
                        'id' : 1,
                        'name' : 'Secretary',
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 5,
                    'name': 'Heng Siyouer',
                    'role' : {
                        'id' : 5,
                        'name' : 'Admin',
                    },
                    'organization': {
                        'id' : 1,
                        'name' : 'Secretary',
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 6,
                    'name' : 'Huy Lyly',
                    'role' : {
                        'id': 6,
                        'name' : 'Secreterist',
                    },
                    'organization': {
                        'id' : 1,
                        'name' : 'Secretary',
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 7,
                    'name' : 'Ly Chenglim',
                    'role' : {
                        'id' : 6,
                        'name' : 'Secreterist',
                    },
                    'organization': {
                        'id' : 1,
                        'name' : 'Secretary',
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 8,
                    'name' : 'Say Sopheak',
                    'role' : {
                        'id' : 6,
                        'name' : 'Secreterist',
                    },
                    'organization': {
                        'id': 1,
                        'name' : 'Secretary'
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 9,
                    'name': 'Morn Sopheaktra',
                    'role' : {
                        'id' : 6,
                        'name' : 'Secreterist',
                    },
                    'organization': {
                        'id' : 1,
                        'name': 'Secretary',
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id' : 10,
                    'name' : 'Top Sophea',
                    'role' : {
                        'id' : 6,
                        'name' : 'Secreterist',
                    },
                    'organization': {
                        'id' : 1,
                        'name' : 'Secretary',
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 11,
                    'name': 'Meng Sokeang',
                    'role' : {
                        'id' : 6,
                        'name' : 'Secreterist',
                    },
                    'organization': {
                        'id' : 1,
                        'name' : 'Secretary',
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                }
            ],
        }
    },
    methods: {
        prepareListUsers() {
            UserAPI.user_list()
            .then(response => {
                this.users = response
            })
            .catch(err => {console.log(err)})
            .finally(() => {})
        },
        btnDelClick(userId) {
            var thisBtn = $('#tmp-btn-del-' + userId);
            var modal = $('#staticModal');
            modal.modal('show');
            modal.find('.btn-del').attr('value', thisBtn.attr('value'))
        },
        deleteRecord() {
            var id = $('.btn-del').attr('value')
            var modal = $('#staticModal');
            var userId = $('#user-id-' + id)
            UserAPI.delete_user(id)
            .then(response => {
                this.deleted = response
                modal.modal('hide')
                userId.remove()
                this.is_succ_hide = false
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {})
        }
    },
    mounted (){
        this.prepareListUsers()
    }
}
</script>