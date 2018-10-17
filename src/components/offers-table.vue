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

                </b-table>
            </div>

            <div v-else>
                <h4 class="text-center">There are currently no offers</h4>
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
                    }
                ]  
            }
        },
        computed: {
            ...mapState(['offers'])
        },
        beforeCreate() {

		    fb.offersCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
                let offers = []
                querySnapshot.forEach(doc => {
                    let offer = doc.data()
                    offers.push(offer)
                })
                this.$store.commit('setOffers', offers)
                console.log(offers)
            })
        
        }
    }
</script>