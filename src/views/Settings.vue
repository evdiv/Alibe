<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>Settings</h1>
                <p>Update your profile</p>

                <b-alert v-if="showSuccess" show variant="success">
                    Your profile has been updated
                </b-alert>
            </b-col>
        </b-row>
        

        <b-row>
            <b-col>
                <b-card bg-variant="light">
                    <form @submit.prevent>
                        <b-form-group>
                            <b-row>
                                <b-col sm="2"><label for="name">Name</label></b-col>
                                <b-col sm="3">
                                    <b-form-input type="text" 
                                                v-model.trim="name"
                                                :placeholder="userProfile.name"></b-form-input>
                                </b-col>
                            </b-row>
                        </b-form-group>

                        <b-form-group>
                            <b-row>
                                <b-col sm="2"><label for="title">Job Title</label></b-col>
                                <b-col sm="3">
                                    <b-form-input type="text" 
                                                v-model.trim="title"
                                                :placeholder="userProfile.title"></b-form-input>
                                </b-col>
                            </b-row>
                        </b-form-group>

                        <b-form-group align="right">
                            <b-row>
                                <b-col sm="5" class="text-right">
                                    <b-button variant="success" @click="updateProfile">Update Profile</b-button>
                                </b-col>
                            </b-row>
                        </b-form-group>
                    </form>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>


<script>
  import { mapState } from 'vuex'

  export default {
    data() {
        return {
            name: '',
            title: '',
            showSuccess: false
        }
    },
    computed: {
        ...mapState(['userProfile'])
    },
    methods: {
        updateProfile() {
            this.$store.dispatch('updateProfile', {
                name: this.name !== '' ? this.name : this.userProfile.name,
                title: this.title !== '' ? this.title : this.userProfile.title
            })

            this.name = ''
            this.title = ''

            this.showSuccess = true

            setTimeout(() => {
                this.showSuccess = false
            }, 2000)
        }
    }
}

</script> 