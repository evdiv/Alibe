<template>
    <b-row>
        <b-col cols='8' offset="2">
            <b-alert v-if="performingRequest" show variant="success">
                <p>Loading...</p>
            </b-alert>

            <b-alert v-if="errorMsg !== ''" show variant="danger">
                {{ errorMsg }}
            </b-alert>

        </b-col>


        <b-col v-if="showLogInForm" cols='8' offset="2">
            <h3>Welcome Back</h3>

            <b-card bg-variant="light">
                <form @submit.prevent>
                    <b-form-group label="Email" label-size="md">
                        <b-form-input v-model="email"
                                    type="email"
                                    placeholder="your@mail.com">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Password" label-size="md">  
                        <b-form-input v-model="password"
                                    type="password"
                                    placeholder="******">
                        </b-form-input>                        
                    </b-form-group>                  

                    <b-form-group align="right">
                        <b-button variant="success" @click="login">Log In</b-button>
                    </b-form-group>

                </form>
            </b-card>
                <b-button size="sm" variant="link" @click="toggleForms">Forgot Password</b-button>
                <b-button size="sm" variant="link" to="/register">Create an Account</b-button>
        </b-col>


        <b-col v-if="showResetPasswordForm" cols='8' offset="2">
            <template v-if="passwordResetSuccess">
                <b-alert show variant="success">
                    <h5>Email Sent</h5>
                    <p>Check your email for a link to reset your password</p>
                </b-alert>   
            </template>

            <template v-else>
                <h3>Reset Password</h3>
                <p>We will send you an email to reset your password</p>
                
                <b-card bg-variant="light">
                    <form @submit.prevent>
                        <b-form-group label="Email" label-size="md">
                            <b-form-input v-model="email"
                                        type="email"
                                        placeholder="your@mail.com">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group align="right">
                            <b-button variant="success" @click="resetPassword">Submit</b-button>
                        </b-form-group>
                    </form>
                </b-card>
            </template>

            <b-button size="sm" variant="link" @click="toggleForms">Back to Log In</b-button>
        </b-col>
    </b-row>
</template>

<script>
const fb = require('../firebaseConfig.js')
export default {
    data() {
        return {
            email: '',
            password: '',
            errorMsg: '',
            showLogInForm: true,
            showResetPasswordForm: false,
            passwordResetSuccess: false,
            performingRequest: false
        }
    },
    methods: {
        clearData() {
            this.email = ''
            this.password = ''
            this.errorMsg = ''
        },
        toggleForms() {
            this.showLogInForm = !this.showLogInForm
            this.showResetPasswordForm = !this.showResetPasswordForm
            this.clearData()
        },
        login() {
            this.performingRequest = true
            fb.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
                
                this.$store.commit('setCurrentUser', user.user)
                this.$store.dispatch('fetchUserProfile')
                this.$router.push('/user-settings')

            }).catch(err => {
                console.log(err)
                this.clearData()
                this.performingRequest = false
                this.errorMsg = err.message
            })
        },
        resetPassword() {
            this.performingRequest = true
            fb.auth.sendPasswordResetEmail(this.email).then(() => {
                
                this.performingRequest = false
                this.passwordResetSuccess = true

            }).catch(err => {
                console.log(err)
                this.clearData()
                this.performingRequest = false
                this.errorMsg = err.message
            })
        }
    }
}
</script>