<template>
    <div class="sufee-alert alert with-close alert-success alert-dismissible fade show" v-if="!is_succ_hide">
        <span class="badge badge-pill badge-success">Success</span> Data has been deleted.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeSucc">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="row">
        <div class="col-md-12">
            <!-- DATA TABLE -->
            <div class="row">
                <div class="col-sm-6">
                    <h1 class="title-10 m-b-35">Roles</h1>
                </div>
                <div class="col-sm-6">
                    <router-link class="btn btn-sm btn-primary pull-right" to="/roles/create">
                        <i class="fa fa-plus"></i> New Record
                    </router-link>
                </div>
            </div>

            <div class="table-responsive table-responsive-data2">
                <table class="table table-data2">
                    <thead>
                        <tr>
                            <th>
                                <label class="au-checkbox">
                                    <input type="checkbox">
                                    <span class="au-checkmark"></span>
                                </label>
                            </th>
                            <th>name</th>
                            <th>description</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="role in roles" v-bind:key="role" class="tr-shadow" v-bind:id="'role-id-' + role.id">
                            <td>
                                <label class="au-checkbox">
                                    <input type="checkbox">
                                    <span class="au-checkmark"></span>
                                </label>
                            </td>
                            <td>{{role.name}}</td>
                            <td>{{role.description}}</td>
                            <td>{{role.is_active}}</td>
                            <td>
                                <div class="table-data-feature">
                                    <!--button class="item" data-toggle="tooltip" data-placement="top" title="Send">
                                        <i class="zmdi zmdi-mail-send"></i>
                                    </button-->
                                    <router-link class="item" data-toggle="tooltip" data-placement="top" title="Edit" v-bind:to="'/roles/'+role.id+'/edit'">
                                        <i class="zmdi zmdi-edit"></i>
                                    </router-link>
                                    <!--button class="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                        <i class="zmdi zmdi-edit"></i>
                                    </button-->
                                    <button class="item tmp-btn-del" v-bind:id="'tmp-btn-del-' + role.id" data-toggle="tooltip" v-bind:value="role.id" data-placement="top" v-on:click="btnDelClick(role.id)" title="Delete">
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
            <!-- END DATA TABLE -->
        </div>
    </div>
    <!-- modal static -->
<div class="modal fade" id="delRoleModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true" data-backdrop="static">
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
import RoleAPI from '../../services/RoleService'
import $ from 'jquery'

export default {
    name:"RoleTable",
    components: {
    },
    data() {
        return {
            roles : null,
            deleted : false,
            is_succ_hide : true,
        }
    },
    methods: {
        prepareListUsers() {
            RoleAPI.role_list()
            .then(response => {
                this.roles = response
            })
            .catch(err => {console.log(err)})
            .finally(() => {})
        },
        btnDelClick(userId) {
            var thisBtn = $('#tmp-btn-del-' + userId);
            var modal = $('#delRoleModal');
            modal.modal('show');
            modal.find('.btn-del').attr('value', thisBtn.attr('value'))
        },
        deleteRecord() {
            var id = $('.btn-del').attr('value')
            var modal = $('#delRoleModal');
            var roleId = $('#role-id-' + id)
            RoleAPI.delete_role(id)
            .then(response => {
                this.deleted = response
                modal.modal('hide')
                roleId.remove()
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