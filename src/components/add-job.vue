<template>
	<div class="input-group">
		<input type="text" v-model="jobTitle" placeholder="add job title" @keyup.enter="addJob">
		<button @click="addJob">Add!</button>
	</div>
</template>

<script>
export default {
	data () {
	  	return {
			jobTitle: ''
	  	}
	},
	methods: {
	  	addJob () {
			let jobTitle = this.jobTitle.trim();
			if (jobTitle) {
				this.$store.commit('addJob', this.jobTitle)
				  this.jobTitle = '';
			}
	  	}
	}
}
</script>

<style scoped>
</style>