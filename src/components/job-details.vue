<template>
    <b-row>
        <b-col cols='10' offset="1">
            <p><small><router-link to='/jobs'>All Jobs</router-link> / {{ job.title }}</small></p>
            <h3>{{ job.title }} <small>Added {{ job.createdOn | formatDate }} by 
                <router-link :to="'/users/' + job.user_id">{{ job.userName }}</router-link></small>
            </h3>
            
            <b-card bg-variant="light">
                <p>{{ job.details }}</p>
                <p>Max Budget: ${{ job.maxBudget }}</p>

                <comments-list></comments-list> 
                <comment-create></comment-create> 
                
                <hr/>

                <offers-table></offers-table> 
                <offer-create></offer-create> 
            </b-card>
                    
        </b-col>
    </b-row>
</template>

<script>
import CommentCreate from './comment-create.vue'
import CommentsList from './comments-list.vue'
import OffersTable from './offers-table.vue'
import OfferCreate from './offer-create.vue'

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
        CommentCreate,
        CommentsList,
        OfferCreate,
        OffersTable
    },
    created() {
        this.getJob()
    }
}
</script>
