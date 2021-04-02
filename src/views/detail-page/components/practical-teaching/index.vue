<template>
  <el-form :model="form">
    <el-row>
      <div class="form-header">
        <span>实践教学</span>
      </div>
    </el-row>
    <Tinymce value="form.content" v-model="form.content" />
    <el-table :data="info" empty-text="暂无数据">
      <el-table-column
        prop="nameOfSchoolPracticalUnit"
        label="校内实践"
      ></el-table-column>
      <el-table-column prop="area" label="使用面积/平方米"></el-table-column>
      <el-table-column
        prop="numberOfPracticeTeachingInSchool"
        label="校内实践教学工位数/个"
      ></el-table-column>
      <el-table-column
        prop="experimentalCourses"
        label="承接实践课程"
      ></el-table-column>
      <el-table-column
        prop="numberOfPracticeStudents"
        label="实践学生人数/学年"
      ></el-table-column>
    </el-table>
    <!--:data="form.part3.ShiJianJiaoXue.tables[0]"-->
  </el-form>
</template>

<script>
import Tinymce from "../tinymce-editor/index";
import { fetchInfo } from "@/api/detail-page/practical-teaching/index";

export default {
  components: {
    Tinymce,
  },
  props: {
    header: {
      type: String,
      required: true,
    },
    practicalTeachingID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {
        content: "",
      },
      info: [],
    };
  },
  watch: {
    practicalTeachingID: function (n, o) {
      this.practicalTeachingID = n;

      this.getInfo();
    },
  },
  created() {
    // this.getInfo()
  },
  methods: {
    getInfo() {
      fetchInfo(this.practicalTeachingID)
        .then((result) => {
          //console.log(result)

          this.info = result.data.info;
          this.form.content = result.data.content.html;
        })
        .catch((err) => {
          console.log(err);
        });
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