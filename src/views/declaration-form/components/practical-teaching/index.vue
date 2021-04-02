<template>
  <div>
    <el-form :model="form">
      <el-row>
        <div class="form-subtitle">
          <span>实践教学</span>
        </div>
      </el-row>

      <Tinymce
        ref="practical"
        v-model="form.content.html"
      />

      <!-- excel导入导出 -->
    <el-dialog
      title="从Excel中导入"
      :visible.sync="uploadExcelDialogFormVisible"
    >
       <upload-excel
        :on-success="handleSuccess"
        :header="[
          'nameOfSchoolPracticalUnit',
          'area',
          'numberOfPracticeTeachingInSchool',
          'experimentalCourses',
          'numberOfPracticeStudents',
        ]"
        :attr="[
          '校内实践(实验,实训)单位名称',
          '使用面积',
          '校内实践教学工位数',
          '承接实践课程数',
          '实践学生人数/学年',
        ]"
      ></upload-excel> 
    </el-dialog>

      <div class="table-action-bar">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleClickAdd(part3.ShiJianJiaoXue.dialogVisible)"
        >添加</el-button>
         <el-button
        type="primary"
        icon="el-icon-document-add"
        @click="importFromExcel"
        >从Excel导入</el-button
      >
      <el-button type="primary" @click="exportExcel">导出excel模板</el-button>
      </div>
      <el-table
        :data="part3.ShiJianJiaoXue.tables[0]"
        empty-text="暂无数据"
      >
        <el-table-column
          prop="nameOfSchoolPracticalUnit"
          label="校内实践(实验,实训)单位名称"
        />
        <el-table-column prop="area" label="使用面积" />
        <el-table-column
          prop="numberOfPracticeTeachingInSchool"
          label="校内实践教学工位数"
        />
        <el-table-column
          prop="experimentalCourses"
          label="承接实践课程"
        />
        <el-table-column
          prop="numberOfPracticeStudents"
          label="实践学生人数/学年"
        />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-row
              style="margin-bottom: 1px"
            ><el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="
                handleClickEdit(
                  part3.ShiJianJiaoXue,
                  scope.row,
                  scope.$index
                )
              "
            /></el-row>
            <el-row
              style="margin-top: 1px"
            ><el-button
              icon="el-icon-delete"
              type="danger"
              size="small"
              @click="
                handleClickDelete(part3.ShiJianJiaoXue, scope.$index)
              "
            /></el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <el-dialog
      title="校内实践信息"
      :visible.sync="part3.ShiJianJiaoXue.dialogVisible[0]"
    >
      <el-form :model="tempData">
        <el-form-item label="校内实践(实验,实训)单位名称">
          <el-input v-model="tempData.nameOfSchoolPracticalUnit" />
        </el-form-item>
        <el-form-item label="使用面积">
          <el-input v-model="tempData.area" />
        </el-form-item>
        <el-form-item label="校内实践教学工位数">
          <el-input
            v-model="tempData.numberOfPracticeTeachingInSchool"
          />
        </el-form-item>
        <el-form-item label="承接实践课程">
          <el-input v-model="tempData.experimentalCourses" />
        </el-form-item>
        <el-form-item label="实践学生人数/学年">
          <el-input v-model="tempData.numberOfPracticeStudents" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button
            @click="handleCancel(part3.ShiJianJiaoXue.dialogVisible)"
          >取消</el-button>
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="handleAdd(part3.ShiJianJiaoXue)"
          >添加</el-button>
          <el-button
            v-else
            type="primary"
            @click="handleSave(part3.ShiJianJiaoXue)"
          >保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '../tinymce-editor/index'
import { createTable } from '@/api/declaration-form/practical-teaching/index'
import { updateTable } from '@/api/declaration-form/practical-teaching/index'
import Vue from 'vue'
import UploadExcel from "@/components/UploadExcel/index.vue";
import { fetchInfo } from '@/api/detail-page/practical-teaching/index'

export default {
  props: {
    practicalTeachingID: {
      type: String
    }
  },
  components: {
    Tinymce,
    UploadExcel
  },
  data() {
    return {
      uploadExcelDialogFormVisible: false,
      tempData: {},
      memberDialogFormVisible: false,
      editStatus: false,
      editIndex: -1,
      form: {
        content: {
          html:
              "<div style='font-family: 仿宋; font-size: 18pt''><b>（一）实践教学&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（二）实验实训&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（三）基地建设&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（四）创新创业教育&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div>"
        },
        info: [
          {
            nameOfSchoolPracticalUnit: '',
            area: '',
            numberOfPracticeTeachingInSchool: '',
            experimentalCourses: '',
            numberOfPracticeStudents: ''
          }
        ]

      },
      part3: {
        ShiJianJiaoXue: {
          nameOfSchoolPracticalUnit: '',
          area: '',
          numberOfPracticeTeachingInSchool: '',
          experimentalCourses: '',
          numberOfPracticeStudents: '',
          tables: [[]],
          dialogVisible: [false]
        }
      }
    }
  },
  watch: {
    practicalTeachingID: function(val,old) {
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
        [
          '校内实践(实验,实训)单位名称',
          '使用面积',
          '校内实践教学工位数',
          '承接实践课程数',
          '实践学生人数/学年',
        ],
        [
          "四创实验室",
          "200平方米",
          "32",
          "156",
          "32",
        ],
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
        item.nameOfSchoolPracticalUnit = results[i].nameOfSchoolPracticalUnit;
        item.area = results[i].area;
        item.numberOfPracticeTeachingInSchool = results[i].numberOfPracticeTeachingInSchool;
        item.experimentalCourses = results[i].experimentalCourses;
        item.numberOfPracticeStudents = results[i].numberOfPracticeStudents;
        this.form.info.push(item);
        this.part3.ShiJianJiaoXue.tables[0].push(item)
      }
      this.uploadExcelDialogFormVisible = false;
    },



    handleClickAdd(visible, index = 0) {
      // visible[index] = true
      this.tempData = {}
      this.editStatus = false
      Vue.set(visible, index, true)
    },
    handleAdd({ tables, dialogVisible }, index = 0) {
      tables[index].push(this.tempData)
      dialogVisible[index] = false
    },
    handleSave({ tables, dialogVisible }, index = 0) {
      Vue.set(tables[index], this.editIndex, this.tempData)
      dialogVisible[index] = false
    },
    handleCancel(visible, index = 0) {
      this.tempData = {}
      visible[index] = false
    },
    handleClickEdit({ dialogVisible }, row, rowInd, index = 0) {
      const temp = _.cloneDeep(row)
      this.tempData = temp
      this.editIndex = rowInd
      this.editStatus = true
      dialogVisible[index] = true
    },
    handleClickDelete({ tables }, rowInd, index = 0) {
      tables[index].splice(rowInd, 1)
    },
    async createPracticalTeachingInfo() {
       this.getHtml()
      await createTable(this.form)
        .then((result) => {
          //console.log(this.form)
          // console.log(result)
          this.$emit('getPracticalTeachingID', result.data.practicalTeachingID)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getHtml() {
      //this.form.content.html = tinymce.editors[6].getContent()
      //console.log(this.form.content.html)
      this.form.info = undefined
      this.form.info = new Array()
      for (
        let i = 0;
        i < this.part3.ShiJianJiaoXue.tables[0].length;
        i++
      ) {
        const item = {}
        item[
          'nameOfSchoolPracticalUnit'
        ] = this.part3.ShiJianJiaoXue.tables[0][
          i
        ].nameOfSchoolPracticalUnit
        item['area'] = this.part3.ShiJianJiaoXue.tables[0][i].area
        item[
          'numberOfPracticeTeachingInSchool'
        ] = this.part3.ShiJianJiaoXue.tables[0][
          i
        ].numberOfPracticeTeachingInSchool
        item['experimentalCourses'] = this.part3.ShiJianJiaoXue.tables[0][
          i
        ].experimentalCourses
        item[
          'numberOfPracticeStudents'
        ] = this.part3.ShiJianJiaoXue.tables[0][
          i
        ].numberOfPracticeStudents
        this.form.info[i] = item
      }
    },

    //获取要修改的信息 
    getFormInfo() {
      fetchInfo(this.practicalTeachingID).then((result) => {
            //console.log(result)
            const data = result.data;
            for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form[item] = data[item];
          }
          this.$refs.practical.setContent(this.form.content.html)
          for (let i = 0;i < this.form.info.length;i++) {
          const item = {}
          item[
           'nameOfSchoolPracticalUnit'
          ] = this.form.info[
           i
          ].nameOfSchoolPracticalUnit
          item['area'] = this.form.info[i].area
          item[
            'numberOfPracticeTeachingInSchool'
          ] = this.form.info[
           i
          ].numberOfPracticeTeachingInSchool
          item['experimentalCourses'] = this.form.info[
            i
          ].experimentalCourses
          item[
            'numberOfPracticeStudents'
          ] = this.form.info[
           i
          ].numberOfPracticeStudents
          Vue.set(this.part3.ShiJianJiaoXue.tables[0],i,item)
      }    
        })
    },

    //更新表中内容
    async updateFormInfo() {
      this.getHtml()
      await updateTable(this.practicalTeachingID,this.form)
        .then((result) => {

        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
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
  font-size: 20px;
}
</style>
