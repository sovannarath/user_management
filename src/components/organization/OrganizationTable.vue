<template>
    <div class="sufee-alert alert with-close alert-success alert-dismissible fade show" v-if="!is_succ_hide">
        <span class="badge badge-pill badge-success">Success</span> Data has been deleted.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeSucc">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>


<div class="user-data m-b-30">
  <h3 class="title-3 m-b-30 pull-left"><i class="zmdi zmdi-account-calendar"></i>Organizations</h3>
  <router-link style="margin-right:35px;" class="btn btn-sm btn-primary pull-right" to="/organizations/create">
    <i class="fa fa-plus"></i> New Record
  </router-link>
    <!--div class="filters m-b-45">
        <div class="rs-select2--dark rs-select2--md m-r-10 rs-select2--border">
            <select class="js-select2" name="property">
                <option selected="selected">All Properties</option>
                <option value="">Products</option>
                <option value="">Services</option>
            </select>
            <div class="dropDownSelect2"></div>
        </div>
        <div class="rs-select2--dark rs-select2--sm rs-select2--border">
            <select class="js-select2 au-select-dark" name="time">
                <option selected="selected">All Time</option>
                <option value="">By Month</option>
                <option value="">By Day</option>
            </select>
            <div class="dropDownSelect2"></div>
        </div>
    </div-->

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
                         <td>Name</td>
                        <td>Description</td>
                        <td>Address</td>
                        <td>Telephone</td>
                        <td>Email</td>
                        <td></td>
                </tr>
            </thead>
            <tbody>
                   <tr  v-for="organization in organizations" v-bind:key="organization" v-bind:id="'organization-id-' + organization.id">
                        <td>
                            <label class="au-checkbox">
                                <input type="checkbox">
                                <span class="au-checkmark"></span>
                            </label>
                        </td>
                        <td>{{organization.name}}</td>
                        <td>{{organization.description}}</td>
                        <td>{{organization.address}}</td>
                        <td>{{organization.telephone}}</td>
                        <td>{{organization.email}}</td>
                        <td>
                            <div class="table-data-feature">
                                <!--button class="item" data-toggle="tooltip" data-placement="top" title="Send">
                                    <i class="zmdi zmdi-mail-send"></i>
                                </button-->
                                <router-link class="item" data-toggle="tooltip" data-placement="top" title="Edit" v-bind:to="'/organizations/' + organization.id + '/edit'">
                                    <i class="zmdi zmdi-edit"></i>
                                </router-link>
                                <button class="item tmp-btn-del" v-bind:id="'tmp-btn-del-' + organization.id" data-toggle="tooltip" v-bind:value="organization.id" data-placement="top" v-on:click="btnDelClick(organization.id)" title="Delete">
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
<div class="modal fade" id="delOrganizationModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true" data-backdrop="static">
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
<button type="button" class="btn btn-danger btn-del" v-on:click="deleteOrganization">Yes</button>
</div>
</div>
</div>
</div>
<!-- end modal static -->
</template>

<script>
import OrganizationAPI from '../../services/OrganizationService'
import $ from 'jquery'

export default {
    name:"OrganizationTable",
    components: {

    },
    data() {
        return {
            organizations: null,
            is_succ_hide : true,
        }
    },
    methods: {
        loadOrganizationData(){
            OrganizationAPI.all_organizations()
            .then(response => {
                this.organizations = response
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {})
        },
        btnDelClick(organizationId) {
            var thisBtn = $('#tmp-btn-del-' + organizationId);
            var modal = $('#delOrganizationModal');
            modal.modal('show');
            modal.find('.btn-del').attr('value', thisBtn.attr('value'))
        },
        deleteOrganization() {
            var id = $('.btn-del').attr('value')
            var modal = $('#delOrganizationModal')
            var organizationId = $('#organization-id-' + id)
            OrganizationAPI.delete_organization(id)
            .then(response => {
                this.deleted = response
                modal.modal('hide')
                organizationId.remove()
                this.is_succ_hide = false
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {})
        }
    },
    mounted() {
        this.loadOrganizationData()
    }
}
</script>