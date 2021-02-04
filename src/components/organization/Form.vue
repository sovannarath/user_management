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
                        <strong>Organization Form</strong>
                    </div>
                    <div class="card-body card-block">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">

                            <div class="row form-group">
                                <div class="col col-md-3">
                                    <label for="text-input" class=" form-control-label">Name</label>
                                </div>
                                <div class="col-12 col-md-9">
                                    <input type="text" id="name" v-model="name" name="name" placeholder="Enter name" class="form-control">
                                    <!--small class="form-text text-muted">This is a help text</small-->
                                </div>
                            </div>

                            <div class="row form-group">
                                <div class="col col-md-3">
                                    <label for="text-input" class=" form-control-label">Telephone</label>
                                </div>
                                <div class="col-12 col-md-9">
                                    <input type="text" id="telephone" v-model="telephone" name="telephone" placeholder="Enter telephone" class="form-control">
                                    <!--small class="form-text text-muted">This is a help text</small-->
                                </div>
                            </div>

                            <div class="row form-group">
                                <div class="col col-md-3">
                                    <label for="text-input" class=" form-control-label">Email</label>
                                </div>
                                <div class="col-12 col-md-9">
                                    <input type="text" id="email" v-model="email" name="email" placeholder="Enter email" class="form-control">
                                    <!--small class="form-text text-muted">This is a help text</small-->
                                </div>
                            </div>

                            <div class="row form-group">
                                <div class="col col-md-3">
                                    <label for="email-input" class=" form-control-label">Address</label>
                                </div>
                                <div class="col-12 col-md-9">
                                    <textarea id="address" name="address" v-model="address" class="form-control" placeholder="Enter address"></textarea>
                                    <!--small class="help-block form-text">Please enter your email</small-->
                                </div>
                            </div>

                            <div class="row form-group">
                                <div class="col col-md-3">
                                    <label for="email-input" class=" form-control-label">Description</label>
                                </div>
                                <div class="col-12 col-md-9">
                                    <textarea id="description" name="description" v-model="description" class="form-control" placeholder="Enter description"></textarea>
                                    <!--small class="help-block form-text">Please enter your email</small-->
                                </div>
                            </div>

                            <input type="hidden" name="id" v-model="id"/>
                        </form>
                    </div>
                    <div class="card-footer">
                        <button type="submit" v-on:click="createOrUpdateOrganization()" class="btn btn-primary btn-sm">
                            <i class="fa fa-dot-circle-o"></i> Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrganizationAPI from '../../services/OrganizationService'
 
export default {
    name: 'OrganizationForm',
    components : {

    },
    data() {
        return {
            id: 0,
            name: '',
            telephone: '',
            email: '',
            address: '',
            description: '',
            is_changed      : false,
            is_succ_hide    : true,
            is_warn_hide    : true,
            is_dang_hide    : true,
            is_upd_hide     : true,
        }
    },
    methods: {
        createOrUpdateOrganization() {
            var data = {}
            data['name'] = this.name
            data['telephone'] = this.telephone
            data['email'] = this.email
            data['address'] = this.email
            data['description'] = this.description
            
            if(this.id == ''){
                OrganizationAPI.create_organization(data)
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
                OrganizationAPI.update_organization(data, this.id)
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
        getOrganizationInformation(id) {
            OrganizationAPI.get_organization(id)
            .then(response => {
                this.id = response.id
                this.name = response.name
                this.telephone = response.telephone
                this.email = response.email
                this.address = response.address
                this.description = response.description
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {})
        },
        clearAllInput() {
            this.id = 0
            this.name = ''
            this.telephone = ''
            this.email = ''
            this.address = ''
            this.description = ''
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
        var urlPath = window.location.pathname.split('/')
        if (urlPath[urlPath.length - 1] == 'edit'){
            this.getOrganizationInformation(urlPath[urlPath.length - 2])
        }
    }
}
</script>