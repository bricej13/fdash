<template>
  <div class="card">
    <header class="card-header">
      <div class="card-header-title">
        <slot name="title"></slot>
      </div>
      <div class="card-header-icon">
        <slot name="titleIcon"></slot>
      </div>
    </header>


    <div class="card-content">
      <b-loading :is-full-page="false" :active="loading" :canCancel="false"></b-loading>
      <div class="content" :class="{invisible: loading}">
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
    name: "BulmaCard",
    props: ['loading']
  }
</script>

<style scoped>
  * {
    transition: opacity .2s ease-in-out;
  }
  .card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .invisible {
    opacity: 0;
  }

</style>
