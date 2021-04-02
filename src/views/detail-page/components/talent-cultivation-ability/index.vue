<template>
  <el-form>
    <el-row>
      <div class="form-header">
        <span>人才培养能力</span>
      </div>
    </el-row>
    <Tinymce value="form.content" v-model="form.content" />
    <el-table :data="form.info" empty-text="暂无数据">
      <el-table-column prop="nameOfTeacher" label="教师姓名"></el-table-column>
      <el-table-column
        prop="nameOfTeachingContest"
        label="教学竞赛名称"
      ></el-table-column>
      <el-table-column prop="organizer" label="组织单位"></el-table-column>
      <el-table-column
        prop="time"
        :formatter="dateFormat"
        label="时间"
      ></el-table-column>
      <el-table-column prop="awards" label="获奖等次"></el-table-column>
    </el-table>
    <div class="form-header">
      <span>每类5项代表性成果</span>
    </div>

    <el-form-item label="学科竞赛">
      <div class="cell-content">
        <el-table :data="this.form.outcome.subjectCompetition">
          <el-table-column prop="year" label="年度" />
          <el-table-column prop="awardName" label="奖项名称" />
          <el-table-column prop="awardWinningWork" label="获奖作品" />
          <el-table-column prop="level" label="获奖等级" />
          <el-table-column prop="nameOfWinner" label="获奖人姓名" />
          <el-table-column prop="nameOfTeacher" label="指导老师姓名" />
        </el-table>
      </div>
    </el-form-item>
    <el-form-item label="职业技能大赛">
      <div class="cell-content">
        <span>{{ this.form.outcome.professionalSkillsCompetition }}</span>
      </div>
    </el-form-item>
    <el-form-item label="互联网+创业大赛">
      <div class="cell-content">
        <span>{{ this.form.outcome.internetPlusEntrepreneurshipContest }}</span>
      </div>
    </el-form-item>
    <el-form-item label="创新创业情况">
      <div class="cell-content">
        <span>{{ this.form.outcome.innovationAndEntrepreneurship }}</span>
      </div>
    </el-form-item>
    <el-form-item label="发表论文">
      <div class="cell-content">
        <span>{{ this.form.outcome.publishTheses }}</span>
      </div>
    </el-form-item>
  </el-form>
</template>



<script>
import Tinymce from "../tinymce-editor/index";
import { fetchInfo } from "@/api/detail-page/talent-cultivation-ability/index";
import moment from "moment";
export default {
  components: {
    Tinymce,
  },
  props: {
    header: {
      type: String,
      required: true,
    },
    talentCultivationAbilityID: {
      type: String,
      required: true,
    },
  },
  filters: {
    // parseTime: function (value) {
    //   if (!value) return ''
    //   const date = new Date(value)
    //   return parseTime(date, '{y}年{m}月')
    // }
  },
  data() {
    return {
      form: {
        info: [],
        outcome: {
          subjectCompetition: [],
          professionalSkillsCompetition: "",
          internetPlusEntrepreneurshipContest: "",
          innovationAndEntrepreneurship: "",
          publishTheses: "",
        },
        content: "",
      },
    };
  },
  watch: {
    talentCultivationAbilityID: function (n, o) {
      this.talentCultivationAbilityID = n;

      this.getInfo();
    },
  },
  created() {
    // this.getInfo()
  },
  methods: {
    getInfo() {
      fetchInfo(this.talentCultivationAbilityID)
        .then((result) => {
          console.log(result);

          this.form.info = result.data.info;
          const data = result.data.outcome;
          for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form.outcome[item] = data[item];
          }
          this.form.content = result.data.content.html;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
  },
};
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