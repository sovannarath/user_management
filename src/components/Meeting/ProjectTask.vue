<template>
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
                        <button type="button" class="btn btn-secondary mb-1 pull-right" data-toggle="modal" data-target="#largeModal">
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
							<ProjectTaskForm/>
						</div>
						<!--div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
							<button type="button" class="btn btn-primary">Confirm</button>
						</div-->
					</div>
				</div>
			</div>
			<!-- end modal large -->
</template>

<script>
import ProjectTaskForm from '../../components/Meeting/ProjectTaskForm'

export default {
    name: 'ProjectTask',
    components: {
        ProjectTaskForm
    },
    data () {
        return {
            
        }
    },
    methods: {
       
    },
    mounted() {
       
    }
}
</script>