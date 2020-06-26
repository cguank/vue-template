<template>
  <div>
    <button @click="showEventloop">事件循环</button>
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

  methods: {
    showEventloop () {
      setTimeout(() => { //s1
        console.log(2);
        Promise.resolve(3).then(console.log) //p1
      });
      console.log(1);
      Promise.resolve(4).then(console.log) //p2
      console.log(5);
      let p3 = new Promise((resolve) => {
        setTimeout(() => { //s2
          console.log(9);
          resolve(7)
        });
        console.log(8);
      })
      p3.then(r => { //p3
        console.log(r);
      })
      setTimeout(() => { //s4
        console.log(6);
      });
    }
  }
}

</script>
<style>
</style>