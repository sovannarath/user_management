<template>
<br>
            <div class="row form-group">
                    <div class="col col-md-6">
                        <label for="participant" class=" form-control-label">Search</label>
                        <Select2 v-model="participantId" :options="userDataForSelect" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="" class=" form-control-label">&nbsp;</label><br>
                        <button type="submit" @click="clearSelectGroup()" class="btn btn-primary btn-sm"> 
                            <i class="fa fa-list"></i> Create Group
                        </button>
                    </div>
                </div>

                <div class="table-responsive table--no-card m-b-40">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Occupy</th>
                                <th>Organization</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="participant in participants" v-bind:key="participant.id">
                                <td>{{participant.user.name}}</td>
                                <td>{{participant.user.role.name}}</td>
                                <td>{{participant.user.organization.name}}</td>
                                <td>{{participant.user.email}}</td>
                                <td>
                                    <span v-for="contact in participant.user.contacts" v-bind:key="contact.id">
                                        <p v-if="contact.type.name == 'PHONE_NUMBER'">
                                            {{contact.contact}}
                                        </p>
                                    </span>
                                </td>
                                <td>
                                    <div class="table-data-feature">
                                        <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" v-on:click="deleteParticipant(participant)" title="Delete">
                                            <i class="zmdi zmdi-delete"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

<!-- modal large -->
<div class="modal fade" id="participant-group" tabindex="-1" role="dialog" aria-labelledby="participant-groupLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="largeModalLabel">Create Participant Group</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
                <div class="row">
                    <div class="col col-sm-6" style="border-right: 1px solid gray;">
                        <div class="table-responsive m-b-40">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th style="border-top:none !important;padding: 0.30rem;">Group List</th>
                                        <th style="border-top:none !important;padding: 0.30rem;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="group in participantGroupList" v-bind:key="group.id">
                                        <td>{{group.text}}</td>
                                        <td>
                                            <div class="table-data-feature">
                                                <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="edit" @click="editParticipantGroup(group)">
                                                    <i class="zmdi zmdi-edit"></i>
                                                </button>
                                                <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete" @click="deleteParticipantGroup(group)">
                                                    <i class="zmdi zmdi-delete"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col col-sm-6">
                        <h5>Create New Group</h5>
                        <hr>
                        <div class="form-group">
                            <label for="group-id" class=" form-control-label">Name</label>
                            <input type="text" id="group-id" v-model="groupName" name="group_name" class="form-control" autocomplete="off">
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-control" autocomplete="off" placeholder="Search" v-on:keydown="searchUser()" v-model="search_participant">
                            <select v-model="s_g_part" name="" id="" multiple class="form-control" v-on:change="searchSelect(s_g_part)">
                                <option v-for="userG in userGroupSearch" v-bind:key="userG.id" v-bind:value="userG.id">{{userG.name}}</option>
                            </select>
                        </div>
                        
                        <div class="table-responsive" style="height:200px; margin-bottom:30px;">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th style="border-top:none !important;padding: 0.30rem;">Participant List</th>
                                        <th style="border-top:none !important;padding: 0.30rem;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="part_selected in userDataSelected" v-bind:key="part_selected.id">
                                        <td>{{part_selected.name}}</td>
                                        <td>
                                            <div class="table-data-feature">
                                                <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete" @click="deleteParticipantFromGroup(part_selected)">
                                                    <i class="zmdi zmdi-delete"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button class="btn btn-sm btn-primary pull-right" style="margin:2px;" @click="saveParticipantGroup()">Save Group</button>
                        <button class="btn btn-sm btn-warning pull-right" style="margin:2px;" @click="clearSelectGroup()">Clear</button>
                    </div>
                </div>
			</div>	
		</div>
	</div>
</div>
<!-- end modal large -->
</template>

<script>
import Select2 from 'vue3-select2-component';
import UserAPI from '../../services/UserService'
import ParticipantGroupAPI from '../../services/MeetingParticipantGroupService'
import MeetingParticipantAPI from '../../services/MeetingParticipantService'
import MeetingGroupUserAPI from '../../services/MeetingGroupUserService'
import $ from 'jquery'

export default {
    name: 'Participant',
    components: {
        Select2,
    },
    data () {
        return {
            participantGroupList : [],
            groupName : '',
            s_g_part : null,
            searchParticipant       : '',
            tmpDisplayParticipants  : [],
            participants            : [],
            participantId         : '',
            userDataForSelect: [],
            search_participant : "",
            userGroupSearch: [],
            userDataSelected: [],
            userData : {},
            meeting_id : null,
        }
    },
    methods: {
        myChangeEvent(val){
            console.log(val)
        },
        mySelectEvent({id, participantGroup}){
            var self = this;
            var dataPart = {"meeting" : {"id" : this.meeting_id}};
            var is_user_exist = false;
            if(participantGroup == undefined){
                dataPart["user"] = { "id" : id};
                this.participants.forEach(function(pData){
                    if(pData.user.id == id){
                        is_user_exist = true;
                    }
                });
                if(!is_user_exist) {
                    MeetingParticipantAPI.createParticipant(self.meeting_id, dataPart)
                    .then(data => {
                        data.user = self.userData[id]
                        self.participants.push(data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            }
            else {
                participantGroup.forEach(function(g_user){
                    dataPart["user"] = { "id" : g_user.user.id };
                    self.participants.forEach(function(pData){
                        if(pData.user.id == g_user.user.id){
                            is_user_exist = true;
                        }
                    });
                     
                    if(!is_user_exist) {
                        MeetingParticipantAPI.createParticipant(self.meeting_id, dataPart)
                        .then(data => {
                            data.user = g_user.user;
                            self.participants.push(data);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }   
                });
            }
        },
        deleteParticipant(participant) {
            var self = this;
            MeetingParticipantAPI.deleteParticipant(this.meeting_id, participant.id)
            .then(data => {
                if ( data == true ) {
                    var participantIdx = self.participants.indexOf(participant);
                    self.participants.splice(participantIdx, 1);
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        searchParticipants() {
            if(this.searchParticipant != ""){
                let scope = this;
                scope.tmpDisplayParticipants = [];
                var str = scope.searchParticipant;
                this.userData.forEach(function(value, key){
                    var name = value.name.toLowerCase()
                    if(name.includes(str)){
                        scope.tmpDisplayParticipants.push(value)
                    }
                    if(key){
                        console.log('')
                    }
                })
            }
            else {
               this.tmpDisplayParticipants = [];
            }
        },
        selectParticipant() {
            var scope = this
            this.userData.forEach(function(value){
                if(scope.participant_ids == value.id){
                    scope.participants.push(value);
                }
            })
        },
        searchUser() {
            if(this.search_participant != ""){
                let scope = this;
                scope.userGroupSearch = [];
                var str = scope.search_participant.toLowerCase();

                var userIds = Object.keys(this.userData);
                userIds.forEach((key) => {
                    var name = this.userData[key].name.toLowerCase();
                    if(name.includes(str)){
                        scope.userGroupSearch.push(this.userData[key])
                    }
                });
            }
            else {
               this.userGroupSearch = [];
            }
        },
        searchSelect(value) {
            var self = this;
            var selected = false;
            
            this.userDataSelected.forEach(function(user){
                if(user.id == value[0]){
                    selected = true
                }
            });

            if(!selected) {
                self.userDataSelected.push(this.userData[value[0]]);
            }
            else {
                alert("User has been selected!");
            }
            //participantGroupList
        },
        groupSelect({id, text}) {
            console.log(id,text)
        },
        clearSelectGroup(){
            this.userDataSelected = [];
            this.userGroupSearch = [];
            this.search_participant = '';
            this.groupName = '';
            $('#participant-group').modal("show");
        },
        saveParticipantGroup() {
            var data = {};
            data['name'] = this.groupName;
            ParticipantGroupAPI.createParticipantGroup(data)
            .then(response => {
                var dataTmp = {};
                dataTmp['id'] = response.name;
                dataTmp['text'] = response.name;
                dataTmp['participantGroup'] = [];
                dataTmp['group_id'] = response.id;
                this.userDataSelected.forEach(function(user){
                    var userGroup = {};
                    userGroup['user'] = {"id" : user.id};
                    userGroup['pGroup'] = { "id" : response.id};
                    MeetingGroupUserAPI.createGroupUser(userGroup)
                    .then( userGroupResponse => {
                        userGroupResponse.user = user;
                        dataTmp['participantGroup'].push(userGroupResponse);
                    })
                    .catch( uGErr => {
                        console.log(uGErr);
                    });
                    
                });
                this.userDataForSelect.push(dataTmp);
                this.participantGroupList.push(dataTmp);
            })
            .catch(err => {
                console.log(err);
            });
            //$('#participant-group').modal("hide");
        },
        editParticipantGroup(group) {
            var self = this;
            self.userDataSelected = [];
            this.userGroupSearch = [];
            this.groupName = group.text;
            group.participantGroup.forEach(function(pG){
                self.userDataSelected.push(pG.user);
            })
        },
        deleteParticipantGroup(group) {
            var self = this;
            ParticipantGroupAPI.deleteParticipantGroup(group.group_id)
            .then ( data => {
                if ( data == true ) {
                    var indexOfParticipant = this.participantGroupList.indexOf(group);
                    self.participantGroupList.splice(indexOfParticipant, 1);
                    self.userDataSelected = [];
                    self.userGroupSearch = [];
                    self.search_participant = "";
                    self.groupName = "";
                }
            })
            .catch( err => {
                console.log(err);
            });
        },
        deleteParticipantFromGroup(participantObj) {
            var self = this;
            var Par_group;
            this.participantGroupList.forEach(function(group){
                if(group.text == self.groupName){
                    Par_group = group
                }
            });
        
            if(Par_group != undefined) {
                Par_group.participantGroup.forEach(function(pG){
                    if(pG.user.id == participantObj.id){
                        MeetingGroupUserAPI.deleteGroupUser(pG.id)
                        .then( response => {
                            console.log(response);
                            var indexOfParticipantGroup = Par_group.participantGroup.indexOf(pG);
                            Par_group.participantGroup.splice(indexOfParticipantGroup, 1); 
                        })
                        .catch( err => {
                            console.log(err);
                        });

                    }
                })
            }
            var indexOfParticipant = this.userDataSelected.indexOf(participantObj);
            this.userDataSelected.splice(indexOfParticipant, 1);
        },
        initialUserData(){
            var self = this;
            UserAPI.user_list()
            .then(data => {
                
                data.forEach(function(user){
                    self.userData[user.id] = user;
                    self.userDataForSelect.push({'id': user.id, 'text': user.name});
                });
            })
            .catch(err => {
                console.log(err);
            });
        },
        initialGroupUser(){
            var self = this;
            ParticipantGroupAPI.getAllParticipantGroups()
            .then(data => {
                data.forEach(function(group){
                    self.userDataForSelect.push({'id' : group.name, 'text' : group.name, 'participantGroup' : group.participants, 'group_id' : group.id});
                    var glist = {
                        'id': group.name,
                        'text' : group.name,
                        'participantGroup' : group.participants,
                        'group_id' : group.id
                    };
                    self.participantGroupList.push(glist);
                });
            })
            .catch(err => {
                console.log(err);
            });
        },
        initialParticipants() {
            var self = this;
            MeetingParticipantAPI.getAllParticipants(this.meeting_id)
            .then(data => {
                if ( data != []) {
                    self.participants = data;
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        var urlPath = window.location.pathname.split('/')
        this.meeting_id = urlPath[urlPath.length - 2];
        this.initialUserData();
        this.initialGroupUser();
        this.initialParticipants();
    }
}
</script>