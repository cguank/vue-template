<template>
  <div>
    <textarea style="height:300px;" :id="id"></textarea>
  </div>
</template>
<script>
export default {
  name: 'ckeditor4',
  props: {
    'value': String,
  },
  data: function () {
    return {
      id: parseInt(Math.random() * 10000).toString(),
      ckeditor: null,
    }
  },
  methods: {
    ckEditorFun () {
      var that = this
      // 渲染编辑器
      this.ckeditor = window.CKEDITOR.replace(this.id)
      //初始化
      window.ckeditor = this.ckeditor;
      let editor = this.ckeditor;
      // setTimeout(() => {
      //   if (editor.contextMenu) {
      //     console.log(1111);
          
      //     editor.addMenuGroup('abbrGroup');
      //     editor.addMenuItem('abbrItem', {
      //       label: 'Edit Abbreviation',
      //       icon:'/static/ckeditor-v1/plugins/abbr/icons/abbr.png',
      //       command: 'abbr',
      //       group: 'abbrGroup'
      //     });
      //     editor.contextMenu.addListener(function (element) {
      //       if (element.getAscendant('abbr', true)) {
      //         return { abbrItem: CKEDITOR.TRISTATE_OFF };
      //       }
      //     });
      //   }
      // }, 500);

      this.ckeditor.setData(this.value)
      // 监听内容变更事件
      this.ckeditor.on('change', function () {
        that.$emit('input', that.ckeditor.getData())
      })

    }
  },
  mounted: function () {
    this.ckEditorFun();
  },

}
</script>
<style type="text/css">
.cke_contents.cke_reset {
  height: 300px !important;
}
</style>
