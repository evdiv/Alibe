<template>
	<div id="app">
		  <Navigation v-if="currentUser"></Navigation>

        <div class='container'>
			      <router-view/>
        </div>
		
	</div>
</template>

<script>
  import { mapState } from 'vuex'
  import Navigation from './components/navigation.vue'

  export default {
    components: { Navigation },
    computed: {
      ...mapState(['currentUser'])
    }
  }
</script>

<style scoped>
    .container {
        margin: 30px auto;
    }
</style>
