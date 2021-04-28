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
    <div class="col-sm-12">
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

<div class="row">
    <div class="col-sm-12">
        <!-- USER DATA-->
        <div class="user-data m-b-30">
            <div class="row">
                <div class="col-sm-6">
                    <h3 class="title-3 m-b-30">
                        <i class="zmdi zmdi-account-calendar"></i>user contact
                    </h3>
                </div>
                <div class="col-sm-6">
                    <button class="btn btn-sm btn-dark pull-right" style="margin-right:35px;" v-on:click="newContact()">
                        <i class="fa fa-plus"></i> Add Contact
                    </button>
                </div>
            </div>
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
                            <td>contact</td>
                            <td>type</td>
                            <td>provider</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody class="contact-data">
                        <tr v-if="contacts == ''">
                            <td colspan="4"><span class="center">No data avialable.</span></td>
                        </tr>
                        <tr v-for="con in contacts" v-bind:key="con" v-bind:id="'contact-id' + con.id">
                            <td v-bind:id="'contact-text-'+con.id">{{con.contact}}</td>
                            <td v-bind:id="'contact-type-'+con.id">{{con.type.name}}</td>
                            <td v-bind:id="'contact-provider-'+con.id">{{con.provider.name}}</td>
                            <td>
                                <div class="table-data-feature">
                                    <button class="item" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="editContact(con.id)">
                                        <i class="zmdi zmdi-edit"></i>
                                    </button>
                                    <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" v-on:click="deleteContact(con.id)" title="Delete">
                                        <i class="zmdi zmdi-delete"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--div class="user-data__footer">
            <button class="au-btn au-btn-load">load more</button>
            </div-->
        </div>
        <!-- END USER DATA-->
    </div>
</div>                            
<!-- modal medium -->
<div class="modal fade" id="addContactFrom" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg" role="document">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="mediumModalLabel">Medium Modal</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">

<div class="row form-group">
    <div class="col col-md-3">
        <label for="email-input" class=" form-control-label">Contact</label>
    </div>
    <div class="col-12 col-md-9">
        <input type="text" id="user_contact" name="user_contact" v-model="user_contact" placeholder="Enter contact" class="form-control">
        <!--small class="form-text text-muted">This is a help text</small-->
    </div>
</div>

<div class="row form-group">
    <div class="col col-md-3">
        <label for="select" class=" form-control-label">Contact Type</label>
    </div>
    <div class="col-12 col-md-9">
        <select name="contact_type_id" id="contact_type_id" v-model="contact_type_id" class="form-control" >
            <option selected disabled>-- Select Type --</option>
            <option v-for="type in contactTypes" v-bind:key="type" v-bind:value="type.id">{{type.name}}</option>
        </select>
    </div>
</div>

<div class="row form-group">
    <div class="col col-md-3">
        <label for="select" class=" form-control-label">Contact Provider</label>
    </div>
    <div class="col-12 col-md-9">
        <select name="provider_id"  id="provider_id" v-model="provider_id" class="form-control">
            <option selected disabled>-- Select Provider --</option>
            <option v-for="provider in contactProviders" v-bind:key="provider" v-bind:value="provider.id">{{provider.name}}</option>
        </select>
    </div>
</div>
<input type="hidden" v-model="contact_id"/>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
<button type="button" class="btn btn-primary" v-on:click="addContact()">Add</button>
</div>
</div>
</div>
</div>
<!-- end modal medium -->
<!-- modal static -->
<div class="modal fade" id="deleteUserContact" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true" data-backdrop="static">
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
<button type="button" class="btn btn-danger btn-del" v-on:click="letDelete()">Yes</button>
</div>
</div>
</div>
</div>
<!-- end modal static -->
</template>

<style scoped>
.contact-element {
    margin-bottom: 10px;
}
.table-data {
    height: auto !important;
}
</style>

<script>
import UserAPI from '../../services/UserService'
import ContactTypeAPI from '../../services/ContactTypeService'
import ContactProvider from '../../services/ContactProviderService'
import UserContactAPI from '../../services/UserContactService'
import $ from 'jquery'

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
            tmp             : null,
            contacts        : null,
            contactTypes    : null,
            contactProviders: null,
            user_contact    : '',
            contact_type_id : '',
            provider_id     : '',
            contact_id       : '',
            let_delete      : false,
            userData : [
                {
                    'id': 1,
                    'name' : 'Thorn Sovannarath',
                    'role' : {
                        'id' : 1,
                        'name' : 'Developer',
                    },
                    'organization': {
                        'id' : 1,
                        'name' : 'Secretary',
                    },
                    'email': 'blabla@email.com',
                    'phone' : '+855',
                    'contacts' : [
                        {
                            'id' : 1,
                            'contact' : '+85569929695',
                            'type' : {
                                'id' : 1,
                                'name' : 'PHONE'
                            },
                            'provider' : {
                                'id' : 1,
                                'name' : 'SMART'
                            }
                        },
                        {
                            'id' : 2,
                            'contact' : '+85595254842',
                            'type' : {
                                'id': 1,
                                'name' : 'PHONE'
                            },
                            'provider' : {
                                'id' : 2,
                                'name' : 'CELLCARD'
                            }
                        },
                        {
                            'id' : 3,
                            'contact' : 'thornsovannarath@gmail.com',
                            'type' : {
                                'id' : 2,
                                'name' : 'EMAIL'
                            },
                            'provider' : {
                                'id' : 3,
                                'name' : 'GOOGLE'
                            }
                        },
                    ]
                }
            ]
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
                this.contacts = this.userData[0].contacts;
                this.id                 = this.userData[0].id
                this.full_name          = this.userData[0].name
                this.gender             = this.userData[0].gender
                this.email              = this.userData[0].email
                this.organization_id    = this.userData[0].organization.id
                this.role_id            = this.userData[0].role.id
                console.log(id);
            /*UserAPI.get_user(id)
            .then(response => {
                this.contacts = response.contacts
                console.log(response.contacts)
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
            .finally(() => {})*/
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
        },
        newContact(){
            $('#addContactFrom').modal('show')
        },
        loadContactType(){
            ContactTypeAPI.getAllContactType()
            .then(response => {
                this.contactTypes = response
            })
            .catch(err => {
                console.log(err)
            })
        },
        loadContactProvider() {
            ContactProvider.getAllContactProviders()
            .then(response => {
                this.contactProviders = response
            })
            .catch(err => {
                console.log(err)
            })
        },
        addContact(){
            var data = {}
            data['user'] = {'id' : this.id}
            data['contact'] = this.user_contact
            data['type'] = {'id': this.contact_type_id}
            if(this.provider_id != '')
                data['provider'] = {'id' : this.provider_id }
            
            if(this.contact_id == ''){
                UserContactAPI.createUserContact(data)
                .then(response => {
                    UserContactAPI.getUserContact(response.id)
                    .then(contact => {
                        this.contacts.push(contact)
                        $('#addContactFrom').modal('hide')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }
            else {

                UserContactAPI.updateUserContact(data, this.contact_id)
                .then(contact => {
                   
                    $('#contact-text-' + contact.id).text(contact.contact)
                    $('#contact-type-' + contact.id).text(contact.type.name)
                    $('#contact-provider-' + contact.id).text(contact.provider.name)
                    $('#addContactFrom').modal('hide')
                })
                .catch(err => {
                    console.log(err)
                })
            }

        },
        editContact(id) {
            console.log(id)
            UserContactAPI.getUserContact(id)
            .then(contact => {
                this.user_contact = contact.contact
                this.contact_type_id = contact.type.id
                this.provider_id = contact.provider.id
                this.contact_id = contact.id
                $('#addContactFrom').modal('show')
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteContact(id) {
            this.contact_id = id
            $('#deleteUserContact').modal('show')
        },
        letDelete(){
            UserContactAPI.deleteUserContact(this.contact_id)
            .then(contact => {
                console.log('Success: ', contact)
                $('#contact-id' + this.contact_id).remove()
                $('#deleteUserContact').modal('hide')
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.loadRoles()
        this.loadOrganizations()
        this.loadAllReference()
        this.loadContactType()
        this.loadContactProvider()

        var urlPath = window.location.pathname.split('/')
        if (urlPath[urlPath.length - 1] == 'edit'){
            this.getUserInformation(urlPath[urlPath.length - 2])
        }
    },
}
</script>
