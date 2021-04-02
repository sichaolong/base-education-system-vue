<template>
  <!-- eslint-disable -->
  <div class="app-container">
    <el-card>
      <el-steps :active="active" align-center>
        <el-step
          @click.native="handleStep(0)"
          description="备案表基本信息"
        ></el-step>
        <el-step
          @click.native="handleStep(1)"
          description="负责人情况"
        ></el-step>
        <el-step @click.native="handleStep(2)" description="成员概况"></el-step>
        <el-step
          @click.native="handleStep(3)"
          description="规章制度建设和队伍建设"
        ></el-step>
        <el-step
          @click.native="handleStep(4)"
          description="教学组织和课程教材概述"
        ></el-step>
        <el-step
          @click.native="handleStep(5)"
          description="教学研究和专业建设"
        ></el-step>
        <el-step
          @click.native="handleStep(6)"
          description="实践教学和条件保障"
        ></el-step>
        <el-step
          @click.native="handleStep(7)"
          description="人才培养能力"
        ></el-step>
        <el-step
          @click.native="handleStep(8)"
          description="今后建设计划"
        ></el-step>
      </el-steps>
    </el-card>

    <el-card v-show="active == 0">
      <el-form :model="form.info">
        <el-row>
          <div class="form-subtitle">
            <span>备案表基本信息</span>
          </div>
        </el-row>

        <div class="div-style">
          <el-row :gutter="20" class="row-style">
            <el-col :span="7">
              <el-form-item class="el-form-item_label" label="教学组织名称">
                <el-autocomplete
                  style="width: 250px"
                  v-model="form.info.organization"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-form-item>
            </el-col>

            <!-- v-model绑定更改 -->
            <el-col :span="7">
              <el-form-item
                class="el-form-item_label"
                v-model="form.info.type"
                label="基层教学组织类型"
              >
                <el-input style="width: 250px"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="所属学院">
                <el-input disabled v-model="form.info.college"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="负责人">
                <el-input
                  style="width: 250px"
                  v-model="form.info.principal"
                ></el-input>
              </el-form-item>
            </el-col>

            <!-- v-model绑定更改 -->
            <el-col :span="7">
              <el-form-item label="基层教学组织级别">
                <el-input
                  style="width: 250px"
                  v-model="form.info.level"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="职称">
                <el-select
                  style="width: 270px"
                  v-model="form.info.professionalTitle"
                  placeholder="请选择"
                >
                  <el-option label="助教" value="助教"></el-option>
                  <el-option label="讲师" value="讲师"></el-option>
                  <el-option label="副教授" value="副教授"></el-option>
                  <el-option label="教授" value="教授"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- v-model绑定更改 -->
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="设立时间/年" v-model="form.info.createYear">
                <el-input style="width: 250px"></el-input>
              </el-form-item>
            </el-col>

            <!-- v-model绑定更改 -->
            <el-col :span="7">
              <el-form-item label="负责人工号">
                <el-input
                  style="width: 250px"
                  v-model="form.info.principalNumber"
                ></el-input>
              </el-form-item>
            </el-col>

            <!-- v-model绑定更改 -->
            <el-col :span="6">
              <el-form-item label="是否面向多个专业">
                <el-select
                  style="width: 270px"
                  v-model="form.info.faceMultiple"
                  placeholder="请选择"
                >
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- v-model绑定更改 -->
          <el-row :gutter="20" class="row-style">
            <el-col :span="7">
              <el-form-item
                class="el-form-item_label"
                label="面向校内专业(大类)名称"
              >
                <el-autocomplete
                  style="width: 250px"
                  v-model="form.info.schoolOrientedProfessionalTitles"
                  :fetch-suggestions="querySearchInfo"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  @select="handleSelectInfo"
                ></el-autocomplete>
              </el-form-item>
            </el-col>

            <!-- v-model绑定更改 -->
            <el-col :span="7">
              <el-form-item
                class="el-form-item_label"
                label="面向校内专业代码(大类)"
                
              >
                <el-input disabled v-model="form.info.schoolOrientedProfessionalTitlesCode"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="面向校内专业比例">
                <el-input
                  v-model="
                    form.info.schoolOrientedProfessionalTitlesProporation
                  "
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-row type="flex" justify="center">
          <el-button type="primary" @click="nextPage">下一页</el-button>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-show="active == 1">
      <el-row type="flex" justify="center">
        <el-form>
          <Principal
            ref="principal"
            v-model:principalID="this.form.principalID"
            v-on:getPrincipalID="getPrincipalID($event)"
            :principalID="this.form.principalID"
          />

          <el-row type="flex" justify="center" style="margin-top: 10px">
            <el-button @click="prePage">上一页</el-button>
            <el-button type="primary" @click="nextPage">下一页</el-button>
          </el-row>
        </el-form>
      </el-row>
    </el-card>

    <el-card v-show="active == 2">
      <Members
        ref="members"
        v-model:membersID="this.form.membersID"
        v-on:getMembersID="getMembersID($event)"
        :membersID="this.form.membersID"
      />

      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-button @click="prePage">上一页</el-button>
        <!-- <el-button type="primary" @click="nextPage" :disabled="form.part2.members.length == 0" -->
        <el-button type="primary" @click="nextPage">下一页</el-button>
      </el-row>
    </el-card>

    <el-card v-show="active == 3">
      <Rules
        ref="rules"
        v-model:rulesID="this.form.ruleAndRegulationID"
        v-on:getRulesID="getRulesID($event)"
        :ruleAndRegulationID="this.form.ruleAndRegulationID"
      />
      <Team
        ref="teambuilding"
        v-model:teamBuildingID="this.form.teamBuildingID"
        v-on:getTeamBuildingID="getTeamBuildingID($event)"
        :teamBuildingID="this.form.teamBuildingID"
      />
      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-button @click="prePage">上一页</el-button>
        <el-button type="primary" @click="nextPage">下一页</el-button>
      </el-row>
    </el-card>

    <el-card v-show="active == 4">
      <Organization
        ref="organization"
        v-model:teachingOrganizationID="this.form.teachingOrganizationID"
        v-on:getOrganizationID="getOrganizationID($event)"
        :teachingOrganizationID="this.form.teachingOrganizationID"
      />
      <CourseMaterial
        ref="coursematerial"
        v-model:courseMaterialID="this.form.courseMaterialID"
        v-on:getCourseMaterialID="getCourseMaterialID($event)"
        :courseMaterialID="this.form.courseMaterialID"
      />

      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-button @click="prePage">上一页</el-button>
        <el-button type="primary" @click="nextPage">下一页</el-button>
      </el-row>
    </el-card>

    <el-card v-show="active == 5">
      <TeachingResearch
        ref="teachingresearch"
        v-model:teachingResearchID="this.form.teachingResearchID"
        v-on:getTeachingResearchID="getTeachingResearchID($event)"
        :teachingResearchID="this.form.teachingResearchID"
      />
      <SpecialtyConstruction
        ref="specialtyconstruction"
        v-model:specialtyconstructionID="this.form.specialtyConstructionID"
        v-on:getSpecialtyConstructionID="getSpecialtyConstructionID($event)"
        :specialtyConstructionID="this.form.specialtyConstructionID"
      />

      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-button @click="prePage">上一页</el-button>
        <el-button type="primary" @click="nextPage">下一页</el-button>
      </el-row>
    </el-card>

    <el-card v-show="active == 6">
      <PracticalTeaching
        ref="practicalteaching"
        v-model:practicalTeachingID="this.form.practicalTeachingID"
        v-on:getPracticalTeachingID="getPracticalTeachingID($event)"
        :practicalTeachingID="this.form.practicalTeachingID"
      />
      <ConditionGuarantee
        ref="conditionguarantee"
        v-model:conditionGuaranteeID="this.form.conditionGuaranteeID"
        v-on:getConditionGuaranteeID="getConditionGuaranteeID($event)"
        :conditionGuaranteeID="this.form.conditionGuaranteeID"
      />

      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-button @click="prePage">上一页</el-button>
        <el-button type="primary" @click="nextPage">下一页</el-button>
      </el-row>
    </el-card>

    <el-card v-show="active == 7">
      <TalentCultivationAbility
        ref="talentcultivationability"
        v-model:talentCultivationAbilityID="
          this.form.talentCultivationAbilityID
        "
        v-on:getTalentCultivationAbilityID="
          getTalentCultivationAbilityID($event)
        "
        :talentCultivationAbilityID="this.form.talentCultivationAbilityID"
      />

      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-button @click="prePage">上一页</el-button>
        <el-button type="primary" @click="nextPage">下一页</el-button>
      </el-row>
    </el-card>

    <el-card v-show="active == 8">
      <FutureConstructionPlan
        ref="futureconstructionplan"
        v-model:futureConstructionPlanID="this.form.futureConstructionPlanID"
        v-on:getFutureConstructionPlanID="getFutureConstructionPlanID($event)"
        :futureConstructionPlanID="this.form.futureConstructionPlanID"
      />

      <opinionFeedBack
        :opinionFeedbackID="this.form.opinionFeedbackID"
        :style="{ display: updateHidden }"
      />

      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-button @click="prePage">上一页</el-button>
        <el-button
          type="primary"
          :style="{ display: buttenHidden }"
          @click="handleSubmit"
          >提交</el-button
        >
        <el-button
          type="primary"
          :style="{ display: updateHidden }"
          @click="handleUpdate"
          >确认修改</el-button
        >
      </el-row>
    </el-card>

    <el-card v-show="active == 9">
      <el-row class="action-content" type="flex" justify="center">
        <svg-icon
          iconClass="success"
          style="width: 7rem; height: 7rem"
        ></svg-icon>
      </el-row>
      <el-row class="action-content" type="flex" justify="center">
        <div class="action-text">提交成功</div>
      </el-row>
      <el-row class="action-content" type="flex" justify="center">
        <div class="action-subtext">请等待管理员进行审核</div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import UploadExcel from "../../components/UploadExcel/index.vue";
import SvgIcon from "../../components/SvgIcon/index";

// 分表单
import Principal from "./components/principal/index";
import Members from "./components/member/index";
import Rules from "./components/rules-troops/index";
import Team from "./components/team-building/index";
import Organization from "./components/organization/index";
import CourseMaterial from "./components/course-material/index";
import TeachingResearch from "./components/teaching-research/index";
import SpecialtyConstruction from "./components/specialty-construction/index";
import PracticalTeaching from "./components/practical-teaching/index";
import ConditionGuarantee from "./components/condition-guarantee/index";
import TalentCultivationAbility from "./components/talent-cultivation-ability/index";
import FutureConstructionPlan from "./components/future-construction-plan/index";
import opinionFeedBack from "./components/opinion-feedback/index";

// 函数
import {
  createTable,
  updateTable,
} from "@/api/declaration-form/declaration-form/index";

// 获取教学组织名称列表
import {
  getMajorsInfo,
  getOrganizationsInfo,
} from "@/api/data-maintenance/index";

// 创建反馈表
import { createOpinionTable } from "@/api/declaration-form/opinion-feedback/index";

// 更反馈信息、审核信息
import { updateInfo } from "@/api/approval-page/index";

// 表单详情页
import { getForm } from "@/api/detail-page/index";

import store from "@/store";

export default {
  components: {
    UploadExcel,
    SvgIcon,
    Principal,
    Members,
    Rules,
    Team,
    Organization,
    CourseMaterial,
    TeachingResearch,
    SpecialtyConstruction,
    PracticalTeaching,
    ConditionGuarantee,
    TalentCultivationAbility,
    FutureConstructionPlan,
    opinionFeedBack,
  },
  data() {
    return {
      //基层组织列表 提示
      arrayOfGrassRootsTeachingSystemName: [],

      // 专业及其代码 提示
      majors: [],

      updateHidden: "none",
      buttenHidden: "",
      active: 0,
      form: {
        info: {
          formID: "",
          userNumber: "",
          organization: "",
          college: "",
          principal: "",
          professionalTitle: "",
          status: "等待审核",
          reviewer: "",
          totalScore: "",
          userNumberOfMarker: "",
          userNumberOfReviewer: "",
          // 新增
          type: "",
          level: "",
          createYear: "",
          principalNumber: "",
          faceMultiple: "",
          schoolOrientedProfessionalTitles: "",
          schoolOrientedProfessionalTitlesCode: "",
          schoolOrientedProfessionalTitlesProportion: "",
        },
        principalID: "",
        membersID: "",
        ruleAndRegulationID: "",
        teamBuildingID: "",
        teachingOrganizationID: "",
        courseMaterialID: "",
        teachingResearchID: "",
        specialtyConstructionID: "",
        practicalTeachingID: "",
        conditionGuaranteeID: "",
        talentCultivationAbilityID: "",
        futureConstructionPlanID: "",
        opinionFeedbackID: "",
      },
      formID: "",
      // 提交表单的时候，需要保存默认数据数据到opinionFeedback 表，然后返回opinionFeedbackID
      opinionFeedback: {
        content: {
          html: "<div style='font-family: 仿宋; font-size: 12pt''></div>",
        },
      },
    };
  },
  created() {
    // 修改表单
    if (this.$route.query.formID) {
      this.updateHidden = "";
      this.buttenHidden = "none";
      // 数据回显
      this.getFormInfo();
    }

    // 填报表的时候直接把userNumber绑定申报表
    this.form.info.userNumber = store.getters.userNumber;
    this.form.info.college = store.getters.college;
    //console.log(this.form.info.userNumber);

    // 获取基层教学组织名称列表

    this.getOrganizations();
    this.getMajors();
  },
  methods: {
    // 向后端获取基层教学组织名称列表
    getOrganizations() {
      getOrganizationsInfo()
        .then((result) => {
          //this.arrayOfGrassRootsTeachingSystemName = result.data;

          for (let i = 0; i < result.data.length; i++) {
            let item = {};
            item.value = result.data[i];
            this.arrayOfGrassRootsTeachingSystemName.push(item);
          }

          console.log(this.arrayOfGrassRootsTeachingSystemName);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleSelect(item) {
      console.log(item);
    },

    //基层教学组织输入框查找相关输入内容
    querySearch(queryString, cb) {
      var arrayOfGrassRootsTeachingSystemName = this
        .arrayOfGrassRootsTeachingSystemName;
      var results = queryString
        ? arrayOfGrassRootsTeachingSystemName.filter(
            this.createFilter(queryString)
          )
        : arrayOfGrassRootsTeachingSystemName;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    //过滤出相关输入内容
    createFilter(queryString) {
      return (arrayOfGrassRootsTeachingSystemName) => {
        return (
          arrayOfGrassRootsTeachingSystemName.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },

    // 向后端获取专业及其代码
    getMajors() {
      getMajorsInfo()
        .then((result) => {
          //this.arrayOfGrassRootsTeachingSystemName = result.data;
          console.log(result);

          for (let i = 0; i < result.data.length; i++) {
            let item = {};
            item.schoolOrientedProfessionalTitlesCode =
              result.data[i].schoolMajorCode;
            item.value = result.data[i].nameOfTheMajorInTheSchool;


            console.log(result.data[i]);
            this.majors.push(item);

            // item.value = result.data[i];

            // this.arrayOfGrassRootsTeachingSystemName.push(item);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //显示搜索内容
    handleSelectInfo(item) {
     // console.log(item);
      this.form.info.schoolOrientedProfessionalTitlesCode =
        item.schoolOrientedProfessionalTitlesCode;
    },
    //基层教学组织输入框查找相关输入内容
    querySearchInfo(queryString, cb) {
      var majors = this.majors;
      var results = queryString
        ? majors.filter(this.createFilterInfo(queryString))
        : majors;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    //过滤出相关输入内容
    createFilterInfo(queryString) {
      return (majors) => {
        return (
          majors.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },

    backToTop() {
      var timer = setInterval(function () {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 2);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 30);
    },
    //申报表的步骤点击
    // 点击步骤条切换
    handleStep(val) {
      this.active = val;
    },
    //下一页切换
    nextPage() {
      this.backToTop();
      this.active++;
    },
    //上一页切换
    prePage() {
      this.backToTop();
      this.active--;
      if (this.active <= 0) {
        this.active = 0;
      }
    },
    // 一、创建表相关
    async handleSubmit() {
      await this.$refs.principal.createPrincipalInfo();

      await this.$refs.members.createMembersInfo();

      await this.$refs.rules.createRulesInfo();

      await this.$refs.teambuilding.createTeamInfo();

      await this.$refs.organization.createOrganizationInfo();

      await this.$refs.coursematerial.createCourseMaterialInfo();

      await this.$refs.teachingresearch.createTeachingReseacherInfo();

      await this.$refs.specialtyconstruction.createSpecialtyConstructionInfo();

      await this.$refs.practicalteaching.createPracticalTeachingInfo();

      await this.$refs.conditionguarantee.createConditionGuaranteeInfo();

      await this.$refs.talentcultivationability.createTalentInfo();

      await this.$refs.futureconstructionplan.createFutureInfo();

      await this.createOpinionFeedbackInfo();

      await this.createFormInfo();

      this.nextPage();
    },

    // 1. 获取异步的分表各个id到主表
    getPrincipalID(val) {
      this.form.principalID = val;
    },
    getMembersID(val) {
      this.form.membersID = val;
    },
    getRulesID(val) {
      this.form.ruleAndRegulationID = val;
    },
    getTeamBuildingID(val) {
      this.form.teamBuildingID = val;
    },
    getOrganizationID(val) {
      this.form.teachingOrganizationID = val;
    },
    getCourseMaterialID(val) {
      this.form.courseMaterialID = val;
    },
    getTeachingResearchID(val) {
      this.form.teachingResearchID = val;
    },
    getSpecialtyConstructionID(val) {
      this.form.specialtyConstructionID = val;
    },
    getPracticalTeachingID(val) {
      this.form.practicalTeachingID = val;
    },
    getConditionGuaranteeID(val) {
      this.form.conditionGuaranteeID = val;
    },
    getTalentCultivationAbilityID(val) {
      this.form.talentCultivationAbilityID = val;
    },
    getFutureConstructionPlanID(val) {
      this.form.futureConstructionPlanID = val;
    },

    // 2. 携带默认信息创建审核意见opinionFeedback表信息,返回oponionFeedbackID,和上面分表的ID放一块保存
    async createOpinionFeedbackInfo() {
      await createOpinionTable(this.opinionFeedback)
        .then((result) => {
          this.form.opinionFeedbackID = result.data.opinionFeedbackID;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 3. 拿着各个分表的id创建declarationForm表
    async createFormInfo() {
      await createTable(this.form)
        .then((result) => {
          console.log(result.data.formID);
          this.form.info.formID = result.data.formID;

          // 拿到formID调用第4步函数
          this.updateApprovalPageInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 4. 根据formID将新建好的declarationForm插入保存到approvalPage中
    async updateApprovalPageInfo() {
      await updateInfo(this.form.info)
        .then((result) => {
          console.log(this.form.info);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 二、更新申报表阶段
    // 1.数据回显，获取要修改的申报表的内容
    getFormInfo() {
      getForm(this.$route.query.formID)
        .then((result) => {
          console.log(result.data);
          const data = result.data;
          for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form[item] = data[item];
          }
          // 保证修改完能回到之前的审核状态

          if (Object.keys(this.form.info.userNumberOfMarker).length !== 0) {
            console.log(this.form.userNumberOfMarker);
            this.form.info.status = "评定结束";
          } else {
            this.form.info.status = "等待审核";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //2. 提交修改form,各个分表更新
    handleUpdate() {
      this.$refs.principal.updateFormInfo();

      this.$refs.members.updateFormInfo();

      this.$refs.rules.updateFormInfo();

      this.$refs.teambuilding.updateFormInfo();

      this.$refs.organization.updateFormInfo();

      this.$refs.coursematerial.updateFormInfo();

      this.$refs.teachingresearch.updateFormInfo();

      this.$refs.specialtyconstruction.updateFormInfo();

      this.$refs.practicalteaching.updateFormInfo();

      this.$refs.conditionguarantee.updateFormInfo();

      this.$refs.talentcultivationability.updateFormInfo();

      this.$refs.futureconstructionplan.updateFormInfo();

      // 调用3函数，更新approvalPage的data 和 declarationForm 的info 对应的申报表的信息
      this.updateFormInfo();

      this.nextPage();
    },
    // 3. 更新declarationForm表的info信息
    async updateFormInfo() {
      await updateTable(this.form, this.$route.query.formID)
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>



<style lang="scss" >
.el-card {
  margin: 10px 0;
}
.action-text {
  font-size: 2rem;
}
.action-subtext {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.45);
}
.action-content {
  margin: 20px 0;
}

.form-subtitle {
  font-size: 1.8rem;
  margin: 15px 0;
  margin-left: 45%;
  span {
    padding: 3px 0;
    border-bottom: 3px solid #409eff;
  }
}

.div-style {
  margin-left: 30%;
}

.el-form-item__label {
  font-size: 20px;
}
</style>