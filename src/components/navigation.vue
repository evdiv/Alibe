<template>
    <b-container>
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand to="/">Alibe</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">
     
                <b-navbar-nav>
                    <b-nav-item to="/jobs">Available Jobs</b-nav-item>
                </b-navbar-nav>


                <b-navbar-nav v-if="currentUser" class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template slot="button-content">
                            <em>{{ userProfile.name }}</em>
                        </template>

                        <b-dropdown-item to="/job-create">Add Job</b-dropdown-item>
                        <b-dropdown-item to="/settings">Profile</b-dropdown-item>
                        <b-dropdown-item @click="logout">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <b-navbar-nav v-else class="ml-auto">
                    <b-nav-item to="/login">Log In</b-nav-item>
                    <b-nav-item to="/register">Register</b-nav-item>
                </b-navbar-nav>


            </b-collapse>
        </b-navbar>

    </b-container>
</template>


<script>
    import { mapState } from 'vuex'
    const fb = require('../firebaseConfig.js')

    export default {
        computed: {
            ...mapState(['currentUser', 'userProfile'])
        },
        methods: {
            logout() {
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>