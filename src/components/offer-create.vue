<template>
    <b-row>
        <b-col>
            <form @submit.prevent>
                <b-form-group label="Your Offer" label-size="md" v-if="showPostForm" >
                    <b-form-input v-model="amount"
                                type="number"
                                placeholder="Offer amount">
                    </b-form-input>
                </b-form-group>

                <b-form-group v-if="showPostForm" >
                    <b-form-textarea v-model="details"
                                    placeholder="Enter details of your offer"
                                    :rows="4"
                                    :max-rows="6">
                    </b-form-textarea>
                </b-form-group>

                <b-form-group align="right">
                    <b-button variant="warning"
                            v-if="!showPostForm" 
                            size="sm"
                            @click="showPostForm = true">Add Offer
                    </b-button>

                    <b-button variant="success"
                            v-if="showPostForm" 
                            size="sm"
                            @click="addOffer" 
                            :disabled="details == ''">Post Offer
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
            amount: '',
            posted: false,
            showPostForm: false
        }
    },
    computed: {
      ...mapState(['userProfile', 'currentUser'])  
    },
    methods: {
        addOffer() {
            this.showPostForm = false

            fb.offersCollection.add({
                createdOn: new Date(),
                job_id: this.job_id,
                amount: this.amount, 
                details: this.details,
                user_id: this.userProfile.user_id,
                userName: this.userProfile.name,
                accepted: 0
            }).then(
                fb.jobsCollection.where('job_id', '==', this.job_id).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            offers: ++doc.data().offers
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
            this.amount = 0,
            this.details = ''

            setTimeout(() => {
                this.posted = false
            }, 2000)
        }
    }
}
</script>