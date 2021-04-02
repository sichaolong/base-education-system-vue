<template>
  <!-- eslint-disable -->
  <div class="app-container">
    <el-card v-show="this.pageIndex == 0">
      <div slot="header" class="card-header">
        <span>个人概况</span>
      </div>

      <el-form>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="姓名">
              <div class="cell-content">
                <span>{{ tempData.name }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出生年月">
              <div class="cell-content">
                <span>{{ tempData.birthday }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别">
              <div class="cell-content">
                <span>{{ tempData.gender }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="政治面貌">
              <div class="cell-content">
                <span>{{ tempData.politicalAffiliation }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="最终学位">
              <div class="cell-content">
                <span>{{ tempData.degree }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职称">
              <div class="cell-content">
                <span>{{ tempData.profession }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="行政职务">
              <div class="cell-content">
                <span>{{ tempData.administrativePosition }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="高校教龄">
              <div class="cell-content">
                <span>{{ tempData.teachingAge }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="近2学年任教课程及学时"></el-form-item>
          <div class="cell-content">
            <span v-for="(item, index) in tempData.courseAndPeriod" :key="index" style="magin: 0 15px;">{{ item | courseFilter }}</span>
          </div>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-form-item>
            <el-button type="primary" @click="handleEdit">修改</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>

    <el-card v-show="this.pageIndex == 1">
      <el-form :model="tempData">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="tempData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出生年月">
              <el-date-picker
                v-model="tempData.birthday"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy年MM月dd日"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别">
              <el-select v-model="tempData.gender" placeholder="请选择性别" style="width: 100%">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="政治面貌">
              <el-input v-model="tempData.politicalAffiliation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="最终学位">
              <el-input v-model="tempData.degree"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职称">
              <el-input v-model="tempData.profession"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="行政职务">
              <el-input v-model="tempData.administrativePosition"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="高校教龄">
              <el-input v-model="tempData.teachingAge"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="近2学年任教课程及学时"></el-form-item>
          <el-form-item
            v-for="(item, index) in tempData.courseAndPeriod"
            :key="index"
            :prop="'courseAndPeriod.' + index"
            :label="'任教课程' + (index + 1) + '及学时'"
          >
            <el-input
              v-model="item.course"
              placeholder="课程名"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <el-input
              v-model="item.period"
              placeholder="学时"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <el-button v-show="index != 0" @click="removeCourse(item)">删除</el-button>
            <el-button
              v-show="tempData.courseAndPeriod.length == index + 1"
              type="primary"
              @click="addCourse()"
              >添加</el-button
            >
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" :loading="btnLoading">提交</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>

    <el-card v-show="this.pageIndex == 2">
      <div class="result-container">
        <div class="result-item">
          <svg-icon iconClass="success" style="width: 7rem; height: 7rem"></svg-icon>
        </div>
        <div class="result-item">
          <span class="result-item__h2">提交成功!</span>
        </div>
        <div class="result-item">
          <el-button type="primary" @click="handleBack">返回</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/index'
import { fetchTeacherInfo, updateTeacherInfo } from '@/api/information/teacherInfo'

export default {
  components: { SvgIcon },
  filters: {
    courseFilter: function(value) {
      if (value.course == '' || value.period == '') return ''
      return value.course + '，学时：' + value.period + '；'
    }
  },
  data() {
    return {
      pageIndex: 0,
      tempData: {
        name: '',
        birthday: '',
        gender: '',
        politicalAffiliation: '',
        degree: '',
        profession: '',
        administrativePosition: '',
        teachingAge: '',
        courseAndPeriod: [
          {
            course: '',
            period: ''
          }
        ]
      },
      btnLoading: false
    }
  },
  created() {
    this.getTeacherInfo()
  },
  methods: {
    getTeacherInfo() {
      // fetchTeacherInfo中应携带参数为教师的登录学工号（userNumber），待补充
      // fetchTeacherInfo(userNumber).then(result => {
      fetchTeacherInfo().then(result => {
        const data = result.data
        this.tempData = data
      }).catch(() => {
        this.pageIndex = 1
      })
    },
    removeCourse(item) {
      const index = this.tempData.courseAndPeriod.indexOf(item)
      if (index !== 0) {
        this.tempData.courseAndPeriod.splice(index, 1)
      }
    },
    addCourse() {
      this.tempData.courseAndPeriod.push({
        course: '',
        period: ''
      })
    },
    resetTemp() {
      this.tempData = {
        name: '',
        birthday: '',
        gender: '',
        politicalAffiliation: '',
        degree: '',
        profession: '',
        administrativePosition: '',
        teachingAge: '',
        courseAndPeriod: [
          {
            course: '',
            period: ''
          }
        ]
      }
    },
    handleEdit() {
      this.pageIndex = 1
    },
    handleSubmit() {
      this.btnLoading = true
      // 由于教师学工号获取并存入store中的代码未写，下行代码待补充后替换
      // const data = { ...this.tempData, userNumber }
      const data = { ...this.tempData }
      updateTeacherInfo(data).then(() => {
        this.btnLoading = false
        this.pageIndex = 2
      }).catch(err => {
        this.btnLoading = false
        this.$message({
          message: '提交错误：' + err,
          type: 'error'
        })
        console.log(err)
      })
    },
    handleBack() {
      this.pageIndex = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.result-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .result-item {
    margin: 10px 0;
    .result-item__h2 {
      font-size: 1.5rem;
    }
  }
}

.card-header span {
  padding: 3px 0;
  border-bottom: 3px solid #409eff;
}

.cell-content {
  span {
    padding: 1px 10px;
    border-bottom: 1px solid #000000;
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
