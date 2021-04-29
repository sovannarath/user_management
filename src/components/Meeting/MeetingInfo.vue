<template>
<br>
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
                                <option>Finished</option>
                                <option>On Hold</option>
                                <option>Next Schedule</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="next_date" class=" form-control-label">Next Date</label>
                            <input type="date" id="next_date" v-model="next_date" name="next_date" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="next_topic" class=" form-control-label">Next Topic</label>
                            <input type="text" id="next_topic" v-model="next_topic" name="next_topic" placeholder="Enter next topic" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="summary" class=" form-control-label">Summary</label>
                            <textarea v-model="summary" name="summary" id="summary" rows="10" placeholder="Enter summary" class="form-control"></textarea>
                        </div>

                    </div>
                </div>


</template>

<script>

export default {
    name: 'MeetingInfo',
    components: {
        
    },
    data () {
        return {
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
            summary         : ''
        }
    },
    methods: {
        initMeetingTypes() {
            this.meetingTypes = [
                {
                    'id'    : 1,
                    'name'  : 'DAILY MEETING',
                },
                {
                    'id'    : 2,
                    'name'  : 'WEEKLY MEETING',
                },
                {
                    'id'    : 3,
                    'name'  : 'MONTHLY MEETING',
                },
                {
                    'id'    : 4,
                    'name'  : 'MINUTE MEETING',
                }
            ]
        },
        initProjects() {
            this.projects = [
                {
                    'id'    : 1,
                    'name'  : 'Z1 Data'
                },
                {
                    'id'    : 2,
                    'name'  : 'Z1 App'
                },
                {
                    'id'    : 3,
                    'name'  : 'Big Data'
                },
                {
                    'id'    : 4,
                    'name'  : 'V-Trust Apraisal'
                },
                {
                    'id'    : 5,
                    'name'  : 'Trading'
                }
            ]
        }
    },
    mounted() {
        this.initMeetingTypes();
        this.initProjects();
    }
}
</script>