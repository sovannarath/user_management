<template>

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