<template>
    <b-container>
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand href="/">Alibe</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                <b-nav-item href="/dashboard">Dashboard</b-nav-item>
                <b-nav-item href="/settings">Settings</b-nav-item>
                    <b-nav-item @click="logout">Logout</b-nav-item>
                </b-navbar-nav>
            </b-collapse>

        </b-navbar>
    </b-container>
</template>


<script>
    const fb = require('../firebaseConfig.js')

    export default {
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