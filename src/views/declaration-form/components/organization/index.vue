<template>
  <div>
    <el-form :model="form">
      <el-row>
        <div class="form-subtitle">
          <span>教学组织</span>
        </div>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <el-form-item label="教师总数（人）">
            <el-input v-model="form.totalNumberOfTeachers" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="承担课程（门）">
            <el-input v-model="form.coursesUndertaken" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="人均周学时">
            <el-input v-model="form.perCapitaWeeklySchoolHours" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="人均指导毕业论文/设计">
            <el-input v-model="form.perCapitaGuidingGraduationThesis" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="教学事故（次）">
            <el-input v-model="form.teachingAccident" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="综合评教优秀以上人数及比例">
            <el-input
              v-model="form.comprehensiveEvaluationOfExcellentTeaching"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <Tinymce ref="organ" v-model="form.content.html" />

      <!-- excel导入导出 -->
    <el-dialog
      title="从Excel中导入"
      :visible.sync="uploadExcelDialogFormVisible"
    >
       <upload-excel
        :on-success="handleSuccess"
        :header="[
          'professorName',
          'course',
          'period',
          'studentNumbers',
          'semesterTime',
        ]"
        :attr="[
          '教授姓名',
          '讲授课程',
          '学时',
          '学生人数',
          '学期时间',
        ]"
      ></upload-excel> 
    </el-dialog>

      <div class="table-action-bar">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleClickAdd(part3.JiaoXueZuZhi.dialogVisible)"
          >添加</el-button
        >
        <el-button
        type="primary"
        icon="el-icon-document-add"
        @click="importFromExcel"
        >从Excel导入</el-button
      >
      <el-button type="primary" @click="exportExcel">导出excel模板</el-button>
      </div>
      <el-table :data="part3.JiaoXueZuZhi.tables[0]" empty-text="暂无数据">
        <el-table-column prop="professorName" label="教授姓名" />
        <el-table-column prop="course" label="讲授课程" />
        <el-table-column prop="period" label="学时" />
        <el-table-column prop="studentNumbers" label="学生人数" />
        <el-table-column prop="semesterTime" label="学期时间" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-row style="margin-bottom: 1px"
              ><el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="
                  handleClickEdit(part3.JiaoXueZuZhi, scope.row, scope.$index)
                "
            /></el-row>
            <el-row style="margin-top: 1px"
              ><el-button
                icon="el-icon-delete"
                type="danger"
                size="small"
                @click="handleClickDelete(part3.JiaoXueZuZhi, scope.$index)"
            /></el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <el-dialog
      title="教学组织信息"
      :visible.sync="part3.JiaoXueZuZhi.dialogVisible[0]"
    >
      <el-form :model="tempData">
        <el-form-item label="教授姓名">
          <el-input v-model="tempData.professorName" />
        </el-form-item>
        <el-form-item label="讲授课程">
          <el-input v-model="tempData.course" />
        </el-form-item>
        <el-form-item label="学时">
          <el-input v-model="tempData.period" />
        </el-form-item>
        <el-form-item label="学生人数">
          <el-input v-model="tempData.studentNumbers" />
        </el-form-item>
        <el-form-item label="学期时间">
          <el-input v-model="tempData.semesterTime" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button @click="handleCancel(part3.JiaoXueZuZhi.dialogVisible)"
            >取消</el-button
          >
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="handleAdd(part3.JiaoXueZuZhi)"
            >添加</el-button
          >
          <el-button
            v-else
            type="primary"
            @click="handleSave(part3.JiaoXueZuZhi)"
            >保存</el-button
          >
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from "../tinymce-editor/index";
import Vue from "vue";
import { createTable } from "@/api/declaration-form/organization/index";
import { updateTable } from "@/api/declaration-form/organization/index";
import UploadExcel from "@/components/UploadExcel/index.vue";
import { fetchInfo } from '@/api/detail-page/organization/index'
export default {
  props: {
    teachingOrganizationID: {
      type:String
    }
  },
  components: {
    Tinymce,
    UploadExcel,
  },
  data() {
    return {
      uploadExcelDialogFormVisible: false,
      tempData: {},
      memberDialogFormVisible: false,
      editStatus: false,
      editIndex: -1,
      form: {
        totalNumberOfTeachers: "",
        coursesUndertaken: "",
        perCapitaWeeklySchoolHours: "",
        perCapitaGuidingGraduationThesis: "",
        teachingAccident: "",
        comprehensiveEvaluationOfExcellentTeaching: "",
        content: {
          html:
            "<div style='font-family: 仿宋; font-size: 18pt''><b>（一）教学计划&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（二）课堂教学&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（三）教学运行&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（四）教学评价情况</b></div><div style='font-family: 仿宋; font-size: 12pt''></div>",
        },
        info: [
          {
            professorName: "",
            course: "",
            period: "",
            studentNumbers: "",
            semesterTime: "",
          },
        ],
      },
      part3: {
        JiaoXueZuZhi: {
          tables: [[]],
          dialogVisible: [false],
        },
      },
    };
  },
  watch: {
    teachingOrganizationID:function(val,old){
      this.getFormInfo()
      
    }
  },
  methods: {
    //excel部分
    //excel导入
    importFromExcel() {
      this.uploadExcelDialogFormVisible = true;
    },
    //excel导出
    exportExcel() {
      function convertToCsv(fName, rows) {
        var csv = "";
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          for (var j = 0; j < row.length; j++) {
            var val = row[j] === null ? "" : row[j].toString();
            val = val.replace(/\t/gi, " ");
            if (j > 0) csv += "\t";
            csv += val;
          }
          csv += "\n";
        }
        // for UTF-16
        var cCode,
          bArr = [];
        bArr.push(255, 254);
        for (var i = 0; i < csv.length; ++i) {
          cCode = csv.charCodeAt(i);
          bArr.push(cCode & 0xff);
          bArr.push((cCode / 256) >>> 0);
        }
        var blob = new Blob([new Uint8Array(bArr)], {
          type: "text/csv;charset=UTF-16LE;",
        });
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(blob, fName);
        } else {
          var link = document.createElement("a");
          if (link.download !== undefined) {
            var url = window.URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", fName);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }
        }
      }
      convertToCsv("download.csv", [
        ["教授姓名", "讲授课程", "学时", "学生人数", "学期时间"],
        ["无名氏", "高数", "32", "156", "2020-2021学年第一学期"],
      ]);
    },
    //excel数据导入
    handleSuccess({ results, header }) {
      this.$message({
        message: "导入成功！",
        type: "success",
      });
      //this.form.part2.members = results
      for (let i = 0; i < results.length; i++) {
        //console.log(results)
        const item = {};
        item.professorName = results[i].professorName;
        item.course = results[i].course;
        item.period = results[i].period;
        item.studentNumbers = results[i].studentNumbers;
        item.semesterTime = results[i].semesterTime;
        this.form.info.push(item);
        this.part3.JiaoXueZuZhi.tables[0].push(item);
      }
      this.uploadExcelDialogFormVisible = false;
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
    async createOrganizationInfo() {
      this.getHtml();
      await createTable(this.form)
        .then((result) => {
          // console.log(result)
          // console.log(this.form.data.content.html)
          // console.log(this.form)
          this.$emit("getOrganizationID", result.data.teachingOrganizationID);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHtml() {
      //this.form.content.html = window.tinymce.editors[2].getContent();
      //console.log(tinymce.editors[2].getContent())
      //console.log(this.form.content.html)
      this.form.info = undefined
      this.form.info = new Array()
      for (let i = 0; i < this.part3.JiaoXueZuZhi.tables[0].length; i++) {
        const item = {};
        item["professorName"] = this.part3.JiaoXueZuZhi.tables[0][
          i
        ].professorName;
        item["course"] = this.part3.JiaoXueZuZhi.tables[0][i].course;
        item["period"] = this.part3.JiaoXueZuZhi.tables[0][i].period;
        item["studentNumbers"] = this.part3.JiaoXueZuZhi.tables[0][
          i
        ].studentNumbers;
        item["semesterTime"] = this.part3.JiaoXueZuZhi.tables[0][
          i
        ].semesterTime;
        this.form.info[i] = item;
      }
      // console.log( this.form.data.info);
    },
    //获取要修改的信息
    getFormInfo() {
       fetchInfo(this.teachingOrganizationID).then((result) => {
         
            const data = result.data;
            for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form[item] = data[item];
          }
          this.$refs.organ.setContent(this.form.content.html)
          //console.log(this.form.content.html)
          for (let i = 0; i < this.form.info.length; i++) {
          const item = {}
          item["professorName"] = this.form.info[
            i
          ].professorName;
          item["course"] = this.form.info[i].course;
          item["period"] = this.form.info[i].period;
          item["studentNumbers"] = this.form.info[
            i
          ].studentNumbers;
          item["semesterTime"] = this.form.info[
            i
          ].semesterTime;
          Vue.set(this.part3.JiaoXueZuZhi.tables[0],i,item)
          }
        })
    },

    //更新表中内容
    async updateFormInfo() {
      this.getHtml();
      await updateTable(this.teachingOrganizationID,this.form)
        .then((result) => {
       
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
.el-table {
  font-size: 10px;
}
</style>
