<template>
    <div id="dashboard">
        <section>
            <div class="col1">
                <div class="profile">
                    <h5>{{ userProfile.name }}</h5>
                    <p>{{ userProfile.title }}</p>
                    <div class="create-job">
                        <p>create a job</p>
                        <form @submit.prevent>
                            <textarea v-model.trim="job.content"></textarea>
                            <button @click="createJob" :disabled="job.content == ''" class="button">Add</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col2">
                <transition name="fade">
                    <div v-if="hiddenJobs.length" @click="showNewJobs" class="hidden-posts">
                        <p>
                            Click to show <span class="new-jobs">{{ hiddenJobs.length }}</span>
                            new <span v-if="hiddenJobs.length > 1">jobs</span><span v-else>job</span>
                        </p>
                    </div>
                </transition>
                <div v-if="jobs.length">
                    <div v-for="job in jobs" :key=job.id class="job">
                        <h5>{{ job.userName }}</h5>
                        <span>{{ job.createdOn | formatDate }}</span>
                        <p>{{ job.content | trimLength }}</p>
                        <ul>
                            <li><a @click="openCommentModal(job)">comments {{ job.comments }}</a></li>
                            <li><a @click="likeJob(job.id, job.likes)">likes {{ job.likes }}</a></li>
                            <li><a @click="viewJob(job)">view full job</a></li>
                        </ul>
                    </div>
                </div>
                <div v-else>
                    <p class="no-results">There are currently no jobs</p>
                </div>
            </div>
        </section>

        <!-- comment modal -->
        <transition name="fade">
            <div v-if="showCommentModal" class="c-modal">
                <div class="c-container">
                    <a @click="closeCommentModal">X</a>
                    <p>add a comment</p>
                    <form @submit.prevent>
                        <textarea v-model.trim="comment.content"></textarea>
                        <button @click="addComment" :disabled="comment.content == ''" class="button">add comment</button>
                    </form>
                </div>
            </div>
        </transition>

        <!-- post modal -->
        <transition name="fade">
            <div v-if="showJobModal" class="p-modal">
                <div class="p-container">
                    <a @click="closeJobModal" class="close">X</a>
                    <div class="post">
                        <h5>{{ fullJob.userName }}</h5>
                        <span>{{ fullJob.createdOn | formatDate }}</span>
                        <p>{{ fullJob.content }}</p>
                        <ul>
                            <li><a>comments {{ fullJob.comments }}</a></li>
                            <li><a>likes {{ fullJob.likes }}</a></li>
                        </ul>
                    </div>
                    <div v-show="jobComments.length" class="comments">
                        <div v-for="comment in jobComments" class="comment">
                            <p>{{ comment.userName }}</p>
                            <span>{{ comment.createdOn | formatDate }}</span>
                            <p>{{ comment.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import moment from 'moment'
    const fb = require('../firebaseConfig.js')
    export default {
        data() {
            return {
                job: {
                    content: ''
                },
                comment: {
                    jobId: '',
                    userId: '',
                    content: '',
                    jobComments: 0
                },
                showCommentModal: false,
                showJobModal: false,
                fullJob: {},
                jobComments: []
            }
        },
        computed: {
            ...mapState(['userProfile', 'currentUser', 'jobs', 'hiddenJobs'])
        },
        methods: {
            createJob() {
                fb.jobsCollection.add({
                    createdOn: new Date(),
                    content: this.job.content,
                    userId: this.currentUser.uid,
                    userName: this.userProfile.name,
                    comments: 0,
                    likes: 0
                }).then(ref => {
                    this.job.content = ''
                }).catch(err => {
                    console.log(err)
                })
            },
            showNewJobs() {
                let updatedJobsArray = this.hiddenJobs.concat(this.jobs)
                // clear hiddenPosts array and update posts array
                this.$store.commit('setHiddenJobs', null)
                this.$store.commit('setJobs', updatedJobsArray)
            },
            openCommentModal(job) {
                this.comment.jobId = job.id
                this.comment.userId = job.userId
                this.comment.jobComments = job.comments
                this.showCommentModal = true
            },
            closeCommentModal() {
                this.comment.jobId = ''
                this.comment.userId = ''
                this.comment.content = ''
                this.showCommentModal = false
            },
            addComment() {
                let jobId = this.comment.jobId
                let jobComments = this.comment.jobComments
                fb.commentsCollection.add({
                    createdOn: new Date(),
                    content: this.comment.content,
                    jobId: jobId,
                    userId: this.currentUser.uid,
                    userName: this.userProfile.name
                }).then(doc => {
                    fb.jobsCollection.doc(jobId).update({
                        comments: jobComments + 1
                    }).then(() => {
                        this.closeCommentModal()
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            likeJob(jobId, jobLikes) {
                let docId = `${this.currentUser.uid}_${jobId}`
                fb.likesCollection.doc(docId).get().then(doc => {
                    if (doc.exists) { return }
                    fb.likesCollection.doc(docId).set({
                        jobId: jobId,
                        userId: this.currentUser.uid
                    }).then(() => {
                        // update job likes
                        fb.jobsCollection.doc(jobId).update({
                            likes: jobLikes + 1
                        })
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            viewJob(job) {
                fb.commentsCollection.where('jobId', '==', job.id).get().then(docs => {
                    let commentsArray = []
                    docs.forEach(doc => {
                        let comment = doc.data()
                        comment.id = doc.id
                        commentsArray.push(comment)
                    })
                    this.jobComments = commentsArray
                    this.fullJob = job
                    this.showJobModal = true
                }).catch(err => {
                    console.log(err)
                })
            },
            closePostModal() {
                this.jobComments = []
                this.showJobModal = false
            }
        },
        filters: {
            formatDate(val) {
                if (!val) { return '-' }
                let date = val.toDate()
                return moment(date).fromNow()
            },
            trimLength(val) {
                if (val.length < 200) { return val }
                return `${val.substring(0, 200)}...`
            }
        }
    }
</script>