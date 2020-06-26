<template>
  <div>
    <h2>Promise异步实现</h2>
    <div>
      <button @click="showPromiseAsyncExample">promise异步实现</button>
    </div>
    <div>
      <button @click="showPromiseChain">promise异步实现，链式调用</button>
       <span v-if="msg.isShow">{{msg.text}}</span>
    </div>
  </div>
</template>

<script>
import { Promise2 as Promise } from '@/assets/js/promise';
export default {
  data () {
    return {
      msg: {
        text: '因为then返回一个undefined，undefined.then报错',
        isShow: false
      }
    };
  },

  created: function () { },

  mounted () { },

  methods: {
    showPromiseAsyncExample () {
      let p = new Promise((resolve, reject) => {
        console.log('in promise');
        resolve(0)
      })
      p.then(r => {
        console.log('in then', r, 'second');
      })
      console.log('in global');
    },
    showPromiseChain () {
      this.msg.isShow=!this.msg.isShow;
      let p = new Promise((resolve, reject) => {
        console.log('in promise');
        resolve(0)
      })
      p.then(r => {
        console.log('in then1', r, 'second');
      }).then(r=>{
        console.log('in then 2',r);
      })
      console.log('in global');
    }
  }
}

</script>
<style scoped>
div {
  margin: 10px;
}
</style>