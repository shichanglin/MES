<template>
  <div id="app">
    <h1>工作中心</h1>
    <el-row>
      <el-col :span="24">
        <el-table
          size="mini"
          :data="master_user1.data"
          border
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column
            v-for="(item,index) in master_user1.columns1"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-input size="mini" placeholder="请输入内容" v-model="master_user1.sel[item.prop]"></el-input>
              </span>
              <span v-else>{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width>
            <template slot-scope="scope">
              <span
                class="el-tag el-tag--success el-tag--mini"
                style="cursor: pointer;"
                @click.stop="saveRow(scope.row,scope.$index)"
              >确定</span>
              <span
                class="el-tag el-tag--primary el-tag--mini"
                style="cursor: pointer;"
                @click="editRow(scope.row,scope.$index)"
              >编辑</span>
              <span
                class="el-tag el-tag--danger el-tag--mini"
                style="cursor: pointer;"
                @click="deleteRow(scope.$index,master_user1.data)"
              >删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <div class="el-table-add-row1" style="width: 99.2%;" @click="add()">
          <span>+ 添加</span>
        </div>
      </el-col>
    </el-row>
    <!-- <span>{{master_user1.data}}</span> -->

    <div>
      <h1>设备状态信息</h1>
      <el-row>
        <el-col :span="24">
          <el-table
            size="mini"
            :data="master_user2.data"
            border
            style="width: 100%"
            highlight-current-row
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column
              v-for="(item,index) in master_user2.columns2"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isSet2">
                  <el-input size="mini" placeholder="请输入内容" v-model="master_user2.sel[item.prop]"></el-input>
                </span>
                <span v-else>{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width>
              <template slot-scope="scope">
                <span
                  class="el-tag el-tag--success el-tag--mini"
                  style="cursor: pointer;"
                  @click.stop="saveRow2(scope.row,scope.$index)"
                >确定</span>
                <span
                  class="el-tag el-tag--primary el-tag--mini"
                  style="cursor: pointer;"
                  @click="editRow2(scope.row,scope.$index)"
                >编辑</span>
                <span
                  class="el-tag el-tag--danger el-tag--mini"
                  style="cursor: pointer;"
                  @click="deleteRow2(scope.$index,master_user2.data)"
                >删除</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24">
          <div class="el-table-add-row1" style="width: 99.2%;" @click="add2()">
            <span>+ 添加</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      master_user1: {
        sel: null, //选中行
        columns1: [
          {
            prop: "wc_id",
            label: "编号",
            width: 120
          },
          {
            prop: "wc_name",
            label: "名称",
            width: 150
          },
          {
            prop: "wc_info",
            label: "描述",
            width: 220
          },
          {
            prop: "wc_replace",
            label: "是否替换",
            width: 90
          },
          {
            prop: "wc_turn_count",
            label: "班次/每天",
            width: 90
          },
          {
            prop: "wc_turn_time",
            label: "小时/班次",
            width: 90
          },
          {
            prop: "wc_device_count",
            label: "平均人数/班次",
            width: 120
          },
          {
            prop: "wc_critical",
            label: "是否关键"
          }
        ],
        data: []
      },
      master_user2: {
        sel: null, //选中行
        columns2: [
          {
            prop: "ds_id",
            label: "设备状态编号",
            width: 120
          },
          {
            prop: "d_id",
            label: "编号",
            width: 150
          },
          {
            prop: "pt_id",
            label: "加工类别编号",
            width: 150
          },
          {
            prop: "ds_state",
            label: "状态(0/1)",
            width: 120
          },
          {
            prop: "ds_start_time",
            label: "损坏时间",
            width: 220
          },
          {
            prop: "ds_end_time",
            label: "修好时间"
          },
          {
            prop: "ds_up_time",
            label: "更新时间"
          }
        ],
        data: []
      }
    };
  },
  methods: {
    add() {
      for (let i of this.master_user1.data) {
        if (i.isSet) return this.$message.warning("请先保存当前编辑项");
      }
      let j = {
        ds_id: "",
        d_id: "",
        pt_id: "",
        ds_state: "",
        "ds_start-time": "",
        "ds_start-time": "",
        "ds_up-time": "",
        isSet: true
      };
      this.master_user1.data.push(j);
      this.master_user1.sel = JSON.parse(JSON.stringify(j));
    },
    add2() {
      for (let i of this.master_user2.data) {
        if (i.isSet2) return this.$message.warning("请先保存当前编辑项");
      }
      let j2 = {
        ds_id: "",
        d_id: "",
        ds_state: "",
        "ds_start-time": "",
        "ds_start-time": "",
        "ds_up-time": "",
        isSet2: true
      };
      this.master_user2.data.push(j2);
      this.master_user2.sel = JSON.parse(JSON.stringify(j2));
    },
    saveRow(row, index) {
      //保存
      let data = JSON.parse(JSON.stringify(this.master_user1.sel));
      for (let k in data) {
        row[k] = data[k]; //将sel里面的value赋值给这一行。ps(for....in..)的妙用，细心的同学发现这里我并没有循环对象row
      }
      row.isSet = false;
    },
    saveRow2(row, index) {
      //保存
      let data = JSON.parse(JSON.stringify(this.master_user2.sel));
      for (let k in data) {
        row[k] = data[k]; //将sel里面的value赋值给这一行。ps(for....in..)的妙用，细心的同学发现这里我并没有循环对象row
      }
      row.isSet2 = false;
    },
    editRow(row) {
      //编辑
      for (let i of this.master_user1.data) {
        if (i.isSet) return this.$message.warning("请先保存当前编辑11项");
      }
      this.master_user1.sel = row;
      row.isSet = true;
    },
    editRow2(row) {
      //编辑
      for (let i of this.master_user2.data) {
        if (i.isSet2) return this.$message.warning("请先保存当前编辑11项");
      }
      this.master_user2.sel = row;
      row.isSet2 = true;
    },
    deleteRow(index, rows) {
      //删除
      rows.splice(index, 1);
    },
    deleteRow2(index, rows) {
      //删除
      rows.splice(index, 1);
    }
  },
  components: {}
};
</script>

<style lang="scss">
.el-table-add-row1 {
  margin-top: 10px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
}
</style>