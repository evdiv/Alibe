<template>
    <b-container>

        <b-row>
            <b-col>
                <h1>Alibe</h1>
                <p>Welcome to the Alibe app powered by Vue.js and Firebase.</p>
            </b-col>
        </b-row>

        <template v-if="performingRequest" class="loading">
                <p>Loading...</p>
        </template>

        <b-card bg-variant="light">
            <b-row>
                <b-col>
                    <form v-if="showForms.logIn" @submit.prevent>
                        <h3>Welcome Back</h3>
                        <b-row>
                            <b-col sm="2"><label for="email">Email</label></b-col>
                            <b-col sm="3">
                                <b-form-input type="email" 
                                            v-model.trim="loginForm.email"
                                            placeholder="your@email.com"></b-form-input>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="2"><label for="password">Password</label></b-col>
                            <b-col sm="3">
                                <b-form-input type="password" 
                                            v-model.trim="loginForm.password"
                                            placeholder="********"></b-form-input>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="5" class="text-right">
                                <b-button variant="success" @click="login">Log In</b-button>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col>
                                <b-button size="sm" variant="link" @click="togglePasswordResetForm">Forgot Password</b-button>
                                <b-button size="sm" variant="link" @click="toggleSignUpForm">Create an Account</b-button>
                            </b-col>
                        </b-row>
                    </form>


                    <form v-if="showForms.signUp" @submit.prevent>
                        <h3>Get Started</h3>

                        <b-row>
                            <b-col sm="2"><label for="name">Name</label></b-col>
                            <b-col sm="3">
                                <b-form-input type="text" 
                                            v-model.trim="signupForm.name"
                                            placeholder="Your name"></b-form-input>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="2"><label for="title">Title</label></b-col>
                            <b-col sm="3">
                                <b-form-input type="text" 
                                            v-model.trim="signupForm.title"
                                            placeholder="Title"></b-form-input>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="2"><label for="email">Email</label></b-col>
                            <b-col sm="3">
                                <b-form-input type="email" 
                                            v-model.trim="signupForm.email"
                                            placeholder="your@email.com"></b-form-input>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="2"><label for="password">Password</label></b-col>
                            <b-col sm="3">
                                <b-form-input type="password" 
                                            v-model.trim="signupForm.password"
                                            placeholder="min 6 characters"></b-form-input>
                            </b-col>
                        </b-row>                

                        <b-row>
                            <b-col sm="5" class="text-right">
                                <b-button variant="success" @click="signup">Sign Up</b-button>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col>
                                <b-button size="sm" variant="link" @click="toggleLogInForm">Back to Log In</b-button>
                            </b-col>
                        </b-row>
                    </form>


                    <form v-if="showForms.resetPassword" @submit.prevent>
                        <template v-if="!passwordResetSuccess">
                            <h3>Reset Password</h3>
                            <p>We will send you an email to reset your password</p>

                            <b-row>
                                <b-col sm="2"><label for="email">Email</label></b-col>
                                <b-col sm="3">
                                    <b-form-input type="email" 
                                                v-model.trim="passwordForm.email"
                                                placeholder="your@email.com"></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row>
                                <b-col sm="5" class="text-right">
                                    <b-button variant="success" @click="resetPassword">Submit</b-button>
                                </b-col>
                            </b-row>

                            <b-row>
                                <b-col>
                                    <b-button size="sm" variant="link" @click="toggleLogInForm">Back to Log In</b-button>
                                </b-col>
                            </b-row>
                        </template>

                        <b-alert v-else show variant="success">
                            <h5>Email Sent</h5>
                            <p>check your email for a link to reset your password</p>
                            <b-row>
                                <b-col>
                                    <b-button size="sm" variant="link" @click="toggleLogInForm">Back to Log In</b-button>
                                </b-col>
                            </b-row>
                        </b-alert>
                    </form>

                    <b-alert v-if="errorMsg !== ''" show variant="danger">
                        {{ errorMsg }}
                    </b-alert>

                </b-col>
            </b-row>
        </b-card>

    </b-container>
</template>

<script>
    const fb = require('../firebaseConfig.js')
    export default {
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                signupForm: {
                    name: '',
                    title: '',
                    email: '',
                    password: ''
                },
                passwordForm: {
                    email: ''
                },
                showForms: {
                    logIn: true,
                    signUp: false,
                    resetPassword: false
                },

                passwordResetSuccess: false,
                performingRequest: false,
                errorMsg: ''
            }
        },
        methods: {
            hideAll() {
                this.errorMsg = ''
                this.showForms.logIn = false
                this.showForms.signUp = false
                this.showForms.resetPassword = false
            },
            toggleLogInForm() {
                this.hideAll()
                this.showForms.logIn = true
            },            
            toggleSignUpForm() {
                this.hideAll()
                this.showForms.signUp = true
            },
            togglePasswordResetForm() {
                this.hideAll()
                 this.showForms.resetPassword = true
            },
            login() {
                this.performingRequest = true
                fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
                    this.$store.commit('setCurrentUser', user.user)
                    this.$store.dispatch('fetchUserProfile')
                    this.performingRequest = false
                    this.$router.push('/dashboard')

                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            },
            signup() {
                this.performingRequest = true
                fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
                    this.$store.commit('setCurrentUser', user.user)
                    // create user obj
                    fb.usersCollection.doc(user.uid).set({
                        name: this.signupForm.name,
                        title: this.signupForm.title
                    }).then(() => {
                        this.$store.dispatch('fetchUserProfile')
                        this.performingRequest = false
                        this.$router.push('/dashboard')
                    }).catch(err => {
                        console.log(err)
                        this.performingRequest = false
                        this.errorMsg = err.message
                    })
                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            },
            resetPassword() {
                this.performingRequest = true
                fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
                    this.performingRequest = false
                    this.passwordResetSuccess = true
                    this.passwordForm.email = ''
                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            }
        }
    }
</script>
