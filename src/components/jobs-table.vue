<template>
    <b-row>
        <b-col cols='10' offset="1">
            <h3>Jobs</h3>
            <p>List of all available jobs</p>

            <div v-if="jobs.length">
                <b-table striped hover :items="jobs" :fields="fields"></b-table>
            </div>

            <div v-else>
                <b-alert show variant="danger">There are currently no available jobs</b-alert>
            </div>

        </b-col>
    </b-row>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                fields: [ 
                    { 
                        key: 'userName',
                        label: 'Added by'
                    },
                    {
                        key: 'title',
                        label: 'Job'
                    },
                    {
                        key: 'maxBudget',
                        label: 'Budget',
                        sortable: true
                    }, 
                    {
                        key: 'comments',
                        label: 'Comments',
                        sortable: true
                    },
                    {
                        key: 'offers',
                        label: 'Offers',
                        sortable: true
                    }
                ]  
            }
        },
        computed: {
            ...mapState(['jobs'])
        }

    }
</script>