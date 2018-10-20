<template>
    <b-row>
        <b-col cols='8' offset="2">
            <h3>Register</h3>
            <p>For using this tool, you need to register first</p>

            <b-alert v-if="performingRequest" show variant="success">
                <p>Loading...</p>
            </b-alert>

            <b-card bg-variant="light">
                <form @submit.prevent>
                    <b-form-group label="Name" label-size="md">
                        <b-form-input v-model="name"
                                    type="text"
                                    placeholder="Your name">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Title" label-size="md">
                        <b-form-input v-model="title"
                                    type="text"
                                    placeholder="Your Title">
                        </b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Email" label-size="md">
                        <b-form-input v-model="email"
                                    type="email"
                                    placeholder="your@mail.com">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Description" label-size="md">
                        <b-form-textarea v-model="description"
                                        placeholder="Short Description of your business"
                                        :rows="3"
                                        :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>                    

                    <b-form-group label="Password" label-size="md">
                        <b-form-input v-model="password"
                                    type="password"
                                    placeholder="min 6 characters">
                        </b-form-input>
                    </b-form-group>


                    <b-form-group align="right">
                        <b-button variant="success" 
                                @click="addUser">Register
                        </b-button>
                    </b-form-group>
                </form>
            </b-card>
            <b-button size="sm" variant="link" to="/login">Back to LogIn</b-button>
        </b-col>
    </b-row>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            user_id: 0,
            name: '',
            title: '',
            email: '',
            description: '',
            password: '',
            rating: 0,
            performingRequest: false
        }
    },
    methods: {
        addUser() {
            fb.usersCollection.orderBy('createdOn', 'desc').limit(1).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.user_id = doc.data().user_id || 0
                })
                this.user_id = ++this.user_id
                this.postUser()
                
            }).catch(err => {
                console.log(err)
            })
        },
        postUser() {
            this.performingRequest = true;
            fb.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
                this.$store.commit('setCurrentUser', user.user)

                fb.usersCollection.doc(user.user.uid).set({
                    user_id: this.user_id,
                    name: this.name,
                    title: this.title,
                    description: this.description,
                    rating: this.rating,
                    createdOn: new Date()

                }).then(() => {
                    this.$store.dispatch('fetchUserProfile')
                    this.performingRequest = false
                    this.$router.push('/settings')
                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            })
        }
    }
}
</script>

<style>

</style>
