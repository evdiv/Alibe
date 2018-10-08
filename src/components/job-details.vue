<template>
    <b-row>
        <b-col cols='10' offset="1">
            <p><small><router-link to='/jobs'>All Jobs</router-link> / {{ job.title }}</small></p>
            <h3>{{ job.title }}</h3>
            
            <b-card bg-variant="light">
                <p>{{ job.details }}</p>
                <p>Max Budget: ${{ job.maxBudget }}</p>
                <p>Added {{ job.createdOn | formatDate }} by 
                    <router-link :to="'/users/' + job.user_id">{{ job.userName }}</router-link>
                </p>   
                <comment-create></comment-create> 
            </b-card>
                    
        </b-col>
    </b-row>
</template>

<script>
import CommentCreate from './comment-create.vue'
const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            job: {
                job_id: parseInt(this.$route.params.id)
            }
        }
    },
    methods: {
        getJob() {
            fb.jobsCollection.where('job_id', '==', this.job.job_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.job = doc.data()
                })

            }).catch(err => {
                console.log(err)
            })
        }
    },
    components: {
        CommentCreate
    },
    created() {
        this.getJob()
    }
}
</script>
