<template>
  <div>
    <input type="text" :value="value" @input="$emit('input',$event.target.value)" />
  </div>
</template>

<script>
export default {
  props: {
    value:String
  },
  data () {
    return {
    };
  },

  created: function(){},

  methods: {}
}

</script>
<style>

</style>