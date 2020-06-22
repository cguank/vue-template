<template>
  <div>
    <button @click="fn">click</button>
    <!-- <ckeditor v-model="content" :centerText="centerText" @func="getMsgDataFun"></ckeditor> -->
    <ckeditor v-model="content" ref="ccc"></ckeditor>
  </div>
</template>
<script>
import ckeditor from '@/components/withusercenter'
export default {
  components: {
    ckeditor
  },
  data () {
    return {
      content: '' //要使用String.raw``
    }
  },
  created () {
    // let latexStr = "这是一个latex，start：$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$end";
    // latexStr = latexStr.replace(/\$(.+)\$/, (match, p1) => {   
    //   return String.raw`<span class='math-tex'>\(${p1}\)</span>`
    // })
    // console.log(latexStr);
    
    // this.content = latexStr;
  },
  methods: {
    fn(){
      console.log(this.$refs.ccc.ckeditor);
      
      //this.$children.ckeditor.insertHtml("ssss")
    }
  }
}

</script>