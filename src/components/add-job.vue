<template>
    <b-row>
        <b-col cols='8' offset="2">
            <h3>Add new job</h3>
            <p>Set title, description and budget of new job</p>
            
            <b-alert show variant="success" v-if='job.posted'>
                New job has been added
            </b-alert>

            <b-card bg-variant="light">

                <form @submit.prevent>
                    <b-form-group label="Job Details" label-size="md">
                        <b-form-input v-model="job.title"
                                    type="text"
                                    placeholder="Enter job title">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Job Details" label-size="md">
                        <b-form-textarea v-model="job.details"
                                        placeholder="Enter job description"
                                        :rows="3"
                                        :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>

                    <b-form-group label="Max Budget" label-size="md">
                        <b-form-input v-model="job.maxBudget"
                                    type="number"
                                    placeholder="Enter job max budget">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group align="right">
                        <b-button variant="success"
                                @click="addJob" 
                                :disabled="job.content == ''">Add Job
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
            job: {
                title: '',
                details: '',
                maxBudget: 0,
                posted: false
            },

        }
    },
    computed: {
      ...mapState(['userProfile', 'currentUser'])  
    },
    methods: {
        addJob() {
            fb.jobsCollection.add({
                createdOn: new Date(),
                title: this.job.title,
                details: this.job.details,
                maxBudget: this.job.maxBudget,
                userId: this.currentUser.uid,
                userName: this.userProfile.name,
                comments: 0,
                offers: 0
            }).then(ref => {
                this.job.posted = true
                this.resetForm()
            }).catch(err => {
                console.log(err)
            })
        },

        resetForm() {
            this.job.title = ''
            this.job.details = ''
            this.job.maxBudget = ''

            setTimeout(() => {
                this.job.posted = false
            }, 2000)
        }
    }
}
</script>

