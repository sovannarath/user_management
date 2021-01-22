<template>
    <div>
        <UserTable></UserTable>
    </div>
</template>

<script>
import UserTable from '../../components/user/UserTable.vue'

export default {
    name:"User",
    components: {
        UserTable
    },
    data() {
        return {
            component: "UserTable",
            isHidden: false
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
    .user-component {
        margin-top:15px;
    }
</style>
