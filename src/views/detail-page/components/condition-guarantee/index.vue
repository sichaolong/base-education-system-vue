<template>
    <el-form  >
          <div class="form-header">
            <span>条件保障</span>
          </div>
       <Tinymce  value="form.content" v-model="form.content"/>
        <el-row  :gutter="20">
          <el-col :span="4">
            <el-form-item label="教师人数">
              <div class="cell-content">
                <span>{{form.numberOfTeacher}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item  label="年度运行经费">
              <div class="cell-content">
                <span>{{form.annualOperatingExpenses}}元</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item  label="行政办公面积">
              <div class="cell-content">
                <span>{{form.administrativeOfficeSpace}}平方米</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item  label="教学资料档案室面积">
              <div class="cell-content">
                <span>{{form.areaOfTeachingMaterialsArchives}}平方米</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="officeFacilities" label="办公设施">
              <div class="cell-content">
                <span>{{form.officeFacilities}}</span>
              </div>

            </el-form-item>
            
          </el-col>

        </el-row>
      </el-form>
</template>

<script>
import {fetchInfo} from '@/api/detail-page/condition-guarantee/index'
import Tinymce from '../tinymce-editor/index'
export default {
   components: {
    Tinymce,
  },
     props: {
       header: {
         type: String,
         required: true
       },
       conditionGuaranteeID: {
         type: String,
         required: true
       }
  },
  data() {
    return {
      form: {
          administrativeOfficeSpace: '',
          annualOperatingExpenses: '',
          areaOfTeachingMaterialsArchives: '',
          numberOfTeacher: '',
          officeFacilities: '',
          content: ''
      }
       
  
    }
  },
  watch: {
    conditionGuaranteeID: function (n, o) {
      this.conditionGuaranteeID = n;

      this.getInfo();
    },
  },
  created() {
   // this.getInfo()
  },
  methods: {
     getInfo() {
      fetchInfo(this.conditionGuaranteeID).then((result) => {
        console.log(result)

        const data = result.data.info
        for (const item in data) {
          if (typeof data[item] === 'function') {
            continue
          }
          this.form[item] = data[item]
        }
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

.cell-content span {
  padding: 1px 10px;
  border-bottom: 1px solid #000000;
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