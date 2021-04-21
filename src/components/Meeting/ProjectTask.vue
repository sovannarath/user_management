<template>

<div class="row">
    <div class="col col-md-12">
        <button style="margin-top:10px;" type="button" class="btn btn-secondary mb-1 pull-right" data-toggle="modal" data-target="#largeModal">
            Add New Agenda
        </button>
    </div>
</div>

<div id="accordion" style="margin-top:10px;">

  <div v-for="projectTask in projectTasks" v-bind:key="projectTask.id" class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" v-bind:data-target="'#collapse-'+projectTask.id" aria-expanded="true" aria-controls="collapseOne">
            {{projectTask.name}}
        </button>
      </h5>
    </div>

    <div v-bind:id="'collapse-'+projectTask.id" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
        <div class="card-body">
            
            <div class="form-group">
                <label for="summary" class=" form-control-label">Agenda Summary</label>
                <textarea id="summary" name="summary" placeholder="Enter agenda summary" rows="3" class="form-control"></textarea>
            </div>

            <h4>Discussion Dialog</h4>
            <hr>
            
            <div class="row" style="margin-bottom:10px;">
                <div class="col col-sm-6">
                    <div class="form-group">
                        <label for="participant" class=" form-control-label">Participant</label>
                        <input type="text" id="participant" name="participant" class="form-control">
                         <select name="" id="" multiple class="form-control" style="margin-top:5px;">
                            <option value="">Name Of participant</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="action_type" class=" form-control-label">Action Type</label>
                        <select name="action_type" id="action_type" class="form-control">
                            <option value="">Name of Action Type</option>
                        </select>
                    </div>
                </div>
                <div class="col col-sm-6">
                    <div class="form-group">
                        <label for="description" class=" form-control-label">Description</label>
                        <textarea id="description" v-model="description" name="description" placeholder="Enter description" rows="6" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="relate_action" class=" form-control-label">Relate Action</label>
                        <select name="relate_action" id="relate_action" class="form-control">
                            <option value="">Name of Related Action</option>
                        </select>
                    </div>
                    <button class="btn btn-sm btn-primary pull-right">Add Action</button>
                </div>
            </div>

            <div class="table-responsive table--no-card m-b-40">
                <table class="table table-borderless table-striped table-earning">
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>Action Type</th>
                            <th>Description</th>
                            <th>Related Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Thorn Sovannarath</td>
                            <td>Ask Quetion</td>
                            <td>What does the POI mean?</td>
                            <td>None</td>
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
                <label for="summary" class=" form-control-label">Agenda Summary</label>
                <textarea id="summary" name="summary" placeholder="Enter agenda summary" rows="3" class="form-control"></textarea>
            </div>

                    </div>
                </div>
                <div class="row">

                    <div class="col col-lg-12">
                        <button v-on:click="createAgenda()" class="btn btn-sm btn-primary pull-right">Save</button>
                    </div>
                
                </div>

			</div>	
		</div>
	</div>
</div>
<!-- end modal large -->

</template>

<script>
import $ from 'jquery'
//import ProjectTaskForm from '../../components/Meeting/ProjectTaskForm'

export default {
    name: 'ProjectTask',
    components: {
        //ProjectTaskForm
    },
    data () {
        return {
            projectTasks : [
                {
                    'id' : 1,
                    'name' : 'Update App Z1',
                    'description': 'This content of updating information of Z1 app!'
                }
            ],
            task_name : ""
        }
    },
    methods: {
       createAgenda() {
           if(this.task_name != "") {
                var data = {
                    'id' : this.projectTasks.length+1,
                    'name' : this.task_name,
                    'description' : 'This content of updating information of Z1 app!'
                }
                this.projectTasks.push(data)
                $('#largeModal').modal('hide')
           }
       }
    },
    mounted() {
       
    }
}
</script>