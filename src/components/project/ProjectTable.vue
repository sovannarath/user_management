<template>
    <div class="sufee-alert alert with-close alert-success alert-dismissible fade show" v-if="!is_succ_hide">
        <span class="badge badge-pill badge-success">Success</span> Data has been deleted.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeSucc">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

<div class="user-data m-b-30">
  <h3 class="title-3 m-b-30 pull-left"><i class="zmdi zmdi-account-calendar"></i>Projects</h3>
  <router-link style="margin-right:35px;" class="btn btn-sm btn-primary pull-right" to="/projects/create">
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
                            <td>Purpose</td>
                            <td>Description</td>
                            <td>Type</td>
                            <td>Organization</td>
                            <td>Manager</td>
                            <td>Start Date</td>
                            <td>End Date</td>
                            <td></td>
                </tr>
            </thead>
            <tbody>
                        <tr v-for="project in projects" v-bind:key="project.id" v-bind:id="'project-id-' + project.id">
                            <td>
                                <label class="au-checkbox">
                                    <input type="checkbox">
                                    <span class="au-checkmark"></span>
                                </label>
                            </td>
                            <td>{{project.name}}</td>
                            <td>{{project.purpose}}</td>
                            <td>{{project.description}}</td>
                            <td>{{project.type.name}}</td>
                            <td>{{project.organization.name}}</td>
                            <td>{{project.manager.name}}</td>
                            <td>{{project.start_date}}</td>
                            <td>{{project.end_date}}</td>
                            <td>
                                <div class="table-data-feature">
                                    <!--button class="item" data-toggle="tooltip" data-placement="top" title="Send">
                                        <i class="zmdi zmdi-mail-send"></i>
                                    </button-->
                                    <router-link class="item" data-toggle="tooltip" data-placement="top" title="Edit" v-bind:to="'/projects/'+project.id+'/edit'">
                                        <i class="zmdi zmdi-edit"></i>
                                    </router-link>
                                    <!--button class="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                        <i class="zmdi zmdi-edit"></i>
                                    </button-->
                                    <button class="item tmp-btn-del" v-bind:id="'tmp-btn-del-' + project.id" data-toggle="tooltip" v-bind:value="project.id" data-placement="top" v-on:click="btnDelClick(project.id)" title="Delete">
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
<div class="modal fade" id="delContactTypeModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true" data-backdrop="static">
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
import ProjectAPI from '../../services/ProjectService'
import $ from 'jquery'

export default {
    name:"ContactTypeTable",
    components: {

    },
    data() {
        return {
            projects: null,
            is_succ_hide: true
        }
    },
    methods: {
        loadProjects() {
            ProjectAPI.allProjects()
            .then(response => {
                for (var i = 0; i <= (response.length - 1); i++) {
                    var startDate = new Date(response[i].start_date)
                    var endDate = new Date(response[i].end_date)
                    response[i].start_date = startDate.getFullYear() + '-' + "0"+ (startDate.getMonth()+1) + '-' + startDate.getDate()
                    response[i].end_date = endDate.getFullYear() + '-' + "0" + (endDate.getMonth()+1) + '-' + endDate.getDate()
                }
                this.projects = response
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {})
        },
        btnDelClick(projectId) {
            var thisBtn = $('#tmp-btn-del-' + projectId);
            var modal = $('#delContactTypeModal');
            modal.modal('show');
            modal.find('.btn-del').attr('value', thisBtn.attr('value'))
        },
        deleteRecord() {
            var id = $('.btn-del').attr('value')
            var modal = $('#delContactTypeModal');
            var typeId = $('#type-id-' + id)
            ProjectAPI.deleteProject(id)
            .then(response => {
                this.deleted = response
                modal.modal('hide')
                typeId.remove()
                this.is_succ_hide = false
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {})
        }
    },
    mounted() {
        this.loadProjects()
    }
}
</script>