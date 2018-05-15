<template>
  <div class="stat">
    <p>{{name}}</p>
    {{ value }}{{unit}}
  </div>
</template>

<script>
  export default {
    name: "Stat",
    props: ['name', 'value', 'unit']
  }
</script>

<style scoped>
  .stat {
    font-size: 2em;
  }

  .stat p {
    margin: 0;
  }
</style>
