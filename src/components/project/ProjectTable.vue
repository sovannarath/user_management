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
                    <h1 class="title-10 m-b-35">Projects</h1>
                </div>
                <div class="col-sm-6">
                    <router-link class="btn btn-sm btn-primary pull-right" to="/projects/create">
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
                            <th>Name</th>
                            <th>Purpose</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Organization</th>
                            <th>Manager</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="project in projects" v-bind:key="project.id" class="tr-shadow" v-bind:id="'project-id-' + project.id">
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
            <!-- END DATA TABLE -->
        </div>
    </div>
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