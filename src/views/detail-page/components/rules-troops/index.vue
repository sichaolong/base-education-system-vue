<template>
    <div>
       <div class="form-header">
        <span>规章制度建设
         
        </span>
      </div>
      <el-form>
         <Tinymce   value="form.content" v-model="form.content"/>
      </el-form>
    </div>
</template>

<script>


import Tinymce from '../tinymce-editor/index'
import { fetchInfoRule } from '@/api/detail-page/rules-troops/index'

export default {
  components: {
    Tinymce,
  },
  data() {
      return {
          form: {
          content: ''
      }
  }
  },
    props: {
    header: {
      type: String,
      required: true
    },
    ruleAndRegulationID: {
      type: String,
      required: true
    }
},
watch: {
    ruleAndRegulationID: function (n, o) {
      this.ruleAndRegulationID = n;

      this.getInfo();
    },
  },
 created() {
   // this.getInfo()
  },
  methods: {
    getInfo() {
      fetchInfoRule(this.ruleAndRegulationID).then((result) => {
        this.form.content = result.data.content.html
        //console.log(this.form.content)
      }).catch((err) => {
        console.log(err)
      })
    } 
  }
}
</script>
<style  lang="scss"  scoped>
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
