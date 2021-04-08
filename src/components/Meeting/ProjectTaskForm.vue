<template>
<div class="row">
    <div class="col offset-md-1 col-md-10">
    <div class="card">
        <div class="card-header">
            <strong>Meeting Report</strong>
            <button type="submit" class="btn btn-primary btn-sm pull-right">
                <i class="fa fa-dot-circle-o"></i> Submit
            </button>
        </div>
        <div class="card-body card-block">
            <div class="row">
                <div class="col col-md-6">

                    <div class="form-group">
                        <label for="topic" class=" form-control-label">Task Name</label>
                        <input type="topic" id="topic" v-model="topic" name="topic" placeholder="Enter meeting topic" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="date" class=" form-control-label">Start Date</label>
                        <input type="date" id="date" v-model="date" name="date" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="next_topic" class=" form-control-label">Completed Percentage</label>
                        <input type="text" id="next_topic" v-model="next_topic" name="next_topic" placeholder="" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="participant" class=" form-control-label">PIC</label>
                        <input v-on:keyup="retrieveParticipant()" type="text" id="searchParticipant" v-model="searchParticipant" name="searchParticipant" placeholder="Search PIC" class="form-control">
                        <select name="participant_ids" v-model="participant_ids" id="participant_ids" multiple="" class="form-control">
                            <option v-for="tmpDisplayParticipant in tmpDisplayParticipants" v-bind:key="tmpDisplayParticipant.id" v-bind:value="tmpDisplayParticipant.id">{{tmpDisplayParticipant.name}}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="objective" class=" form-control-label">Description</label>
                        <textarea v-model="objective" name="objective" id="objective" rows="10" placeholder="Enter objective" class="form-control"></textarea>
                    </div>

                </div>
                <div class="col col-md-6">

                    <div class="form-group">
                        <label for="project_id" class=" form-control-label">Project</label>
                        <select v-model="project_id" name="project_id" id="project_id" class="form-control">
                            <option disabled selected >-- Please select project --</option>
                            <option v-for="project in projects" v-bind:key="project.id" v-bind:value="project.id">{{project.name}}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="date" class=" form-control-label">End Date</label>
                        <input type="date" id="date" v-model="date" name="date" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="meeting_type_id" class=" form-control-label">Task Status</label>
                        <select name="meeting_type_id" v-model="meeting_type_id" id="meeting_type_id" class="form-control">
                            <option disabled selected value="0">Please select status</option>
                            <option>Finished</option>
                            <option>On Hold</option>
                            <option>Next Schedule</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="participant" class=" form-control-label">Department</label>
                        <input v-on:keyup="retrieveParticipant()" type="text" id="searchParticipant" v-model="searchParticipant" name="searchParticipant" placeholder="Search Department" class="form-control">
                        <select name="participant_ids" v-model="participant_ids" id="participant_ids" multiple="" class="form-control">
                            <option v-for="tmpDisplayParticipant in tmpDisplayParticipants" v-bind:key="tmpDisplayParticipant.id" v-bind:value="tmpDisplayParticipant.id">{{tmpDisplayParticipant.name}}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="objective" class=" form-control-label">Comment</label>
                        <textarea v-model="objective" name="objective" id="objective" rows="10" placeholder="Enter Comment" class="form-control"></textarea>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </div>
</div>

</template>

<style scoped>

.dialog-container{
    background-color:grey;
    padding: 25px;
}

.participant-dialog{
    background-color: white;
    padding: 20px;
    margin:5px;
}

.participant-dialog-name{
    font-weight: bold;
}

.participant-dialog-action {
    font-size: 12px;
}

.question-item {
    border-left: solid 5px red;
}

.answer-item {
    border-left: solid 5px blue;
}

.comment-item {
    border-left: solid 5px green;
}

</style>

<script>

import UserAPI from '../../services/UserService'
import ProjectAPI from '../../services/ProjectService'
import MeetingTypeAPI from '../../services/MeetingTypeService'
import MeetingActionAPI from '../../services/MeetingActionService'
import MeetingActionTypeAPI from '../../services/MeetingActionTypeService'

export default {
    name: 'ProjectTaskForm',
    components: {
        
    },
    data () {
        return {
            id                      : null,
            topic                   : null,
            meeting_type_id         : null,
            project_id              : null,
            issue_number            : null,
            location                : null,
            date                    : null,
            start_time              : null,
            end_time                : null,
            status                  : null,
            next_date               : null,
            next_topic              : null,
            next_comment            : null,
            objective               : null,
            problem                 : null,
            discussion              : null,
            conclusion              : null,
            comment                 : null,
            action_id               : null,
            description             : null,
            related_action_id       : null,
            meetingTypes            : [],
            meetingActions          : [],
            projects                : [],
            participants            : [],
            searchParticipant       : null, 
            displayParticipants     : [],
            tmpDisplayParticipants  : [],
            participant_ids         : [],
            speakers                : null,
            tmpSpeakers              : [],
            searchSpeaker           : null,
            actionTypes             : [],
            relatedActions          : null,
        }
    },
    methods: {
        saveMeeting() {
            var data                        = {};
            data['name']                    = this.topic;
            data['project_id']              = this.project_id;
            data['meeting_type']            = {"id": this.meeting_type_id};
            data['issue_number']            = this.issue_number;
            data['date']                    = this.date;
            data['start_time']              = this.start_time;
            data['end_time']                = this.end_time;
            data['location']                = this.location;
            data['objective']               = this.objective;
            data['problem']                 = this.problem;
            data['disscussion']             = this.disccussion;
            data['conclusion']              = this.conclusion;
            data['comment']                 = this.comment;
            data['status']                  = this.status;
            data['next_schedule']           = this.next_date;
            data['next_schedule_topic']     = this.next_schedule_topic;
            data['next_schedule_comment']   = this.next_schedule_comment;
            console.log(data);
        },
        retrieveParticipant(){
            if(this.searchParticipant != ''){
                var data = {};
                data['search'] = this.searchParticipant;
                UserAPI.search(data)
                .then(response => {
                    this.tmpDisplayParticipants = response;
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else{
                this.tmpDisplayParticipants = [];
            }
        },
        retrieveSpeaker(){
             if(this.searchSpeaker != ''){
                var data = {};
                data['search'] = this.searchSpeaker;
                UserAPI.search(data)
                .then(response => {
                    this.tmpSpeakers = response;
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else{
                this.searchSpeaker = [];
            }
        },
        retrieveUser(str, tag){
            console.log(str);
            var data = {};
            data['search'] = str;
            UserAPI.search(data)
            .then(response => {
                if(tag == 'participant') {
                    this.tmpDisplayParticipants = response;
                }
                else if(tag == 'speaker'){
                    this.tmpSpeakers = response;
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        retrieveProject(){
            ProjectAPI.allProjects()
            .then(response => {
                this.projects = response
            })
            .catch(err => {
                console.log(err);
            });
        },
        retrieveMettingType(){
            MeetingTypeAPI.allMeetingTypes()
            .then(response => {
                this.meetingTypes = response
            })
            .catch(err => {
                console.log(err);
            });
        },
        retrieveActionType(){
            MeetingActionTypeAPI.allMeetingActionTypes()
            .then(response => {
                this.actionTypes = response
            })
            .catch(err => {
                console.log(err);
            });
        },
        relatedAction(){
            MeetingActionAPI.allMeetingActions(1)
            .then(response => {
                this.meetingActions = response
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.retrieveProject();
        this.retrieveMettingType();
        this.retrieveActionType();
        this.relatedAction();
    }
}
</script>