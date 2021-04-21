<template>
    <div class="card">

        <div class="card-header">
            <h4>Meeting Report</h4>
        </div>

		<div class="card-body">

            

			<div class="default-tab">

				<nav>
					<div class="nav nav-tabs" id="nav-tab" role="tablist">
						<a class="nav-item nav-link active" id="nav-meeting-info-tab" data-toggle="tab" href="#nav-meeting-info" role="tab" aria-controls="nav-meeting-info" aria-selected="true">General Information</a>
						<a class="nav-item nav-link" id="nav-participant-tab" data-toggle="tab" href="#nav-participant" role="tab" aria-controls="nav-participant" aria-selected="false">Participant</a>
                        <a class="nav-item nav-link" id="nav-detail-tab" data-toggle="tab" href="#nav-detail" role="tab" aria-controls="nav-detail" aria-selected="false">Detail</a>
                        <!--a class="nav-item nav-link" id="nav-discussion-log-tab" data-toggle="tab" href="#nav-discussion-log" role="tab" aria-controls="nav-discussion-log" aria-selected="false">Discussion Log</a-->
                    </div>
				</nav>

				<div class="tab-content pl-3 pt-2" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-meeting-info" role="tabpanel" aria-labelledby="nav-meeting-info-tab">
                        <MeetingInfo></MeetingInfo>
                    </div>
                    <div class="tab-pane fade" id="nav-participant" role="tabpanel" aria-labelledby="nav-participant-tab">
                        <Participant></Participant>
                    </div>
                    <div class="tab-pane fade" id="nav-detail" role="tabpanel" aria-labelledby="nav-detail-tab">
                        <ProjectTask></ProjectTask>
                    </div>
                    <!--div class="tab-pane fade" id="nav-discussion-log" role="tabpanel" aria-labelledby="nav-discussion-tab">
                       <DiscussionLog/>
                    </div-->
                </div>

			</div>

		</div>

	</div>
</template>

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

    },
    mounted() {
        
    }
}
</script>