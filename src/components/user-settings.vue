<template>
    <b-row>
        <b-col cols='8' offset="2">
            <h3>Settings</h3>
            <p>Update your profile</p>

            <b-alert v-if="showSuccess" show variant="success">
                Your profile has been updated
            </b-alert>

            <b-card bg-variant="light">
                <form @submit.prevent>
                    <b-form-group label="Name" label-size="md">
                        <b-form-input v-model="name"
                                    type="text"
                                    :placeholder="userProfile.name">
                        </b-form-input>
                    </b-form-group>


                    <b-form-group label="Title" label-size="md">
                        <b-form-input type="text" 
                                    v-model="title"
                                    :placeholder="userProfile.title">
                        </b-form-input>
                    </b-form-group>


                    <b-form-group label="Details" label-size="md">
                        <b-form-textarea v-model="description"
                                        :placeholder="userProfile.description"
                                        :rows="3"
                                        :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>


                    <b-form-group align="right">
                        <b-button variant="success" 
                                @click="updateProfile">Update Profile
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
            name: '',
            title: '',
            description: '',
            showSuccess: false
        }
    },
    computed: {
        ...mapState(['userProfile', 'currentUser'])  
    },
    methods: {
        updateProfile() {

            let name = (this.name === '') ? this.userProfile.name : this.name
            let title = (this.title === '') ? this.userProfile.title : this.title
            let description = (this.description === '') ? this.userProfile.description : this.description                        

			fb.usersCollection.doc(this.currentUser.uid).update({ name, title, description
            }).then(user => {
				// update all comments by user to reflect new name
				fb.jobsCollection.where('userId', '==', this.currentUser.uid).get().then(docs => {
					docs.forEach(doc => {
						fb.jobsCollection.doc(doc.id).update({
							userName: name
						})
					})
				})
				// update all comments by user to reflect new name
				fb.commentsCollection.where('userId', '==', this.currentUser.uid).get().then(docs => {
					docs.forEach(doc => {
						fb.commentsCollection.doc(doc.id).update({
							userName: name
						})
					})
                })
				// update all offers by user to reflect new name
				fb.offersCollection.where('userId', '==', this.currentUser.uid).get().then(docs => {
					docs.forEach(doc => {
						fb.offersCollection.doc(doc.id).update({
							userName: name
						})
					})
                })         

            }).then(ref => {
                this.$store.commit('setUserProfile', { name, title, description})
                
                this.showSuccess = true
                setTimeout(() => {
                    this.showSuccess = false
                }, 2000)
            
            }).catch(err => {
				console.log(err)
			})

        }
    }
}

</script> 