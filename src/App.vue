<template>
	<div id="app">
		<Navigation v-if="currentUser"></Navigation>
		
		<b-container>
			<router-view/>
		</b-container>
		
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