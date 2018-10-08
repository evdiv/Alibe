<template>
	<div id="app">
		  <Navigation></Navigation>

        <div class='container'>
			      <router-view/>
        </div>
		
	</div>
</template>

<script>
  import Navigation from './components/navigation.vue'

  export default {
    components: { Navigation }
  }
</script>

<style scoped>
    .container {
        margin: 30px auto;
    }
</style>
