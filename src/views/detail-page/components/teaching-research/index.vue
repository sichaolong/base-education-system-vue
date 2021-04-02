<template>
  <el-form>
    <el-row>
      <div class="form-header">
        <span>教学研究</span>
      </div>
    </el-row>

    <Tinymce value="form.content" v-model="form.content" />

    <!--有三组数据？-->
    <!-- <div>
      <span>教改项目</span>
    </div> -->
    <!-- 第一组 -->
    <el-table :data="this.form.educationalReformProjects" empty-text="暂无数据">
      <el-table-column
        prop="nameOfEducationalReformProject"
        label="教改项目名称"
      ></el-table-column>
      <el-table-column
        prop="timeOfProjectEstablishment"
        :formatter="dateFormat"
        label="立项时间"
      ></el-table-column>
      <el-table-column prop="projectSource" label="项目来源"></el-table-column>
      <el-table-column prop="host" label="主持人"></el-table-column>
      <el-table-column prop="members" label="成员"></el-table-column>
      <el-table-column prop="awards" label="获奖等次"></el-table-column>
    </el-table>

    <!-- <div>
      <span>教研论文</span>
    </div> -->
    <!-- 第二组 -->
    <el-table :data="this.form.teachingResearchPapers" empty-text="暂无数据">
      <el-table-column
        prop="nameOfTeachingResearchPaper"
        label="教研论文名称"
      ></el-table-column>
      <el-table-column
        prop="publishedTime"
        :formatter="dateFormat"
        label="发表时间"
      ></el-table-column>
      <el-table-column prop="journalName" label="期刊名称"></el-table-column>
      <el-table-column prop="authorInChef" label="第一作者"></el-table-column>
    </el-table>

    <!-- <div  >
      <span>5次代表性教研活动</span>
    </div> -->

    <!-- 第三组 -->

    <el-table
      :data="this.form.representativeTeachingAndResearchActivities"
      empty-text="暂无数据"
    >
      <el-table-column
        prop="time"
        :formatter="dateFormat"
        label="时间"
      ></el-table-column>
      <el-table-column prop="place" label="地点"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="host" label="主持人"></el-table-column>
      <el-table-column prop="hostPosition" label="支持人职务"></el-table-column>
      <el-table-column prop="participants" label="参加人员"></el-table-column>
    </el-table>

    <!-- <div>
      <span>5次代表性校外教学研讨会</span>
    </div> -->
    <!-- 第四组 -->

    <el-table
      :data="this.form.representativeOffCampusTeachingSeminars"
      empty-text="暂无数据"
    >
      <el-table-column
        prop="time"
        label="时间"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column prop="place" label="地点"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="organizer" label="主办单位"></el-table-column>
      <el-table-column prop="participants" label="参加人员"></el-table-column>
    </el-table>
  </el-form>
</template>



<script>
import Tinymce from "../tinymce-editor/index";
import { fetchInfo } from "@/api/detail-page/teaching-research/index";
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
    teachingResearchID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      info: [],
      form: {
        content: "",
        educationalReformProjects: [],
        teachingResearchPapers: [],
        representativeTeachingAndResearchActivities: [],
        representativeOffCampusTeachingSeminars: [],
      },
    };
  },
  watch: {
    teachingResearchID: function (n, o) {
      this.teachingResearchID = n;

      this.getInfo();
    },
  },
  created() {
    // this.getInfo()
  },
  methods: {
    getInfo() {
      fetchInfo(this.teachingResearchID)
        .then((result) => {
          // 四组数据
          this.form.educationalReformProjects =
            result.data.educationalReformProjects;
          this.form.teachingResearchPapers = result.data.teachingResearchPapers;
          this.form.representativeTeachingAndResearchActivities =
            result.data.representativeTeachingAndResearchActivities;
          this.form.representativeOffCampusTeachingSeminars =
            result.data.representativeOffCampusTeachingSeminars;

          this.form.content = result.data.content.html;
          //console.log(result)
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