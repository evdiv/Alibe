<template>
    <b-row>
        <b-col cols='10' offset="1">
            <h3>{{ user.name }} <small>{{ user.title}}</small></h3>
            <small>Rating: {{ user.rating }}, Registered {{ user.createdOn | formatDate }}</small>
            
            <b-card bg-variant="light" style="margin: 30px; 0">
                <p>{{ user.description }}</p>
            </b-card>

            <h5>Added Jobs</h5>

            <div v-if="jobs.length">
                <b-table striped hover :items="jobs" :fields="fields">

                    <template slot="title" slot-scope="data">
                        <router-link :to="'/jobs/' + data.item.job_id">{{ data.value }}</router-link>
                    </template>

                    <template slot="createdOn" slot-scope="data">
                        {{ data.value | formatDate }}
                    </template>

                    <template slot="maxBudget" slot-scope="data">
                        ${{ data.value }}
                    </template>   

                    <template slot="active" slot-scope="data">
                        {{ data.value }}
                    </template>                                        

                </b-table>
            </div>
                    
        </b-col>
    </b-row>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            user: {
                user_id: parseInt(this.$route.params.id)
            },
            jobs: [],
            fields: [ 
                    {
                        key: 'title',
                        label: 'Job'
                    },
                    {
                        key: 'createdOn',
                        label: 'Date'
                    },                    
                    {
                        key: 'maxBudget',
                        label: 'Budget',
                        sortable: true
                    }, 
                    {
                        key: 'offers',
                        label: 'Offers',
                        sortable: true
                    },
                    {
                        key: 'comments',
                        label: 'Comments',
                        sortable: true
                    },
                    {
                        key: 'active',
                        label: 'Active'
                    }                    
                ]  
        }
    },
    methods: {
        getUser() {
            fb.usersCollection.where('user_id', '==', this.user.user_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.user = doc.data()
                })

            }).catch(err => {
                console.log(err)
            })
        },
        getJobs() {
            fb.jobsCollection.where('user_id', '==', this.user.user_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.jobs.push(doc.data())
                })
            }).catch(err => {
                console.log(err)
            })            
        }
    },
    created() {
        this.getUser()
        this.getJobs()
    }
}
</script>
