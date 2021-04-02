<template>
  <div>
      <div class="form-subtitle">
        <span>审核意见反馈</span>
      </div>
      <Tinymce ref="opinion" v-model="form.content.html" />
  </div>
</template>

<script>
import { fetchInfo } from '@/api/detail-page/opinion-feedback/index'
//import Tinymce from "@/views/detail-page/components/tinymce-editor/index";
import Tinymce from "../tinymce-editor/index";
export default {
    props: {
        opinionFeedbackID: {
            type: String
        }
    },
    components: {
        Tinymce
    },
    data() {
        return {
            form: {
                content:{
                    html: ''
                }
            }
        }
    },
    watch: {
        opinionFeedbackID:function(val,old){
            // console.log('bb')
            this.getInfo()
        }
    },
    methods: {
        getInfo() {
            fetchInfo(this.opinionFeedbackID).then((result)=>{
                // console.log('aa')
                // console.log(result)
                //this.form.content.html = result.data.content.html
                //this.$refs.future.setContent(result.data.content.html)
            })
        }
    }
}
</script>

<style lang="scss">
.form-subtitle {
  font-size: 1.3rem;
  margin: 15px 0;
  span {
    padding: 3px 0;
    border-bottom: 3px solid #409eff;
  }
}
.el-table {
  font-size: 20px;
}
</style>