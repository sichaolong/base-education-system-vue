<template>
  <div>
    <div class="form-header">
      <span>负责人情况</span>
    </div>
    <el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="姓名">
            <div class="cell-content">
              <span>{{ form.name }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出生年月">
            <div class="cell-content">
              <span>{{ form.birthdate | parseTime }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            <div class="cell-content">
              <span>{{ form.gender }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="政治面貌">
            <div class="cell-content">
              <span>{{ form.politicalAffiliation }}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 新增需求 -->

      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="基层教学组织">
            <div class="cell-content">
              <span>{{ form.nameOfTeachingOrganization }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="隶属单位">
            <div class="cell-content">
              <span>{{ form.subordinateUnit }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="类别">
            <div class="cell-content">
              <span>{{ form.classification }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="5">
         <el-form-item label="获批等级">
            <div class="cell-content">
              <span>{{ form.approvalLevel.provincialQualificationOfTime }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="获批时间">
            <div class="cell-content">
              <span>{{ form.approvalLevel.provincialExcellenceOfTime | parseTime }}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="最终学历（学位）">
            <div class="cell-content">
              <span>{{ form.degree }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="授予单位">
            <div class="cell-content">
              <span>{{ form.authorizationDepartment }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="授予时间">
            <div class="cell-content">
              <span>{{ form.dateOfGrant | parseTime }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="高校教龄">
            <div class="cell-content">
              <span>{{ form.universityTeachingAge + "年" }}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="职称">
            <div class="cell-content">
              <span>{{ form.professionalTitle }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="行政职务">
            <div class="cell-content">
              <span>{{ form.administrativeDuties }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="任基层教学组织负责人时间">
            <div class="cell-content">
              <span>{{
                form.dateOfHeadOfBasicTeachingOrganization | parseTime
              }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="岗位津贴">
            <div class="cell-content">
              <span>{{ form.postAllowance + "元" }}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="近2学年任教课程">
            <div class="cell-content">
              <span
                v-for="(
                  item, index
                ) in form.teachingCoursesInRecentTwoAcademicYears"
                :key="index"
                >{{ item.course + "，" + item.period + "课时" }}</span
              >
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年均教学工作量及减免比例">
            <div class="cell-content">
              <span>{{
                form.averageAnnualTeachingWorkloadAndReductionRatio
              }}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item label="主要教学业绩"> </el-form-item>
        <div class="section-content">
          <p>{{ form.mainTeachingAchievements }}</p>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { fetchInfo } from "@/api/detail-page/principal/index";
import { parseTime } from "@/utils/index";

export default {
  props: {
    header: {
      type: String,
      required: true,
    },
    principalID: {
      type: String,
      required: true,
    },
  },
  filters: {
    parseTime: function (value) {
      if (!value) return "";
      const date = new Date(value);
      return parseTime(date, "{y}年{m}月");
    },
  },
  data() {
    return {
      form: {
        nameOfTeachingOrganization: "",
        subordinateUnit: "",
        classification: "",
        approvalLevel: {
          provincialQualificationOfTime: "",
          provincialExcellenceOfTime: "",
        },
        name: "",
        birthdate: "",
        gender: "",
        politicalAffiliation: "",
        degree: "",
        authorizationDepartment: "",
        dateOfGrant: "",
        universityTeachingAge: 0,
        professionalTitle: "",
        administrativeDuties: "",
        dateOfHeadOfBasicTeachingOrganization: "",
        postAllowance: 0,
        teachingCoursesInRecentTwoAcademicYears: [],
        averageAnnualTeachingWorkloadAndReductionRatio: "",
        mainTeachingAchievements: "",
      },
    };
  },
  watch: {
    principalID: function (n, o) {
      this.principalID = n;

      this.getInfo();
    },
  },
  created() {
    // this.getInfo()
  },
  methods: {
    getInfo() {
      fetchInfo(this.principalID)
        .then((result) => {
          //console.log(result)
          //console.log(this.principalID)
          const data = result.data;
          for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form[item] = data[item];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" >
.card-header span {
  font-size: 1.8rem;
  padding: 3px 0;
  border-bottom: 3px solid #409eff;
}
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
  font-size: 20px;
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
.el-table {
  font-size: 20px;
}
.el-form-item__label {
  font-size: 20px;
}
</style>
