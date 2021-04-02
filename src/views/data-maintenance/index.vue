<template>
  <el-card>
    <div>
      <el-button
        type="primary"
        icon="el-icon-document-add"
        @click="importFromExcelAgain"
        >导入</el-button
      >
      <el-dialog
        title="从Excel中导入"
        :visible.sync="uploadExcelDialogFormVisibleAgain"
      >
        <upload-excel
          :on-success="handleSuccess1"
          :header="['nameOfTheMajorInTheSchool', 'schoolMajorCode']"
          :attr="['校内专业名称', '校内专业代码']"
        ></upload-excel>
      </el-dialog>

      <el-dialog
        title="从Excel中导入"
        :visible.sync="uploadExcelDialogFormVisible"
      >
        <upload-excel
          :on-success="handleSuccess"
          :header="['grassRootsTeachingSystemName']"
          :attr="['基层教学组织名称']"
        ></upload-excel>
      </el-dialog>

      <el-row>
        <div class="form-subtitle">
          <span>学院、基层教学组织添加</span>
        </div>
      </el-row>

      <el-card>
        <div slot="header">excel批量导入基层教学组织</div>
        <div>
          <div class="table-action-bar" style="text-align: center">
            <el-button
              type="primary"
              icon="el-icon-document-add"
              @click="importFromExcel"
              >从Excel导入基层教学组织名称</el-button
            >
            <el-tag
              style="margin-top: 20px; margin-left: 6px; margin-right: 6px"
              >只要使用含有模板中此列的excel都可以</el-tag
            >
            <el-button type="primary" @click="exportExcel"
              >导出excel基层教学组织名称模板</el-button
            >
          </div>
        </div>
      </el-card>
    </div>

    <el-card>
      <div slot="header">单个添加</div>
      <div>
        <el-input
          v-model="form.grassRootsTeachingSystemName"
          style="width: 200px; margin-top: 20px; margin-left: 50%"
        ></el-input
        ><el-button
          style="margin-left: 20px"
          @click="addGrassRootsTeachingSystem"
          >添加基层教学组织</el-button
        >

        <el-input
          v-model="form.collegeName"
          style="width: 200px; margin-top: 20px; margin-left: 50%"
        ></el-input
        ><el-button style="margin-left: 20px" @click="addCollegeName"
          >添加学院</el-button
        >
      </div>
    </el-card>
  </el-card>
</template>

<script>
import Vue from "vue";
import UploadExcel from "@/components/UploadExcel/index.vue";
import {
  addCollege,
  addOrganization,
  addImportOrganization,
  addImportMajors,
} from "@/api/data-maintenance/index";

export default {
  components: {
    UploadExcel,
  },
  data() {
    return {
      form: {
        grassRootsTeachingSystemName: "",
        arrayOfGrassRootsTeachingSystemName: [],
        collegeName: "",
        majors: [],
      },
      uploadExcelDialogFormVisibleAgain: false,
      uploadExcelDialogFormVisible: false,
    };
  },

  watch: {},
  methods: {
    //添加学院名称
    addCollegeName() {
      if (this.form.collegeName.trim().length === 0) return;
      console.log(this.form);
      addCollege(this.form)
        .then((result) => {
          this.$message.success("学院添加成功");
          this.form.collegeName = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //添加单个基层教学组织管理名称
    addGrassRootsTeachingSystem() {
      if (this.form.grassRootsTeachingSystemName.trim().length === 0) return;
      addOrganization(this.form)
        .then((result) => {
          this.$message.success("基层教学组织添加成功");
          this.form.grassRootsTeachingSystemName = "";
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(this.form.grassRootsTeachingSystemName);
    },

    // 批量导入基层教学组织

    addArrayOfGrassRootsTeachingSystemName() {
      addImportOrganization(this.form)
        .then((result) => {
          this.$message.success("基层教学组织名称批量导入成功");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //显示导入excel的dialog
    importFromExcel() {
      this.uploadExcelDialogFormVisible = true;
    },

    //导入成功
    handleSuccess({ results, header }) {
      this.$message({
        message: "excel导入成功！",
        type: "success",
      });
      //this.form.part2.members = results
      for (let i = 0; i < results.length; i++) {
        this.form.arrayOfGrassRootsTeachingSystemName.push(
          results[i].grassRootsTeachingSystemName
        );
      }

      console.log(this.form.arrayOfGrassRootsTeachingSystemName);
      this.uploadExcelDialogFormVisible = false;

      // 向后端批量导入
      this.addArrayOfGrassRootsTeachingSystemName();
    },

    // 批量导入专业及其专业代码
    addArrayOfMajorAndCode() {
      addImportMajors(this.form)
        .then((result) => {
          this.$message.success("专业及其代码批量导入成功");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 导入专业名称及代码
    importFromExcelAgain() {
      this.uploadExcelDialogFormVisibleAgain = true;
    },

    handleSuccess1({ results, header }) {
      this.$message({
        message: "excel导入成功！",
        type: "success",
      });

      for (let i = 0; i < results.length; i++) {
        const item = {};
        item.nameOfTheMajorInTheSchool = results[i].nameOfTheMajorInTheSchool;
        item.schoolMajorCode = results[i].schoolMajorCode;
        this.form.majors.push(item);
      }

      console.log(this.form.majors);

      this.uploadExcelDialogFormVisible = false;
      // 向后端批量导入
      this.addArrayOfMajorAndCode();
    },

    //导出excel
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

      convertToCsv("download.csv", [["基层教学组织名称"], ["大学英语教研部"]]);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-subtitle-subtitle {
  font-size: 1rem;
  margin: 10px 0;
  text-align: center;
}

.form-subtitle {
  text-align: center;
  font-size: 1.8rem;
  margin: 15px 0;
  span {
    padding: 3px 0;
    border-bottom: 3px solid #409eff;
  }
}

.el-table {
  font-size: 20px;
}
</style>