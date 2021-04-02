<template>
    <div>
      <el-form>
        <div class="form-header">
          <span>教学组织</span>
          
        </div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="教师总数（人）">
              <div class="cell-content">
                <span>{{form.totalNumberOfTeachers}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承担课程（门）">
              <div class="cell-content">
                <span>{{form.coursesUndertaken}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="人均周学时">
              <div class="cell-content">
                <span>{{form.perCapitaWeeklySchoolHours}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="人均指导毕业论文/设计">
              <div class="cell-content">
                <span>{{form.perCapitaGuidingGraduationThesis}}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="教学事故（次）">
              <div class="cell-content">
                <span>{{form.teachingAccident}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="综合评教优秀以上人数及比例">
              <div class="cell-content">
                <span>{{form.comprehensiveEvaluationOfExcellentTeaching}}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
       
       <Tinymce1  value="form.content" v-model="form.content"/>
        <el-table :data="info"  empty-text="暂无数据">
          <el-table-column prop="professorName" label="教授姓名"></el-table-column>
          <el-table-column prop="course" label="讲授课程"></el-table-column>
          <el-table-column prop="period" label="学时"></el-table-column>
          <el-table-column prop="studentNumbers" label="学生人数"></el-table-column>
          <el-table-column prop="semesterTime" label="学期时间"></el-table-column>
        </el-table>
        
      </el-form>
    </div>
</template>

<script>

import Tinymce from '../tinymce-editor/index'
import { fetchInfo } from '@/api/detail-page/organization/index'

export default {
   components: {
    'Tinymce1' : Tinymce,
  },
    props: {
   header: {
     type: String,
     required: true
   },
    teachingOrganizationID: {
      type: String,
      required: true 
    }
  },
   data() {
    return {
      form: {
          totalNumberOfTeachers: '',
          coursesUndertaken: '',
          perCapitaWeeklySchoolHours: '',
          perCapitaGuidingGraduationThesis: '',
          teachingAccident: '',
          comprehensiveEvaluationOfExcellentTeaching: '',
          content: ''
      },
      info: [],
      content: ''
    }
  },
  watch: {
    teachingOrganizationID: function (n, o) {
      this.teachingOrganizationID = n;

      this.getInfo();
    },
  },
  created() {
    // this.getInfo()
  },
  methods: {
    getInfo() {
      fetchInfo(this.teachingOrganizationID).then((result) => {
        this.form = result.data;
        this.info = result.data.info
        this.form.content = result.data.content.html
        //console.log(result)

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
