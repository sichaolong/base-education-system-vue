<template>
    <div>
      
        <div class="form-header">
        <span>成员概况</span>
      </div>
      <el-table :data="this.form" empty-text="暂无数据">  <!--:data="form.part2.members" -->
        <el-table-column type="index" label="序号" width="50px"></el-table-column>
        <el-table-column prop="name"  label="姓名">
        </el-table-column>
        <el-table-column prop="birthdate" label="出生年月" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="politicalAffiliation" label="政治面貌"></el-table-column>
        <el-table-column prop="degree" label="最终学位"></el-table-column>
        <el-table-column prop="professionalTitle" label="职称"></el-table-column>
        <el-table-column prop="administrativeDuties" label="行政职务"></el-table-column>
        <el-table-column prop="universityTeachingAge" label="高校教龄"></el-table-column>
        <el-table-column
          width="200"
          prop="teachingCoursesInRecentTwoAcademicYears"
          label="近2学年任教课程及学时"
        >
         <!-- getFileName是写的用来切割数组的一个方法 -->
          <!-- <template slot-scope="scope">
            <span v-for="(item, index) in getFileName(scope.row.teachingCoursesInRecentTwoAcademicYears)" :key="index">
            
              {{item.course}}, {{item.period}}
              <br />
            </span>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import { fetchInfo } from '@/api/detail-page/member/index'
import moment from 'moment'
export default {
    props: {
    header: {
      type: String,
      required: true
    },
    membersID: {
      type: String,
      required: true
    }
  },
    data() {
        return {
            form:[
              
            ]
        }
    },
    watch: {
    membersID: function (n, o) {
      this.membersID = n;

      this.getInfo();
    },
  },
    created() {
    // this.getInfo()
    },
    methods: {
    getInfo() {
      fetchInfo(this.membersID).then((result) => {
        //console.log(result)
       this.form = result.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    getFileName(files) {
      return files.slice(0,10);
    },
    dateFormat:function(row,column){
        var date = row[column.property];
        if(date == undefined){return ''};
        return moment(date).format("YYYY-MM")
    }
  }
}

</script>

<style lang="scss" scoped>
.form-header {
  font-size: 1.8rem;
  margin-bottom: 20px;
  margin-top: 10px;
  span {
    padding: 3px 0;
    border-bottom: 3px solid #409eff;
  }
}

.cell-content span {
  padding: 1px 10px;
  border-bottom: 1px solid #000000;
}
</style>