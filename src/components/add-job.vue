<template>
	<div class="input-group">
		<input type="text" @keyup.enter="addJob" v-model="newJob" placeholder="add job" class="form-control">
		<span class="input-group-btn">
		  	<button @click="addJob" class="btn btn-default" type="button">Add!</button>
		</span>
	</div>
</template>

<script>
export default {
	props: ['id'],
	data () {
	  	return {
			newJob: ''
	  	}
	},
	methods: {
	  	addJob () {
			let text = this.newJob.trim();
			if (text) {
			  	this.$emit('add', this.newJob);
			  	this.newJob = '';
			  	this.$store.dispatch('updateJobs', this.id);
			}
	  	}
	}
}
</script>

<style scoped>
</style>