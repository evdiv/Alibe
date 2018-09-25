<template>
    <b-container>

        <transition name="fade">
            <div v-if="performingRequest" class="loading">
                <p>Loading...</p>
            </div>
        </transition>

        <b-row>
            <b-col>
                <h1>Alibe</h1>
                <p>Welcome to the Alibe app powered by Vue.js and Firebase.</p>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <form v-if="showLoginForm" @submit.prevent>
                    <h3>Welcome Back</h3>

                    <b-row>
                        <b-col sm="2"><label for="email">Email</label></b-col>
                        <b-col sm="3">
                            <b-form-input type="text" 
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
                            <b-button size="sm" variant="link" @click="togglePasswordReset">Forgot Password</b-button>
                            <b-button size="sm" variant="link" @click="toggleForm">Create an Account</b-button>
                        </b-col>
                    </b-row>

                </form>
                <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
                    <h3>Get Started</h3>

                    <label for="name">Name</label>
                    <input v-model.trim="signupForm.name" type="text" placeholder="Your Name" id="name" />

                    <label for="title">Title</label>
                    <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />

                    <label for="email2">Email</label>
                    <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

                    <label for="password2">Password</label>
                    <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />

                    <button @click="signup" class="button">Sign Up</button>

                    <div class="extras">
                        <a @click="toggleForm">Back to Log In</a>
                    </div>
                </form>
                <form v-if="showForgotPassword" @submit.prevent class="password-reset">
                    <div v-if="!passwordResetSuccess">
                        <h3>Reset Password</h3>
                        <p>We will send you an email to reset your password</p>

                        <label for="email3">Email</label>
                        <input v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3" />

                        <button @click="resetPassword" class="button">Submit</button>

                        <div class="extras">
                            <a @click="togglePasswordReset">Back to Log In</a>
                        </div>
                    </div>
                    <div v-else>
                        <h3>Email Sent</h3>
                        <p>check your email for a link to reset your password</p>
                        <button @click="togglePasswordReset" class="button">Back to login</button>
                    </div>
                </form>
                <transition name="fade">
                    <div v-if="errorMsg !== ''" class="error-msg">
                        <p>{{ errorMsg }}</p>
                    </div>
                </transition>
            </b-col>
        </b-row>

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
                showLoginForm: true,
                showForgotPassword: false,
                passwordResetSuccess: false,
                performingRequest: false,
                errorMsg: ''
            }
        },
        methods: {
            toggleForm() {
                this.errorMsg = ''
                this.showLoginForm = !this.showLoginForm
            },
            togglePasswordReset() {
                if (this.showForgotPassword) {
                    this.showLoginForm = true
                    this.showForgotPassword = false
                    this.passwordResetSuccess = false
                } else {
                    this.showLoginForm = false
                    this.showForgotPassword = true
                }
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