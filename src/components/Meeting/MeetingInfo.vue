<template>
<br>
<div class="row">
    <div class="col col-sm-12">
        <button class="btn btn-sm btn-primary pull-right" v-on:click="updateMeetingInfo()">Update Info</button>
    </div>
</div>

                <div class="row">
                    <div class="col col-md-6">

                        <div class="form-group">
                            <label for="topic" class=" form-control-label">Meeting Topic</label>
                            <input type="topic" id="topic" v-model="topic" name="topic" placeholder="Enter meeting topic" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="project_id" class=" form-control-label">Project</label>
                            <select v-model="project_id" name="project_id" id="project_id" class="form-control">
                                <option disabled selected >-- Please select project --</option>
                                <option v-for="project in projects" v-bind:key="project.id" v-bind:value="project.id">{{project.name}}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="location" class=" form-control-label">Location</label>
                            <input type="text" id="location" v-model="location" name="location" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="date" class=" form-control-label">Date</label>
                            <input type="date" id="date" v-model="date" name="date" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="comment" class=" form-control-label">Suggestion</label>
                            <textarea v-model="comment" name="comment" id="comment" rows="10" placeholder="Enter suggestion" class="form-control"></textarea>
                        </div>

                    </div>
                    <div class="col col-md-6">

                        <div class="form-group">
                            <label for="meeting_type_id" class=" form-control-label">Meeting Type</label>
                            <select name="meeting_type_id" v-model="meeting_type_id" id="meeting_type_id" class="form-control">
                                <option disabled selected value="0">Please select meeting type</option>
                                <option v-for="meetingType in meetingTypes" v-bind:key="meetingType.id" v-bind:value="meetingType.id">{{meetingType.name}}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="issue_number" class=" form-control-label">Issue Number</label>
                            <input type="text" id="issue_number" v-model="issue_number" name="issue_number" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="meeting_status" class=" form-control-label">Meeting Status</label>
                            <select name="meeting_status" v-model="meeting_status" id="meeting_status" class="form-control">
                                <option disabled selected value="0">Please select status</option>
                                <option v-bind:value="'FINISHED'">Finished</option>
                                <option v-bind:value="'ON_HOLD'">On Hold</option>
                                <option v-bind:value="'NEXT_SCHEDULE'">Next Schedule</option>
                            </select>
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
                        
                        <div class="form-group">
                            <label for="summary" class=" form-control-label">Summary</label>
                            <textarea v-model="summary" name="summary" id="summary" rows="10" placeholder="Enter summary" class="form-control"></textarea>
                        </div>

                    </div>
                </div>


</template>

<script>
import MeetingTypeAPI from '../../services/MeetingTypeService'
import ProjectAPI from '../../services/ProjectService'
import MeetingAPI from '../../services/MeetingService'

export default {
    name: 'MeetingInfo',
    components: {
        
    },
    data () {
        return {
            meeting_id      : "",
            meetingTypes    : [],
            projects        : [],
            topic           : '',
            project_id      : '',
            location        : '',
            date            : '',
            start_time      : '',
            end_time        : '',
            objective       : '',
            meeting_type_id : '',
            issue_number    : '',
            meeting_status  : '',
            next_date       : '',
            next_topic      : '',
            other           : '',
            comment         : '',
            summary         : '',
            value : ''
        }
    },
    methods: {
        loadMeetingInfo() {
            var urlPath = window.location.pathname.split('/');
            this.meeting_id = urlPath[urlPath.length - 2];
            MeetingAPI.getMeeting(this.meeting_id)
            .then(data => {
                this.topic = data.name;
                this.meeting_type_id = data.type.id;
                this.project_id = data.project.id;
                this.issue_number = data.issue_number;
                this.location = data.location;
                this.meeting_status = data.status;
                this.date = data.date;
                this.summary = data.summary;
                this.start_time = data.start_time;
                this.end_time = data.end_time;
                this.comment = data.comment;
            })
            .catch(err => {
                console.log(err);
            });
        },
        updateMeetingInfo() {
            var data = {};
            //data['id'] = this.meeting_id;
            data['name'] = this.topic;
            data['type'] = {"id" : this.meeting_type_id}
            data['project'] = {"id" : this.project_id}
            data["issue_number"] = this.issue_number;
            data['location'] = this.location;
            data['status'] = this.meeting_status;
            data['date'] = this.date;
            data['start_time'] = this.start_time;
            data['end_time'] = this.end_time;
            data['summary'] = this.summary;
            data['comment'] = this.comment;
            
            MeetingAPI.updateMeeting(data, this.meeting_id)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
        },
        initMeetingTypes() {
            MeetingTypeAPI.allMeetingTypes()
            .then(data => {
                this.meetingTypes = data;
            })
            .catch(err => {
                console.log(err);
            });
        },
        initProjects() {
            ProjectAPI.allProjects()
            .then(data => {
                this.projects = data
            })
            .catch(err => {
               console.log(err); 
            });
        }
    },
    mounted() {
        this.loadMeetingInfo();
        this.initMeetingTypes();
        this.initProjects();
    }
}
</script>