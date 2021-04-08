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
                        </div>
                    </div>
        </div>
    </div>
    </div>
</div>
<v-jstree :data="dataList" show-checkbox multiple allow-batch whole-row @item-click="itemClick"></v-jstree>
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
import VJstree from 'vue-jstree'

export default {
    name: 'DiscussionLog',
    components: {
        VJstree
    },
    data () {
        return {
            dataList                : [
                                {
                    "text": "Same but with checkboxes",
                    "children": [
                        {
                            "text": "initially selected",
                            "selected": true
                        },
                        {
                            "text": "custom icon",
                            "icon": "fa fa-warning icon-state-danger"
                        },
                        {
                            "text": "initially open",
                            "icon": "fa fa-folder icon-state-default",
                            "opened": true,
                            "children": [
                                {
                                    "text": "Another node"
                                }             
                            ]
                        },
                        {
                            "text": "custom icon",
                            "icon": "fa fa-warning icon-state-warning"
                        },
                        {
                            "text": "disabled node",
                            "icon": "fa fa-check icon-state-success",
                            "disabled": true
                        }
                    ]
                },

                {
                    "text": "Same but with checkboxes",
                    "opened": true,
                    "children": [
                        {
                            "text": "initially selected",
                            "selected": true
                        },
                        {
                            "text": "custom icon",
                            "icon": "fa fa-warning icon-state-danger"
                        },
                        {
                            "text": "initially open",
                            "icon": "fa fa-folder icon-state-default",
                            "opened": true,
                            "children": [
                                {
                                    "text": "Another node"
                                }
                            ]
                        },
                        {
                            "text": "custom icon",
                            "icon": "fa fa-warning icon-state-warning"
                        },
                        {
                            "text": "disabled node",
                            "icon": "fa fa-check icon-state-success",
                            "disabled": true
                        }
                    ]
                },

                {
                    "text": "And wholerow selection"
                }
            ],
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
        initialDataList() {
            this.dataList = [
                {
                    "text": "Same but with checkboxes",
                    "children": [
                        {
                            "text": "initially selected",
                            "selected": true
                        },
                        {
                            "text": "custom icon",
                            "icon": "fa fa-warning icon-state-danger"
                        },
                        {
                            "text": "initially open",
                            "icon": "fa fa-folder icon-state-default",
                            "opened": true,
                            "children": [
                                {
                                    "text": "Another node"
                                }             
                            ]
                        },
                        {
                            "text": "custom icon",
                            "icon": "fa fa-warning icon-state-warning"
                        },
                        {
                            "text": "disabled node",
                            "icon": "fa fa-check icon-state-success",
                            "disabled": true
                        }
                    ]
                },

                {
                    "text": "Same but with checkboxes",
                    "opened": true,
                    "children": [
                        {
                            "text": "initially selected",
                            "selected": true
                        },
                        {
                            "text": "custom icon",
                            "icon": "fa fa-warning icon-state-danger"
                        },
                        {
                            "text": "initially open",
                            "icon": "fa fa-folder icon-state-default",
                            "opened": true,
                            "children": [
                                {
                                    "text": "Another node"
                                }
                            ]
                        },
                        {
                            "text": "custom icon",
                            "icon": "fa fa-warning icon-state-warning"
                        },
                        {
                            "text": "disabled node",
                            "icon": "fa fa-check icon-state-success",
                            "disabled": true
                        }
                    ]
                },

                {
                    "text": "And wholerow selection"
                }
            ]  
        },
        itemClick (node) {
          console.log(node.model.text + ' clicked !')
        },
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
        //this.retrieveProject();
        //this.retrieveMettingType();
        //this.retrieveActionType();
        //this.relatedAction();
        this.initialDataList()
    }
}
</script>