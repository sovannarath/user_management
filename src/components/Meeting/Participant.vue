<template>
<br>
            <div class="row form-group">
                    <div class="col col-md-6">
                        <label for="participant" class=" form-control-label">Search</label>
                        <Select2 v-model="participantId" :options="userDataForSelect" :settings="{ settingOption: value, settingOption: value }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="" class=" form-control-label">&nbsp;</label><br>
                        <button type="submit" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#participant-group"> 
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
                    <div class="col col-sm-6">
                        <div class="form-group">
                            <label for="group-id" class=" form-control-label">Group Name</label>
                            <input type="text" id="group-id" name="group_name" class="form-control">
                        </div>
                    </div>
                </div>
                <p>Select Participant</p>
                <hr>
                <div class="row">
                    <div class="col col-md-5">
                        <div class="form-group">
                            <Select2 v-model="participantId" :options="userDataForSelect" :settings="{ settingOption: value, settingOption: value }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
                        </div>
                    </div>
                    <div class="col col-md-2 text-center">
                        <div class="row">
                            <div class="col col-sm-12">
                                <button class="btn btn-sm btn-primary">
                                    <i class="fa fa-reply"></i>
                                </button>
                            </div>&nbsp;
                            <div class="col col-sm-12">
                                <button class="btn btn-sm btn-primary">
                                    <i class="fa fa-share"></i>
                                </button>
                            </div>   
                        </div>
                    </div>
                    <div class="col col-md-5">
                        <div class="form-group">
                            <select id="group-participant" name="group-participant" multiple="" class="form-control">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-lg-12">
                        <button class="btn btn-sm btn-primary pull-right">Save</button>
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
export default {
    name: 'Participant',
    components: {
        Select2,
    },
    data () {
        return {
            searchParticipant       : '',
            tmpDisplayParticipants  : [],
            participants            : [],
            participantId         : '',
            userDataForSelect: [],
            userDataForSelectParticipant : [],
            userDataSelected: [],
            userData                : [
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
                    'email': 'blabla@email.com',
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
        mySelectEvent({id, text}){
            var user = {};
            this.userData.forEach(function(value){
                if(value.id == id){
                    user = value
                }
            });
            console.log(user);
            this.participants.push(user);
            console.log({id, text});
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
        }
    },
    mounted() {
        var self = this;
        this.userData.forEach(function(value){
            self.userDataForSelect.push({'id':value.id, 'text': value.name});
        });
        this.userDataForSelectParticipant = this.userData;
    }
}
</script>