<template>
<div>
<div class="row">
    <div class="offset-sm-2 col-sm-8">
        <div class="sufee-alert alert with-close alert-success alert-dismissible fade show" v-if="!is_succ_hide">
            <span class="badge badge-pill badge-success">Success</span> Data has been inserted.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeSucc">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="sufee-alert alert with-close alert-success alert-dismissible fade show" v-if="!is_upd_hide">
            <span class="badge badge-pill badge-success">Success</span> Data has been updated.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeUpd">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="sufee-alert alert with-close alert-warning alert-dismissible fade show" v-if="!is_warn_hide">
            <span class="badge badge-pill badge-warning">Warning</span> You may need to check something!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeWarn">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>                     										
        <div class="sufee-alert alert with-close alert-danger alert-dismissible fade show" v-if="!is_dang_hide">
            <span class="badge badge-pill badge-danger">Error</span> You have some error when processing the data!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeDang">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</div>
<div class="row">
    <div class="offset-sm-2 col-sm-8">
        <div class="card">
            <div class="card-header">
                <strong>Project Form</strong>
            </div>
            <div class="card-body card-block">
                <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="text-input" class=" form-control-label">Project Name</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <input type="text" id="name" v-model="name" name="name" placeholder="Enter name" class="form-control">
                            <!--small class="form-text text-muted">This is a help text</small-->
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="email-input" class=" form-control-label">Purpose</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <textarea id="purpose" name="email" v-model="purpose" class="form-control" placeholder="Enter purpose"></textarea>
                            <!--small class="help-block form-text">Please enter your email</small-->
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="email-input" class=" form-control-label">Description</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <textarea id="description" name="email" v-model="description" class="form-control" placeholder="Enter description"></textarea>
                            <!--small class="help-block form-text">Please enter your email</small-->
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="email-input" class=" form-control-label">Type</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <select v-model="type_id" id="type_id" class="form-control">
                                <option selected disabled value="">-- Select Type --</option>
                                <option v-for="type in types" v-bind:key="type.id" v-bind:value="type.id">{{type.name}}</option>
                            </select>
                            <!--small class="help-block form-text">Please enter your email</small-->
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="email-input" class=" form-control-label">Organization</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <select v-model="organization_id" id="organization_id" class="form-control">
                                <option selected disabled value="">-- Select Organization --</option>
                                <option v-for="organization in organizations" v-bind:key="organization.id" v-bind:value="organization.id">{{organization.name}}</option>
                            </select>
                            <!--small class="help-block form-text">Please enter your email</small-->
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="email-input" class=" form-control-label">Manager</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <select v-model="manager_id" id="manager_id" class="form-control">
                                <option selected disabled value="">-- Select Manager --</option>
                                <option v-for="manager in managers" v-bind:key="manager.id" v-bind:value="manager.id">{{manager.name}}</option>
                            </select>
                            <!--small class="help-block form-text">Please enter your email</small-->
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="email-input" class=" form-control-label">Start Date</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <input type="date" v-model="start_date" id="start_date" class="form-control">
                            <!--small class="help-block form-text">Please enter your email</small-->
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="email-input" class=" form-control-label">End Date</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <input type="date" v-model="end_date" id="end_date" class="form-control">
                            <!--small class="help-block form-text">Please enter your email</small-->
                        </div>
                    </div>

                    <input type="hidden" name="id" v-model="id"/>
                </form>
            </div>
            <div class="card-footer">
                <button type="submit" v-on:click="createOrUpdateProject()" class="btn btn-primary btn-sm">
                    <i class="fa fa-dot-circle-o"></i> Submit
                </button>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import ProjectAPI from '../../services/ProjectService'
import OrganizationAPI from '../../services/OrganizationService'
import ProjectTypeAPI from '../../services/ProjectTypeService'
import ManagerAPI from '../../services/UserService'

export default {
    name: 'ProjectForm',
    components: {
       
    },
    data () {
        return {
            id              : '',
            name            : '',
            purpose         : '',
            description     : '',
            type_id         : '',
            organization_id : '',
            manager_id      : '',
            start_date      : '',
            end_date        : '',
            types           : null,
            organizations   : null,
            managers        : null,
            is_changed      : false,
            is_succ_hide    : true,
            is_warn_hide    : true,
            is_dang_hide    : true,
            is_upd_hide     : true,
        }
    },
    methods : {
        createOrUpdateProject() {
            var data = {}
            data['name'] = this.name
            data['purpose'] = this.purpose
            data['description'] = this.description
            data['type'] = { 'id' : this.type_id }
            data['organization'] = { 'id' : this.organization_id }
            data['manager'] = { 'id' : this.manager_id }
            data['start_date'] = this.start_date
            data['end_date'] = this.end_date
           
            if(this.id == ''){
                ProjectAPI.createProject(data)
                .then(response => {
                    this.id = response.id
                    this.is_succ_hide = false
                })
                .catch(err => {
                    console.log(err)
                    this.is_dang_hide = false
                })
                .finally(() => {})
            }
            else {
                ProjectAPI.updateProject(data, this.id)
                .then(response => {
                    this.tmp = response
                    this.is_upd_hide = false
                })
                .catch(err => {
                    console.log(err)
                    this.is_dang_hide = false
                })
                .finally(() => {})
            } 
        },
        getProjectInformation(id) {
            ProjectAPI.getProject(id)
            .then(response => {
                this.id = response.id
                this.name = response.name
                this.purpose = response.purpose
                this.description = response.description
                this.type_id = response.type.id
                this.organization_id = response.organization.id
                this.manager_id = response.manager.id
                var startDate = new Date(response.start_date)
                var endDate = new Date(response.end_date)
                this.start_date = startDate.getFullYear() + '-' + "0"+ (startDate.getMonth()+1) + '-' + startDate.getDate()
                this.end_date = endDate.getFullYear() + '-' + "0" + (endDate.getMonth()+1) + '-' + endDate.getDate()
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {})
        },
        isChanged () {
            this.is_changed = true
        },
        closeSucc() {
            this.is_succ_hide = true
        },
        closeUpd() {
            this.is_upd_hide = true
        },
        closeWarn() {
            this.is_warn_hide = true
        },
        closeDang() {
            this.is_dang_hide = true
        },
        loadProjectTypes() {
            ProjectTypeAPI.allProjectTypes()
            .then(response => {
                this.types = response
            })
            .catch(err => {
                console.log(err)
            })
        },
        loadOrganizations() {
            OrganizationAPI.all_organizations()
            .then(response => {
                this.organizations = response
            })
            .catch(err => {
                console.log(err)
            })
        },
        loadManagers() {
            ManagerAPI.user_list()
            .then(response => {
                this.managers = response
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.loadProjectTypes()
        this.loadOrganizations()
        this.loadManagers()
        var urlPath = window.location.pathname.split('/')
        if (urlPath[urlPath.length - 1] == 'edit'){
            this.getProjectInformation(urlPath[urlPath.length - 2])
        }
    },
}
</script>