<template>
  <li>{{ job.text }}</li>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
        props: ['job', 'id'],
        methods: mapActions(['updateList']),
        watch: {
            'job.checked': function () {
                this.updateList(this.id)
            }
        }
  }
</script>
 
<style scoped>
</style>