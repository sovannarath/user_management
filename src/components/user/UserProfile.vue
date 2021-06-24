<template>
<div class="container emp-profile">
            <!--form method="post"-->
                <div class="row">
                    <div class="col-md-4">

                        <div class="row">
                            <div class="col-md-12">
                                <div class="profile-img">
                                    <img src="https://www.canbridge.in/images/profile-dummy.png" alt=""/>
                                    <div class="file btn btn-lg btn-primary">
                                        Change Photo
                                        <input type="file" name="file"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-12">
                                <div class="profile-work">
                                    <p>PROJECT LINK</p>
                                    <span v-for="project in userProjects" v-bind:key="project.id">
                                        <router-link v-bind:to="'/projects/'+project.id">{{project.name}}</router-link><br/>
                                    </span>

                                    <!--p>SKILLS</p>
                                    <a href="">Web Designer</a><br/>
                                    <a href="">Web Developer</a><br/>
                                    <a href="">WordPress</a><br/>
                                    <a href="">WooCommerce</a><br/>
                                    <a href="">PHP, .Net</a><br/-->
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="profile-head">
                                    <h4>{{userName}}</h4>
                                    <h6>{{userRole}}</h6>
                                    <!--p class="proile-rating">RANKINGS : <span>8/10</span></p-->

                                    <!--ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contacts" role="tab" aria-controls="profile" aria-selected="false">Contacts</a>
                                        </li>
                                    </ul-->
                                </div>
                            </div>
                            <div class="col-md-4">
                                <router-link v-bind:to="'/users/'+userId+'/edit'">Edit Profile</router-link>
                                <!--input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/-->
                            </div>
                        </div>
                        <br>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="profile-head">
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contacts" role="tab" aria-controls="profile" aria-selected="false">Contacts</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                
                                <!--div class="row">
                                    <div class="col-md-4">
                                        <label>User Id</label>
                                    </div>
                                    <div class="col-md-8">
                                        <p>{{userId}}</p>
                                    </div>
                                </div-->
                                        
                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Name</label>
                                    </div>
                                    <div class="col-md-8">
                                        <p>{{userName}}</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Gender</label>
                                    </div>
                                    <div class="col-md-8">
                                        <p>{{userGender}}</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Date Of Birth</label>
                                    </div>
                                    <div class="col-md-8">
                                        <p>{{userDateOfBirth}}</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Email</label>
                                    </div>
                                    <div class="col-md-8">
                                        <p>{{userEmail}}</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Organization</label>
                                    </div>
                                    <div class="col-md-8">
                                        <p>{{userOrganization}}</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Reference</label>
                                    </div>
                                    <div class="col-md-8">
                                        <p>
                                            <!--router-link v-bind:to="'/user-profile/'+ userRefId" >{{userRef}}</router-link-->
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="contacts" role="tabpanel" aria-labelledby="contact-tab">
                            
                                <div class="row" v-for="key in contactTypeKeys" v-bind:key="key" style="padding:5px;">
                                    <div class="col-md-4">
                                        <label>{{key}}</label>
                                    </div>
                                    <div class="col-md-8">
                                        <p v-for="contact in sortedUserContacts[key]" v-bind:key="contact.id">
                                            <span v-if="key == 'SOCIAL MEDIA'" >
                                                <a v-bind:href="contact.contact">{{contact.contact}}</a>
                                            </span>
                                            <span v-if="key != 'SOCIAL MEDIA'">
                                                {{contact.contact}} &nbsp;<span v-if="contact.provider.name != 'ADDRESS'">({{contact.provider.name}})</span>
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <!--div class="row">
                                    <div class="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>Your detail description</p>
                                    </div>
                                </div-->

                            </div>
                        </div>
                            </div>
                        </div>

                    </div>
                </div>
            <!--/form-->           
        </div>
</template>

<style scoped>
body{
    background: -webkit-linear-gradient(left, #3931af, #00c6ff);
}
.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}
.profile-img{
    text-align: center;
}
.profile-img img{
    width: 70%;
    height: 100%;
}
.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -17%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}
.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}
.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}
.profile-edit-btn{
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
}
.proile-rating{
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}
.proile-rating span{
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}
.profile-head .nav-tabs{
    margin-bottom:5%;
}
.profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
}
.profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
}
.profile-work{
    padding: 14%;
    margin-top: -15%;
}
.profile-work p{
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}
.profile-work a{
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}
.profile-work ul{
    list-style: none;
}
.profile-tab label{
    font-weight: 600;
}
.profile-tab p{
    font-weight: 600;
    color: #0062cc;
}
</style>

<script>
import UserAPI from "../../services/UserService"

export default {
    name: "UserProfile",
    components: {
        
    },
    data() {
        return {
            userId              : "",
            userName            : "",
            userRole            : "",
            userGender          : "",
            userDateOfBirth     : "",
            userEmail           : "",
            userOrganization    : "",
            userRef             : "",
            userRefId           : "",
            userContacts        : [],
            userProjects        : [],
            sortedUserContacts  : {},
            contactTypeKeys     : [],
        }
    },
    methods: {
        getUserInfo(user_id){
            var self = this;
            UserAPI.get_user(user_id)
            .then(data => {
                self.userId             = data.id;
                self.userName           = data.name;
                self.userRole           = data.role.name;
                self.userGender         = data.gender;
                self.userDateOfBirth    = data.date_of_birth;
                self.userEmail          = data.email;
                self.userOrganization   = data.organization == null ? "" : data.organization.name;
                self.userRef            = data.reference == null ? "" : data.reference.name;
                self.userRefId          = data.reference == null ? "" : data.reference.id;
                self.userContacts       = data.contacts == null ? [] : data.contacts;
                self.userProjects       = data.projects == null ? [] : data.projects;
                
                self.userContacts.forEach(function(contact){
                    var key = contact.type.name.replace("_", " ");
                    if(self.sortedUserContacts[key] == undefined){
                        self.sortedUserContacts[key] = [];
                        self.contactTypeKeys.push(key);
                    }
                    self.sortedUserContacts[key].push(contact);
                });
                
            })
            .catch( err => {
                console.log(err);
            });
        }
    },
    mounted() {
        var urlPath = window.location.pathname.split('/');
        var userId = urlPath[urlPath.length-1];
        this.getUserInfo(userId);
    }
}
</script>
