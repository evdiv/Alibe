<template>
  <div>
    <h2>{{ title }}</h2>
    <jobs-component :jobs="jobs" :id="id"></jobs-component>
    <div class="footer"></div>
  </div>
</template>

<script>
  import jobsComponent from './jobsComponent'
  export default {
    components: {
      jobsComponent
    },
    props: ['id', 'title', 'jobs'],
  }
</script>

<style scoped>
  .footer {
    font-size: 0.7em;
    margin-top: 20vh;
  }
</style>