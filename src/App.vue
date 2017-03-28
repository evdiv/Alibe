<template>
    <div id="app" class="container">
        <jobs-list-component :id="job.id" :title="job.title" :items="job.items"></jobs-list-component>
    </div>
</template>

<script>
    import JobListComponent from './components/JobListComponent'
    import store from './vuex/store'
    import { mapGetters, mapActions } from 'vuex'
    import _ from 'underscore'

    export default {
        components: {
            JobListComponent
        },
        store,
        mounted () {
            this.populateJobLists()
        }
    }
</script>

<style>
</style>
