<template>
  <div>
    <div>
      <div class="nav-header">
        <router-link to="promise-state">
          <a>前往promise状态机实现</a>
        </router-link>
      </div>
      <div class="nav-header">
        <router-link to="promise-async">
          <a>前往promise异步实现</a>
        </router-link>
      </div>
      <div class="nav-header">
        <router-link to="promise-chain">
          <a>前往promise链式调用实现</a>
        </router-link>
      </div>
      <div class="nav-header">
        <router-link to="promise-allsettled">
          <a>前往promise allsettled实现</a>
        </router-link>
      </div>
      <div class="nav-header">
        <router-link to="eventloop">
          <a>前往事件循环</a>
        </router-link>
      </div>

    </div>
    <div class="router-view-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  created: function () { },

  mounted () { },

  methods: {}
}

</script>
<style scoped>
  .nav-header {
    display: inline-block;
    height: 20px;
    background-color: aqua;
    margin: 20px 0;
  }
  .router-view-body {
    margin-top:10px;
  }
</style>