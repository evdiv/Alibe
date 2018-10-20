<template>
    <b-row>
        <b-col>
            <p v-for="comment in comments" :key="comment.id"> 
                <small class='text-muted'>
                    {{ comment.createdOn | formatDate }}, 
                    <router-link :to="'/users/' + comment.user_id">{{ comment.userName }}</router-link> wrote: 
                    {{ comment.details }}
                </small>
            </p>
        </b-col>
    </b-row>
</template>

<script>
    import { mapState } from 'vuex'
    const fb = require('../firebaseConfig.js')

    export default {
        data() {
            return {
                job_id: parseInt(this.$route.params.id),
            }
        },
        computed: {
            ...mapState(['comments'])
        },
        created() {
		    fb.commentsCollection.where('job_id', '==', this.job_id).orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
                let comments = []
                querySnapshot.forEach(doc => {
                    let comment = doc.data()
                    comments.push(comment)
                })
                this.$store.commit('setComments', comments)
            })
        }
    }
</script>