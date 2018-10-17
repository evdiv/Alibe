<template>
    <b-row>
        <b-col cols='10' offset="1">
            <h3>{{ user.name }}</h3>
            <h5>{{ user.rating }}</h5>
            
            <b-card bg-variant="light">
                <p>{{ user.title}}</p>
                <p>{{ user.description }}</p>
                <p>Registered {{ user.createdOn | formatDate }}</p>  

                <comment-create></comment-create> 
            </b-card>
                    
        </b-col>
    </b-row>
</template>

<script>
import JobsTable from './jobs-table.vue'

const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            user: {
                user_id: parseInt(this.$route.params.id)
            }
        }
    },
    methods: {
        getUser() {
            fb.usersCollection.where('user_id', '==', this.user.user_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.user = doc.data()
                })

            }).catch(err => {
                console.log(err)
            })
        }
    },
    components: {
        JobsTable
    },
    created() {
        this.getUser()
    }
}
</script>
