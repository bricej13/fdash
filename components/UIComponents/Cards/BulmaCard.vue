<template>
  <div class="card">
    <header class="card-header">
      <div class="card-header-title">
        <slot name="title"></slot>
      </div>
    </header>


    <div class="card-content">
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>

    <footer class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "BulmaCard"
  }
</script>

<style scoped>

</style>
