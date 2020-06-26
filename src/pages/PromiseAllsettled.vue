<template>
  <div>
    <h2>实现promise allsettled</h2>
    <button @click="showPromiseAllsettled">展示promise allsettled</button>
  </div>
</template>

<script>
import { Promise3 as Promise } from "@/assets/js/promise";
export default {
  data () {
    return {
    };
  },

  created: function () { },

  mounted () { },

  methods: {
    showPromiseAllsettled () {
      let getWait = function (wait,isFulfilled=true) {
        return new Promise((resolve,reject)=>{
          setTimeout(() => {
            if(isFulfilled) {
              resolve(wait);
            }else {
              reject(wait);
            }
            //isFulfilled && resolve(wait);
            //isFulfilled || reject(wait);
          }, wait);
        })
      }
      let p1 = getWait(1000);
      let p2 = getWait(3000,false);
      let p3 = getWait(2000);
      let p4 = getWait(4000,false);
      Promise.allsettled1 = function (promiseArr) {
        return new Promise((resolve, reject) => {
          let valArr = [];
          let count = 0;
          promiseArr.map((promise, index) => {
            promise.then(r => {
              valArr[index] = {
                value: r,
                done: 'FULFILLED'
              };
              count++;
              if (count === promiseArr.length) {
                resolve(valArr);
              }
            }).catch(err => {
              valArr[index] = {
                value: err,
                done: 'REJECTED'
              };
              count++;
              if (count === promiseArr.length) {
                resolve(valArr);
              }
            })
          })
        })
      }
      Promise.allsettled1([p1,p2,p3,p4]).then(r=>{
        console.log(r);
      })
    }
  }
}

</script>
<style>
</style>