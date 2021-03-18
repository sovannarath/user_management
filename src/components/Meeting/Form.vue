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
            <!--form action="" method="post" enctype="multipart/form-data" class="form-horizontal"-->

                <div class="row">
                    <div class="col col-md-6">

                        <div class="form-group">
                            <label for="topic" class=" form-control-label">Meeting Topic</label>
                            <input type="topic" id="topic" v-model="topic" name="topic" placeholder="Enter meeting topic" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="meeting_type_id" class=" form-control-label">Meeting Type</label>
                            <select name="meeting_type_id" v-model="meeting_type_id" id="meeting_type_id" class="form-control">
                                <option disabled selected value="0">Please select meeting type</option>
                                <option v-for="meetingType in meetingTypes" v-bind:key="meetingType.id" v-bind:value="meetingType.id">{{meetingType.name}}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="project_id" class=" form-control-label">Project</label>
                            <select v-model="project_id" name="project_id" id="project_id" class="form-control">
                                <option disabled selected >-- Please select project --</option>
                                <option v-for="project in projects" v-bind:key="project.id" v-bind:value="project.id">{{project.name}}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="issue_number" class=" form-control-label">Issue Number</label>
                            <input type="text" id="issue_number" v-model="issue_number" name="issue_number" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="location" class=" form-control-label">Location</label>
                            <input type="text" id="location" v-model="location" name="location" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="date" class=" form-control-label">Date</label>
                            <input type="date" id="date" v-model="date" name="date" class="form-control">
                        </div>

                        <div class="row">
                            <div class="col col-md-6">
                                <div class="form-group">
                                    <label for="start_time" class=" form-control-label">Start Time</label>
                                    <input type="time" id="start_time" v-model="start_time" name="start_time" class="form-control">
                                </div>
                            </div>
                            <div class="col col-md-6">
                                <div class="form-group">
                                    <label for="end_time" class=" form-control-label">End Time</label>
                                    <input type="time" id="end_time" v-model="end_time" name="end_time" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-12">
                                <label class=" form-control-label">Meeting Status</label>
                            </div>
                            <div class="col col-md-12">
                                <div class="form-check-inline form-check">
                                    <label for="inline-radio1" class="form-check-label ">
                                        <input type="radio" id="inline-radio1" v-model="status" name="status" value="FINISHED" class="form-check-input">Finished
                                    </label>&nbsp;&nbsp;
                                    <label for="inline-radio2" class="form-check-label ">
                                        <input type="radio" id="inline-radio2" v-model="status" name="status" value="ONHOLD" class="form-check-input">On Hold
                                    </label>&nbsp;&nbsp;
                                    <label for="inline-radio3" class="form-check-label ">
                                        <input type="radio" id="inline-radio3" v-model="status" name="status" value="NEXTSCHEDULE" class="form-check-input">Next Schedule
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="card-title">
                            <h5 class="title-2">Next Schedule</h5>
                        </div>
                        <hr>
                        
                        <div class="form-group">
                            <label for="next_date" class=" form-control-label">Next Date</label>
                            <input type="date" id="next_date" v-model="next_date" name="next_date" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="next_topic" class=" form-control-label">Next Topic</label>
                            <input type="text" id="next_topic" v-model="next_topic" name="next_topic" placeholder="Enter next topic" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="next_comment" class=" form-control-label">Next Comment</label>
                            <input type="text" id="next_comment" v-model="next_comment" name="next_comment" placeholder="Enter comment" class="form-control">
                        </div>

                    </div>
                    <div class="col col-md-6">
                        
                        <div class="form-group">
                            <label for="objective" class=" form-control-label">Objective</label>
                            <textarea v-model="objective" name="objective" id="objective" rows="5" placeholder="Enter objective" class="form-control"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="problem" class=" form-control-label">Problem</label>
                            <textarea v-model="problem" name="problem" id="problem" rows="5" placeholder="Enter problem" class="form-control"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="discussion" class=" form-control-label">Discussion</label>
                            <textarea v-model="discussion" name="discussion" id="discussion" rows="5" placeholder="Enter discussion" class="form-control"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="conclusion" class=" form-control-label">Conclusion</label>
                            <textarea v-model="conclusion" name="conclusion" id="conclusion" rows="5" placeholder="Enter conclusion" class="form-control"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="comment" class=" form-control-label">Comment</label>
                            <textarea v-model="comment" name="comment" id="comment" rows="5" placeholder="Enter commen" class="form-control"></textarea>
                        </div>

                    </div>
                </div>
                <br>

                <div class="card-title">
                    <h5 class="title-2">Meeting Participant</h5>
                </div>
                <hr>

                <div class="row form-group">
                    <div class="col col-md-6">
                        <label for="participant" class=" form-control-label">Search</label>
                        <input v-on:keyup="retrieveParticipant()" type="text" id="searchParticipant" v-model="searchParticipant" name="searchParticipant" placeholder="Search participant" class="form-control">
                        <select name="participant_ids" v-model="participant_ids" id="participant_ids" multiple="" class="form-control">
                            <option v-for="tmpDisplayParticipant in tmpDisplayParticipants" v-bind:key="tmpDisplayParticipant.id" v-bind:value="tmpDisplayParticipant.id">{{tmpDisplayParticipant.name}}</option>
                        </select>
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="" class=" form-control-label">&nbsp;</label><br>
                        <!--button type="submit" class="btn btn-primary btn-sm">
                            <i class="fa fa-plus"></i> Add
                        </button> &nbsp;-->
                        <button type="submit" class="btn btn-primary btn-sm">
                            <i class="fa fa-list"></i> View List
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


                <div class="card-title">
                    <h5 class="title-2">Meeting Actions</h5>
                </div>
                <hr>

                <div class="au-card au-card--no-shadow au-card--no-pad m-b-40 au-card--border">
                    <div class="au-card-title" style="background-image:url('images/bg-title-01.jpg');">
                        
                        <div class="bg-overlay"></div>
                            
                            <div class="row">
                                <div class="col col-md-6 col-xs-6">
                                    
                                    <div class="form-group">
                                        <label for="speaker" class=" form-control-label">Speaker</label>
                                        <input v-on:keyup="retrieveSpeaker()" v-model="searchSpeaker" type="text" id="searchSpeaker" name="searchSpeaker" placeholder="Search speaker" class="form-control">
                                        <select name="multiple-select" id="multiple-select" multiple="" class="form-control">
                                            <option v-for="tmpSpeaker in tmpSpeakers" v-bind:key="tmpSpeaker.id" v-bind:value="tmpSpeaker.id">{{tmpSpeaker.name}}</option>
                                        </select>
                                    </div>
                                                            
                                    <div class="form-group" style="margin-top:22px;">
                                        <label for="action_type_id" class=" form-control-label">Action Type</label>
                                        <select name="action_type_id" id="action_type_id" class="form-control">
                                            <option disabled selected value="0">Please select action type</option>
                                            <option v-for="actionType in actionTypes" v-bind:key="actionType.id" v-bind:value="actionType.id">{{actionType.name}}</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="col col-md-6 col-xs-6">

                                    <div class="form-group">
                                        <label for="comment" class=" form-control-label">Description</label>
                                        <textarea name="comment" id="comment" rows="6" placeholder="Enter commen" class="form-control"></textarea>
                                    </div>


                                    <div class="form-group">
                                        <label for="related_action_id" class=" form-control-label">Related Action</label>
                                        <select name="related_action_id" id="related_action_id" class="form-control">
                                            <option value="0">Please select action</option>
                                            <option v-for="meetingAction in meetingActions" v-bind:key="meetingAction.id" v-bind:value="meetingAction.id">{{meetingAction.description}}</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="col col-md-12">
                                    <button type="submit" class="btn btn-primary btn-sm pull-right">
                                        <i class="fa fa-plus"></i> Add Action
                                    </button>
                                </div>
                            </div>

                        </div>
                        
                        <div class="au-task js-list-load au-task--border">

                            <div class="au-task__title">
                                <!--p>Tasks for John Doe</p-->
                                <p>Meeting Dialog</p>
                            </div>

                            <div class="au-task-list js-scrollbar3">

                                <div class="au-message__item question-item">
                                    <div class="au-message__item-inner">
                                        <div class="au-message__item-text">
                                            <div class="avatar-wrap">
                                                <div class="avatar">
                                                    <img src="../../assets/images/icon/avatar-02.jpg" alt="John Smith">
                                                </div>
                                            </div>
                                            <div class="text">
                                                <h5 class="name">John Smith</h5>
                                                <p>Have sent a photo</p>
                                            </div>
                                        </div>
                                        <div class="au-message__item-time">
                                            <span>12 Min ago</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="au-message__item answer-item">
                                    <div class="au-message__item-inner">
                                        <div class="au-message__item-text">
                                            <div class="avatar-wrap">
                                                <div class="avatar">
                                                    <img src="../../assets/images/icon/avatar-03.jpg" alt="John Smith">
                                                </div>
                                            </div>
                                            <div class="text">
                                                <h5 class="name">John Smith</h5>
                                                <p>Have sent a photo</p>
                                            </div>
                                        </div>
                                        <div class="au-message__item-time">
                                            <span>12 Min ago</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="au-message__item comment-item">
                                    <div class="au-message__item-inner">
                                        <div class="au-message__item-text">
                                            <div class="avatar-wrap">
                                                <div class="avatar">
                                                    <img src="../../assets/images/icon/avatar-04.jpg" alt="John Smith">
                                                </div>
                                            </div>
                                            <div class="text">
                                                <h5 class="name">John Smith</h5>
                                                <p>Have sent a photo</p>
                                            </div>
                                        </div>
                                        <div class="au-message__item-time">
                                            <span>12 Min ago</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
      
                            <!--div class="au-task__footer">
                                <button class="au-btn au-btn-load js-load-btn">load more</button>
                            </div-->
                        </div>
                    </div>


                <!--/form--->
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
    name: 'Form',
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