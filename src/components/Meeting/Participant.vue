<template>
<br>
            <div class="row form-group">
                    <div class="col col-md-6">
                        <label for="participant" class=" form-control-label">Search</label>
                        <input v-on:keyup="searchParticipants()" type="text" id="searchParticipant" v-model="searchParticipant" name="searchParticipant" placeholder="Search participant" class="form-control">
                        <select v-on:change="selectParticipant()" name="participant_ids" v-model="participant_ids" id="participant_ids" multiple="" class="form-control">
                            <option v-for="tmpDisplayParticipant in tmpDisplayParticipants" v-bind:key="tmpDisplayParticipant.id" v-bind:value="tmpDisplayParticipant.id">{{tmpDisplayParticipant.name}}</option>
                        </select>
                    </div>
                    <div class="col-12 col-md-6">
                        <!--label for="" class=" form-control-label">&nbsp;</label><br>
                        <button type="submit" class="btn btn-primary btn-sm">
                            <i class="fa fa-list"></i> View List
                        </button-->
                    </div>
                </div>

                <div class="table-responsive table--no-card m-b-40">
                    <table class="table table-borderless table-striped table-earning">
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
</template>

<script>

export default {
    name: 'Participant',
    components: {
        
    },
    data () {
        return {
            searchParticipant       : '',
            tmpDisplayParticipants  : [],
            participants            : [],
            participant_ids         : '',
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
 
    }
}
</script>