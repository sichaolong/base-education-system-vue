<template>
  <div>
    <div class="form-header">
      <span>队伍建设 </span>
    </div>
    <Tinymce value="form.content.html" v-model="form.content.html" />
    <el-form>
      
      <el-table :data="form.newTeachers" empty-text="暂无数据">
        <el-table-column label="新入职教师姓名" prop="nameOfNewTeacher"></el-table-column>
        <el-table-column label="培训时间（学时）" prop="trainingTime"></el-table-column>
        <el-table-column label="培训地点" prop="trainingPlace"></el-table-column>
        <el-table-column label="培训单位" prop="trainingInstitution"></el-table-column>
        <el-table-column label="指导教师" prop="supervisor"></el-table-column>
        <el-table-column label="职称" prop="professionalTitle"></el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "../tinymce-editor/index";
import { fetchInfo } from "@/api/detail-page/team-building/index";
export default {
  components: {
    Tinymce,
  },
  data() {
    return {
      form: {
        newTeachers: [],
        content: {
          html: "",
        },
      },
    };
  },
  props: {
    header: {
      type: String,
      required: true,
    },
    teamBuildingID: {
      type: String,
      required: true,
    },
  },
  watch: {
    teamBuildingID: function (n, o) {
      this.teamBuildingID = n;

      this.getInfo();
    },
  },
  created() {
    // this.getInfo()
  },
  methods: {
    getInfo() {
      fetchInfo(this.teamBuildingID)
        .then((result) => {
          //   const data = result.data;
          //   for (const item in data) {
          //     if (typeof data[item] === "function") {
          //       continue;
          //     }
          //     this.form[item] = data[item];
          //   }
          //   this.form.content = result.data.content.html;
          this.form = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
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
