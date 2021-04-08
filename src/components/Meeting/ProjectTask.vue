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
                            <div class="row form-group">
                    <div class="col col-md-6">
                        <label for="participant" class=" form-control-label">Search</label>
                        <input v-on:keyup="retrieveParticipant()" type="text" id="searchParticipant" v-model="searchParticipant" name="searchParticipant" placeholder="Search participant" class="form-control">
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="" class=" form-control-label">&nbsp;</label><br>
                        <!--button type="submit" class="btn btn-primary btn-sm">
                            <i class="fa fa-plus"></i> Add
                        </button> &nbsp;-->
                        <button type="submit" class="btn btn-primary btn-sm">
                            <i class="fa fa-list"></i> Add Task
                        </button>
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="displayParticipant in displayParticipants" v-bind:key="displayParticipant.id">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
        <div class="card-footer">
            <button type="submit" class="btn btn-primary btn-sm pull-right" v-on:click="saveMeeting()">
                <i class="fa fa-dot-circle-o"></i> Submit
            </button>
            <!--button type="reset" class="btn btn-danger btn-sm">
                <i class="fa fa-ban"></i> Reset
            </button-->
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
    name: 'ProjectTask',
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