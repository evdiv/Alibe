<template>
    <header>
        <section>
            <div class="col1">
                <a href='/'><h3>Alibe</h3></a>
                <ul class="inline">
                    <li><a href='/dashboard'>Dashboard</a></li>
                    <li><a href='/add-job'>Add Job</a></li>
                    <li><a href='/settings'>Settings</a></li>
                    <li><a @click="logout">logout</a></li>
                </ul>
            </div>
        </section>
    </header>
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