<template>
  <!-- eslint-disable -->
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header">
        <span>文件审核信息</span>
      </div>

      <!-- 查询 -->
      <el-col :span="12">
        <el-autocomplete
          v-if="roles.role !== '基层教学组织管理员'"
          class="inline-input"
          v-model="state"
          @select="handleSelect"
          placeholder="请输入学院名称"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          value-key="college"
        >
        </el-autocomplete>
        <el-button
          v-if="roles.role !== '基层教学组织管理员'"
          @click="selectByCollege(state)"
          >确认查询</el-button
        >
      </el-col>
      <!-- 表单列表 -->
      <el-table :data="currentPageData" empty-text="暂无数据">
        <!--  @row-click="handleRowClick" -->
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="organization" label="组织名称"></el-table-column>
        <el-table-column prop="college" label="所属学院"></el-table-column>
        <el-table-column prop="principal" label="负责人"></el-table-column>
        <el-table-column prop="status" label="审核状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == '等待审核'" type="warning">{{
              scope.row.status
            }}</el-tag>
            <el-tag v-else-if="scope.row.status == '等待评定'" type="warning">{{
              scope.row.status
            }}</el-tag>
            <el-tag v-else-if="scope.row.status == '评定结束'" type="success">{{
              scope.row.status
            }}</el-tag>
            <el-tag
              v-else-if="scope.row.status == '院级审核通过'"
              type="success"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag
              v-else-if="scope.row.status == '校级审核通过'"
              type="success"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag v-else type="danger">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reviewer" label="审核人"></el-table-column>
        <!-- 新增删除申报表，更新申报表 ,可根据角色来判断显示哪个按钮-->
        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <!-- 申请更新备案表按钮 -->
            <el-row
              ><el-button
                @click="applicationForUpdate(scope.row)"
                v-if="scope.row.status !== '返回修改'"
                v-has="roles"
                >申请修改</el-button
              ></el-row
            >
            <el-row
              ><el-button
                @click="handleEdit(scope.row)"
                v-if="scope.row.status == '返回修改'"
                v-has="roles"
                >修改内容</el-button
              ></el-row
            >
            <el-row>
              <el-button @click="handleRowClick(scope.row)">
                显示详情
              </el-button>
            </el-row>
            <el-row>
              <el-button
                v-if="scope.row.status == '评定结束'"
                @click="viewScores(scope.row)"
              >
                查看分数
              </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <!-- 页码 -->
      <section class="section">
        <el-button @click="prevPage()"> 上一页 </el-button>
        <span>第{{ currentPage }}页/共{{ totalPage }}页</span>
        <el-button @click="nextPage()"> 下一页 </el-button>
      </section>
    </el-card>
    <!-- 申报表的分情况 -->
    <el-dialog title="申报表得分" :visible.sync="dialogVisible">
      <el-row type="flex" justify="center">
        <el-tag>总分</el-tag>
      </el-row>
      <el-row style="margin-top: 20px" type="flex" justify="center">
        {{ this.totalScore }}
      </el-row>
      <!-- </el-form> -->
    </el-dialog>
  </div>
</template>

<script>
import { fetchInfo } from "@/api/approval-page/index";
import { deleteInfo } from "@/api/approval-page/index";

// 待办事项

// 1. 向指定用户增加一个新的待办事项
import { applicationForUpdate } from "@/api/todo-items/index";

import store from "@/store";
import { parseTime } from "@/utils";

export default {
  data() {
    return {
      hidden: "none",
      roles: {
        jurisdictionRole: [],
        role: "",
      },
      // 创建一个待办事项参数
      toDoOfuserNumber: "",

      toDoItem: {
        // currentStatus: "",
        createTime: "",
        title: "",
        formID: "",
      },
      count: "",
      form: [{}],
      state: "",
      pagination: {
        page: "",
        perPage: "",
      },
      totalScore: "",
      currentPage: 1,
      totalPage: 1, // 统共页数，默认为1
      pageSize: 10, // 每页显示数量
      currentPageData: [],
      dialogVisible: false,
    };
  },
  async created() {
    this.getRole();
    await this.getInfo();
    this.totalPage = Math.ceil(this.form.length / this.pageSize);
    this.setCurrentPageData();
  },
  methods: {
    //查看分数
    viewScores(row) {
      console.log(row);
      this.totalScore = row.totalScore;
      this.dialogVisible = true;
    },
    //获取当前用户角色和权限所需角色
    getRole() {
      this.roles.jurisdictionRole.push("基层教学组织管理员"),
        (this.roles.role = store.getters.role);
    },

    // 申请修改备案表
    applicationForUpdate(row) {
      // 还没审核人之前的修改
      if (
        row.reviewer === undefined ||
        row.reviewer === null ||
        Object.keys(row.reviewer).length === 0
      ) {
        this.handleEdit(row);
        return;
      }
      // 需要请求 院级、校级管理员，发送请求 申请将 状态改为 返回修改

      // 新增待办事项的参数为 userNumber、data{createTime,title,formID}
      this.toDoOfUserNumber = row.userNumberOfReviewer;
      this.toDoItem.title = row.organization + " 备案表申请返回修改";
      this.toDoItem.formID = row.formID;
      this.toDoItem.createTime = parseTime(new Date().toString());

      applicationForUpdate(this.toDoItem, this.toDoOfUserNumber)
        .then((result) => {
          //console.log(row);
          window.alert("申请修改已发送！请等待管理员处理。请勿多次申请！");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(row) {
      this.$router.push({
        path: "/declaration-form/declaration-form",
        query: {
          formID: row.formID,
          //currentStatus: row.status,
          //formInfo: this.form.info,
        },
      });
    },
    //去到显示详情页
    handleRowClick(row) {
      console.log(row);
      this.$router.push({
        path: "/detail-page/detail-page",
        query: {
          formID: row.formID,
        },
      });
    },
    // 删除申报表
    async handleDelete(row) {
      await deleteInfo(row)
        .then((result) => {
          console.log(row);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取申报表信息并筛选出所在线用户能看到的数据
    async getInfo() {
      await fetchInfo()
        .then((result) => {
          console.log(result);
          this.form = result.data.data;
          this.count = result.data.count;
          this.pagination = result.data.pagination;

          if (store.getters.role === "基层教学组织管理员") {
            for (let i = 0; i < this.form.length; ) {
              if (this.form[i].userNumber !== store.getters.userNumber) {
                this.form.splice(i, 1);
              } else {
                i++;
              }
            }
          }
          if (store.getters.role === "院级管理员") {
            for (let j = 0; j < this.form.length; ) {
              if (this.form[j].college !== store.getters.college) {
                this.form.splice(j, 1);
              } else {
                j++;
              }
            }
          }
          if (store.getters.role === "评审专家") {
            for (let j = 0; j < this.form.length; ) {
              if (
                this.form[j].userNumberOfMarker !== store.getters.userNumber
              ) {
                this.form.splice(j, 1);
              } else {
                j++;
              }
            }
          }
          if (store.getters.role === "校级管理员") {
            for (let j = 0; j < this.form.length; ) {
              if (
                this.form[j].status == "等待审核" ||
                this.form[j].status == "返回修改"

                // this.form[j].status !== "校级审核通过" ||
                // this.form[j].status !== "评阅结束" ||
                // this.form[j].status !== "等待评阅"
              ) {
                this.form.splice(j, 1);
              } else {
                j++;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSelect(item) {
      console.log(item);
    },
    querySearch(queryString, cb) {
      var ans = this.form;
      var results = queryString
        ? ans.filter(this.createFilter(queryString))
        : ans;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (ans) => {
        return (
          ans.college.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    async selectByCollege(value) {
      console.log(value);
      if (value.length == 0) {
        //console.log(value.length)
        await this.getInfo();
        await this.setCurrentPageData();
        this.totalPage = Math.ceil(this.form.length / this.pageSize);
      } else {
        this.currentPage = 1;
        for (let i = 0; i < this.form.length; ) {
          let obj = this.form[i];
          if (obj.college == value) i++;
          else {
            console.log(obj.college);
            this.form.splice(i, 1);
          }
        }
        this.totalPage = Math.ceil(this.form.length / this.pageSize);
        this.setCurrentPageData();
      }
    },
    // 分页
    setCurrentPageData() {
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      this.currentPageData = this.form.slice(begin, end);
    },
    //上一页
    prevPage() {
      //console.log(this.currentPage);
      if (this.currentPage == 1) return;
      this.currentPage--;
      this.setCurrentPageData();
    },
    // 下一页
    nextPage() {
      if (this.currentPage == this.totalPage) return;

      this.currentPage++;
      this.setCurrentPageData();
    },
  },
};
</script>

<style scoped>
.card-header span {
  font-size: 1.8rem;
  padding: 3px 0;
  border-bottom: 3px solid #409eff;
}

.el-button {
  margin: 4px;
}

.section {
  margin-left: 35%;
}
.el-table {
  font-size: 18px;
}
</style>
