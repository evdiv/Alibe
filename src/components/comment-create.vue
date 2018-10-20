<template>
    <b-row>
        <b-col>
            <form @submit.prevent>
                <b-form-group>
                    <b-form-textarea v-model="details" 
                                    v-if="showPostForm" 
                                    placeholder="Enter your comment" 
                                    :rows="3" 
                                    :max-rows="4">
                    </b-form-textarea>
                </b-form-group>

                <b-form-group align="right">
                    <b-button variant="warning"
                            v-if="!showPostForm" 
                            size="sm"
                            @click="showPostForm = true">Add Comment
                    </b-button>


                    <b-button variant="success" 
                            v-if="showPostForm" 
                            size="sm"
                            @click="addComment" 
                            :disabled="details == ''">Post Comment
                    </b-button>
                </b-form-group>
            </form>
        </b-col>
    </b-row>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            job_id: parseInt(this.$route.params.id),
            details: '',
            posted: false,
            showPostForm: false
        }
    },
    computed: {
      ...mapState(['userProfile', 'currentUser'])  
    },
    methods: {
        addComment() {
            fb.commentsCollection.add({
                createdOn: new Date(),
                job_id: this.job_id,
                details: this.details,
                user_id: this.userProfile.user_id,
                userName: this.userProfile.name
            }).then(
                fb.jobsCollection.where('job_id', '==', this.job_id).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            comments: ++doc.data().comments
                        })
                    })
                }).then(() => {
                    this.posted = true
                    this.resetForm()
                })

            ).catch(err => {
                console.log(err)
            })
        },
        resetForm() {
            this.details = ''

            setTimeout(() => {
                this.posted = false
            }, 2000)
        }
    }
}
</script>

