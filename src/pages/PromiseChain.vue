<template>
  <div>
    <h2>Promise链式调用</h2>
    <div>
      <button @click="showPromiseChainExample">promise链式调用</button>
    </div>
    <div>
      <!-- <button @click="showPromiseChainArrLenght">promise链式回调数组的长度</button> -->
    </div>
    <div>
      <button @click="showPromiseChainThenError">promise链式回调then方法出错</button>
    </div>
    <div>
      <button @click="showWhyOnRejectedFnTryWithoutReject">promise链式回调为什么在onRejectedFn中try还是resolve而不是reject呢</button>
    </div>
  </div>
</template>

<script>
import { Promise3 as Promise } from "@/assets/js/promise";
export default {
  data () {
    return {
    };
  },

  created: function () {
  },

  mounted () { },

  methods: {
    showPromiseChainExample () {
      let p = new Promise((resolve,reject)=>{ //promise1
        console.log('in promise1');
        resolve(1);
      })
      p.then(r=>{ //promise2
        console.log('in then1',r);
        return 2;
      }).then(r=>{ //promise3
        console.log('in then2',r);
      })
      console.log('in global');
    },
    showPromiseChainArrLenght () {  //展示了onFulfilledArr的长度也可以大于1,并且如果promise对象灭有调用then方法那么长度为0
      Promise.prototype.resolve = function (val) {
        setTimeout(() => {
          this.data = val;
          this.status = "FULFILLED";
          console.log(this.onFulfilledFnArr.length);
          this.onFulfilledFnArr.map(onFulfilled => {
            onFulfilled(val);
          })
        });
      }

      function getWait (wait) {
        return new Promise((r, e) => {
          setTimeout(() => {
            r(wait);
          }, wait);
        })
      }
      let p = getWait(2000);
      p.then(r => {
        console.log('then1', r);
      })
      p.then(r => {
        console.log('then2', r);
      }).then(r => {
        console.log('then 3');
      })
      p.then(r => {
        console.log('then4', r);
      })
    },
    showPromiseChainThenError () {
      let p = new Promise((resolve, reject) => {
        resolve(1)
      })
      p.then(r => {
        console.log('in then1', r);
        throw new Error('in then err')
      }).catch(e => {
        console.log('in catch1', e);
      })
    },
    showWhyOnRejectedFnTryWithoutReject () {
      let p = new Promise((resolve, reject) => {
        reject(1)
      })
      p.then(console.log).catch(e => {
        console.log('in catch1', e);
      }).then(r => {
        console.log('in then 2', r);
      }).catch(e => {
        console.log('in catch2', e);
      })
    }
  }
}

</script>
<style >
div {
  margin: 10px;
}
</style>