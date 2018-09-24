<template>
    <div id="dashboard">
        <section>

            <div class="col1">
                <div class="profile">
                    <h5>{{ userProfile.name }} - {{ userProfile.title }}</h5>
                    
                    <div class="create-job">
                        <form @submit.prevent>
                            <textarea v-model.trim="job.content"></textarea>
                            <button @click="addJob" :disabled="job.content == ''" class="button">Add Job</button>
                        </form>
                    </div>

                </div>
            </div>

            <!-- Jobs listing -->
            <div class="col2">
                <div v-if="jobs.length">
                    <div v-for="job in jobs" :key=job.id class="job">
                        <h5>{{ job.userName }}</h5>
                        <span>{{ job.createdOn | formatDate }}</span>
                        <p>{{ job.content | trimLength }}</p>
                        <ul>
                            <li><a @click="openCommentModal(job)">comments {{ job.comments }}</a></li>
                            <li><a @click="openOfferModal(job)">offers {{ job.offers }}</a></li>
                            <li><a @click="viewJob(job)">view full job</a></li>
                        </ul>
                    </div>
                </div>

                <div v-else>
                    <p class="no-results">There are currently no available jobs</p>
                </div>
            </div>
        </section>



        <!-- Add a Comment modal -->
        <transition name="fade">
            <div v-if="showCommentModal" class="c-modal">
                <div class="c-container">
                    <a @click="closeCommentModal">X</a>

                    <form @submit.prevent>
                        <textarea v-model.trim="comment.content"></textarea>
                        <button @click="addComment" :disabled="comment.content == ''" class="button">add comment</button>
                    </form>
                </div>
            </div>
        </transition>

        
        <!-- Add an Offer modal -->
        <transition name="fade">
            <div v-if="showOfferModal" class="o-modal">
                <div class="o-container">
                    <a @click="closeOfferModal">X</a>

                    <form @submit.prevent>
                        <textarea v-model.trim="offer.content"></textarea>
                        <button @click="addOffer" :disabled="offer.content == ''" class="button">add offer</button>
                    </form>
                </div>
            </div>
        </transition>



        <!-- full job modal -->
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
                            <li><a>offers {{ fullJob.offers }}</a></li>
                        </ul>
                    </div>
                    <div v-show="comments.length">
                        <div v-for="comment in comments" class="comment">
                            <p>{{ comment.userName }}</p>
                            <span>{{ comment.createdOn | formatDate }}</span>
                            <p>{{ comment.content }}</p>
                        </div>
                    </div>

                    <div v-show="offers.length" class="offers">
                        <div v-for="offer in offers" class="offer">
                            <p>{{ offer.userName }}</p>
                            <span>{{ offer.createdOn | formatDate }}</span>
                            <p>{{ offer.content }}</p>
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
                showOfferModal: false,
                showJobModal: false,
                fullJob: {},
                comments: [],
                offers:[]
            }
        },
        computed: {
            ...mapState(['userProfile', 'currentUser', 'jobs'])
        },
        methods: {

            addJob() {
                fb.jobsCollection.add({
                    createdOn: new Date(),
                    content: this.job.content,
                    userId: this.currentUser.uid,
                    userName: this.userProfile.name,
                    comments: 0,
                    offers: 0
                }).then(ref => {
                    this.job.content = ''
                }).catch(err => {
                    console.log(err)
                })
            },

            addComment() {
                let jobId = this.comment.jobId
                let jobComments = this.comment.jobComments

                console.log(jobId);

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

            addOffer() {
                let jobId = this.offer.jobId
                let jobOffers = this.offer.jobOffers
                fb.offersCollection.add({
                    createdOn: new Date(),
                    content: this.offer.content,
                    jobId: jobId,
                    userId: this.currentUser.uid,
                    userName: this.userProfile.name
                }).then(doc => {
                    fb.jobsCollection.doc(jobId).update({
                        offers: jobOffers + 1
                    }).then(() => {
                        this.closeOfferModal()
                    })
                }).catch(err => {
                    console.log(err)
                })
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

            openOfferModal(job) {
                this.offer.jobId = job.id
                this.offer.userId = job.userId
                this.offer.jobOffers = job.offers
                this.showOfferModal = true
            },
            closeOfferModal() {
                this.offer.jobId = ''
                this.offer.userId = ''
                this.offer.content = ''
                this.showofferModal = false
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

                }).catch(err => {
                    console.log(err)
                })

               fb.offersCollection.where('jobId', '==', job.id).get().then(docs => {
                    let offersArray = []
                    docs.forEach(doc => {
                        let offer = doc.data()
                        offer.id = doc.id
                        offersArray.push(offer)
                    })
                    this.jobOffers = offersArray

                }).catch(err => {
                    console.log(err)
                })

                this.fullJob = job
                this.showJobModal = true                
            },
            closeJobModal() {
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