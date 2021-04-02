<template>
  <div >
     <section :id="tinymceId"  ></section>
  </div>
</template>

<script>
import './themes/silver/theme.min.js'
import './langs/zh_CN.js'
export default {
    props: {
         id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
        type: String,
        required: true
    }
    },
    data() {
        return {
            tinymceId: this.id,
            tinymceFlag: 1,
            hasChange: false,
            hasInit: false,
        }
    },
    mounted() {
        tinymce.init({
            selector:  `#${this.tinymceId}`,
            language: 'zh_CN',
            //菜单栏
            menubar : 'bar1 bar2',
            menu: {
              bar1: {title: '菜单栏', items: 'copy paste'}
            },
            //工具栏
            toolbar: 'undo redo | styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright ',

            //初始化内容
            setup: (editor) => {
                editor.on('init', (e) => {
                  editor.setContent(this.value)
                  this.hasInit = true
                })
            },
            readonly : 1,
        height: 600
        })
    },
    created() {

    },
//     destroyed() {
//     this.destroyTinymce()
//   },
//    deactivated() {
//     this.destroyTinymce()
//   },
//  activated() {
//  // 每次都给编辑器改变不同的key值使其每次切换页面都重新加载
//       this.tinymceFlag++;
//     },
    watch: {
      value(val) {
        if ( this.hasInit) {
          this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
        }
      }
    },
    methods: {
      setContent(value) {
        window.tinymce.get(this.tinymceId).setContent(value)
        },
    //   destroyTinymce() {
    //     const tinymce = window.tinymce.get(this.tinymceId)
    //     if(this.status)
    //     tinymce.destroy()
    //   if (tinymce) {
    //     tinymce.destroy()
    //   }
    // },
    }
}
</script>

<style>

@import url('./skins/ui/oxide/skin.min.css');

</style>