<template>
    <div class="sufee-alert alert with-close alert-success alert-dismissible fade show" v-if="!is_succ_hide">
        <span class="badge badge-pill badge-success">Success</span> Data has been deleted.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeSucc">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

<div class="user-data m-b-30">
  <h3 class="title-3 m-b-30 pull-left"><i class="zmdi zmdi-account-calendar"></i>Meeting</h3>
  <button class="btn btn-sm btn-primary pull-right" style="margin-right:35px;" v-on:click="callCreateMeeting()">
      <i class="fa fa-plus"></i> New Meeting
  </button>

    <div class="table-responsive table-data">
        <table class="table">
            <thead>
                <tr>
                  <!--td>
                    <label class="au-checkbox">
                      <input type="checkbox">
                      <span class="au-checkmark"></span>
                    </label>
                  </td!-->
                  <td>Project Name</td>
                  <td>Topic</td>
                  <td>Meeting Type</td>
                  <td>Date</td>
                  <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="meeting in meetings" v-bind:key="meeting.id" v-bind:id="'meeting-id-' + meeting.id">
                  <!--td>
                    <label class="au-checkbox">
                      <input type="checkbox">
                      <span class="au-checkmark"></span>
                      </label>
                  </td!-->
                  <td>{{meeting.project.name}}</td>
                  <td>{{meeting.name}}</td>
                  <td>{{meeting.type.name}}</td>
                  <td>{{meeting.date}}</td>
                  <td>
                    <div class="table-data-feature">
                      <router-link class="item" data-toggle="tooltip" data-placement="top" title="Edit" v-bind:to="'/meetings/' + meeting.id + '/edit'">
                        <i class="zmdi zmdi-edit"></i>
                      </router-link>
                      <button class="item tmp-btn-del" v-bind:id="'tmp-btn-del-' + meeting.id" data-toggle="tooltip" v-bind:value="meeting.id" data-placement="top" v-on:click="btnDelClick(meeting.id)" title="Delete">
                        <i class="zmdi zmdi-delete"></i>
                      </button>
                    </div>
                  </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!---div class="user-data__footer">
        <button class="au-btn au-btn-load">load more</button>
    </div-->
</div>
<!-- END USER DATA-->

<!-- modal static -->
<div class="modal fade" id="delContactTypeModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true" data-backdrop="static">
<div class="modal-dialog modal-sm" role="document">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="staticModalLabel">Delete</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body center">
<p>Are you sure to delete it?</p>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
<button type="button" class="btn btn-danger btn-del" v-on:click="deleteRecord()">Yes</button>
</div>
</div>
</div>
</div>
<!-- end modal static -->

<!-- Create Meeting Modal -->
<div class="modal fade" id="createMeetingModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticModalLabel">Create Meeting</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>   
            </div>
            
            <div class="modal-body center">

                <div class="form-group">
                    <label for="meetingRecord" class=" form-control-label">Meeting Name</label>
                    <input type="text" id="meetingRecord" name="meetingName" v-model="meetingName" class="form-control">
                </div>
                
                <div class="form-group">
                    <label for="project_id" class=" form-control-label">Project</label>
                    <select v-model="project_id" name="project_id" id="project_id" class="form-control">
                        <option disabled selected >-- Please select project --</option>
                        <option v-for="project in projects" v-bind:key="project.id" v-bind:value="project.id">{{project.name}}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="meeting_type_id" class=" form-control-label">Meeting Type</label>
                    <select name="meeting_type_id" v-model="meetingType_id" id="meeting_type_id" class="form-control">
                        <option disabled selected value="0">Please select meeting type</option>
                        <option v-for="meetingType in meetingTypes" v-bind:key="meetingType.id" v-bind:value="meetingType.id">{{meetingType.name}}</option>
                    </select>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-info btn-del" v-on:click="createMeetingRecord()">Create</button>
            </div>
        </div>
    </div>
</div>
<!-- end modal static -->

</template>

<script>
import MeetingAPI from '../../services/MeetingService'
import MeetingTypeAPI from '../../services/MeetingTypeService'
import ProjectAPI from '../../services/ProjectService'
import $ from 'jquery'

export default {
    name:"ContactTypeTable",
    components: {

    },
    data() {
        return {
            meetings : [],
            is_succ_hide : true,
            meetingName : "",
            projects : [],
            meetingTypes : [],
            project_id : "",
            meetingType_id : "",
            is_delete : false,
            is_not_delete : false,
        }
    },
    methods: {
        callCreateMeeting(){
            $("#createMeetingModal").modal("show");
            
        },
        createMeetingRecord(){
            var self = this;
            var data = {};
            data['name'] = this.meetingName;
            data['project'] = {"id" : this.project_id};
            data['type'] = {"id" : this.meetingType_id}
            MeetingAPI.createMeeting(data)
            .then(data => {
                self.meetings.push(data);
                this.$router.push("/meetings/" + data.id + "/edit");
                $("#createMeetingModal").modal("hide");
            })
            .catch(err => {
                console.log(err);
            });
        },
        loadMeetings() {
            var self = this;
            MeetingAPI.allMeetings()
            .then(response => {
                self.meetings = response;
                /*for (var i = 0; i <= (response.length - 1); i++) {
                    var date = new Date(response[i].date);
                    var strDate = date.getFullYear() + '-';
                    if( (date.getMonth()+1) < 10)
                        strDate += '0'
                    response[i].date = strDate + (date.getMonth()+1) + '-' + date.getDate()
                    self.meetings.push(response[i]);
                }*/
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {})
        },
        btnDelClick(meetingId) {
            var thisBtn = $('#tmp-btn-del-' + meetingId);
            var modal = $('#delContactTypeModal');
            modal.modal('show');
            modal.find('.btn-del').attr('value', thisBtn.attr('value'));
        },
        isDelete(){
            this.is_delete = true;
        },
        deleteRecord() {
            var id = $('.btn-del').attr('value')
            var modal = $('#delContactTypeModal');
            var typeId = $('#meeting-id-' + id)
            MeetingAPI.deleteMeeting(id)
            .then(response => {
                this.deleted = response
                modal.modal('hide')
                typeId.remove()
                this.is_succ_hide = false
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {});
        }, 
        loadMeetingTypes() {
            var self = this;
            MeetingTypeAPI.allMeetingTypes()
            .then(data => {
                self.meetingTypes = data;
            })
            .catch(err => {
                console.log(err);
            });
        },
        loadProjects() {
            var self = this;
            ProjectAPI.allProjects()
            .then(data => {
                self.projects = data;
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.loadMeetings();
        this.loadMeetingTypes();
        this.loadProjects();
    }
}
</script>