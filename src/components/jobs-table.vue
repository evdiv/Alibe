<template>
    <b-row>
        <b-col cols='10' offset="1">
            <h3>Jobs</h3>
            <p>List of all available jobs</p>

            <div v-if="jobs.length">
                <b-table striped hover :items="jobs" :fields="fields">
                    <template slot="userName" slot-scope="data">
                        <a href="#">{{ data.value }}</a>
                    </template>

                    <template slot="title" slot-scope="data">
                        <a :href="'/jobs/' + data.item.maxBudget">{{ data.value }}</a>
                    </template>

                </b-table>
            </div>

            <div v-else>
                <b-alert show variant="danger">There are currently no available jobs</b-alert>
            </div>

        </b-col>
    </b-row>
</template>

<script>
    import { mapState } from 'vuex'
    const fb = require('../firebaseConfig.js')

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
        },
        beforeCreate() {

		    fb.jobsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
			    let jobs = []
                querySnapshot.forEach(doc => {
                        let job = doc.data()
                        job.id = doc.id
                        jobs.push(job)
                })
			    this.$store.commit('setJobs', jobs)
		    })
        }
    }
</script>