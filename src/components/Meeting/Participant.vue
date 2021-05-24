<template>
<br>
            <div class="row form-group">
                    <div class="col col-md-6">
                        <label for="participant" class=" form-control-label">Search</label>
                        <Select2 v-model="participantId" :options="userDataForSelect" :settings="{ settingOption: value, settingOption: value }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
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
                                <td>{{participant.name}}</td>
                                <td>{{participant.occupy}}</td>
                                <td>{{participant.organization}}</td>
                                <td>{{participant.email}}</td>
                                <td>{{participant.phone}}</td>
                                <td>
                                    <div class="table-data-feature">
                                        <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete">
                                            <i class="zmdi zmdi-edit"></i>
                                        </button>
                                        <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete">
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

                        <div class="form-group">
                            <select id="group-participant" name="group-participant" multiple="" class="form-control" size="10">
                                <option v-for="part_selected in userDataSelected" v-bind:key="part_selected.id" v-bind:value="part_selected.id">{{part_selected.name}}</option>
                            </select>
                        </div>
                        <button class="btn btn-sm btn-primary pull-right" @click="saveParticipantGroup()">Save Group</button>
                    </div>
                </div>
                <!--p>Select Participant</p>
                <hr>
                <div class="row">
                    <div class="col col-md-5">
                        
                    </div>
                    <div class="col col-md-2 text-center">
                        <div class="row">
                            <div class="col col-sm-12">
                                <button class="btn btn-sm btn-light">
                                    <i class="fa fa-reply"></i>
                                </button>
                            </div>&nbsp;
                            <div class="col col-sm-12">
                                <button class="btn btn-sm btn-light">
                                    <i class="fa fa-share"></i>
                                </button>
                            </div>   
                        </div>
                    </div>
                    <div class="col col-md-5">
                       
                    </div>
                </div-->
                <!--div class="row">
                    <div class="col col-lg-12">
                        <button class="btn btn-sm btn-primary pull-right" @click="saveParticipantGroup()">Save</button>
                    </div>
                </div-->
			</div>	
		</div>
	</div>
</div>
<!-- end modal large -->
</template>

<script>
import Select2 from 'vue3-select2-component';
import $ from 'jquery'
//import GroupParticipant from 'vue3-select2-component';
export default {
    name: 'Participant',
    components: {
        Select2,
    },
    data () {
        return {
            participantGroupList : [
                {
                    'id': "My Group Secretary",
                    'text' : "My Group Secretary",
                    'participantGroup' : [
                        {id: 2, name: "Duy Panharith", occupy: "Director", organization: "Secretary", email: "blabla@email.com", 'phone' : '+855'},
                        {id: 4, name: "Heng Sophat", occupy: "Coordinator", organization: "Secretary", email: "blabla@email.com", 'phone' : '+855'},
                        {id: 1, name: "Thorn Sovannarath", occupy: "Developer", organization: "Secretary", email: "blabla@email.com", 'phone' : '+855'},
                        {id: 5, name: "Heng Siyouer", occupy: "Admin", organization: "Secretary", email: "blabla@email.com",'phone' : '+855'},
                        {id: 8, name: "Say Sopheak", occupy: "Secreterist", organization: "Secretary", email: "blabla@email.com", 'phone' : '+855'},
                        {id: 9, name: "Morn Sopheaktra", occupy: "Secreterist", organization: "Secretary", email: "blabla@email.com", 'phone' : '+855'},
                        {id: 10, name: "Top Sophea", occupy: "Secreterist", organization: "Secretary", email: "blabla@email.com",'phone' : '+855'},
                        {id: 11, name: "Meng Sokeang", occupy: "Secreterist", organization: "Secretary", email: "blabla@emaiselectl.com",'phone' : '+855'},
                    ]
                }
            ],
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
            userData : [
                {
                    'id': 1,
                    'name' : 'Thorn Sovannarath',
                    'occupy' : 'Developer',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 2,
                    'name' : 'Duy Panharith',
                    'occupy' : 'Director',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 3,
                    'name' : 'Kim Chong',
                    'occupy' : 'Manager',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 4,
                    'name' : 'Heng Sophat',
                    'occupy' : 'Coordinator',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 5,
                    'name': 'Heng Siyouer',
                    'occupy' : 'Admin',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 6,
                    'name' : 'Huy Lyly',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 7,
                    'name' : 'Ly Chenglim',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 8,
                    'name' : 'Say Sopheak',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 9,
                    'name': 'Morn Sopheaktra',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id' : 10,
                    'name' : 'Top Sophea',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 11,
                    'name': 'Meng Sokeang',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@emaiselectl.com',
                    'phone' : '+855'
                }
            ]
        }
    },
    methods: {
        myChangeEvent(val){
            console.log(val)
            console.log("Changed!");
        },
        mySelectEvent({id, text, participantGroup}){
            var self = this;
            console.log('alsdkjf;la',text,'lakjsdf;lakjsd');
            if(participantGroup == undefined){
                this.userData.forEach(function(user){
                    if(user.id == id){
                        self.participants.push(user);
                    }
                });
            }
            else {
                participantGroup.forEach(function(g_user){
                    self.participants.push(g_user);
                });
            }
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
                this.userData.forEach(function(value, key){
                    var name = value.name.toLowerCase();
                    if(name.includes(str)){
                        scope.userGroupSearch.push(value)
                    }
                    if(key){
                        console.log('')
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
                this.userData.forEach(function(user){
                    if(value[0] == user.id) {
                        self.userDataSelected.push(user)
                    }
                });
            }
            else {
                alert("User has been selected!");
            }
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
            data['id'] = this.groupName;
            data['text'] = this.groupName;
            data['participantGroup'] = [];
            this.userDataSelected.forEach(function(user){
                data['participantGroup'].push(user);
            });
            this.userDataForSelect.push(data);
            this.participantGroupList.push(data);
            //$('#participant-group').modal("hide");
        },
        editParticipantGroup(group) {
            this.groupName = group.text;
            this.userDataSelected = group.participantGroup;
        },
        deleteParticipantGroup(group) {
            console.log(group.id);
        }
    },
    mounted() {
        var self = this;
        this.userData.forEach(function(value){
            self.userDataForSelect.push({'id':value.id, 'text': value.name});
        });
        this.participantGroupList.forEach(function(group){
            self.userDataForSelect.push(group);
        });
    }
}
</script>