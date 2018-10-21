<template>
    <b-row>
        <b-col>

            <div v-if="offers.length">
                <b-table striped hover :items="offers" :fields="fields">

                    <template slot="userName" slot-scope="data">
                        <router-link :to="'/users/' + data.item.user_id">{{ data.value }}</router-link>
                    </template>

                    <template slot="amount" slot-scope="data">
                        <strong>${{ data.value }}</strong>
                    </template>

                    <template slot="createdOn" slot-scope="data">
                        {{ data.value | formatDate }}
                    </template>

                    <template slot="details" slot-scope="data">
                        <b-button size="sm" @click.stop="data.toggleDetails">
                            {{ data.detailsShowing ? 'Hide' : 'Show'}} Details
                        </b-button>                        
                    </template>

                    <template slot="row-details" slot-scope="data">
                        <b-card>
                            {{ data.item.details }}
                        </b-card>
                    </template>
                    
                    <template slot="accepted" slot-scope="data">
                        <b-button variant="success"
                            v-if="showAcceptBtn" 
                            size="sm"
                            @click="accept(data.item.key)">Accept
                        </b-button>        

                        <p class="text-success" v-if="data.value == 1">Accepted</p>
                    </template>

                </b-table>
            </div>

            <div v-else>
                <h5 class="text-center text-black-50">There are currently no offers</h5>
            </div>

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
                is_any_accepted: false,

                fields: [ 
                    {
                        key: 'userName',
                        label: 'User'
                    },
                    { 
                        key: 'amount',
                        label: 'Offer Amount'
                    },
                    {
                        key: 'createdOn',
                        label: 'Date'
                    },
                    {
                        key: 'details',
                        label: ''
                    },
                    {
                        key: 'accepted',
                        label: ''
                    }
                ]  
            }
        },
        methods: {
            accept(key) {
                fb.offersCollection.doc(key).update({ 
                    accepted: 1
                
                }).catch(err => {
				console.log(err)
			})
            }
        },
        computed: {
            ...mapState(['userProfile', 'offers']),

            showAcceptBtn() {
                if(this.userProfile.jobOwner && !this.is_any_accepted) {
                    return true
                }
                return false;
            },
        },
        created() {
		    fb.offersCollection.where('job_id', '==', this.job_id).orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
                let offers = []
                querySnapshot.forEach(doc => {
                    let offer = doc.data()
                        offer.key = doc.id

                    if(offer.accepted) {
                        this.is_any_accepted = true;
                    }
                    offers.push(offer)
                })
                this.$store.commit('setOffers', offers)
            })
        }
    }
</script>