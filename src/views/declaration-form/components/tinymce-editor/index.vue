<template>
  <div>
    <section :id="tinymceId"></section>
  </div>
</template>

<script>
import "./themes/silver/theme.min.js";
import "./langs/zh_CN.js";
export default {
  props: {
    // 对比其他vue-tinymce组件都要传入id我感到很不解，因为根本没这个必要，所以接下来先解决id自管理问题。
    id: {
      type: String,
      default: function () {
        return (
          "vue-tinymce-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      },
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // 自动生成的id
      tinymceId: this.id,
      tinymceFlag: 1,
      hasChange: false,
      hasInit: false,
    };
  },
  mounted() {
    tinymce.init({
      selector: `#${this.tinymceId}`,
      language: "zh_CN",
      //菜单栏
      menubar: "bar1 bar2",
      menu: {
        bar1: { title: "菜单栏", items: "copy paste" },
      },
      //工具栏
      toolbar:
        "undo redo | styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright | fontsizeselect | fontselect ",
      //字体样式设置
      font_formats:"宋体=宋体;仿宋=仿宋;黑体=黑体'",

      init_instance_callback: (editor) => {
      
        
      //input和change事件
        editor.on('input',(e) => {
          this.$emit('input',e.target.innerHTML);
        });
        editor.on('change',(e) => {
          this.$emit('input',e.level.content)
        })
      },
      //初始化内容
      setup: (editor) => {
        editor.on("init", (e) => {
          editor.setContent(this.value);
          // 初始化标识晚点设置，初始化之后值都不会变了，此时后端数据还没传过来
          //this.hasInit = true;
        });
      },
      height: 600,
    });
  },
  created() {},
  // 监听 富文本 的 值
  watch: {
    // 当传入值变化时跟新富文本内容
    value: function (val, old) {
      // 这里是初始化之后，也就是获取后端数据值后，才设置内容
      if (this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val)
        );
      }
    },
  },
  methods: {
    // 设置内容
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    // 获取内容
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    // 销毁
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.status) tinymce.destroy();
      if (tinymce) {
        tinymce.destroy();
      }
      console.log('aa')
    },
  },
};
</script>

<style>
@import url("./skins/ui/oxide/skin.min.css");
</style>