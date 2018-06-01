<template>
	<div>
	    <h2>Jobs Table</h2>
		<div v-for="(job, index) in jobs" :key="index" class="jobs">
            {{ job.title }}
		</div>
	</div>
</template>

<script>
    export default {
        computed: {
            jobs () {
                return this.$store.state.jobs
            }
        },
        methods: {
        },
        created () {
            this.$store.dispatch('getActiveJobs')
        }
    }

</script>