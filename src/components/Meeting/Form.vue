<template>
    <div class="card">

        <div class="card-header">
            <div class="row">
                <div class="col col-sm-6">
                    <h4>Meeting Report</h4>
                </div>
                <div class="col col-sm-6">
                    <button v-on:click="exportReport()" class="btn btn-sm btn-warning pull-right">
                        Export Meeting
                    </button>
                </div>
            </div>
        </div>

		<div class="card-body">

            

			<div class="default-tab">

				<nav>
					<div class="nav nav-tabs" id="nav-tab" role="tablist">
						<a class="nav-item nav-link active" id="nav-meeting-info-tab" data-toggle="tab" href="#nav-meeting-info" role="tab" aria-controls="nav-meeting-info" aria-selected="true">General Information</a>
						<a class="nav-item nav-link" id="nav-detail-tab" data-toggle="tab" href="#nav-detail" role="tab" aria-controls="nav-detail" aria-selected="false">Meeting Agenda</a>
                        <a class="nav-item nav-link" id="nav-participant-tab" data-toggle="tab" href="#nav-participant" role="tab" aria-controls="nav-participant" aria-selected="false">Participant</a>
                    </div>
				</nav>

				<div class="tab-content pl-3 pt-2" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-meeting-info" role="tabpanel" aria-labelledby="nav-meeting-info-tab">
                        <MeetingInfo></MeetingInfo>
                    </div>
                    <div class="tab-pane fade" id="nav-detail" role="tabpanel" aria-labelledby="nav-detail-tab">
                        <ProjectTask></ProjectTask>
                    </div>
                    <div class="tab-pane fade" id="nav-participant" role="tabpanel" aria-labelledby="nav-participant-tab">
                        <Participant></Participant>
                    </div>
                </div>

			</div>

		</div>

	</div>

</template>

<style>
.card {
    margin-bottom: 5px !important;
}
</style>

<script>
import MeetingInfo from '../../components/Meeting/MeetingInfo'
import Participant from '../../components/Meeting/Participant'
import ProjectTask from '../../components/Meeting/ProjectTask'
//import DiscussionLog from '../../components/Meeting/DiscussionLogs'

export default {
    name: 'Form',
    components: {
        MeetingInfo,
        Participant,
        ProjectTask,
        //DiscussionLog
    },
    data () {
     
       return {
            userDataForSelectParticipant: [],
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
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                }
            ]
        }
    },
    methods: {
        exportReport() {
            alert('This feature pending for development.')
        }
    },
    mounted() {
        var self = this;
        this.userData.forEach(function(value){
            self.userDataForSelectParticipant.push({'id':value.id, 'text': value.name});
        });
    }
}
</script>