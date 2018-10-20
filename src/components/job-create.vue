<template>
    <b-row>
        <b-col cols='8' offset="2">
            <h3>Add new job</h3>
            <p>Set title, description and budget of new job</p>
            
            <b-alert show variant="success" v-if='posted'>
                New job has been added
            </b-alert>

            <b-card bg-variant="light">

                <form @submit.prevent>
                    <b-form-group label="Job Details" label-size="md">
                        <b-form-input v-model="title"
                                    type="text"
                                    placeholder="Enter job title">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Job Details" label-size="md">
                        <b-form-textarea v-model="details"
                                        placeholder="Enter job description"
                                        :rows="3"
                                        :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>

                    <b-form-group label="Max Budget" label-size="md">
                        <b-form-input v-model="maxBudget"
                                    type="number"
                                    placeholder="Enter job max budget">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group align="right">
                        <b-button variant="success"
                                @click="addJob" 
                                :disabled="details == ''">Add Job
                        </b-button>
                    </b-form-group>
                </form>

            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            job_id: 0,
            title: '',
            details: '',
            maxBudget: 0,
            posted: false
        }
    },
    computed: {
      ...mapState(['userProfile', 'currentUser'])  
    },
    methods: {
       addJob() {
            fb.jobsCollection.orderBy('createdOn', 'desc').limit(1).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.job_id = doc.data().job_id || 0
                })
                this.job_id = ++this.job_id
                this.postJob()

            }).catch(err => {
                console.log(err)
            })
        },

        postJob() {
            fb.jobsCollection.add({
                createdOn: new Date(),
                job_id: this.job_id,
                title: this.title,
                details: this.details,
                maxBudget: this.maxBudget,
                user_id: this.userProfile.user_id,
                userName: this.userProfile.name,
                comments: 0,
                offers: 0,
                active: 1
            }).then(ref => {
                this.posted = true
                this.$router.push('/jobs')
            }).catch(err => {
                console.log(err)
            })
        },

        resetForm() {
            this.title = ''
            this.details = ''
            this.maxBudget = ''

            setTimeout(() => {
                this.posted = false
            }, 2000)
        }
    }
}
</script>

