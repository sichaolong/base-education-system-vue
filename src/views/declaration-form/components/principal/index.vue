<template>
  <el-form :model="form">
    <el-row>
      <div class="form-subtitle">
        <span>负责人情况</span>
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="出生年月">
          <el-date-picker
            v-model="form.birthdate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="政治面貌">
          <el-select v-model="form.politicalAffiliation" placeholder="请选择">
            <el-option
              v-for="(item, i) in options"
              :key="i"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="4">
        <el-form-item label="教学组织名称">
          <el-input v-model="form.nameOfTeachingOrganization" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="隶属单位">
          <el-input v-model="form.subordinateUnit" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="类别">
          <el-select v-model="form.classification" placeholder="类别">
            <el-option label="国家级" value="国家级" />
            <el-option label="省级" value="省级" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="5">
        <el-form-item label="获批等级">
          <el-select
            v-model="form.approvalLevel.provincialQualificationOfTime"
            placeholder="获批等级"
          >
            <el-option label="省级优秀" value="省级优秀" />
            <el-option label="省级合格" value="省级合格" />
            <el-option label="不合格" value="不合格" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="获批时间">
          <el-date-picker
            v-model="form.approvalLevel.provincialExcellenceOfTime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="最终学历（学位）">
          <el-select v-model="form.degree" placeholder="请选择">
            <el-option
              v-for="(item, i) in optionsOfDegree"
              :key="i"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="授予单位">
          <el-input v-model="form.authorizationDepartment" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="授予时间">
          <el-date-picker
            v-model="form.dateOfGrant"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="高校教龄">
          <el-input v-model="form.universityTeachingAge" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="职称">
          <el-select style="width:240px" v-model="form.professionalTitle" placeholder="请选择">
                <el-option label="助教" value="助教"></el-option>
                <el-option label="讲师" value="讲师"></el-option>
                <el-option label="副教授" value="副教授"></el-option>
                <el-option label="教授" value="教授"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="行政职务">
          <el-input v-model="form.administrativeDuties" />
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="任基层教学组织负责人时间">
          <el-date-picker
            v-model="form.dateOfHeadOfBasicTeachingOrganization"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="岗位津贴">
          <el-input v-model="form.postAllowance" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="近2学年教授课程及学时">
          <div class="table-action-bar">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleClickAdd(PrincipalInfo.dialogVisible)"
              >添加</el-button
            >
          </div>
          <el-table :data="PrincipalInfo.tables[0]" empty-text="暂无数据">
            <el-table-column prop="course" label="教授课程" />
            <el-table-column prop="period" label="学时" />
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-row style="float: left"
                  ><el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="
                      handleClickEdit(PrincipalInfo, scope.row, scope.$index)
                    "
                /></el-row>
                <el-row style="float: right"
                  ><el-button
                    icon="el-icon-delete"
                    type="danger"
                    size="mini"
                    @click="handleClickDelete(PrincipalInfo, scope.$index)"
                /></el-row>
              </template>
            </el-table-column>
          </el-table>

          <!-- <el-input v-model="form.part1.teachingCoursesInRecentTwoAcademicYears"></el-input> -->
          <el-dialog
            title="近两年教授课程及学时"
            :visible.sync="PrincipalInfo.dialogVisible[0]"
          >
            <el-form :model="tempData">
              <el-form-item label="教授课程">
                <el-input v-model="tempData.course" />
              </el-form-item>
              <el-form-item label="学时">
                <el-input v-model="tempData.period" />
              </el-form-item>

              <el-row type="flex" justify="center">
                <el-button @click="handleCancel(PrincipalInfo.dialogVisible)"
                  >取消</el-button
                >
                <el-button
                  v-if="!editStatus"
                  type="primary"
                  @click="handleAdd(PrincipalInfo)"
                  >添加</el-button
                >
                <el-button
                  v-else
                  type="primary"
                  @click="handleSave(PrincipalInfo)"
                  >保存</el-button
                >
              </el-row>
            </el-form>
          </el-dialog>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="bottomClass" label="年均教学工作量及减免比例">
          <el-input
            v-model="form.averageAnnualTeachingWorkloadAndReductionRatio"
          />
        </el-form-item>
        <el-form-item label="主要教学业绩">
          <el-input
            v-model="form.mainTeachingAchievements"
            type="textarea"
            :rows="5"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row />
  </el-form>
</template>

<script>
import Vue from "vue";
import { createTable } from "@/api/declaration-form/principal/index";
import { updateTable } from "@/api/declaration-form/principal/index";
import { fetchInfo } from "@/api/detail-page/principal/index";
export default {
  props: {
    principalID: {
      type: String,
    },
  },
  data() {
    return {
      editStatus: false,
      tempData: {},
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
        universityTeachingAge: "",
        professionalTitle: "",
        administrativeDuties: "",
        dateOfHeadOfBasicTeachingOrganization: "",
        postAllowance: "",
        teachingCoursesInRecentTwoAcademicYears: [
          {
            course: "",
            period: "",
          },
        ],
        averageAnnualTeachingWorkloadAndReductionRatio: "",
        mainTeachingAchievements: "",
      },
      PrincipalInfo: {
        tables: [[]],
        dialogVisible: [false],
      },
      options: [
        "中共党员",
        "中共预备党员",
        "共青团员",
        "民革党员",
        "民盟盟员",
        "民建会员",
        "民进会员",
        "农工党党员",
        "致公党党员",
        "九三学社社员",
        "台盟盟员",
        "无党派人士",
        "群众",
      ],
      optionsOfDegree: [
        "小学",
        "初中",
        "高中",
        "大专",
        "本科",
        "硕士研究生",
        "博士研究生",
      ],
    };
  },
  watch: {
    principalID: function (val, old) {
      this.getFormInfo();
    },
  },
  methods: {
    async createPrincipalInfo() {
      await this.getInfo();
      await createTable(this.form)
        .then((result) => {
          this.$emit("getPrincipalID", result.data.principalID);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClickAdd(visible, index = 0) {
      // visible[index] = true
      this.tempData = {};
      this.editStatus = false;
      Vue.set(visible, index, true);
    },
    handleAdd({ tables, dialogVisible }, index = 0) {
      tables[index].push(this.tempData);
      dialogVisible[index] = false;
    },
    handleSave({ tables, dialogVisible }, index = 0) {
      Vue.set(tables[index], this.editIndex, this.tempData);
      dialogVisible[index] = false;
    },
    handleCancel(visible, index = 0) {
      this.tempData = {};
      visible[index] = false;
    },
    handleClickEdit({ dialogVisible }, row, rowInd, index = 0) {
      const temp = _.cloneDeep(row);
      this.tempData = temp;
      this.editIndex = rowInd;
      this.editStatus = true;
      dialogVisible[index] = true;
    },
    handleClickDelete({ tables }, rowInd, index = 0) {
      tables[index].splice(rowInd, 1);
    },
    getInfo() {
      this.form.teachingCoursesInRecentTwoAcademicYears = undefined;
      this.form.teachingCoursesInRecentTwoAcademicYears = new Array();
      for (let i = 0; i < this.PrincipalInfo.tables[0].length; i++) {
        const item = {};
        item["course"] = this.PrincipalInfo.tables[0][i].course;
        item["period"] = this.PrincipalInfo.tables[0][i].period;
        this.form.teachingCoursesInRecentTwoAcademicYears[i] = item;
      }
    },

    //获取要修改的内容
    getFormInfo() {
      fetchInfo(this.principalID).then((result) => {
        //console.log(result)
        const data = result.data;
        for (const item in data) {
          if (typeof data[item] === "function") {
            continue;
          }
          this.form[item] = data[item];
        }
        for (
          let i = 0;
          i < this.form.teachingCoursesInRecentTwoAcademicYears.length;
          i++
        ) {
          const item = {};
          item["course"] = this.form.teachingCoursesInRecentTwoAcademicYears[
            i
          ].course;
          item["period"] = this.form.teachingCoursesInRecentTwoAcademicYears[
            i
          ].period;
          Vue.set(this.PrincipalInfo.tables[0], i, item);
        }
      });
    },

    //更新表中内容
    async updateFormInfo() {
      await this.getInfo();
      await updateTable(this.principalID, this.form)
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-subtitle {
  font-size: 1.8rem;
  margin: 15px 0;
  span {
    padding: 3px 0;
    border-bottom: 3px solid #409eff;
  }
}

.bottomClass {
  margin-bottom: 0px;
}

.el-table {
  font-size: 20px;
}
</style>
