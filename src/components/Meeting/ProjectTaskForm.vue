<template>
    <div class="row">
        <div class="col col-md-6">

            <div class="form-group">
                <label for="task_name" class=" form-control-label">Task Name</label>
                <input type="text" id="task_name" v-model="task_name" name="task_name" placeholder="Enter task name" class="form-control">
            </div>

            <div class="form-group">
                <label for="start_date" class=" form-control-label">Start Date</label>
                <input type="text" id="start_date" v-model="start_date" name="start_date" class="form-control">
            </div>

            <div class="form-group">
                <label for="completed_percentage" class=" form-control-label">Completed Percentage</label>
                <input type="text" id="completed_percentage" v-model="completed_percentage" name="completed_percentage" placeholder="" class="form-control">
            </div>

            <div class="form-group">
                <label for="pic" class=" form-control-label">Project Implement Committee</label>
                <input v-on:keyup="retrievePIC()" type="text" id="pic" v-model="searchPIC" name="pic" placeholder="Search PIC" class="form-control">
                <select name="pic_id" v-model="pic_id" id="pic_id" multiple="" class="form-control">
                    <option v-for="pic in pics" v-bind:key="pic.id" v-bind:value="pic.id">{{pic.name}}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="description" class=" form-control-label">Description</label>
                <textarea v-model="description" name="description" id="description" rows="10" placeholder="Enter description" class="form-control"></textarea>
            </div>

        </div>
        <div class="col col-md-6">

            <div class="form-group">
                <label for="project_id" class=" form-control-label">Project</label>
                <select v-model="project_id" name="project_id" id="project_id" class="form-control">
                    <option disabled selected >-- Please select project --</option>
                    <option v-for="project in projects" v-bind:key="project.id" v-bind:value="project.id">{{project.name}}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="end_date" class=" form-control-label">End Date</label>
                <input type="end_date" id="end_date" v-model="end_date" name="end_date" class="form-control">
            </div>

            <div class="form-group">
                <label for="task_status" class=" form-control-label">Task Status</label>
                <select name="task_status" v-model="task_status" id="task_status" class="form-control">
                    <option disabled selected value="0">Please select status</option>
                    <option>Finished</option>
                    <option>On Hold</option>
                    <option>Next Schedule</option>
                </select>
            </div>

            <div class="form-group">
                <label for="department" class=" form-control-label">Department</label>
                <input v-on:keyup="retrieveDepartment()" type="text" id="department" v-model="searchDepartment" name="department" placeholder="Search Department" class="form-control">
                <select name="department" v-model="department_id" id="department" multiple="" class="form-control">
                    <option v-for="department in departments" v-bind:key="department.id" v-bind:value="department.id">{{department.name}}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="comment" class=" form-control-label">Comment</label>
                <textarea v-model="comment" name="comment" id="comment" rows="10" placeholder="Enter comment" class="form-control"></textarea>
            </div>

        </div>
    </div>
    <div class="row">
        <div class="col col-lg-12">
            <button class="btn btn-sm btn-primary pull-right">Save</button>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ProjectTaskForm',
        components: {
        
        },
        data () {
            return {
                projects                : [],
                departments             : [],
                pics                    : [],
                task_name               : '',
                start_date              : '',
                completed_percentage    : '',
                searchPIC               : '',
                description             : '',
                end_date                : '',
                task_status             : '',
                department_id           : '',
                searchDepartment        : '',
                userData                : [
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
                departmentData: [
                    {
                        'id': 1,
                        'name': 'IT Department'
                    },
                    {
                        'id': 2,
                        'name': 'HR Department'
                    },
                    {
                        'id': 3,
                        'name': 'Bussiness Department'
                    },
                    {
                        'id': 4,
                        'name': 'Marketing Department'
                    },
                    {
                        'id': 5,
                        'name': 'Consultant Department'
                    },
                    {
                        'id': 6,
                        'name': 'Relation Department'
                    }
                ]
            }
        },
        methods: {
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
                ];
            },
            retrievePIC() {
                if(this.searchPIC != ''){
                    let scope = this;
                    scope.pics = [];
                    var str = scope.searchPIC;
                    this.userData.forEach(function(value, key){
                        var name = value.name.toLowerCase()
                        if(name.includes(str)){
                            scope.pics.push(value)
                        }

                        if(key){
                            console.log('')
                        }
                    })
                }
                else {
                    this.pics = [];
                }
            },
            retrieveDepartment() {
                if(this.searchDepartment != ''){
                    let scope = this;
                    scope.departments = [];
                    var str = scope.searchDepartment.toLowerCase();
                    this.departmentData.forEach(function(value, key){
                        var name = value.name.toLowerCase();
                        if(name.includes(str)){
                            scope.departments.push(value);
                        }
                        if(key){
                            console.log('');
                        }
                    })
                }
                else {
                    this.departments = [];
                }
            }
        },
        mounted() {
            this.initProjects();
        }
    }
</script>