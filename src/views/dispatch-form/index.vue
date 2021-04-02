<template>
  <!-- eslint-disable -->
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header">
        <span>审核表的分配</span>
      </div>

      <!-- <el-col :span="12">
        <el-button @click="getUndispatchFormInfo()">查询未分配审核表</el-button>
        <el-button @click="getInfo()">查询全部审核通过的审核表</el-button>
      </el-col> -->

      <!-- 未分配备案表 -->
      <el-card>
        <div slot="header"></div>
        <div>待分配的备案表</div>

        <el-table
          :data="unDispatchFormList"
          @selection-change="handleSelectionChange"
          empty-text="暂无数据"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            prop="info.organization"
            label="组织名称"
          ></el-table-column>
          <el-table-column
            prop="info.college"
            label="所属学院"
          ></el-table-column>
          <el-table-column
            prop="info.principal"
            label="负责人"
          ></el-table-column>
          <el-table-column
            prop="info.status"
            label="审核状态"
          ></el-table-column>
          <el-table-column
            prop="info.reviewer"
            label="审核人"
          ></el-table-column>
          <el-table-column
            prop="info.userNumberOfMarker"
            label="评审专家学工号"
          ></el-table-column>
          <el-table-column
            prop="info.totalScore"
            label="评审总分数"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-card>
    <!-- 分配按钮在中间 -->
    <el-card>
      <div class="myDiv">
        <el-button @click="dispatchForm()">分配</el-button>
        <el-select v-model="selectUserNumber" placeholder="请选择评审专家">
          <el-option
            v-for="(item, index) in userList"
            :key="index"
            :label="item.username"
            :value="item.userNumber"
          >
          </el-option>
        </el-select>
      </div>
    </el-card>

    <el-card>
      <div slot="header"></div>
      <div>已分配的备案表</div>
      <!-- 已经分配的备案表 -->

      <el-table
        :data="dispatchFormList"
        @selection-change="handleSelectionChange"
        empty-text="暂无数据"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          prop="info.organization"
          label="组织名称"
        ></el-table-column>
        <el-table-column prop="info.college" label="所属学院"></el-table-column>
        <el-table-column prop="info.principal" label="负责人"></el-table-column>
        <el-table-column prop="info.status" label="审核状态"></el-table-column>
        <el-table-column prop="info.reviewer" label="审核人"></el-table-column>
        <el-table-column
          prop="info.userNumberOfMarker"
          label="评审专家学工号"
        ></el-table-column>
        <el-table-column
          prop="info.totalScore"
          label="评审总分数"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { fetchInfoAll } from "@/api/dispatch-form/index";
import { fetchInfoUndispatch } from "@/api/dispatch-form/index";
import { fetchUserInfo } from "@/api/dispatch-form/index";
import { updateDispatchInfo } from "@/api/dispatch-form/index";

import store from "@/store";

export default {
  data() {
    return {
      // 审核成功的申报表
      form: [],
      // 评审专家列表
      userList: [],

      //选中的评审专家工号
      selectUserNumber: null,

      // 选中的申报表
      multipleSelection: [],

      // 未分配的备案表
      unDispatchFormList: [],
      // 已经分配的备案表
      dispatchFormList: [],
    };
  },
  async created() {
    this.getInfo();
    this.getUserList();
  },
  methods: {
    // 1. 查询所有审核通过的申报表
    getInfo() {
      fetchInfoAll()
        .then((result) => {
          this.form = result.data;
          console.log(this.form);
          // 分表
          this.splitForm();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //2. 查询未分配的申报表
    getUndispatchFormInfo() {
      fetchInfoUndispatch()
        .then((result) => {
          console.log(result);
          this.form = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 3. 查询评审专家列表
    getUserList() {
      fetchUserInfo()
        .then((result) => {
          console.log(result);
          this.userList = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 4. 分配
    dispatchForm() {
      if (this.multipleSelection.length == 0 || this.selectUserNumber == null)
        return;
      updateDispatchInfo(this.selectUserNumber, this.multipleSelection)
        .then((result) => {
          console.log(result);
          // this.userList = result.data;

          this.getInfo();
          window.alert("分配成功！");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    splitForm() {
      (this.unDispatchFormList = []), (this.dispatchFormList = []);
      for (let j = 0; j < this.form.length; j++) {
        // 待分配
        if (this.form[j].info.userNumberOfMarker == null || Object.keys(this.form[j].info.userNumberOfMarker).length === 0) {
          this.unDispatchFormList.push(this.form[j]);
        } else {
          // 已分配;
          this.dispatchFormList.push(this.form[j]);
        }
      }
    },
  },
};
</script>

<style scoped>
.card-header span {
  padding: 3px 0;
  border-bottom: 3px solid #409eff;
}

.el-button {
  margin: 4px;
}

.section {
  margin-left: 35%;
}
.myDiv {
  margin-left: 35%;
}
</style>
