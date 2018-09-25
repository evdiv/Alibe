<template>
    <b-container>
        <b-nav>
            <b-nav-item><a href='/'><h3>Alibe</h3></a></b-nav-item>
            <b-nav-item><a href='/dashboard'>Dashboard</a></b-nav-item>
            <b-nav-item><a href='/settings'>Settings</a></b-nav-item>
            <b-nav-item><a @click="logout">logout</a></b-nav-item>
        </b-nav>
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