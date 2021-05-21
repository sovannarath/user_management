<template>

<div class="row">
    <div class="col col-md-12">
        <button v-on:click="newAgenda()" style="margin-top:10px;" type="button" class="btn btn-secondary mb-1 pull-right" data-toggle="modal" data-target="#largeModal">
            Add New Agenda
        </button>
    </div>
</div>
<div class="row" v-if="projectTasks == null">
    <div class="col col-sm-12 text-center">
        No data avialable
    </div>
</div>
<div id="accordion" style="margin-top:10px;">

  <div v-for="projectTask in projectTasks" v-bind:key="projectTask.id" class="card">
    <div class="card-header" id="headingOne">
        <div class="row">
            <div class="col col-sm-6">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" v-bind:data-target="'#collapse-'+projectTask.id" aria-expanded="true" aria-controls="collapseOne">
                        {{projectTask.name}}
                    </button>
                </h5>
            </div>
            <div class="col col-sm-6">
                <button class="btn btn-sm btn-primary pull-right" type="button" data-toggle="modal" data-target="#largeModal" v-on:click="editAgenda(projectTask.id)">
                    <i class="zmdi zmdi-edit"></i> Edit
                </button>
            </div>
        </div>
    </div>

    <div v-bind:id="'collapse-'+projectTask.id" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
        <div class="card-body">
            
            <div class="form-group">
                <label for="summary" class=" form-control-label">Agenda Summary</label>
                <textarea readonly id="summary" v-model="summary['summary-'+projectTask.id]" placeholder="Enter agenda summary" rows="3" class="form-control"></textarea>
            </div>

            <br>
            <h5>Attachment</h5>
            <hr>
            <div class="form-group">
                <label for="file-multiple-input" class=" form-control-label">Upload</label>
                <input type="file" id="file-multiple-input" name="file-multiple-input" multiple="" class="form-control-file">
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
                        <tr v-for="attachment in attachments" v-bind:key="attachment.id">
                            <td>
                                <a href="#">{{attachment.name}}</a>
                            </td>
                            <td>{{attachment.type.name}}</td>
                            <td>
                                <div class="table-data-feature">
                                    <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete">
                                        <i class="zmdi zmdi-edit"></i>
                                    </button>
                                    <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete">
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
                        <textarea id="description" v-model="description['descript-'+projectTask.id]" name="description" placeholder="Enter description" rows="8" class="form-control"></textarea>
                    </div>
                    
                </div>
                <div class="col col-sm-6">
                    <div class="form-group" style="margin-bottom:20px;">
                        <label for="participant" class=" form-control-label">Participant</label>
                        <Select2 v-model="speakerId['speaker-'+projectTask.id]" :options="userDataForSelect" :settings="{ settingOption: value, settingOption: value }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
                    </div>
                    <div class="form-group" style="margin-bottom:20px;">
                        <label for="action_type" class=" form-control-label">Type</label>
                        <select v-model="action_type_id['action-'+projectTask.id]" id="action_type" class="form-control">
                            <option v-for="meetingAction in meetingActionTypes" v-bind:key="meetingAction.id" v-bind:value="meetingAction.id">{{meetingAction.name}}</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom:20px;">
                        <label for="related_speech" class=" form-control-label">Related Speech</label>
                        <select v-model="relatedId['related-'+projectTask.id]" id="related_speech" class="form-control">
                            <option v-for="agenda in agendaDialog['agenda-'+projectTask.id]" v-bind:key="agenda.id" v-bind:value="agenda.id">{{agenda.description}}</option>
                        </select>
                    </div>
                    <input type="hidden" v-model="dialogId['dialogId-'+projectTask.id]">
                    <i class="pull-right">
                    <button v-on:click="clearDialog(projectTask.id)" class="btn btn-sm btn-success">Clear</button>&nbsp;
                    <button v-on:click="addDialog(projectTask.id)" class="btn btn-sm btn-primary">Save Action</button>
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
                        <tr v-for="dialog in agendaDialog['agenda-'+projectTask.id]" v-bind:key="dialog.id">
                            <td>{{dialog.speaker['name']}}</td>
                            <td>{{dialog.action['name']}}</td>
                            <td>{{dialog.description}}</td>
                            <td>{{dialog.related == null? '' : dialog.related.description}}</td>
                            <td>
                                <div class="table-data-feature">
                                    <button v-on:click="editAction(dialog.id, projectTask.id)" class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete">
                                        <i class="zmdi zmdi-edit"></i>
                                    </button>
                                    <button class="item tmp-btn-del" data-toggle="tooltip" data-placement="top" title="Delete">
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
<div class="modal fade" id="largeModal" tabindex="-1" role="dialog" aria-labelledby="largeModalLabel" aria-hidden="true">
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
                            <label for="task_name" class=" form-control-label">Task Name</label>
                            <input type="text" id="task_name" v-model="task_name" name="task_name" placeholder="Enter task name" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="frm_summary" class=" form-control-label">Agenda Summary</label>
                            <textarea id="frm_summary" v-model="frm_summary" placeholder="Enter agenda summary" rows="3" class="form-control"></textarea>
                        </div>

                        <input type="hidden" v-model="project_id">
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

</template>

<script>
import Select2 from 'vue3-select2-component';
import $ from 'jquery'
//import ProjectTaskForm from '../../components/Meeting/ProjectTaskForm'

export default {
    name: 'ProjectTask',
    components: {
        //ProjectTaskForm
        Select2
    },
    data () {
        return {
            meetingActionTypes : [
                {
                    'id' : 1,
                    'name' : 'ASK QUESTION', 
                },
                {
                    'id' : 2,
                    'name' : 'ANSWER', 
                },
                {
                    'id' : 3,
                    'name' : 'COMMENT'
                }
            ],
            userData : [
                {
                    'id': 1,
                    'name' : 'Thorn Sovannarath',
                    'occupy' : 'Developer',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 2,
                    'name' : 'Duy Panharith',
                    'occupy' : 'Director',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 3,
                    'name' : 'Kim Chong',
                    'occupy' : 'Manager',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 4,
                    'name' : 'Heng Sophat',
                    'occupy' : 'Coordinator',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 5,
                    'name': 'Heng Siyouer',
                    'occupy' : 'Admin',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 6,
                    'name' : 'Huy Lyly',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 7,
                    'name' : 'Ly Chenglim',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 8,
                    'name' : 'Say Sopheak',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 9,
                    'name': 'Morn Sopheaktra',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id' : 10,
                    'name' : 'Top Sophea',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                },
                {
                    'id': 11,
                    'name': 'Meng Sokeang',
                    'occupy' : 'Secreterist',
                    'organization': 'Secretary',
                    'email': 'blabla@email.com',
                    'phone' : '+855'
                }
            ],
            projectTasks : [
                {
                    'id' : 1,
                    'name' : 'Update App Z1',
                    'description': 'This content of updating information of Z1 app!'
                }
            ],
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
            relatedId: {}
        }
    },
    methods: {
        myChangeEvent(val){
            console.log(val);
        },
        mySelectEvent({id, text}){
            console.log({id, text})
        },
        newAgenda() {
            this.project_id = "";
            this.task_name = "";
            this.project_id = "";
        },
        createOrUpdateAgenda() {
            if(this.project_id == ""){
                if(this.task_name != "") {
                    var data = {
                        'id' : this.projectTasks.length+1,
                        'name' : this.task_name,
                        'description' : this.frm_summary
                    }
                    this.projectTasks.push(data)
                    $('#largeModal').modal('hide')
                }
                else {
                    console.log('insert!')
                }
            }
            else {
                if(this.task_name != "") {
                    var self = this;
                    this.projectTasks.forEach(function(value){
                        if (self.project_id == value.id){
                            value.name = self.task_name;
                            value.description = self.frm_summary;
                            return 0;
                        }
                    });
                    this.updateSummary();
                    $('#largeModal').modal('hide')
                }
                else {
                    console.log('update!')
                }
            }
       },
       addDialog(project_id) {
            var self = this;
            var data = {
                'id' : this.agendaDialog['agenda-'+project_id].length+1,
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
       editAgenda(project_id) {
           var self = this;
           this.projectTasks.forEach(function(value){
               if(project_id == value.id){
                   self.project_id      = value.id;
                   self.task_name       = value.name;
                   self.frm_summary     = value.description;
               }
           });
       },
       updateSummary(){
            var self = this;
            this.projectTasks.forEach(function(value){
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
       }
    },
    mounted() {
        var self = this;
        this.userData.forEach(function(value){
            self.userDataForSelect.push({'id' : value.id, 'text' : value.name});
        });
        this.updateSummary();
    }
}
</script>