<template>
  <ul>
    <job-component v-for="job in jobs" :job="job" :id="id"></job-component>
  </ul>
</template>

<script>
  import jobComponent from './JobComponent'
  export default {
    components: {
      jobComponent
    },
    props: ['jobs', 'id']
  }
</script>

<style scoped>
</style>