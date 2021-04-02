<template>
  <!-- eslint-disable -->
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header">
        <span>申报表详情</span>
      </div>

      <el-form>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="基层教学组织类型">
              <div class="cell-content">
                <span></span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="基层教学组织级别">
              <div class="cell-content">
                <span>{{ form.info.level }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设立时间/年">
              <div class="cell-content">
                <span>{{ form.info.createYear }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="是否面向多个专业">
              <div class="cell-content">
                <span>{{ form.info.faceMultiple }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="面向校内专业比例">
              <div class="cell-content">
                <span>{{
                  form.info.schoolORientedProfessionalTitlesProportion
                }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="面向校内专业代码(大类)">
              <div class="cell-content">
                <span>{{
                  form.info.schoolOrientedProfessionalTitlesCode
                }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="面向校内专业(大类)名称">
              <div class="cell-content">
                <span>{{ form.info.schoolOrientedProfessionaltiles }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人工号">
              <div class="cell-content">
                <span>{{ form.info.principalNumber }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <principal header="负责人概况" :principalID="this.form.principalID" />
      <member header="成员概况" :membersID="this.form.membersID" />
      <rules
        header="规章制度"
        :ruleAndRegulationID="this.form.ruleAndRegulationID"
      />
      <teambuilding
        header="队伍建设"
        :teamBuildingID="this.form.teamBuildingID"
      />
      <organization
        header="教学组织"
        :teachingOrganizationID="this.form.teachingOrganizationID"
      />
      <coursematerial
        header="课程教材概述"
        :courseMaterialID="this.form.courseMaterialID"
      />
      <teachingresearch
        header="教学研究"
        :teachingResearchID="this.form.teachingResearchID"
      />
      <specialtyconstruction
        header="专业建设"
        :specialtyConstructionID="this.form.specialtyConstructionID"
      />
      <practicalteaching
        header="实践教学"
        :practicalTeachingID="this.form.practicalTeachingID"
      />
      <conditionguarantee
        header="条件保障"
        :conditionGuaranteeID="this.form.conditionGuaranteeID"
      />
      <talentcultivationability
        header="人才培养能力"
        :talentCultivationAbilityID="this.form.talentCultivationAbilityID"
      />
      <futureconstructionplan
        header="今后计划建设"
        :futureConstructionPlanID="this.form.futureConstructionPlanID"
      />
      <opinionfeedback
        header="教务处意见反馈"
        :opinionFeedbackID="this.form.opinionFeedbackID"
        v-on:getStatus="getStatus($event)"
      />
      <el-button
        class="score"
        type="primary"
        v-has="roles"
        @click="toEvaluate()"
      >
        评分
      </el-button>
    </el-card>

    <!-- 评分抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      direction="btt"
      size="90%"
      title="点击上方详情页区域可隐藏此评分页(已选择的分数不会消失)"
    >
      <!-- 第一行 -->
      <el-row type="flex" :gutter="20">
        <!-- 专业类评分 -->
        <el-col
          style="height: 37.5rem; border-right: 1px solid black"
          :span="5"
        >
          <el-row>
            <el-col class="colClass" :span="5">
              <el-row><el-tag type="info">专业类</el-tag></el-row>
              <el-row><el-tag type="danger">每项1-10分</el-tag></el-row>
            </el-col>
            <el-col class="colClassOne" :span="9">
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >专业发展目标:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >专业发展定位:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >专业培养效果:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >专业办学参数:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >专业建设成果:</el-tag
              >
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="getScore.developmentGoals"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.developmentOrientation"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.trainingEffect"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.runningParameters"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.constructionResults"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <!-- 课程类评分 -->
        <el-col
          style="height: 37.5rem; border-right: 1px solid black"
          :span="5"
        >
          <el-row>
            <el-col class="colClass" :span="5">
              <el-row><el-tag type="info">课程类</el-tag></el-row>
              <el-row><el-tag type="danger">每项1-10分</el-tag></el-row>
            </el-col>
            <el-col class="colClassOne" :span="9">
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >课程建设规划:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >课程改革:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >教材选用:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >教材建设:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >课程建设成功:</el-tag
              >
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="getScore.constructionPlanning"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.curriculumReform"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.textbookSelection"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.textbookConstruction"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.constructionAchievements"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <!-- 实践类评分 -->
        <el-col
          style="height: 37.5rem; border-right: 1px solid black"
          :span="5"
        >
          <el-row>
            <el-col class="colClass" :span="6">
              <el-row><el-tag type="info">实践类</el-tag></el-row>
              <el-row><el-tag type="danger">每项1-10分</el-tag></el-row>
            </el-col>
            <el-col class="colClassOne" :span="9">
              <el-tag type="info" style="margin-bottom: 1.7rem; margin-left: 0"
                >实习实训基地:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem; margin-left: 0"
                >实验室建设:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem; margin-left: 0"
                >学科竞赛活动:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem; margin-left: 0"
                >创新创业指导活动:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem; margin-left: 0"
                >实验室开出/覆盖率:</el-tag
              >
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="getScore.trainingBase"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.6rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.laboratoryConstruction"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.6rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.competitionActivities"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.6rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.guidanceActivities"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.6rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
              <el-select
                v-model="getScore.laboratoryCoverage"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.6rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <!-- 制度建设评分 -->
        <el-col
          style="height: 37.5rem; border-right: 1px solid black"
          :span="5"
        >
          <el-row>
            <el-col class="colClass" :span="5">
              <el-row><el-tag type="info">制度建设</el-tag></el-row>
              <el-row><el-tag type="danger">最高分依次为3/3/4</el-tag></el-row>
            </el-col>
            <el-col class="colClassTwo" :span="9">
              <el-tag type="info" style="margin-bottom: 2rem; margin-left: 0"
                >制度建设:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 2rem; margin-left: 0"
                >师资培养计划:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 2rem; margin-left: 0"
                >岗位职责制度落实:</el-tag
              >
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="getScore.rulesAndRegulations"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.6rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option>
              </el-select>
              <el-select
                v-model="getScore.trainingPlan"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.6rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option>
              </el-select>
              <el-select
                v-model="getScore.responsibilitiesAndSystems"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.6rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="4">
          <div style="margin-top: 0%; margin-left: 20%; width: 50%">
            <el-row style="margin-top: 0%; height: 15%"
              ><el-tag type="info">特色指标:特色创新类</el-tag></el-row
            >
            <el-row style="height: 15%; margin-top: 15%"
              ><el-tag type="danger">1-10分</el-tag></el-row
            >
            <el-row style="height: 15%; margin-top: 15%">
              <el-select
                v-model="getScore.characteristicIndex"
                style="width: 6rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
                <el-option value="5" label="5"></el-option
                ><el-option value="6" label="6"></el-option>
                <el-option value="7" label="7"></el-option
                ><el-option value="8" label="9"></el-option>
                <el-option value="9" label="9"></el-option
                ><el-option value="10" label="10"></el-option>
              </el-select>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row type="flex" :gutter="20">
        <!-- 师资队伍评分 -->
        <el-col style="height: 1rem" :span="5">
          <el-row>
            <el-col class="colClassSecondRow" :span="5">
              <el-row><el-tag type="info">师资队伍</el-tag></el-row>
              <el-row><el-tag type="danger">最高分依次为3/3/4</el-tag></el-row>
            </el-col>
            <el-col class="colClassOne" :span="9">
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >师德师风:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >梯队结构:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >教授上课:</el-tag
              >
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="getScore.teachersMorality"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option>
              </el-select>
              <el-select
                v-model="getScore.echelonStructure"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option>
              </el-select>
              <el-select
                v-model="getScore.professorTeaching"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <!-- 日产管理评分 -->
        <el-col style="height: 1rem" :span="5">
          <el-row>
            <el-col class="colClassSecondRow" :span="5">
              <el-row><el-tag type="info">日常管理</el-tag></el-row>
              <el-row><el-tag type="danger">最高分依次为4/3/3</el-tag></el-row>
            </el-col>
            <el-col class="colClassOne" :span="9">
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >听评课及教学观摩:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >教研活动:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >教学文档:</el-tag
              >
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="getScore.teachingObservation"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 1.5rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option>
              </el-select>
              <el-select
                v-model="getScore.researchActivities"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 1.5rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option>
              </el-select>
              <el-select
                v-model="getScore.teachingDocuments"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 1.5rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <!-- 教学管理评分 -->
        <el-col style="height: 1rem" :span="5">
          <el-row>
            <el-col class="colClassSecondRow" :span="5">
              <el-row><el-tag type="info">教学管理</el-tag></el-row>
              <el-row><el-tag type="danger">最高分依次为3/3/4</el-tag></el-row>
            </el-col>
            <el-col class="colClassOne" :span="9">
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >教室及教学计划:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >考试管理:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >质量监控:</el-tag
              >
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="getScore.teachingPlan"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 1.5rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option>
              </el-select>
              <el-select
                v-model="getScore.examinationManagement"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 1.5rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option>
              </el-select>
              <el-select
                v-model="getScore.qualityControl"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 1.5rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <!-- 教研教改评分 -->
        <el-col style="height: 1rem" :span="5">
          <el-row>
            <el-col class="colClassSecondRow" :span="5">
              <el-row><el-tag type="info">教研教改</el-tag></el-row>
              <el-row><el-tag type="danger">最高分依次为3/3/4</el-tag></el-row>
            </el-col>
            <el-col class="colClassOne" :span="9">
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >教改项目:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >教改论文:</el-tag
              >
              <el-tag type="info" style="margin-bottom: 1.7rem"
                >教改措施:</el-tag
              >
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="getScore.reformProject"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option>
              </el-select>
              <el-select
                v-model="getScore.reformPaper"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option>
              </el-select>
              <el-select
                v-model="getScore.reformMeasures"
                style="width: 6rem; margin-bottom: 1.2rem; margin-left: 0.3rem"
              >
                <el-option value="1" label="1"></el-option
                ><el-option value="2" label="2"></el-option>
                <el-option value="3" label="3"></el-option
                ><el-option value="4" label="4"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="4">
          <el-tag type="info">总分:</el-tag
          ><el-input
            disabled
            v-model="totalScore"
            style="margin-left: 5%; width: 30%"
          ></el-input
          >分
          <el-button @click="handleAdd">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
// import { getForm } from '../../api/form'
import principal from "./components/principal/index";
import member from "./components/member/index";
import rules from "./components/rules-troops/index";
import organization from "./components/organization/index";
import teambuilding from "./components/team-building/index";
import coursematerial from "./components/course-material/index";
import teachingresearch from "./components/teaching-research/index";
import specialtyconstruction from "./components/specialty-construction/index";
import practicalteaching from "./components/practical-teaching/index";
import conditionguarantee from "./components/condition-guarantee/index";
import talentcultivationability from "./components/talent-cultivation-ability/index";
import futureconstructionplan from "./components/future-construction-plan/index";
import opinionfeedback from "./components/opinion-feedback/index";

import { getForm } from "@/api/detail-page/index";
import { updateInfo } from "@/api/detail-page/index";
import { giveMark } from "@/api/give-mark/index";

// 删除已经处理的待办项

import store from "@/store";
import { deleteToDoItem } from "@/api/todo-items";

export default {
  components: {
    principal,
    member,
    rules,
    organization,
    teambuilding,
    teachingresearch,
    practicalteaching,
    conditionguarantee,
    talentcultivationability,
    futureconstructionplan,
    opinionfeedback,
    coursematerial,
    specialtyconstruction,
  },
  data() {
    return {
      //评分
      getScore: {
        //专业类
        developmentGoals: "",
        developmentOrientation: "",
        trainingEffect: "",
        runningParameters: "",
        constructionResults: "",
        //课程类
        constructionPlanning: "",
        curriculumReform: "",
        textbookSelection: "",
        textbookConstruction: "",
        constructionAchievements: "",
        //实践类
        trainingBase: "",
        laboratoryConstruction: "",
        competitionActivities: "",
        guidanceActivities: "",
        laboratoryCoverage: "",
        //制度建设
        rulesAndRegulations: "",
        trainingPlan: "",
        responsibilitiesAndSystems: "",
        //师资队伍
        teachersMorality: "",
        echelonStructure: "",
        professorTeaching: "",
        //日常管理
        teachingObservation: "",
        researchActivities: "",
        teachingDocuments: "",
        //教学管理
        teachingPlan: "",
        examinationManagement: "",
        qualityControl: "",
        //教研教改
        reformProject: "",
        reformPaper: "",
        reformMeasures: "",
        //特色指标
        characteristicIndex: "",
      },
      drawer: false,
      flag: false,
      giveMarkFlage: false,
      dialogVisible: false,
      grade: {
        ruleAndRegulation: 0,
        teamBuilding: 0,
        teachingOrganization: 0,
        courseMaterial: 0,
        teachingResearch: 0,
        specialtyConstruction: 0,
        practicalTeaching: 0,
        conditionGuarantee: 0,
        talentCultivationAbility: 0,
        futureConstructionPlan: 0,
        opinionFeedback: 0,
        totalGrade: 0,
      },
      roles: {
        jurisdictionRole: [],
        role: "",
      },
      form: {
        info: {
          formID: this.$route.query.formID,
          organization: "",
          college: "",
          principal: "",
          professionalTitle: "",
          status: "",
          reviewer: "",
          totalScore: "",
          userNumberOfMarker: "",
          userNumberOfReviewer: "",
          type: "",
          level: "",
          createYear: "",
          principalNumber: "",
          faceMultiple: "",
          schoolOrientedProfessionaltiles: "",
          schoolOrientedProfessionalTitlesCode: "",
          schoolORientedProfessionalTitlesProportion: "",
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
      // 待办项相关
      item: {
        title: "",
        formID: "",
        createTime: "",
      },
      userNumber: "",
    };
  },
  created() {
    this.getRole();
    this.getFormID();
    this.getInfo();
  },
  computed: {
    totalScore: {
      get: function () {
        let sum = 0;
        for (let i in this.getScore) {
          if (this.getScore[i] === "") sum += 0;
          else sum += parseFloat(this.getScore[i]);
        }
        return sum;
      },
    },
  },
  methods: {
    //1.显示评分表
    toEvaluate() {
      if (this.form.info.status === "评定结束") {
        this.$message.info("已评定");
        return;
        //this.drawer = true;
      } else if (this.giveMarkFlage === true) {
        this.$message.info("已评定");
      } else {
        this.drawer = true;
      }
    },
    //2. 获取当前用户角色和权限角色
    getRole() {
      this.roles.jurisdictionRole.push("评审专家"),
        (this.roles.role = store.getters.role);
    },

    // 一、详情页表单显示
    // 1. 获取当前申报表的formID
    getFormID() {
      this.formID = this.$route.query.formID;

      // 根据参数判断删除待办项
      this.item = this.$route.query.item;
      this.userNumber = this.$route.query.userNumber;

      //console.log(this.formID);
    },
    // 2. 数据各表ID渲染,数据回显
    getInfo() {
      getForm(this.formID)
        .then((result) => {
          //console.log(result.data);
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

    // 二、更新审核状态、审核人、打分

    // 1. 更新教务处审核状态和审核人,由子组件调用，信息从子组件获取
    updateForm() {
      // 获取reviewer
      this.form.info.reviewer = store.getters.name;
      this.form.info.userNumberOfReviewer = store.getters.userNumber;
      // console.log("debug")
      // console.log(this.form.info.reviewer);
      // console.log(this.form.info.userNumberOfReviewer);

      updateInfo(this.formID, this.form)
        .then(() => {
          // 三、这里待办项处理之后，需要删除该待办项
          if (
            this.item == null ||
            this.item == undefined ||
            this.userNumber == null ||
            this.userNumber == undefined
          ) {
            return;
          } else {
            // 待办项已处理，删除待办项
            deleteToDoItem(this.item, this.userNumber);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 1.1 获取最新的status
    getStatus(status) {
      //console.log(val);
      this.form.info.status = status;
    },

    //2. 确认评分事件
    handleAdd() {
      for (let i in this.getScore) {
        if (this.getScore[i] === "0" || this.getScore[i] === "") {
          this.$message.error("分数不能为0或空");
          return;
        }
      }
      if (parseFloat(this.totalGrade) > 210)
        this.$message.info("总分大于210,输入有误");
      else {
        this.$confirm("确认后评分将无法修改, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.giveMarkFlage = true;
            this.giveMarks();
            this.drawer = false;
            this.$message.success("评分成功");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消提交",
            });
          });
      }
    },
    //3. 评分
    giveMarks() {
      giveMark(this.formID, this.totalScore)
        .then((result) => {
          console.log(this.totalScore);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 4. 删除待办项
    deleteToDoItem(data, userNumber) {
      deleteToDoItem(data, userNumber)
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
}
.card-header span {
  font-size: 1.8rem;
  padding: 3px 0;
  border-bottom: 3px solid #409eff;
}
.form-header {
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
.score {
  width: 100px;
  position: fixed;
  z-index: 999;
  left: 45%;
  bottom: 2%;
}

.el-row {
  //border: 1px solid black;
  height: 50%;
  .el-card {
    height: 80%;
  }
}

.colClass {
  height: 100%;
  position: relative;
  .el-tag {
    position: absolute;
    top: 40%;
  }
}

.colClassOne {
  margin-left: 5%;
  .el-tag {
    margin-left: 1rem;
    margin-bottom: 0.8rem;
  }
}

.colClassTwo {
  margin-left: 10%;
  .el-tag {
    margin-left: 1rem;
    margin-bottom: 0.8rem;
  }
}

.colClassSecondRow {
  margin-left: -5%;
  .el-tag {
    margin-top: 90%;
    margin-left: 1rem;
    margin-bottom: 2rem;
  }
}

.el-tag {
  font-size: 13px;
}

.span {
  outline: 0;
}
</style>
