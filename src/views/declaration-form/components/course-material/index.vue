<template>
  <div>
    <el-form>
      <el-row>
        <div class="form-subtitle">
          <span>课程教材概述</span>
        </div>
      </el-row>

      <Tinymce
        ref="course"
        v-model="form.content.html"
      />

       <el-dialog
      title="从Excel中导入"
      :visible.sync="uploadExcelDialogFormVisibleFirst"
    >
      <upload-excel
        :on-success="handleSuccessFirst"
        :header="[
          'onlineCourseName',
          'platformSite',
          'chosenNumbers',
          'period',
          'completionTime',
          'level',
          'professionalTitle',
        ]"
        :attr="[
          '在线开放课程',
          '平台网址',
          '选课人数',
          '总课时',
          '建成时间',
          '校级/省级',
        ]"
      ></upload-excel>
    </el-dialog>
     <el-dialog
      title="从Excel中导入"
      :visible.sync="uploadExcelDialogFormVisibleSecond"
    >
      <upload-excel
        :on-success="handleSuccessSecond"
        :header="[
          'nameOfTeachingMaterial',
          'editorInChief',
          'participatingEditor',
          'theNumberOfWordsInTheChapter',
          'yearOfPublication',
          'press',
          'level',
        ]"
        :attr="[
          '规划教材名称',
          '主编',
          '参编',
          '章节字数',
          '出版年',
          '出版社',
          '省级/国家级',
        ]"
      ></upload-excel>
    </el-dialog>

      <div class="table-action-bar">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleClickAdd(part3.KeChengJiaoCaiGaiShu.dialogVisible)"
        >添加</el-button>
         <el-button
        type="primary"
        icon="el-icon-document-add"
        @click="importFromExcelFirst"
        >从Excel导入</el-button
      >
      <el-button type="primary" @click="exportExcelFirst">导出excel模板</el-button>
      </div>
      <el-table
        :data="part3.KeChengJiaoCaiGaiShu.tables[0]"
        empty-text="暂无数据"
      >
        <el-table-column
          prop="onlineCourseName"
          label="在线开放课程"
        />
        <el-table-column prop="platformSite" label="平台网址" />
        <el-table-column
          prop="chosenNumbers"
          label="选课人数"
        />
        <el-table-column prop="period" label="总课时" />
        <el-table-column
          prop="completionTime"
          label="建成时间"
        />
        <el-table-column prop="level" label="校级/省级" />
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
                  part3.KeChengJiaoCaiGaiShu,
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
                handleClickDelete(
                  part3.KeChengJiaoCaiGaiShu,
                  scope.$index
                )
              "
            /></el-row>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-action-bar">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="
            handleClickAdd(part3.KeChengJiaoCaiGaiShu.dialogVisible, 1)
          "
        >添加</el-button>
         <el-button
        type="primary"
        icon="el-icon-document-add"
        @click="importFromExcelSecond"
        >从Excel导入</el-button
      >
      <el-button type="primary" @click="exportExcelSecond">导出excel模板</el-button>
      </div>
      <el-table
        :data="part3.KeChengJiaoCaiGaiShu.tables[1]"
        empty-text="暂无数据"
      >
        <el-table-column
          prop="nameOfTeachingMaterial"
          label="规划教材名称"
        />
        <el-table-column prop="editorInChief" label="主编" />
        <el-table-column
          prop="participatingEditor"
          label="参编"
        />
        <el-table-column
          prop="theNumberOfWordsInTheChapter"
          label="章节字数"
        />
        <el-table-column
          prop="yearOfPublication"
          label="出版年"
        />
        <el-table-column prop="press" label="出版社" />
        <el-table-column prop="level" label="省级/国家级" />
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
                  part3.KeChengJiaoCaiGaiShu,
                  scope.row,
                  scope.$index,
                  1
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
                handleClickDelete(
                  part3.KeChengJiaoCaiGaiShu,
                  scope.$index,
                  1
                )
              "
            /></el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <el-dialog
      title="在线课程信息"
      :visible.sync="part3.KeChengJiaoCaiGaiShu.dialogVisible[0]"
    >
      <el-form :model="tempData">
        <el-form-item label="在线开放课程">
          <el-input v-model="tempData.onlineCourseName" />
        </el-form-item>
        <el-form-item label="平台网址">
          <el-input v-model="tempData.platformSite" />
        </el-form-item>
        <el-form-item label="选课人数">
          <el-input v-model="tempData.chosenNumbers" />
        </el-form-item>
        <el-form-item label="总课时">
          <el-input v-model="tempData.period" />
        </el-form-item>
        <el-form-item label="建成时间">
          <el-date-picker
            v-model="tempData.completionTime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="校级/省级">
          <el-input v-model="tempData.level" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button
            @click="handleCancel(part3.KeChengJiaoCaiGaiShu.dialogVisible)"
          >取消</el-button>
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="handleAdd(part3.KeChengJiaoCaiGaiShu)"
          >添加</el-button>
          <el-button
            v-else
            type="primary"
            @click="handleSave(part3.KeChengJiaoCaiGaiShu)"
          >保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="规划教材信息"
      :visible.sync="part3.KeChengJiaoCaiGaiShu.dialogVisible[1]"
    >
      <el-form :model="tempData">
        <el-form-item label="规划教材名称">
          <el-input v-model="tempData.nameOfTeachingMaterial" />
        </el-form-item>
        <el-form-item label="主编">
          <el-input v-model="tempData.editorInChief" />
        </el-form-item>
        <el-form-item label="参编">
          <el-input v-model="tempData.participatingEditor" />
        </el-form-item>
        <el-form-item label="章节字数">
          <el-input v-model="tempData.theNumberOfWordsInTheChapter" />
        </el-form-item>
        <el-form-item label="出版年">
          <el-input v-model="tempData.yearOfPublication" />
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="tempData.press" />
        </el-form-item>
        <el-form-item label="省级/国家级">
          <el-input v-model="tempData.level" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button
            @click="
              handleCancel(part3.KeChengJiaoCaiGaiShu.dialogVisible, 1)
            "
          >取消</el-button>
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="handleAdd(part3.KeChengJiaoCaiGaiShu, 1)"
          >添加</el-button>
          <el-button
            v-else
            type="primary"
            @click="handleSave(part3.KeChengJiaoCaiGaiShu, 1)"
          >保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '../tinymce-editor/index'
import Vue from 'vue'
import { createTable } from '@/api/declaration-form/course-material/index'
import { updateTable } from '@/api/declaration-form/course-material/index'
import UploadExcel from "@/components/UploadExcel/index.vue";
import { fetchInfo } from '@/api/detail-page/course-material/index'
export default {
  props: {
    courseMaterialID: {
      type:String
    }
  },
  components: {
    Tinymce,
    UploadExcel
  },
  data() {
    return {
      uploadExcelDialogFormVisibleFirst: false,
      uploadExcelDialogFormVisibleSecond: false,
      tempData: {},
      memberDialogFormVisible: false,
      editStatus: false,
      editIndex: -1,
      form: {
        onlineCourses: [
          {
            onlineCourseName: '',
            platformSite: '',
            chosenNumbers: '',
            period: '',
            completionTime: '',
            level: ''
          }
        ],
        textbooks: [
          {
            nameOfTeachingMaterial: '',
            editorInChief: '',
            participatingEditor: '',
            theNumberOfWordsInTheChapter: '',
            yearOfPublication: '',
            press: '',
            level: ''
          }
        ],
        content: {
          html:
              "<div style='font-family: 仿宋; font-size: 18pt''><b>（一）课程体系建设&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（二）课程标准执行&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（三）教材建设&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（四）在线开放课程建设</b></div><div style='font-family: 仿宋; font-size: 12pt''></div>"
        }
      },
      part3: {
        KeChengJiaoCaiGaiShu: {
          tables: [[], []],
          dialogVisible: [false, false]
        }
      }
    }
  },
  watch: {
    courseMaterialID: function(val,old){
      this.getFormInfo()
    }
  },
  methods: {
    //excel部分
    //excel导入
    importFromExcelFirst() {
      this.uploadExcelDialogFormVisibleFirst = true;
    },
     importFromExcelSecond() {
     this.uploadExcelDialogFormVisibleSecond = true;
    },
    //excel导出
    exportExcelFirst() {
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
          "在线开放课程",
          "平台网址",
          "选课人数",
          "总课时",
          "建成时间",
          "校级/省级",
        ],
        [
          "数学",
          "www.aaa.com",
          "32",
          "32",
          "2000年1月12",
          "校级",
        ],
      ]);
    },
    exportExcelSecond() {
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
          "规划教材名称",
          "主编",
          "参编",
          "章节字数",
          "出版年",
          "出版社",
          "省级/国家级"
        ],
        [
          "数学",
          "小红",
          "小明",
          "10000",
          "2012",
          "河南大学出版社",
          "国家级",
        ],
      ]);
    },
    //excel数据导入
    handleSuccessFirst({ results, header }) {
      this.$message({
        message: "导入成功！",
        type: "success",
      });
      //this.form.part2.members = results
      for (let i = 0; i < results.length; i++) {
        //console.log(results)
        const item = {};
        item.onlineCourseName = results[i].onlineCourseName;
        item.platformSite = results[i].platformSite;
        item.chosenNumbers = results[i].chosenNumbers;
        item.period = results[i].period;
        item.completionTime = results[i].completionTime;
        item.level = results[i].level;
        this.form.onlineCourses.push(item);
        this.part3.KeChengJiaoCaiGaiShu.tables[0].push(item)
      }
      this.uploadExcelDialogFormVisibleFirst = false;
    },
    handleSuccessSecond({ results, header }) {
      this.$message({
        message: "导入成功！",
        type: "success",
      });
      //this.form.part2.members = results
      for (let i = 0; i < results.length; i++) {
        //console.log(results)
        const item = {};
        item.nameOfTeachingMaterial = results[i].nameOfTeachingMaterial;
        item.editorInChief = results[i].editorInChief;
        item.participatingEditor = results[i].participatingEditor	;
        item.theNumberOfWordsInTheChapter = results[i].theNumberOfWordsInTheChapter;
        item.yearOfPublication = results[i].yearOfPublication;
        item.press = results[i].press;
        item.level = results[i].level;
        this.form.textbooks.push(item);
        this.part3.KeChengJiaoCaiGaiShu.tables[1].push(item)
      }
      this.uploadExcelDialogFormVisibleSecond = false;
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
    async createCourseMaterialInfo() {
    this.getHtml()
      await createTable(this.form)
        .then((result) => {
          // console.log(result)

          console.log(this.form)
          this.$emit('getCourseMaterialID', result.data.courseMaterialID)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getHtml() {
      //this.form.content.html = tinymce.editors[3].getContent()
      //console.log(this.form.content.html)
      // console.log(this.form.part3.DuiWuJianShe.tables[0])
      this.form.onlineCourses = undefined
      this.form.onlineCourses = new Array()
      for (
        let i = 0;
        i < this.part3.KeChengJiaoCaiGaiShu.tables[0].length;
        i++
      ) {
        const item = {}
        item[
          'onlineCourseName'
        ] = this.part3.KeChengJiaoCaiGaiShu.tables[0][i].onlineCourseName
        item['platformSite'] = this.part3.KeChengJiaoCaiGaiShu.tables[0][
          i
        ].platformSite
        item['chosenNumbers'] = this.part3.KeChengJiaoCaiGaiShu.tables[0][
          i
        ].chosenNumbers
        item[
          'period'
        ] = this.part3.KeChengJiaoCaiGaiShu.tables[0][
          i
        ].period
        item['completionTime'] = this.part3.KeChengJiaoCaiGaiShu.tables[0][
          i
        ].completionTime
        item[
          'level'
        ] = this.part3.KeChengJiaoCaiGaiShu.tables[0][i].level
        this.form.onlineCourses[i] = item
      }
      this.form.textbooks = undefined
      this.form.textbooks = new Array()
      for (
        let i = 0;
        i < this.part3.KeChengJiaoCaiGaiShu.tables[1].length;
        i++
      ) {
        const item = {}
        item[
          'nameOfTeachingMaterial'
        ] = this.part3.KeChengJiaoCaiGaiShu.tables[1][
          i
        ].nameOfTeachingMaterial
        item['editorInChief'] = this.part3.KeChengJiaoCaiGaiShu.tables[1][
          i
        ].editorInChief
        item[
          'participatingEditor'
        ] = this.part3.KeChengJiaoCaiGaiShu.tables[1][
          i
        ].participatingEditor
        item[
          'theNumberOfWordsInTheChapter'
        ] = this.part3.KeChengJiaoCaiGaiShu.tables[1][
          i
        ].theNumberOfWordsInTheChapter
        item[
          'yearOfPublication'
        ] = this.part3.KeChengJiaoCaiGaiShu.tables[1][i].yearOfPublication
        item['press'] = this.part3.KeChengJiaoCaiGaiShu.tables[1][i].press
        item['level'] = this.part3.KeChengJiaoCaiGaiShu.tables[1][i].level
        this.form.textbooks[i] = item
      }
    },
    //获取要修改的内容
    getFormInfo() {
      fetchInfo(this.courseMaterialID).then((result) => {
        //console.log(result)
            const data = result.data;
            for (const item in data) {
            if (typeof data[item] === "function") {
              continue;
            }
            this.form[item] = data[item];
          }
          this.$refs.course.setContent(this.form.content.html)
          for (
        let i = 0;
        i < this.form.onlineCourses.length;
        i++
      ) {
        const item = {}
        item[
          'onlineCourseName'
        ] = this.form.onlineCourses[i].onlineCourseName
        item['platformSite'] = this.form.onlineCourses[
          i
        ].platformSite
        item['chosenNumbers'] = this.form.onlineCourses[
          i
        ].chosenNumbers
        item[
          'period'
        ] = this.form.onlineCourses[
          i
        ].period
        item['completionTime'] = this.form.onlineCourses[
          i
        ].completionTime
        item['level'] = this.form.onlineCourses[i].level
        Vue.set(this.part3.KeChengJiaoCaiGaiShu.tables[0],i,item)
      }
      for ( let i = 0;i < this.form.textbooks.length; i++) {
        const item = {}
        item[
          'nameOfTeachingMaterial'
        ] = this.form.textbooks[
          i
        ].nameOfTeachingMaterial
        item['editorInChief'] = this.form.textbooks[
          i
        ].editorInChief
        item[
          'participatingEditor'
        ] = this.form.textbooks[
          i
        ].participatingEditor
        item[
          'theNumberOfWordsInTheChapter'
        ] = this.form.textbooks[
          i
        ].theNumberOfWordsInTheChapter
        item[
          'yearOfPublication'
        ] = this.form.textbooks[i].yearOfPublication
        item['press'] = this.form.textbooks[i].press
        item['level'] = this.form.textbooks[i].level
        Vue.set(this.part3.KeChengJiaoCaiGaiShu.tables[1],i,item)
      }
        })
    },

    //更新表中内容
    async updateFormInfo() {
      this.getHtml()
      await updateTable(this.courseMaterialID,this.form)
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
