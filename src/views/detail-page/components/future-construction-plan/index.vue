<template>
   <el-form>
        <el-row>
          <div class="form-header">
            <span>今后建设计划</span>
          </div>
        </el-row>
      <Tinymce  value="form.content" v-model="form.content"/>
      </el-form>
</template>

<script>

import Tinymce from '../tinymce-editor/index'
import {fetchInfo} from '@/api/detail-page/future-construction-plan/index'

export default {
  components: {
    Tinymce,
  },
     props: {
      header: {
         type: String,
         required: true
       },
       futureConstructionPlanID: {
          type: String,
         required: true
       }
  },
  data() {
    return {
      form: {
        content: ''
      }
    }
  },
  watch: {
    futureConstructionPlanID: function (n, o) {
      this.futureConstructionPlanID = n;

      this.getInfo();
    },
  },
  created() {
    // this.getInfo()
  },
  methods: {
     getInfo() {
        fetchInfo(this.futureConstructionPlanID).then((result) => {
        console.log(result)

        this.form.content = result.data.content.html
      }).catch((err) => {
        console.log(err)
      })
      }
  }
}
</script>


<style lang="scss" scoped>
.form-header {
  font-size: 1.8rem;
  margin-bottom: 20px;
  margin-top: 10px;
  span {
    padding: 3px 0;
    border-bottom: 3px solid #409eff;
  }
}

.section-content {
  margin-top: -20px;
  p {
    min-height: 110px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
}
</style>