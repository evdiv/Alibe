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

                <template v-if="currentUser">
                    <comment-create></comment-create>
                </template>

               <template v-else>
                    <div align="right">
                        <router-link :to="'/register'"><small>Register for adding a comment</small></router-link>
                    </div>
               </template>     
                
                <hr/>

                <offers-table></offers-table> 
                <template v-if="currentUser">
                    <offer-create></offer-create> 
                </template>

               <template v-else>
                    <div align="right">
                        <router-link :to="'/register'"><small>Register for adding an offer</small></router-link>
                    </div>
               </template>  
            </b-card>
                    
        </b-col>
    </b-row>
</template>

<script>
import CommentCreate from './comment-create.vue'
import CommentsList from './comments-list.vue'
import OffersTable from './offers-table.vue'
import OfferCreate from './offer-create.vue'

import { mapState } from 'vuex'

const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            job: {  
                job_id: parseInt(this.$route.params.id)
            }
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile'])
    },
    methods: {
        getJob() {
            fb.jobsCollection.where('job_id', '==', this.job.job_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.job = doc.data()

                    if(this.job.user_id == this.userProfile.user_id) {
                        this.$store.commit('setJobOwner', true)
                    } else {
                        this.$store.commit('setJobOwner', false)                        
                    } 
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
