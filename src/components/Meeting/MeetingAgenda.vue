<template>

<div class="row">
    <div class="col col-md-12">
        <button v-on:click="callAgendaFrom()" style="margin-top:10px;" type="button" class="btn btn-secondary mb-1 pull-right">
            Add New Agenda
        </button>
    </div>
</div>
<div class="row" v-if="meetingAgendas == null || meetingAgendas == ''">
    <div class="col col-sm-12 text-center">
        No data avialable
    </div>
</div>
<div id="accordion" style="margin-top:10px;">

  <div v-for="agenda in meetingAgendas" v-bind:key="agenda.id" class="card">
    <div class="card-header" id="headingOne">
        <div class="row">
            <div class="col col-sm-6">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" v-bind:data-target="'#collapse-'+agenda.id" aria-expanded="true" aria-controls="collapseOne">
                        {{agenda.name}}
                    </button>
                </h5>
            </div>
            <div class="col col-sm-6">
                <button class="btn btn-sm pull-right" type="button" v-on:click="callToDeleteAgenda(agenda.id)">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btn btn-sm pull-right" type="button" data-toggle="modal" data-target="#largeModal" v-on:click="callAgendaFromUpdate(agenda.id)">
                    <i class="fa fa-edit"></i>
                </button>
            </div>
        </div>
    </div>

    <div v-bind:id="'collapse-'+agenda.id" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
        <div class="card-body">
            
            <div class="form-group">
                <label for="description" class=" form-control-label">Agenda Summary</label>
                <p>{{agenda.description}}</p>
            </div>

            <br>
            <h5>Attachment</h5>
            <hr>
            <div class="form-group">
                <label for="file-multiple-input" class=" form-control-label">Upload</label>
                <input type="file" id="file-multiple-input" name="file-multiple-input" ref="myFiles" @change="agendaAttachment()" multiple="" class="form-control-file">
            </div>

            <div class="table-responsive table--no-card m-b-40">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="attachment in agenda.attachments" v-bind:key="attachment.id">
                            <td>
                                <a href="#">{{attachment.name}}</a>
                            </td>
                            <td>{{attachment.type.name}}</td>
                            <td>
                                <div class="table-data-feature">
                                    <!--button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete">
                                        <i class="zmdi zmdi-edit"></i>
                                    </button-->
                                    <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete" @click="deleteAttacment(attachment)">
                                        <i class="zmdi zmdi-delete"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h5>Discussion Dialog</h5>
            <hr>
            
            <div class="row" style="margin-bottom:10px;">
                <div class="col col-sm-6">
                    <div class="form-group">
                        <label for="description" class=" form-control-label">Description</label>
                        <textarea id="description" v-model="description['descript-'+agenda.id]" name="description" placeholder="Enter description" rows="8" class="form-control"></textarea>
                    </div>
                    
                </div>
                <div class="col col-sm-6">
                    <div class="form-group" style="margin-bottom:20px;">
                        <label for="participant" class=" form-control-label">Participant</label>
                        <Select2 v-model="speakerId['speaker-'+agenda.id]" :options="userDataForSelect" :settings="{ settingOption: value, settingOption: value }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
                    </div>
                    <div class="form-group" style="margin-bottom:20px;">
                        <label for="action_type" class=" form-control-label">Type</label>
                        <select v-model="action_type_id['action-'+agenda.id]" id="action_type" class="form-control">
                            <option v-for="meetingAction in meetingActionTypes" v-bind:key="meetingAction.id" v-bind:value="meetingAction.id">{{meetingAction.name}}</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom:20px;">
                        <label for="related_speech" class=" form-control-label">Related Speech</label>
                        <select v-model="relatedId['related-'+agenda.id]" id="related_speech" class="form-control">
                            <option v-for="agenda in agendaDialog['agenda-'+agenda.id]" v-bind:key="agenda.id" v-bind:value="agenda.id">{{agenda.description}}</option>
                        </select>
                    </div>
                    <input type="hidden" v-model="dialogId['dialogId-'+agenda.id]">
                    <i class="pull-right">
                    <button v-on:click="clearDialog(agenda.id)" class="btn btn-sm btn-success">Clear</button>&nbsp;
                    <button v-on:click="addDialog(agenda.id)" class="btn btn-sm btn-primary">Save Action</button>
                    </i>
                </div>
            </div>

            <div class="table-responsive table--no-card m-b-40">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Speaker</th>
                            <th>Action Type</th>
                            <th>Description</th>
                            <th>Related</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dialog in agendaDialog['agenda-' + agenda.id]" v-bind:key="dialog.id">
                            <td>{{dialog.speaker['name']}}</td>
                            <td>{{dialog.action['name']}}</td>
                            <td>{{dialog.description}}</td>
                            <td>{{dialog.related == null? '' : dialog.related.description}}</td>
                            <td>
                                <div class="table-data-feature">
                                    <button v-on:click="editAction(dialog.id, agenda.id)" class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete">
                                        <i class="zmdi zmdi-edit"></i>
                                    </button>
                                    <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete" @click="deleteDiscussionLog(dialog, agenda.id)">
                                        <i class="zmdi zmdi-delete"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  </div>

</div>

<!-- modal large -->
<div class="modal fade" id="createAgendModal" tabindex="-1" role="dialog" aria-labelledby="largeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="largeModalLabel">Task Information</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				
                <div class="row">
                    <div class="col col-md-12">

                        <div class="form-group">
                            <label for="agendaName" class=" form-control-label">Task Name</label>
                            <input type="text" id="agendaName" v-model="agendaName" name="agendaName" placeholder="Enter task name" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="agendaDescription" class=" form-control-label">Agenda Summary</label>
                            <textarea id="agendaDescription" v-model="agendaDescription" placeholder="Enter agenda summary" rows="3" class="form-control"></textarea>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col col-lg-12">
                        <button v-on:click="createOrUpdateAgenda()" class="btn btn-sm btn-primary pull-right">Save</button>
                    </div>
                </div>

			</div>	
		</div>
	</div>
</div>
<!-- end modal large -->

<!-- Delete Agenda -->
<div class="modal fade" id="deleteAgenda" tabindex="-1" role="dialog" aria-labelledby="largeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-sm" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="largeModalLabel">Delete Confirmation</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				
                <div class="row">
                    <div class="col col-md-12">
                        <p>Are you sure?</p>
                    </div>
                </div>

                <div class="row">

                    <div class="col col-lg-12">
                        <button v-on:click="deleteAgenda()" class="btn btn-sm btn-danger pull-right">Delete</button>
                    </div>

                </div>

			</div>	
		</div>
	</div>
</div>
<!-- end modal large -->

</template>

<script>
import Select2 from 'vue3-select2-component';
import $ from 'jquery'
import MeetingAgendaAPI from '../../services/MeetingAgendaService'
import MeetingActionTypeAPI from '../../services/MeetingTypeService'
import UserAPI from '../../services/UserService'

export default {
    name: 'ProjectTask',
    components: {
        Select2
    },
    data () {
        return {
            meeting_id : "",
            meetingAgendas : [],
            meetingActionTypes : [],
            agendaName : "", 
            agendaDescription : "",
            agenda_id : null,
            userData : [],
            attachments : [
                {
                    'id': 1,
                    'name' : 'file_1.pptx',
                    'type' : {
                        'id': 1,
                        'name' : 'Power Point'
                    },
                },
                {
                    'id' : 2,
                    'name' : 'file_2.pdf',
                    'type' : {
                        'id' : 2,
                        'name' : 'PDF'
                    }
                }
            ],
            task_name : "",
            userDataForSelect: [],
            action_type_id : {},
            relate_action_id : {},
            description : {},
            summary : {
                'summary-1' : ''
            },
            agendaDialog : {
                'agenda-1' : [
                    {
                        'id' : 1,
                        'speaker' : {
                            'id' : 1,
                            'name': 'Thorn Sovannarath',
                        },
                        'action' : {
                            'id' : 1,
                            'name' : 'ASK QUESTION',
                        },
                        'description' : 'What does the POI mean?',
                        'related' : null
                    }
                ]
            },
            project_id : "",
            frm_summary : "",
            speakerId: {},
            dialogId: {},
            relatedId: {},
            file : null,
        }
    },
    methods: {
        deleteDiscussionLog(dialog, agenda_id) {
            var indexOfDialog = this.agendaDialog['agenda-' + agenda_id].indexOf(dialog);
            this.agendaDialog['agenda-' + agenda_id].splice(indexOfDialog, 1);
            //console.log(dialog, agenda_id);
        },
        deleteAttacment(attachFile) {
            //console.log(attachFile);
            var indexOfFile = this.attachments.indexOf(attachFile);
            //console.log(indexOfFile);
            this.attachments.splice(indexOfFile, 1);
        },
        agendaAttachment(){
            var self = this
            this.$refs.myFiles.files.forEach(function(file){
                var fileData = {};
                fileData['id'] = self.attachments.length + 1;
                fileData['name'] = file.name;
                fileData['type'] = {
                    'id' : file.type,
                    'name' : file.type
                }
                self.attachments.push(fileData);
            });
            this.$refs.myFiles.files = [];
        },
        myChangeEvent(val){
            console.log(val);
        },
        mySelectEvent({id, text}){
            console.log({id, text})
        },
        callAgendaFrom() {
            this.agendaName = "";
            this.agendaDescription = "";
            this.agenda_id = null;
            $("#createAgendModal").modal("show");
        },
        callAgendaFromUpdate(agenda_id) {
           var self = this;
           this.meetingAgendas.forEach(function(value){
               if(agenda_id == value.id){
                   self.agenda_id = value.id;
                   self.agendaName = value.name;
                   self.agendaDescription = value.description;
               }
           });
           $("#createAgendModal").modal("show");
        },
        createOrUpdateAgenda() {
            var self = this;
            var data = {}
            data['name'] = this.agendaName;
            data['description'] = this.agendaDescription;
            data['meeting'] = { "id" : this.meeting_id };
            if(this.agenda_id == null){
                MeetingAgendaAPI.createAgenda(this.meeting_id, data)
                .then(response => {
                    self.meetingAgendas.push(response);
                    $("#createAgendModal").modal("hide");
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else {
                MeetingAgendaAPI.updateAgenda(this.meeting_id, this.agenda_id, data)
                .then(data => {
                    var i = 0
                    for (i; i < this.meetingAgendas.length; i++){
                        if(this.meetingAgendas[i].id == data.id){
                            this.meetingAgendas[i] = data;
                            break;
                        }
                    }
                    $("#createAgendModal").modal("hide");
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },
        callToDeleteAgenda(agenda_id){
            this.agenda_id = agenda_id;
            $("#deleteAgenda").modal('show');
        },
        deleteAgenda() {
            var self = this;
            console.log(this.agenda_id);
            MeetingAgendaAPI.deleteAgenda(this.meeting_id, this.agenda_id)
            .then(data => {
                var oldData = {};
                self.meetingAgendas.forEach(function(val){
                    if(self.agenda_id == val.id){
                        oldData = val;
                    }
                });
                self.meetingAgendas.pop(oldData);
                console.log(data);
                $("#deleteAgenda").modal('hide');
                self.agenda_id = null;
            })
            .catch(err => { 
                console.log(err);
            });
        },
        addDialog(project_id) {
            var self = this;
            var data = {
                'id' : this.agendaDialog['agenda-' + project_id].length+1,
                'description' : this.description['descript-'+project_id]
            };

            this.userData.forEach(function(value){
                if (value.id == self.speakerId['speaker-'+project_id]){
                    data['speaker'] = value;
                }
            });

            this.meetingActionTypes.forEach(function(value){
                if (value.id == self.action_type_id['action-'+project_id]) {
                   data['action'] = value;
                }
            });

            this.agendaDialog['agenda-'+project_id].forEach(function(value){
                if(value.id == self.relatedId['related-'+project_id]){
                    data['related'] = value;
                 }
            });

            if ( (this.dialogId['dialogId-' + project_id] == undefined | this.dialogId['dialogId-' + project_id] == "") &&
                (self.speakerId['speaker-'+project_id] != "" | self.action_type_id['action-'+project_id] != "" | this.description['descript-'+project_id] != "") ) {

                this.dialogId['dialogId-' + project_id] = data.id;
                this.agendaDialog['agenda-'+project_id].push(data);
            }
            else {
                this.agendaDialog['agenda-'+project_id].forEach(function(value,idx){
                    if(value.id == self.dialogId['dialogId-'+project_id]){
                        self.agendaDialog['agenda-'+project_id][idx] = data;
                    }
                });
            }
        },
        updateSummary(){
            var self = this;
            this.meetingAgendas.forEach(function(value){
                self.summary['summary-'+value.id] = value.description
            });
        },
        editAction(dialog_id, project_id) {
           var actionRecord = {};
           this.agendaDialog['agenda-'+project_id].forEach(function(value){
               if (value.id == dialog_id){
                   actionRecord = value;
               }
           });
           this.description['descript-'+project_id]     = actionRecord.description;
           this.action_type_id['action-'+project_id]    = actionRecord.action['id'];
           this.speakerId['speaker-'+project_id]        = actionRecord.speaker['id'];
           this.relatedId['related-'+project_id]        = (actionRecord.related == null ? '' : actionRecord.related.id); 
        },
        clearDialog(project_id) {
           this.description['descript-' + project_id]   = "";
           this.speakerId['speaker-' + project_id]      = "";
           this.action_type_id['action-' + project_id]  = "";
           this.dialogId['dialogId-' + project_id]      = "";
           this.relatedId['related-' + project_id]      = "";
        },
        initialUserData(){
            var self = this;
            UserAPI.user_list()
            .then(data => {
                self.userData = data;
                self.userData.forEach(function(value){
                    self.userDataForSelect.push({'id' : value.id, 'text' : value.name});
                });
            })
            .catch(err => {
                console.log(err);
            });
        },
        initialMeetingActionType() {
            var self = this;
            MeetingActionTypeAPI.allMeetingTypes()
            .then(data => {
                self.meetingActionTypes = data;
            })
            .catch(err => {
                console.log(err);
            });
        }, 
        loadMeetingAgendas(meeting_id){
            var self = this;
            MeetingAgendaAPI.getAllAgendas(meeting_id)
            .then(data => {
                console.log(data);
                self.meetingAgendas = data;
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    mounted() {
        var urlPath = window.location.pathname.split('/')
        this.meeting_id = urlPath[urlPath.length - 2];

        this.loadMeetingAgendas(this.meeting_id);
        console.log(this.meetingAgendas);

        this.initialUserData();
        this.initialMeetingActionType();
        this.updateSummary();
        
      
    }
}
</script>