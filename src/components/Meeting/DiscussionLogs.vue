<template>
<br>
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

            <div class="form-group">
                <label for="related_action_id" class=" form-control-label">Related Action</label>
                <select name="related_action_id" id="related_action_id" class="form-control">
                    <option value="0">Please select action</option>
                    <option v-for="meetingAction in meetingActions" v-bind:key="meetingAction.id" v-bind:value="meetingAction.id">{{meetingAction.description}}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="comment" class=" form-control-label">Description</label>
                <textarea name="comment" id="comment" rows="6" placeholder="Enter commen" class="form-control"></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-sm pull-right">Add Discusion</button>

        </div>
        <div class="col col-md-6 col-xs-6">
                           <div class="table-responsive table--no-card m-b-40">
                    <table class="table table-borderless table-striped table-earning">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Action Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DiscussionLog',
    components: {

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