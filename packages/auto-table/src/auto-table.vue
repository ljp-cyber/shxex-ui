<template>
  <el-table
    :border="true"
    :data="data"
    v-loading="table.loading"
    :stripe="table.stripe"
    @selection-change="handleSelectionChange"
  >
    <template v-for="item in curHeader">
      <!-- 选择列 -->
      <el-table-column
        type="selection"
        :fixed="item.fixed"
        :width="item.width"
        v-if="item.type == 'selection'"
      >
      </el-table-column>
      <!-- 选项列 -->
      <template v-else-if="item.type == 'options' && options.length">
        <el-table-column
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
        >
          <template slot="header" slot-scope="scope">
            <el-button size="small" @click="deleteSelections" type="danger"
              >删除选中的项</el-button
            >
          </template>
          <template slot-scope="scope">
            <template v-for="btn in options">
              <el-button
                size="mini"
                :type="btn.type"
                v-if="btn.isShow ? btn.isShow(scope.row) : true"
                @click="btn.event(scope.row, scope.$index)"
                >{{ btn.label }}</el-button
              >
            </template>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <!-- 图片 -->
        <template v-if="item.type == 'img'">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="scope">
              <el-popover placement="left" trigger="click">
                <div>
                  <el-image
                    :src="scope.row[item.prop]"
                    style="width: 300px; height: auto"
                    fit="contain"
                    slot="reference"
                  ></el-image>
                </div>
                <el-image
                  :src="scope.row[item.prop]"
                  style="width: 80px; height: 80px"
                  fit="contain"
                  slot="reference"
                ></el-image>
              </el-popover>
            </template>
          </el-table-column>
        </template>
        <!-- 其他 -->
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter ? item.formatter : null"
          :show-overflow-tooltip="item.tooltip ? item.tooltip : false"
          :sortable="item.sortable ? item.sortable : false"
        ></el-table-column>
      </template>
    </template>
  </el-table>
</template>

<script>
export default {
  name: "auto-table",
  methods: {
    details(val, index) {
      console.log("details:" + val + "," + index);
      this.$emit("details", val);
    },
    delete(val, index) {
      console.log("delete:" + val + "," + index);
      this.$emit("delete", val);
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange:" + val);
      this.multipleSelection = val;
    },
    deleteSelections() {
      return this.delete(this.multipleSelection, null);
    },
    defHeader(data) {
      var head = [];
      if (data) {
        head.push({ type: "selection", fixed: "left" });
        for (var key in data[0]) {
          var tooltip = key.length > 10 ? true : false;
          var type = "text";
          if (key.indexOf("img") >= 0 || key.indexOf("icon") >= 0) {
            type = "img";
          }
          head.push({
            type: type,
            prop: key,
            label: key,
            tooltip: tooltip,
            sortable: true,
          });
        }
        head.push({
          type: "options",
          prop: "operate",
          label: "操作",
          fixed: "right",
        });
      }
      return head;
    },
  },
  data: () => {
    return {
      multipleSelection: [],
      SelIndex: [],
      options: [],
      curHeader: [],
    };
  },
  props: {
    table: {
      type: Object,
      default: () => ({
        stripe: true, //是否为斑马纹
        loading: false, // 数据加载loading
      }),
    },
    data: {
      type: Array,
      default: () => [],
    },
    header: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    //不能直接在data里使用函数，因为还没有创建对象
    console.log("created");
    this.options = [
      {
        type: "success",
        label: "详情",
        event: this.details,
        isShow: (item) => {
          return item.status == 0 ? false : true;
        },
      },
      {
        type: "danger",
        label: "删除",
        event: this.delete,
        isShow: (item) => {
          return item.status == 1 ? false : true;
        },
      },
    ];
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    if (this.data == null || this.data.length == 0) return;
    if (this.header == null || this.header.length == 0) {
      console.log("header is null,use defHeader");
      this.curHeader = this.defHeader(this.data);
    } else {
      this.curHeader = this.header;
    }
  },
};
</script>