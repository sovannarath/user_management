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
            
        }
    },
    methods: {
        exportReport() {
            alert('This feature pending for development.')
        }
    },
    mounted() {
        
    }
}
</script>