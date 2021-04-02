<template>
  <div>
    <el-form :model="form">
      <el-row>
        <div class="form-subtitle">
          <span>教学研究</span>
        </div>
      </el-row>
      <Tinymce v-model="form.content.html" ref="teaching" />
      <el-dialog
        title="从Excel中导入"
        :visible.sync="uploadExcelDialogFormVisibleFirst"
      >
        <upload-excel
          :on-success="handleSuccessFirst"
          :header="[
            'nameOfEducationalReformProject',
            'timeOfProjectEstablishment',
            'projectSource',
            'host',
            'members',
            'awards',
          ]"
          :attr="[
            '教改项目名称',
            '立项时间',
            '项目来源',
            '主持人',
            '成员',
            '获奖等次(特等奖,一等奖,二等奖,三等奖,优秀奖)',
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
            'nameOfTeachingResearchPaper',
            'publishedTime',
            'journalName',
            'authorInChef',
          ]"
          :attr="['教研论文名称', '发表时间', '期刊名称', '第一作者']"
        ></upload-excel>
      </el-dialog>

      <div class="table-action-bar">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleClickAdd(part3.JiaoXueYanJiu.dialogVisible)"
          >添加</el-button
        >

        <el-button
          type="primary"
          icon="el-icon-document-add"
          @click="importFromExcelFirst"
          >从Excel导入</el-button
        >
        <el-button type="primary" @click="exportExcelFirst"
          >导出excel模板</el-button
        >
      </div>

      <!-- 教改项目 -->
      <el-table :data="part3.JiaoXueYanJiu.tables[0]" empty-text="暂无数据">
        <el-table-column
          prop="nameOfEducationalReformProject"
          label="教改项目名称"
        />
        <el-table-column prop="timeOfProjectEstablishment" label="立项时间" />
        <el-table-column prop="projectSource" label="项目来源" />
        <el-table-column prop="host" label="主持人" />
        <el-table-column prop="members" label="成员" />
        <el-table-column prop="awards" label="获奖等次" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-row style="margin-bottom: 1px"
              ><el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="
                  handleClickEdit(part3.JiaoXueYanJiu, scope.row, scope.$index)
                "
            /></el-row>
            <el-row style="margin-top: 1px"
              ><el-button
                icon="el-icon-delete"
                type="danger"
                size="small"
                @click="handleClickDelete(part3.JiaoXueYanJiu, scope.$index)"
            /></el-row>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-action-bar">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleClickAdd(part3.JiaoXueYanJiu.dialogVisible, 1)"
          >添加</el-button
        >

        <el-button
          type="primary"
          icon="el-icon-document-add"
          @click="importFromExcelSecond"
          >从Excel导入</el-button
        >
        <el-button type="primary" @click="exportExcelSecond"
          >导出excel模板</el-button
        >
      </div>

      <!-- 教改论文 -->
      <el-table :data="part3.JiaoXueYanJiu.tables[1]" empty-text="暂无数据">
        <el-table-column
          prop="nameOfTeachingResearchPaper"
          label="教改论文题目"
        />
        <el-table-column prop="publishedTime" label="发表时间" />
        <el-table-column prop="journalName" label="期刊名称" />
        <el-table-column prop="authorInChef" label="第一作者" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-row style="margin-bottom: 1px"
              ><el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="
                  handleClickEdit(
                    part3.JiaoXueYanJiu,
                    scope.row,
                    scope.$index,
                    1
                  )
                "
            /></el-row>
            <el-row style="margin-top: 1px"
              ><el-button
                icon="el-icon-delete"
                type="danger"
                size="small"
                @click="
                  handleClickDelete(part3.JiaoXueYanJiu, scope.$index, 1)
                "
            /></el-row>
          </template>
        </el-table-column>
      </el-table>

      <div class="form-subtitle">
        <span>5次代表性教研活动</span>
      </div>

      <div class="table-action-bar">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleClickAdd(part3.JiaoXueYanJiu.dialogVisible, 2)"
          >添加</el-button
        >
        <!-- <el-button class="span-class" type="primary"> 5次代表性教研活动 </el-button> -->
      </div>
      <el-table :data="part3.JiaoXueYanJiu.tables[2]" empty-text="暂无数据">
        <el-table-column prop="time" label="时间" />
        <el-table-column prop="place" label="地点" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="host" label="主持人" />
        <el-table-column prop="hostPosition" label="主持人职务" />
        <el-table-column prop="participants" label="参加人员" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-row style="margin-bottom: 1px"
              ><el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="
                  handleClickEdit(
                    part3.JiaoXueYanJiu,
                    scope.row,
                    scope.$index,
                    2
                  )
                "
            /></el-row>
            <el-row style="margin-top: 1px"
              ><el-button
                icon="el-icon-delete"
                type="danger"
                size="small"
                @click="
                  handleClickDelete(part3.JiaoXueYanJiu, scope.$index, 2)
                "
            /></el-row>
          </template>
        </el-table-column>
      </el-table>

      <div class="form-subtitle">
        <span>5次代表性校外教学研讨会</span>
      </div>

      <div class="table-action-bar">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleClickAdd(part3.JiaoXueYanJiu.dialogVisible, 3)"
          >添加</el-button
        >
        <!-- <el-button class="span-class" type="primary"> 5次代表性校外教学研讨会 </el-button> -->
      </div>
      <el-table :data="part3.JiaoXueYanJiu.tables[3]" empty-text="暂无数据">
        <el-table-column prop="timeYear" label="时间" />
        <el-table-column prop="place" label="地点" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="organizer" label="主办单位" />
        <el-table-column prop="participants" label="参加人员" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-row style="margin-bottom: 1px"
              ><el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="
                  handleClickEdit(
                    part3.JiaoXueYanJiu,
                    scope.row,
                    scope.$index,
                    3
                  )
                "
            /></el-row>
            <el-row style="margin-top: 1px"
              ><el-button
                icon="el-icon-delete"
                type="danger"
                size="small"
                @click="
                  handleClickDelete(part3.JiaoXueYanJiu, scope.$index, 3)
                "
            /></el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <!-- 添加修改弹窗 -->
    <el-dialog
      title="教改项目信息"
      :visible.sync="part3.JiaoXueYanJiu.dialogVisible[0]"
    >
      <el-form :model="tempData">
        <el-form-item label="教改项目名称">
          <el-input v-model="tempData.nameOfEducationalReformProject" />
        </el-form-item>
        <el-form-item label="立项时间">
          <el-date-picker
            v-model="tempData.timeOfProjectEstablishment"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="项目来源">
          <el-input v-model="tempData.projectSource" />
        </el-form-item>
        <el-form-item label="主持人">
          <el-input v-model="tempData.host" />
        </el-form-item>
        <el-form-item label="成员">
          <el-input v-model="tempData.members" />
        </el-form-item>
        <el-form-item label="获奖等次">
          <el-input v-model="tempData.awards" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button @click="handleCancel(part3.JiaoXueYanJiu.dialogVisible)"
            >取消</el-button
          >
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="handleAdd(part3.JiaoXueYanJiu)"
            >添加</el-button
          >
          <el-button
            v-else
            type="primary"
            @click="handleSave(part3.JiaoXueYanJiu)"
            >保存</el-button
          >
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="教改论文信息"
      :visible.sync="part3.JiaoXueYanJiu.dialogVisible[1]"
    >
      <el-form :model="tempData">
        <el-form-item label="教改论文题目">
          <el-input v-model="tempData.nameOfTeachingResearchPaper" />
        </el-form-item>
        <el-form-item label="发表时间">
          <el-date-picker
            v-model="tempData.publishedTime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="期刊名称">
          <el-input v-model="tempData.journalName" />
        </el-form-item>
        <el-form-item label="第一作者">
          <el-input v-model="tempData.authorInChef" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button @click="handleCancel(part3.JiaoXueYanJiu.dialogVisible, 1)"
            >取消</el-button
          >
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="handleAdd(part3.JiaoXueYanJiu, 1)"
            >添加</el-button
          >
          <el-button
            v-else
            type="primary"
            @click="handleSave(part3.JiaoXueYanJiu, 1)"
            >保存</el-button
          >
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="代表性教研活动"
      :visible.sync="part3.JiaoXueYanJiu.dialogVisible[2]"
    >
      <el-form :model="tempData">
        <el-form-item label="时间">
          <el-date-picker
            v-model="tempData.time"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="tempData.place" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="tempData.content" />
        </el-form-item>
        <el-form-item label="主持人">
          <el-input v-model="tempData.host" />
        </el-form-item>
        <el-form-item label="主持人职务">
          <el-input v-model="tempData.hostPosition" />
        </el-form-item>
        <el-form-item label="参加人员">
          <el-input v-model="tempData.participants" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button @click="handleCancel(part3.JiaoXueYanJiu.dialogVisible, 2)"
            >取消</el-button
          >
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="handleAdd(part3.JiaoXueYanJiu, 2)"
            >添加</el-button
          >
          <el-button
            v-else
            type="primary"
            @click="handleSave(part3.JiaoXueYanJiu, 2)"
            >保存</el-button
          >
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="代表性校外教学研讨会"
      :visible.sync="part3.JiaoXueYanJiu.dialogVisible[3]"
    >
      <el-form :model="tempData">
        <el-form-item label="时间/年份">
          <el-date-picker
            v-model="tempData.timeYear"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="tempData.place" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="tempData.content" />
        </el-form-item>
        <el-form-item label="主办单位">
          <el-input v-model="tempData.organizer" />
        </el-form-item>
        <el-form-item label="参加人员">
          <el-input v-model="tempData.participants" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button @click="handleCancel(part3.JiaoXueYanJiu.dialogVisible, 3)"
            >取消</el-button
          >
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="handleAdd(part3.JiaoXueYanJiu, 3)"
            >添加</el-button
          >
          <el-button
            v-else
            type="primary"
            @click="handleSave(part3.JiaoXueYanJiu, 3)"
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
import { createTable } from "@/api/declaration-form/teaching-research/index";
import { updateTable } from "@/api/declaration-form/teaching-research/index";
import UploadExcel from "@/components/UploadExcel/index.vue";
import { fetchInfo } from "@/api/detail-page/teaching-research/index";
export default {
  props: {
    teachingResearchID: {
      type: String,
    },
  },
  components: {
    Tinymce,
    UploadExcel,
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
        content: {
          html:
            "<div style='font-family: 仿宋; font-size: 18pt''><b>（一）教改项目和教研论文&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（二）教研活动和听评课&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div>",
        },
        educationalReformProjects: [
          {
            nameOfEducationalReformProject: "",
            timeOfProjectEstablishment: "",
            projectSource: "",
            host: "",
            members: "",
            awards: "",
          },
        ],
        teachingResearchPapers: [
          {
            nameOfTeachingResearchPaper: "",
            publishedTime: "",
            journalName: "",
            authorInChef: "",
          },
        ],
        representativeTeachingAndResearchActivities: [
          {
            time: "",
            place: "",
            content: "",
            host: "",
            hostPosition: "",
            participants: "",
          },
        ],
        representativeOffCampusTeachingSeminars: [
          {
            time: "",
            place: "",
            content: "",
            organizer: "",
            participants: "",
          },
        ],
      },
      part3: {
        JiaoXueYanJiu: {
          JiaoGaiXiangMuHeJiaoYanLunWen: "",
          JiaoYanHuoDongHeTingPingKe: "",
          tables: [[], [], [], []],
          dialogVisible: [false, false, false, false],
        },
      },
    };
  },
  watch: {
    teachingResearchID: function (val, old) {
      this.teachingResearchID = val;
      this.getFormInfo();
    },
    value: function (val, old) {
      if (this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val)
        );
      }
    },
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
          "教改项目名称",
          "立项时间",
          "项目来源",
          "主持人",
          "成员",
          "获奖等次(特等奖,一等奖,二等奖,三等奖,优秀奖)",
        ],
        ["数学", "2012年12月12", "项目来源", "倪大红", "倪大红,倪大黑", "特等奖"],
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
        ["教研论文名称", "发表时间", "期刊名称", "第一作者"],
        ["数学", "2012年12月12", "小明", "小黑"],
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
        item.nameOfEducationalReformProject =
          results[i].nameOfEducationalReformProject;
        item.timeOfProjectEstablishment = results[i].timeOfProjectEstablishment;
        item.projectSource = results[i].projectSource;
        item.host = results[i].host;
        item.members = results[i].members;
        item.awards = results[i].awards;
        this.form.educationalReformProjects.push(item);
        this.part3.JiaoXueYanJiu.tables[0].push(item);
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
        item.nameOfTeachingResearchPaper =
          results[i].nameOfTeachingResearchPaper;
        item.publishedTime = results[i].publishedTime;
        item.journalName = results[i].journalName;
        item.authorInChef = results[i].authorInChef;
        this.form.teachingResearchPapers.push(item);
        this.part3.JiaoXueYanJiu.tables[1].push(item);
      }
      this.uploadExcelDialogFormVisibleSecond = false;
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
    async createTeachingReseacherInfo() {
      this.getHtml();
      await createTable(this.form)
        .then((result) => {
          //console.log(this.form);
          // console.log(result)
          this.$emit("getTeachingResearchID", result.data.teachingResearchID);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取富文本编辑器内容
    async getHtml() {
     // this.form.content.html = tinymce.editors[4].getContent();
      this.form.educationalReformProjects = undefined;
      this.form.educationalReformProjects = new Array();

      for (let i = 0; i < this.part3.JiaoXueYanJiu.tables[0].length; i++) {
        const item = {};
        item[
          "nameOfEducationalReformProject"
        ] = this.part3.JiaoXueYanJiu.tables[0][
          i
        ].nameOfEducationalReformProject;
        item["timeOfProjectEstablishment"] = this.part3.JiaoXueYanJiu.tables[0][
          i
        ].timeOfProjectEstablishment;
        item["projectSource"] = this.part3.JiaoXueYanJiu.tables[0][
          i
        ].projectSource;
        item["host"] = this.part3.JiaoXueYanJiu.tables[0][i].host;
        item["members"] = this.part3.JiaoXueYanJiu.tables[0][i].members;
        item["awards"] = this.part3.JiaoXueYanJiu.tables[0][i].awards;
        this.form.educationalReformProjects[i] = item;
      }
      this.form.teachingResearchPapers = undefined;
      this.form.teachingResearchPapers = new Array();
      for (let i = 0; i < this.part3.JiaoXueYanJiu.tables[1].length; i++) {
        const item = {};
        item[
          "nameOfTeachingResearchPaper"
        ] = this.part3.JiaoXueYanJiu.tables[1][i].nameOfTeachingResearchPaper;
        item["publishedTime"] = this.part3.JiaoXueYanJiu.tables[1][
          i
        ].publishedTime;
        item["journalName"] = this.part3.JiaoXueYanJiu.tables[1][i].journalName;
        item["authorInChef"] = this.part3.JiaoXueYanJiu.tables[1][
          i
        ].authorInChef;
        this.form.teachingResearchPapers[i] = item;
      }
      this.form.representativeTeachingAndResearchActivities = undefined;
      this.form.representativeTeachingAndResearchActivities = new Array();
      for (let i = 0; i < this.part3.JiaoXueYanJiu.tables[2].length; i++) {
        const item = {};
        item["time"] = this.part3.JiaoXueYanJiu.tables[2][i].time;
        item["place"] = this.part3.JiaoXueYanJiu.tables[2][i].place;
        item["content"] = this.part3.JiaoXueYanJiu.tables[2][i].content;
        item["host"] = this.part3.JiaoXueYanJiu.tables[2][i].host;
        item["hostPosition"] = this.part3.JiaoXueYanJiu.tables[2][
          i
        ].hostPosition;
        item["participants"] = this.part3.JiaoXueYanJiu.tables[2][
          i
        ].participants;
        this.form.representativeTeachingAndResearchActivities[i] = item;
      }
      this.form.representativeOffCampusTeachingSeminars = undefined;
      this.form.representativeOffCampusTeachingSeminars = new Array();
      for (let i = 0; i < this.part3.JiaoXueYanJiu.tables[3].length; i++) {
        const item = {};
        item["time"] = this.part3.JiaoXueYanJiu.tables[3][i].timeYear;
        item["place"] = this.part3.JiaoXueYanJiu.tables[3][i].place;
        item["content"] = this.part3.JiaoXueYanJiu.tables[3][i].content;
        item["organizer"] = this.part3.JiaoXueYanJiu.tables[3][i].organizer;
        item["participants"] = this.part3.JiaoXueYanJiu.tables[3][
          i
        ].participants;
        this.form.representativeOffCampusTeachingSeminars[i] = item;
      }
    },

    //获取要修改的信息
    getFormInfo() {
      fetchInfo(this.teachingResearchID).then((result) => {
        const data = result.data;
        for (const item in data) {
          if (typeof data[item] === "function") {
            continue;
          }
          this.form[item] = data[item];
        }
        this.$refs.teaching.setContent(this.form.content.html)
        for (let i = 0; i < this.form.educationalReformProjects.length; i++) {
          const item = {};
          item[
            "nameOfEducationalReformProject"
          ] = this.form.educationalReformProjects[
            i
          ].nameOfEducationalReformProject;
          item[
            "timeOfProjectEstablishment"
          ] = this.form.educationalReformProjects[i].timeOfProjectEstablishment;
          item["projectSource"] = this.form.educationalReformProjects[
            i
          ].projectSource;
          item["host"] = this.form.educationalReformProjects[i].host;
          item["members"] = this.form.educationalReformProjects[i].members;
          item["awards"] = this.form.educationalReformProjects[i].awards;
          Vue.set(this.part3.JiaoXueYanJiu.tables[0], i, item);
        }
        for (let i = 0; i < this.form.teachingResearchPapers.length; i++) {
          const item = {};
          item[
            "nameOfTeachingResearchPaper"
          ] = this.form.teachingResearchPapers[i].nameOfTeachingResearchPaper;
          item["publishedTime"] = this.form.teachingResearchPapers[
            i
          ].publishedTime;
          item["journalName"] = this.form.teachingResearchPapers[i].journalName;
          item["authorInChef"] = this.form.teachingResearchPapers[
            i
          ].authorInChef;
          Vue.set(this.part3.JiaoXueYanJiu.tables[1], i, item);
        }
        for (
          let i = 0;
          i < this.form.representativeTeachingAndResearchActivities.length;
          i++
        ) {
          const item = {};
          item["time"] = this.form.representativeTeachingAndResearchActivities[
            i
          ].time;
          item["place"] = this.form.representativeTeachingAndResearchActivities[
            i
          ].place;
          item[
            "content"
          ] = this.form.representativeTeachingAndResearchActivities[i].content;
          item["host"] = this.form.representativeTeachingAndResearchActivities[
            i
          ].host;
          item[
            "hostPosition"
          ] = this.form.representativeTeachingAndResearchActivities[
            i
          ].hostPosition;
          item[
            "participants"
          ] = this.form.representativeTeachingAndResearchActivities[
            i
          ].participants;
          Vue.set(this.part3.JiaoXueYanJiu.tables[2], i, item);
        }
        for (
          let i = 0;
          i < this.form.representativeOffCampusTeachingSeminars.length;
          i++
        ) {
          const item = {};
          item["timeYear"] = this.form.representativeOffCampusTeachingSeminars[
            i
          ].time;
          item["place"] = this.form.representativeOffCampusTeachingSeminars[
            i
          ].place;
          item["content"] = this.form.representativeOffCampusTeachingSeminars[
            i
          ].content;
          item["organizer"] = this.form.representativeOffCampusTeachingSeminars[
            i
          ].organizer;
          item[
            "participants"
          ] = this.form.representativeOffCampusTeachingSeminars[i].participants;
          Vue.set(this.part3.JiaoXueYanJiu.tables[3], i, item);
        }
      });
    },

    //更新表中内容
    async updateFormInfo() {
      
      this.getHtml();
      await updateTable(this.teachingResearchID, this.form)
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    },
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

.span-class {
  margin-left: 35%;
  font-size: 20px;
}
.el-table {
  font-size: 20px;
}
</style>
