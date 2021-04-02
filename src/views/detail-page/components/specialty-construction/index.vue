<template>
     <el-form>
        <el-row>
          <div class="form-header">
            <span>专业建设</span>
          </div>
        </el-row>
       <Tinymce  value="form.content" v-model="form.content"/>


            
            
           
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="专业名称">
            <div class="cell-content">
              <span>{{ info.nameOfSpecialty }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="专业认证">
            <div class="cell-content">
              <span>{{ info.certificationOfSpecialty }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="专业评估">
            <div class="cell-content">
              <span>{{ info.evaluationOfSpecialty }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="获得特色、综合改革试点专业等称号">
            <div class="cell-content">
              <span>{{ info. features }}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

     

        <!-- <el-table :data="info" empty-text="暂无数据">
          <el-table-column prop="nameOfSpecialty" label="专业名称"></el-table-column>
          <el-table-column prop="certificationOfSpecialty" label="专业认证"></el-table-column>
          <el-table-column prop="evaluationOfSpecialty" label="专业评估"></el-table-column>
          <el-table-column prop="features" label="获得特色、综合改革试点专业等称号"></el-table-column>
        </el-table> -->
      </el-form>
</template>



<script>
import Tinymce from '../tinymce-editor/index'
import { fetchInfo } from '@/api/detail-page/specialty-construction/index'
import { parseTime } from '@/utils/index'
export default {
  components: {
    Tinymce,
  },
    props: {
     header: {
       type: String,
      required: true
     },
    specialtyConstructionID: {
       type: String,
       required: true
     }
  },
  filters: {
     parseTime: function (value) {
       if (!value) return ''
         const date = new Date(value)
        return parseTime(date, '{y}年{m}月')
     }
  },
  data() {
    return {
      info:{},
      form: {
        content: ''
      }

    }
  },
  watch: {
    specialtyConstructionID: function (n, o) {
      this.specialtyConstructionID = n;

      this.getInfo();
    },
  },
  created() {
    // this.getInfo()
  },
  methods: {
   getInfo() {
      fetchInfo(this.specialtyConstructionID).then((result) =>{
 
          this.info = result.data.info
          this.form.content = result.data.content.html
      }).catch((err)=>{
        console.log(err)
      }
      )
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

.cell-content span {
  padding: 1px 10px;
  border-bottom: 1px solid #000000;
}
</style>