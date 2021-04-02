<template>
  <div class="app-container">
    <el-card>
      <div class="welcome-info-content">
        {{ welcomeText }}{{ name }}
        <div class="welcome-info-subtext">
          学年：{{ curStudyYear }} | 角色：{{ role }} | 院系：{{ college }}
        </div>
      </div>
    </el-card>
    <!-- 待办事项通知区 -->
    <el-card>
      <div class="notice-container">
        <el-card v-if="role === '系统管理员'">
          <div class="card-header" slot="header">
            <span>待办事项</span>
          </div>
        </el-card>

        <!-- 1. 请求修改，对象为管理员 -->
        <el-card v-if="role === '院级管理员' || role === '校级管理员'">
          <div class="card-header" slot="header">
            <span>修改请求</span>
          </div>

          <div v-if="this.form.toDoList !== null">
            <div
              class="notice-item"
              v-for="(value, key, index) in this.form.toDoList.toDoItems"
              :key="index"
              @click="toDoItemInfo(value)"
            >
              <div>
                <el-card>
                  <span class="notice-item__title">
                    {{ key + 1 }} 、<el-tag type="info">  内容：{{ value.title }}</el-tag> 申请时间:{{
                      value.createTime
                    }}
                    <el-tag type="success"> 点击进入详情页修改状态</el-tag>
                  </span>
                </el-card>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 1.1 请求修改，对象为基层教学组织管理员 -->

        <el-card v-if="role === '基层教学组织管理员'">
          <div class="card-header" slot="header">
            <span>返回待修改的备案表</span>
          </div>

          <div>
            <span class="notice-item__title">
              <!-- <el-form-item label="等待审核备案表：">
                {{  }}</el-form-item
              > -->
              待修改的备案表：{{ numbersOfInfo.numbersOfNeedEdit }}
            </span>
          </div>
        </el-card>

        <!-- 2. 等待审核 -->

        <el-card v-if="role === '院级管理员' || role === '校级管理员'">
          <div class="card-header" slot="header">
            <span>等待审核</span>
          </div>
          <div>
            <span class="notice-item__title">
              <!-- <el-form-item label="等待审核备案表：">
                {{  }}</el-form-item
              > -->
              等待审核的备案表：{{ numbersOfInfo.numbersOfPriview }}
            </span>
          </div>
        </el-card>

        <!-- 3.等待分配 -->
        <el-card v-if="role === '校级管理员'">
          <div class="card-header" slot="header">
            <span>等待分配</span>
          </div>
          <div>
            <span class="notice-item__title">
              <!-- <el-form-item label="等待审核备案表：">
                {{  }}</el-form-item
              > -->
              等待分配的备案表：{{ numbersOfInfo.numbersOfDispatch }}
            </span>
          </div>
        </el-card>

        <!-- 4. 等待评阅 -->
        <el-card v-if="role == '评审专家'">
          <div class="card-header" slot="header">
            <span>等待评阅</span>
          </div>
          <div>
            <span class="notice-item__title">
              <!-- <el-form-item label="等待评阅备案表：">
                {{ numbersOfMarker }}</el-form-item
              > -->
              等待评阅的备案表：{{ numbersOfInfo.numbersOfMarker }}
            </span>
          </div>
        </el-card>
      </div>
    </el-card>

    <!-- 待办项详情 -->
    <el-dialog :visible.sync="dialogVisible" title="待办项">
      <el-form>
        <el-form-item label="待办事项">{{ item.title }}</el-form-item>
        <el-form-item label="申请时间">{{ item.createTime }}</el-form-item>
        <el-button
          type="primary"
          @click="goToDetailPage(item.formID, item, userNumber)"
          >去详情页修改状态</el-button
        >
        <el-button type="primary" @click="goToDeleteItem(item, userNumber)"
          >已处理</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { deleteToDoItem, getInfo, getNumbersInfo } from "@/api/todo-items";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "Dashboard",
  data() {
    return {
      welcomeText: "",
      curStudyYear: "2020-2021",

      // 当前用户的 待办事项列表
      form: {
        toDoList: {
          userNumber: "",
          toDoItems: [
            {
              title: "",
              formID: "",
              createTime: "",
            },
          ],
        },
      },
      // 点击的待办项详情
      item: {
        title: "",
        formID: "",
        createTime: "",
      },
      userNumber: "",
      // 待办事项内容默认折叠
      dialogVisible: false,

      numbersOfInfo: {
        //  待审核的备案表数量
        numbersOfPriview: 0,

        // 待评阅的备案表数量
        numbersOfMarker: 0,

        // 待分配的备案表数量
        numbersOfDispatch: 0,

        // 返回待修改的申报表
        numbersOfNeedEdit: 0,
      },
    };
  },
  computed: {
    ...mapGetters([
      "name",
      //新增
      "role",
      "college",
    ]),
  },
  created() {
    this.caclCurTime();

    this.getToDoItemList();
  },
  methods: {
    // 1. 获取待审核、待评分、待分配信息
    getToDoItemList() {
      getNumbersInfo(store.getters.userNumber)
        .then((result) => {
          this.numbersOfInfo = result.data;
        })
        .catch((err) => {
          console.log(err);
        });

      // 2.获得请求修改的待办项
      getInfo(store.getters.userNumber)
        .then((result) => {
          this.form.toDoList = result.data;
          console.log(this.form.toDoList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 3. 点击进入待办项详情
    toDoItemInfo(value) {
      this.item = value;
      this.userNumber = store.getters.userNumber;
      this.dialogVisible = true;
    },

    // 4. 等待审核的待办项 直接进去详情页
    goToDetailPage(formID, item, userNumber) {
      this.$router.push({
        path: "/detail-page/detail-page",
        query: {
          formID: formID,
          item: item,
          userNumber: userNumber,
        },
      });
    },

    // 点击已处理 删除该待办项
    goToDeleteItem(item, userNumber) {
      this.$confirm("此操作将删除该待办项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteToDoItem(item, userNumber)
          .then((result) => {
            (this.dialogVisible = false), this.getToDoItemList();
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },

    // 欢迎语
    caclCurTime() {
      const cur = new Date().getHours();
      if (cur > 5 && cur < 11) {
        this.welcomeText = "早上好！";
      } else if (cur > 10 && cur < 14) {
        this.welcomeText = "中午好！";
      } else if (cur > 13 && cur < 19) {
        this.welcomeText = "下午好！";
      } else if (cur > 18 || cur < 6) {
        this.welcomeText = "晚上好！";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
}
.welcome-info {
  &-content {
    font-size: 26px;
  }
  &-subtext {
    font-size: 15px;
    color: #5a5e66;
    margin: 10px 0 0 0;
  }
}
.card-header {
  font-size: 20px;
}
.card-header span {
  padding: 3px 0;
  border-bottom: 3px solid #409eff;
}
.notice-container {
  min-height: 350px;
  .notice-content {
    margin: 20px 0;
    background: white;
    .notice-item {
      width: 100%;
      height: 50px;
      margin: 5px 0;
      box-shadow: 1px 1px 3px rgba($color: #000000, $alpha: 0.2);
      &:hover {
        background: #f5f7fa;
      }
      .notice-item__title {
        height: 100%;
        padding: 10 10px;
        display: flex;
        align-items: center;
        margin-top: 3%;
      }
    }
  }
}
</style>
