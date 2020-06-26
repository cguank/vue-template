<template>
  <div>
    <h2>实现promise之实现状态改变</h2>
    <div>
      <button @click="promiseStateChange">promise状态改变</button>
      <span v-if="msg1.isShow">{{msg1.text}}</span>
    </div>
    <div>
      <button @click="promiseStateChange2">promise状态改变,添上settimeout来异步执行</button>
      <span v-if="msg2.isShow">{{msg2.text}}</span>
    </div>
    <router-link to="/promise-async"><a>前往promise异步实现</a></router-link>
  </div>
</template>

<script>
import { Promise1 as Promise } from '@/assets/js/promise'
export default {
  data () {
    return {
      msg1: {
        text: '我们发现这个只是简单的改变了promise的状态，这时候还是同步执行',
        isShow: false
      },
      msg2: {
        text: '添上settimeout后，回调函数没有执行',
        isShow: false
      },
    };
  },

  created: function () {

  },

  mounted () { },

  methods: {
    promiseStateChange () {
      let p1 = new Promise((resolve, reject) => {
        console.log('in promise');
        resolve(1);
      })
      p1.then(r => {
        console.log('in then', r)
      })
      console.log('in global');
      this.msg1.isShow = !this.msg1.isShow;
    },
    promiseStateChange2 () {
      Promise.prototype.resolve = function (val) {
        setTimeout(() => {
          this.data = val;
          this.status = 'FULFILLED';
        });
      }
      let p1 = new Promise((resolve, reject) => {
        console.log('in promise2');
        resolve(2);
      })
      p1.then(r => {
        console.log('in then2', r);
      })
      console.log('in global');
      this.msg2.isShow = !this.msg2.isShow;
    }
  }
}

</script>
<style scoped>
div {
  margin: 10px;
}
</style>