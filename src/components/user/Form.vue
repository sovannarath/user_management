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
                <strong>User Form</strong>
            </div>
            <div class="card-body card-block">
                <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="text-input" class=" form-control-label">Full Name</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <input type="text" id="full_name" v-model="full_name" name="full_name" placeholder="Enter your full name" class="form-control">
                            <!--small class="form-text text-muted">This is a help text</small-->
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="select" class=" form-control-label">Gender</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <select name="gender" v-model="gender" id="gender" class="form-control">
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="email-input" class=" form-control-label">Your Email</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <input type="email" id="email" name="email" v-model="email" placeholder="Enter Email" class="form-control">
                            <!--small class="help-block form-text">Please enter your email</small-->
                        </div>
                    </div>

                    <!--div class="row form-group">
                        <div class="col col-md-3">
                            <label for="email-input" class=" form-control-label">Date of Birth</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <input type="text" id="date_of_birth" name="date_of_birth" v-model="date_of_birth" placeholder="Enter date of birth" class="form-control">
                            <small class="help-block form-text">Please enter your email</small>
                        </div>
                    </div-->

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="select" class=" form-control-label">Role</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <select name="role_id" v-model="role_id" id="role_id" class="form-control">
                                <option v-for="role in roles" v-bind:key="role.id" v-bind:value="role.id">{{role.name}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="select" class=" form-control-label">Organization</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <select name="organization_id" v-model="organization_id" id="organization_id" class="form-control" >
                                <option v-for="organization in organizations" v-bind:key="organization.id" v-bind:value="organization.id">{{organization.name}}</option>
                            </select>
                        </div>
                    </div>

                     <div class="row form-group">
                        <div class="col col-md-3">
                            <label for="select" class=" form-control-label">Reference</label>
                        </div>
                        <div class="col-12 col-md-9">
                            <select name="reference_id" v-model="reference_id" id="reference_id" class="form-control" >
                                <option v-bind:value="reference.id" v-for="reference in references" v-bind:key="reference.id" >{{reference.name}}</option>
                            </select>
                        </div>
                    </div>
                    <input type="hidden" name="id" v-model="id"/>
                </form>
            </div>
            <div class="card-footer">
                <button type="submit" v-on:click="createOrUpdateUser" class="btn btn-primary btn-sm">
                    <i class="fa fa-dot-circle-o"></i> Submit
                </button>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import UserAPI from '../../services/UserService'

export default {
    name:"UserForm",
    components: {

    },
    data() {
        return {
            id              : '',
            full_name       : '',
            gender          : '',
            email           : '',
            //date_of_birth : '',
            role_id         : '',
            organization_id : '',
            reference_id    : '',
            organizations   : null,
            roles           : null,
            references      : null,
            is_changed      : false,
            is_succ_hide    : true,
            is_warn_hide    : true,
            is_dang_hide    : true,
            is_upd_hide     : true,
            tmp             : null
        }
    },
    methods: {
        loadOrganizations() {
            UserAPI.organization_list()
            .then(response => {
                this.organizations = response
            })
            .catch(err => {console.log(err)})
            .finally(() => {})
        },
        loadRoles() {
            UserAPI.role_list()
            .then(response => {
                this.roles = response
            })
            .catch(err => {console.log(err)})
            .finally(() => {})
        },
        loadAllReference() {
            UserAPI.reference_list()
            .then(response => {
                this.references = response
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {})
        },
        createOrUpdateUser() {
            var data = {}
            data['name'] = this.full_name
            data['gender'] = this.gender
            data['email'] = this.email
            data['role'] =  { 'id' : this.role_id }
            data['organization'] = { 'id' : this.organization_id }
            if(this.reference_id != '')
                data['reference'] = { 'id': this.reference_id }
            
            if(this.id == ''){
                UserAPI.create_user(data)
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
                UserAPI.update_user(data, this.id)
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
        getUserInformation(id) {
            UserAPI.get_user(id)
            .then(response => {
                this.id                 = response.id
                this.full_name          = response.name
                this.gender             = response.gender
                this.email              = response.email
                this.organization_id    = response.organization.id
                this.role_id            = response.role.id
                if(response.reference != null)
                    this.reference_id       = response.reference.id
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {})
        },
        clearAllInput() {
            this.id                 = ''
            this.full_name          = ''
            this.gender             = ''
            this.email              = ''
            this.role_id            = ''
            this.organization_id    = ''
            this.reference_id       = ''
            this.is_changed         = false   
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
        }
    },
    mounted() {
        this.loadRoles()
        this.loadOrganizations()
        this.loadAllReference()

        var urlPath = window.location.pathname.split('/')
        if (urlPath[urlPath.length - 1] == 'edit'){
            this.getUserInformation(urlPath[urlPath.length - 2])
        }
    },
}
</script>
