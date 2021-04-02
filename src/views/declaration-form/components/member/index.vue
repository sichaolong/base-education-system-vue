<template>
  <div>
    <el-dialog title="成员信息" :visible.sync="memberDialogFormVisible">
      <el-row type="flex" justify="center">
        <el-form :model="tempMember">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="姓名">
                <el-input v-model="tempMember.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生年月">
                <el-date-picker
                  v-model="tempMember.birthdate"
                  type="date"
                  placeholder="请选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="性别">
                <el-select v-model="tempMember.gender" placeholder="请选择">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="政治面貌">
                <el-select
                  v-model="tempMember.politicalAffiliation"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, i) in options"
                    :key="i"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="最终学位">
                <el-select v-model="tempMember.degree" placeholder="请选择">
                  <el-option
                    v-for="(item, i) in optionsOfDegree"
                    :key="i"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="职称">
                <el-select style="width:150px" v-model="tempMember.professionalTitle" placeholder="请选择">
                <el-option label="助教" value="助教"></el-option>
                <el-option label="讲师" value="讲师"></el-option>
                <el-option label="副教授" value="副教授"></el-option>
                <el-option label="教授" value="教授"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="行政职务">
                <el-input v-model="tempMember.administrativeDuties"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="高校教龄">
                <el-input v-model="tempMember.universityTeachingAge"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item label="近2学年任教课程及学时">
              <el-input
                v-model="tempMember.teachingCoursesInRecentTwoAcademicYears"
                type="textarea"
                :rows="5"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row type="flex" justify="center">
            <el-button @click="editMember(false)">取消</el-button>
            <el-button v-if="!editStatus" type="primary" @click="addToMembers"
              >添加</el-button
            >
            <el-button v-else type="primary" @click="saveToMembers"
              >保存</el-button
            >
          </el-row>
        </el-form>
      </el-row>
    </el-dialog>

    <el-dialog
      title="从Excel中导入"
      :visible.sync="uploadExcelDialogFormVisible"
    >
      <upload-excel
        :on-success="handleSuccess"
        :header="[
          'name',
          'birthdate',
          'gender',
          'politicalAffiliation',
          'degree',
          'professionalTitle',
          'administrativeDuties',
          'universityTeachingAge',
          'JinLiangNianJiaoShouKeChengJiXueShi',
        ]"
      ></upload-excel>
    </el-dialog>

    <el-row>
      <div class="form-subtitle">
        <span>成员概况</span>
      </div>
    </el-row>
    <div class="table-action-bar">
      <el-button type="primary" icon="el-icon-edit" @click="editMember(true)"
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

    <el-table :data="this.form.data" empty-text="暂无数据">
      <el-table-column type="index" label="序号" width="50px"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="birthdate" label="出生年月"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column
        prop="politicalAffiliation"
        label="政治面貌"
      ></el-table-column>
      <el-table-column prop="degree" label="最终学位"></el-table-column>
      <el-table-column prop="professionalTitle" label="职称"></el-table-column>
      <el-table-column
        prop="administrativeDuties"
        label="行政职务" 
      ></el-table-column>
      <el-table-column
        prop="universityTeachingAge"
        label="高校教龄"
      ></el-table-column>
      <el-table-column
        width="200"
        prop="teachingCoursesInRecentTwoAcademicYears"
        label="近2学年任教课程及学时"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-row style="margin-bottom: 1px"
            ><el-button
              @click="handleEdit(scope.row, scope.$index)"
              type="primary"
              icon="el-icon-edit"
              size="small"
            ></el-button
          ></el-row>
          <el-row style="margin-top: 1px"
            ><el-button
              @click="handleDelete(scope.$index)"
              icon="el-icon-delete"
              type="danger"
              size="small"
            ></el-button
          ></el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
import { createTable } from "@/api/declaration-form/member/index";
import { updateTable } from "@/api/declaration-form/member/index";
import UploadExcel from "@/components/UploadExcel/index.vue";
import { fetchInfo } from "@/api/detail-page/member/index";
export default {
  props: {
    membersID: {
      type: String,
    },
  },
  components: {
    UploadExcel,
  },
  data() {
    return {
      form: {
        data: [],
        queryInfo: {},
        count: "",
      },
      memberDialogFormVisible: false,
      uploadExcelDialogFormVisible: false,
      editStatus: false,
      editIndex: -1,
      tempMember: {
        name: "",
        birthdate: "",
        gender: "",
        politicalAffiliation: "",
        degree: "",
        professionalTitle: "",
        administrativeDuties: "",
        universityTeachingAge: "",
        teachingCoursesInRecentTwoAcademicYears: "",
      },
      options: [
        "中共党员",
        "中共预备党员",
        "共青团员",
        "民革党员",
        "民盟盟员",
        "民建会员",
        "民进会员",
        "农工党党员",
        "致公党党员",
        "九三学社社员",
        "台盟盟员",
        "无党派人士",
        "群众",
      ],
      optionsOfDegree: [
        "小学",
        "初中",
        "高中",
        "大专",
        "本科",
        "硕士研究生",
        "博士研究生",
      ],
    };
  },

  watch: {
    membersID: function (val, old) {
      this.getFormInfo();
    },
  },
  methods: {
    async createMembersInfo() {
      await createTable(this.form)
        .then((result) => {
          console.log(result.data.membersID);
          this.$emit("getMembersID", result.data.membersID);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editMember(flag) {
      this.tempMember = {
        name: "",
        birthdate: "",
        gender: "",
        politicalAffiliation: "",
        degree: "",
        professionalTitle: "",
        administrativeDuties: "",
        universityTeachingAge: "",
        teachingCoursesInRecentTwoAcademicYears: "",
      };
      this.memberDialogFormVisible = flag;
      this.editStatus = false;
    },
    addToMembers() {
      this.form.data.push(this.tempMember);
      this.editMember(false);
    },
    saveToMembers() {
      Vue.set(this.form.data, this.editIndex, this.tempMember);
      this.editMember(false);
    },
    importFromExcel() {
      this.uploadExcelDialogFormVisible = true;
    },
    handleSuccess({ results, header }) {
      this.$message({
        message: "导入成功！",
        type: "success",
      });
      //this.form.part2.members = results
      for (let i = 0; i < results.length; i++) {
        const item = {};
        item.name = results[i].name;
        item.birthdate = results[i].birthdate;
        item.gender = results[i].gender;
        item.politicalAffiliation = results[i].politicalAffiliation;
        item.degree = results[i].degree;
        item.professionalTitle = results[i].professionalTitle;
        item.administrativeDuties = results[i].administrativeDuties;
        item.universityTeachingAge = results[i].universityTeachingAge;
        item.teachingCoursesInRecentTwoAcademicYears =
          results[i].teachingCoursesInRecentTwoAcademicYears;
        this.form.data.push(item);
      }
      this.uploadExcelDialogFormVisible = false;
    },

    handleEdit(row, ind) {
      let temp = _.cloneDeep(row);
      this.tempMember = temp;
      this.editIndex = ind;
      this.editStatus = true;
      this.memberDialogFormVisible = true;
    },
    handleDelete(ind) {
      this.form.data.splice(ind, 1);
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

      convertToCsv("download.csv", [
        [
          "姓名",
          "出生年月",
          "性别",
          "政治面貌",
          "最终学位",
          "职称",
          "行政职务",
          "高校教龄",
          "近2学年任教课程及学时",
        ],
        [
          "无名氏",
          "1999年5月12",
          "男",
          "中共党员",
          "博士",
          "教授",
          "院长",
          "10",
          "C#程序设计，35学时",
        ],
      ]);
    },
    //获取要修改的内容
    getFormInfo() {
      fetchInfo(this.membersID).then((result) => {
        console.log(result);
        const data = result.data;
        for (const item in data) {
          if (typeof data[item] === "function") {
            continue;
          }
          this.form[item] = data[item];
        }
      });
    },

    //更新表中内容
    async updateFormInfo() {
      await updateTable(this.membersID, this.form)
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-subtitle-subtitle {
  font-size: 1rem;
  margin: 10px 0;
}

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