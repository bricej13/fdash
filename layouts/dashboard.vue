<template>
  <div class="wrapper">
    <no-ssr>
      <notifications>

      </notifications>
    </no-ssr>
    <div class="main-panel" id="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content>

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../assets/sass/paper-dashboard.scss";
  #main-panel.main-panel {
    float: none;
    width: initial;
  }
</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent
    },
    methods: {
    }
  }

</script>
