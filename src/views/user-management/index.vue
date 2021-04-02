<template>
  <!-- eslint-disable -->
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header">
        <span>用户管理</span>
      </div>

      <el-row class="buttonAndSelect">
        <el-input
          v-model="listQuery.queryUsername"
          placeholder="姓名"
          @keyup.enter.native="handleFilter"
          style="width: 100px; font-size: 20px"
        ></el-input>
        <el-select
          style="font-size: 20px"
          v-model="listQuery.queryCollege"
          placeholder="所属学院"
          
          
          clearable
        >
          <el-option
            style="font-size: 20px"
            v-for="(item, index) in collegeList"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          style="font-size: 20px"
          v-model="listQuery.queryRole"
          placeholder="用户类别"
          clearable
        >
          <el-option
            style="font-size: 20px"
            v-for="(item, index) in roleList"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
          style="margin-left: 10px"
          >搜索</el-button
        >
        <el-button type="primary" icon="el-icon-edit" @click="handleCreate()"
          >添加</el-button
        >
      </el-row>

      <el-table
        v-loading="listLoading"
        :data="currentPageData"
        empty-text="暂无数据"
      >
        <el-table-column prop="userNumber" label="学工号"></el-table-column>
        <el-table-column prop="username" label="用户名称"></el-table-column>
        <el-table-column prop="password" label="用户密码"></el-table-column>
        <el-table-column prop="college" label="所属学院"></el-table-column>
        <el-table-column prop="role" label="用户类别"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-row type="flex" justify="space-around"
              ><el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              ><el-button
                icon="el-icon-delete"
                type="danger"
                size="small"
                @click="handleDelete(scope.row, scope.$index)"
                >删除</el-button
              ></el-row
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination
        style="margin-top: 10px"
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getUserList"
      />
      <section class="section">
        <el-button @click="prevPage()"> 上一页 </el-button>
        <span>第{{ currentPage }}页/共{{ totalPage }}页</span>
        <el-button @click="nextPage()"> 下一页 </el-button>
      </section>

      <el-dialog title="用户信息" :visible.sync="dialogVisible">
        <el-form :model="tempUser">
          <el-form-item label="学工号">
            <el-input
              v-model="tempUser.userNumber"
              :disabled="dialogType == 'edit'"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="tempUser.password"></el-input>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input v-model="tempUser.username"></el-input>
          </el-form-item>
          <el-form-item label="所属学院">
            <el-select v-model="tempUser.college">
              <el-option
                v-for="(item, index) in collegeList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户类别">
            <el-select v-model="tempUser.role">
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-row type="flex" justify="center">
            <el-button @click="cancelEdit()">取消</el-button>
            <el-button
              v-if="dialogType == 'create'"
              type="primary"
              @click="createData()"
              >添加</el-button
            >
            <el-button
              v-else
              type="primary"
              @click="updateData(tempUser.userNumber)"
              >保存</el-button
            >
          </el-row>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  fetchUserList,
  fetchCollegeList,
  createUser,
  deleteUser,
  updateUser,
} from "@/api/user-management/index";
import { fetchRoleList } from "@/api/role/role";

import Pagination from "@/components/Pagination";

import store from "@/store";

export default {
  components: { Pagination },
  data() {
    return {
      userList: [],
      collegeList: [],
      roleList: [],
      total: 0,
      // 搜索按钮，向后端请求的对象
      listQuery: {
        page: 1,
        limit: 20,
        role: undefined,
        college: undefined,

        // 条件查询
        queryUsername: null,
        queryRole: null,
        queryCollege: null,
      },

      // 当前用户的角色、学院,登录账号从store中拿出来
      currentRole: store.getters.role,
      currentCollege: store.getters.college,

      // 根据当前角色获取角色列表的参数
      getRoleParams: "",

      tempUser: {
        userNumber: "",
        username: "",
        college: "",
        role: "",
      },
      dialogVisible: false,
      listLoading: true,
      dialogType: "create",

      // 分页
      currentPage: 1,
      totalPage: 1, // 统共页数，默认为1
      pageSize: 10, // 每页显示数量
      currentPageData: [],
    };
  },
  created() {
    // 分页信息
    this.totalPage = Math.ceil(this.userList.length / this.pageSize);
    this.setCurrentPageData();

    console.log(this.currentRole);
    console.log(this.currentCollege);

    // 根据学院和角色获取 对应的 用户列表，和 下拉列表
    this.getUserList(this.currentRole, this.currentCollege);
    this.getInnerList(this.currentRole, this.currentCollege);
  },
  methods: {
    getUserList(currentRole, currentCollege) {
      this.listLoading = true;
      // 添加一个变量来获取当前用户的角色，来改变listQuery值，

      this.listQuery.role = currentRole;
      this.listQuery.college = currentCollege;

      console.log(this.listQuery);

      fetchUserList(this.listQuery)
        .then((result) => {
          this.userList = result.data;
          // this.total = result.data.total
          // 设置分页
          this.totalPage = Math.ceil(this.userList.length / this.pageSize);
          this.setCurrentPageData();
          this.listLoading = false;
          // 初始化查询的queryUsername参数
          this.listQuery.queryUsername = null;
          this.listQuery.queryCollege = null;
          this.listQuery.queryRole = null;
        })
        .catch((err) => {
          this.listLoading = false;
          this.$message({
            message: "请求失败：" + err,
            type: "error",
          });
          console.log(err);
        });
    },
    // 每次添加完用户重置对话框
    resetTemp() {
      this.tempUser = {
        userNumber: "",
        username: "",
        college: "",
        role: "",
      };
    },
    // 获取下拉框列表
    getInnerList() {
      fetchCollegeList()
        .then((result) => {
          // 院级管理员只能查看、分配本院的用户
          if (this.currentRole === "院级管理员") {
            this.collegeList.push(this.currentCollege);
          } else {
            this.collegeList = result.data.items;
          }
        })
        .catch((err) => {
          this.$message({
            message: "学院列表获取失败：" + err,
            type: "error",
          });
          console.log(err);
        });
      // 该处参数待补充，应为该用户的角色
      // 已补充
      if (this.currentRole === "系统管理员") this.getRoleParams = "admin";
      if (this.currentRole === "校级管理员") this.getRoleParams = "school";
      if (this.currentRole === "院级管理员") this.getRoleParams = "college";
      if (this.currentRole === "基层教学组织负责人")
        this.getRoleParams = "principal";
      fetchRoleList(this.getRoleParams)
        .then((result) => {
          this.roleList = result.data.items;
        })
        .catch((err) => {
          this.$message({
            message: "角色列表获取失败：" + err,
            type: "error",
          });
          console.log(err);
        });
    },
    // 输入参数搜索
    handleFilter() {
      this.listQuery.page = 1;
      this.getUserList(this.currentRole, this.currentCollege);
    },
    // 显示增加用户的对话框
    handleCreate() {
      this.resetTemp();
      this.dialogType = "create";
      this.dialogVisible = true;
    },
    // 显示编辑用户的对话框
    handleEdit(row) {
      this.tempUser = Object.assign({}, row);
      this.dialogType = "edit";
      this.dialogVisible = true;
    },
    // 显示删除用户的对话框
    handleDelete(row, index) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteUser(row.userNumber)
          .then(() => {
            this.userList.splice(index, 1);
            this.$message({
              message: "用户删除成功",
              type: "success",
            });
            this.getUserList(this.currentRole, this.currentCollege);
          })
          .catch((err) => {
            this.$message({
              message: "用户删除失败：" + err,
              type: "error",
            });
            console.log(err);
          });
      });
    },
    // 隐藏编辑用户的对话框
    cancelEdit() {
      this.resetTemp();
      this.dialogVisible = false;
    },
    //1. 新增用户的请求
    createData() {
      createUser(this.tempUser)
        .then(() => {
          this.userList.push(this.tempUser);
          this.dialogVisible = false;
          this.$message({
            message: "添加用户成功",
            type: "success",
          });

          // 刷新列表
          this.getUserList(this.currentRole, this.currentCollege);
        })
        .catch((err) => {
          this.dialogVisible = false;
          this.$message({
            message: "添加用户失败：" + err,
            type: "error",
          });
          console.log(err);
        });
    },

    //2. 更新用户的请求
    updateData(userNumber) {
      updateUser(this.tempUser, userNumber)
        .then(() => {
          const index = this.userList.findIndex(
            (v) => v.userNumber === this.tempUser.userNumber
          );
          this.userList.splice(index, 1, this.tempUser);
          this.dialogVisible = false;
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.getUserList(this.currentRole, this.currentCollege);
        })
        .catch((err) => {
          this.dialogVisible = false;
          this.$message({
            message: "修改失败：" + err,
            type: "error",
          });
          console.log(err);
        });
    },

    setCurrentPageData() {
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      this.currentPageData = this.userList.slice(begin, end);
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

<style>
.card-header span {
  font-size: 1.8rem;
  padding: 3px 0;
  border-bottom: 3px solid #409eff;
}
.section {
  margin-left: 35%;
}

.el-table {
  font-size: 20px;
}
.buttonAndSelect input,
button,
select option {
  font-size: 20px;
}
.el-input{
  font-size: 20px;
}
</style>
