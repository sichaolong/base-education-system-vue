<template>
  <div>
    <el-form :model="form">
      <el-row>
        <div class="form-subtitle">
          <span>人才培养能力</span>
        </div>
      </el-row>

      <Tinymce ref="talent" v-model="form.content.html" />
      <!-- excel导入导出 -->
      <el-dialog
        title="从Excel中导入"
        :visible.sync="uploadExcelDialogFormVisible"
      >
        <upload-excel
          :on-success="handleSuccess"
          :header="[
            'nameOfTeacher',
            'nameOfTeachingContest',
            'organizer',
            'time',
            'awards',
          ]"
          :attr="[
            '教师姓名',
            '教学竞赛名称',
            '组织单位',
            '时间（年份）',
            '获奖等次(一等奖,二等奖,三等奖,优秀奖)',
          ]"
        ></upload-excel>
      </el-dialog>

      <div class="table-action-bar">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleClickAdd(part3.RenCaiPeiYangNengLi.dialogVisible)"
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
      <el-table
        :data="part3.RenCaiPeiYangNengLi.tables[0]"
        empty-text="暂无数据"
      >
        <el-table-column prop="nameOfTeacher" label="教师姓名" />
        <el-table-column prop="nameOfTeachingContest" label="教学竞赛名称" />
        <el-table-column prop="organizer" label="组织单位" />
        <el-table-column prop="time" label="时间/年月" />
        <el-table-column prop="awards" label="获奖等次" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-row style="margin-bottom: 1px"
              ><el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="
                  handleClickEdit(
                    part3.RenCaiPeiYangNengLi,
                    scope.row,
                    scope.$index
                  )
                "
            /></el-row>
            <el-row style="margin-top: 1px"
              ><el-button
                icon="el-icon-delete"
                type="danger"
                size="small"
                @click="
                  handleClickDelete(part3.RenCaiPeiYangNengLi, scope.$index)
                "
            /></el-row>
          </template>
        </el-table-column>
      </el-table>

      <div class="form-subtitle">每类5项代表性成果</div>
      <el-form-item label="学科竞赛" class="label-style">
        <div class="table-action-bar">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="subjectCompetitionClickAdd"
            >添加</el-button
          >
        </div>
        <el-table :data="form.outcome.subjectCompetition" empty-text="暂无数据">
          <el-table-column prop="year" label="年度" />
          <el-table-column prop="awardName" label="奖项名称" />
          <el-table-column prop="awardWinningWork" label="获奖作品" />
          <el-table-column prop="level" label="获奖等级" />
          <el-table-column prop="nameOfWinner" label="获奖人姓名" />
          <el-table-column prop="nameOfTeacher" label="指导老师姓名" />
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-row style="margin-bottom: 1px"
                ><el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="small"
                  @click="subjectCompetitionEdit(scope.row, scope.$index)"
              /></el-row>
              <el-row style="margin-top: 1px"
                ><el-button
                  icon="el-icon-delete"
                  type="danger"
                  size="small"
                  @click="subjectCompetitionDelete(scope.$index)"
              /></el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="职业技能大赛">
        <el-input v-model="form.outcome.professionalSkillsCompetition" />
      </el-form-item>
      <el-form-item label="互联网+创业大赛">
        <el-input v-model="form.outcome.internetPlusEntrepreneurshipContest" />
      </el-form-item>
      <el-form-item label="创新创业情况">
        <el-input v-model="form.outcome.innovationAndEntrepreneurship" />
      </el-form-item>
      <el-form-item label="发表论文">
        <el-input v-model="form.outcome.publishTheses" />
      </el-form-item>
    </el-form>

    <!-- 学科竞赛弹窗表 -->
    <el-dialog
      title="学科竞赛信息"
      :visible.sync="subjectCompetition.dialogVisible"
    >
      <el-form :model="tempData">
        <el-form-item label="年度">
          <el-input v-model="tempData.year" />
        </el-form-item>
        <el-form-item label="奖项名称">
          <el-input v-model="tempData.awardName" />
        </el-form-item>
        <el-form-item label="获奖作品">
          <el-input v-model="tempData.awardWinningWork" />
        </el-form-item>
        <el-form-item label="获奖等级">
          <el-input v-model="tempData.level" />
        </el-form-item>
        <el-form-item label="获奖人姓名">
          <el-input v-model="tempData.nameOfWinner" />
        </el-form-item>
        <el-form-item label="指导老师姓名">
          <el-input v-model="tempData.nameOfTeacher" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button @click="subjectCompetitionCancel()">取消</el-button>
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="subjectCompetitionAdd()"
            >添加</el-button
          >
          <el-button v-else type="primary" @click="subjectCompetitionSave()"
            >保存</el-button
          >
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 教学竞赛信息弹窗表 -->
    <el-dialog
      title="教学竞赛信息"
      :visible.sync="part3.RenCaiPeiYangNengLi.dialogVisible[0]"
    >
      <el-form :model="tempData">
        <el-form-item label="教师姓名">
          <el-input v-model="tempData.nameOfTeacher" />
        </el-form-item>
        <el-form-item label="教学竞赛名称">
          <el-input v-model="tempData.nameOfTeachingContest" />
        </el-form-item>
        <el-form-item label="组织单位">
          <el-input v-model="tempData.organizer" />
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="tempData.time" />
        </el-form-item>
        <el-form-item label="获奖等次(一等奖,二等奖,三等奖,优秀奖)">
          <el-input v-model="tempData.awards" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-button
            @click="handleCancel(part3.RenCaiPeiYangNengLi.dialogVisible)"
            >取消</el-button
          >
          <el-button
            v-if="!editStatus"
            type="primary"
            @click="handleAdd(part3.RenCaiPeiYangNengLi)"
            >添加</el-button
          >
          <el-button
            v-else
            type="primary"
            @click="handleSave(part3.RenCaiPeiYangNengLi)"
            >保存</el-button
          >
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import Tinymce from "../tinymce-editor/index";
import { createTable } from "@/api/declaration-form/talent-cultivation-ability/index";
import { updateTable } from "@/api/declaration-form/talent-cultivation-ability/index";
import UploadExcel from "@/components/UploadExcel/index.vue";
import { fetchInfo } from "@/api/detail-page/talent-cultivation-ability/index";
import _ from "lodash";
export default {
  props: {
    talentCultivationAbilityID: {
      type: String,
    },
  },
  components: {
    Tinymce,
    UploadExcel,
  },
  data() {
    return {
      subjectCompetition: {
        dialogVisible: false,
      },
      uploadExcelDialogFormVisible: false,
      tempData: {},
      memberDialogFormVisible: false,
      editStatus: false,
      editIndex: -1,
      form: {
        content: {
          html:
            "<div style='font-family: 仿宋; font-size: 18pt''><b>（一）教师教学比赛和教师评教&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（二）学生创新创业&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div><div style='font-family: 仿宋; font-size: 18pt''><b>（三）毕业生就业率和就业质量&nbsp;</b></div><div style='font-family: 仿宋; font-size: 12pt''></div>",
        },
        info: [
          {
            nameOfTeacher: "",
            nameOfTeachingContest: "",
            organizer: "",
            time: "",
            awards: "",
          },
        ],
        outcome: {
          subjectCompetition: [
            //{
            // year: '',
            // awardName: '',
            // awardWinningWork: '',
            // level: '',
            // nameOfWinner: '',
            // nameOfTeacher: ''
            //}
          ],
          professionalSkillsCompetition: "",
          internetPlusEntrepreneurshipContest: "",
          innovationAndEntrepreneurship: "",
          publishTheses: "",
        },
      },
      part3: {
        RenCaiPeiYangNengLi: {
          tables: [[]],
          dialogVisible: [false],
        },
      },
    };
  },
  watch: {
    talentCultivationAbilityID: function (val, old) {
      this.getFormInfo();
    },
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
          "教师姓名",
          "教学竞赛名称",
          "组织单位",
          "时间（年份）",
          "获奖等次(一等奖,二等奖,三等奖,优秀奖)",
        ],
        ["无名氏", "蓝桥杯", "河南大学软件学院", "2012", "一等奖"],
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
        item.nameOfTeacher = results[i].nameOfTeacher;
        item.nameOfTeachingContest = results[i].nameOfTeachingContest;
        item.organizer = results[i].organizer;
        item.time = results[i].time;
        item.awards = results[i].awards;
        this.form.info.push(item);
        this.part3.RenCaiPeiYangNengLi.tables[0].push(item);
      }
      this.uploadExcelDialogFormVisible = false;
    },

    //添加修改
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

    //学科竞赛添加修改
    //显示填写框
    subjectCompetitionClickAdd() {
      this.subjectCompetition.dialogVisible = true;
    },
    // //取消编辑或添加
    subjectCompetitionCancel() {
      this.tempData = {};
      this.editStatus = false;
      this.subjectCompetition.dialogVisible = false;
    },
    // //添加
    subjectCompetitionAdd() {
      this.form.outcome.subjectCompetition.push(this.tempData);
      this.tempData = {};
      this.subjectCompetition.dialogVisible = false;
    },
    // //保存
    subjectCompetitionSave() {
      Vue.set(
        this.form.outcome.subjectCompetition,
        this.editIndex,
        this.tempData
      );
      this.subjectCompetition.dialogVisible = false;
      this.editStatus = false;
    },
    //编辑
    subjectCompetitionEdit(row, rowInd) {
      const temp = _.cloneDeep(row);
      this.tempData = temp;
      this.editIndex = rowInd;
      this.editStatus = true;
      this.subjectCompetition.dialogVisible = true;
    },
    //删除
    subjectCompetitionDelete(rowInd) {
      this.form.outcome.subjectCompetition.splice(rowInd, 1);
    },

    async createTalentInfo() {
      this.getHtml();
      await createTable(this.form)
        .then((result) => {
          console.log(this.form);

          // console.log(result)

          this.$emit(
            "getTalentCultivationAbilityID",
            result.data.talentCultivationAbilityID
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHtml() {
      // this.form.content.html = tinymce.editors[8].getContent()
      this.form.info = undefined;
      this.form.info = new Array();
      for (
        let i = 0;
        i < this.part3.RenCaiPeiYangNengLi.tables[0].length;
        i++
      ) {
        const item = {};
        item["nameOfTeacher"] = this.part3.RenCaiPeiYangNengLi.tables[0][
          i
        ].nameOfTeacher;
        item[
          "nameOfTeachingContest"
        ] = this.part3.RenCaiPeiYangNengLi.tables[0][i].nameOfTeachingContest;
        item["organizer"] = this.part3.RenCaiPeiYangNengLi.tables[0][
          i
        ].organizer;
        item["time"] = this.part3.RenCaiPeiYangNengLi.tables[0][i].time;
        item["awards"] = this.part3.RenCaiPeiYangNengLi.tables[0][i].awards;
        this.form.info[i] = item;
      }
    },

    //获取要修改的信息
    getFormInfo() {
      fetchInfo(this.talentCultivationAbilityID).then((result) => {
        const data = result.data;
        for (const item in data) {
          if (typeof data[item] === "function") {
            continue;
          }
          this.form[item] = data[item];
        }
        this.$refs.talent.setContent(this.form.content.html);
        for (let i = 0; i < this.form.info.length; i++) {
          const item = {};
          item["nameOfTeacher"] = this.form.info[i].nameOfTeacher;
          item["nameOfTeachingContest"] = this.form.info[
            i
          ].nameOfTeachingContest;
          item["organizer"] = this.form.info[i].organizer;
          item["time"] = this.form.info[i].time;
          item["awards"] = this.form.info[i].awards;
          Vue.set(this.part3.RenCaiPeiYangNengLi.tables[0], i, item);
        }
      });
    },

    //更新表中信息
    async updateFormInfo() {
      this.getHtml();
      await updateTable(this.talentCultivationAbilityID, this.form)
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
.form-subtitle-subtitle {
  font-size: 1rem;
  margin: 10px 0;
}

.label-style {
  font-size: 18px;
}
.el-table {
  font-size: 20px;
}
</style>
