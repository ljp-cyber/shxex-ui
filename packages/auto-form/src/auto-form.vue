<template>
  <el-form
    :inline="inline"
    :model="model"
    class="form-inline"
    :size="size"
    :disabled="disabled"
  >
    <template v-for="item in curForm">
      <el-form-item :label="item.label ? item.label : item.key">
        <!-- 文本 -->
        <el-input
          v-if="item.type == 'input'"
          v-model="model[item.key]"
          :readonly="!edit"
          :name="item.key"
          :placeholder="item.placeholder ? item.placeholder : item.key"
        ></el-input>
        <!-- 选择 -->
        <el-select
          v-else-if="item.type == 'options' && item.options.length"
          v-model="model[item.key]"
          :disabled="!edit"
          :placeholder="item.placeholder ? item.placeholder : item.key"
        >
          <template v-for="optItem in item.options">
            <el-option
              :label="optItem.label ? optItem.label : optItem.value"
              :value="optItem.value"
            ></el-option>
          </template>
        </el-select>
        <!-- 日期 -->
        <el-date-picker
          :readonly="!edit"
          v-else-if="item.type == 'date2'"
          v-model="model[item.key]"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
    </template>
    <!-- 提交 -->
    <el-form-item>
      <el-button :disabled="!edit" type="primary" @click="submit"
        >提交</el-button
      >
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "auto-form",
  data: () => {
    return {
      size: "mini",
      curForm: [],
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: () => false,
    },
    edit: {
      type: Boolean,
      default: () => true,
    },
    inline: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    pickerOptions: {
      default: () => ({
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      }),
    },
    model: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    submit() {
      console.log("submit:" + this.model);
      this.$emit("submit", this.model);
    },
    defForm() {
      var res = [];
      for (var curKey in this.model) {
        var curtype = "input";
        var curoptions = null;
        if (curKey.indexOf("sex") >= 0) {
          curtype = "options";
          curoptions = [{ value: "男" }, { value: "女" }];
        } else if (curKey.indexOf("date") >= 0 || curKey.indexOf("day") >= 0) {
          curtype = "date2";
        }
        res.push({ type: curtype, key: curKey, options: curoptions });
      }
      return res;
    },
  },
  mounted() {
    console.log("mounted");
    if (this.inline == false) {
      this.size = "medium";
    } else {
      this.size = "mini";
    }
    if (this.form == null || this.form.length == 0) {
      console.log("form is null, use default form");
      this.curForm = this.defForm();
    } else {
      this.curForm = this.form;
    }
  },
  beforeUpdate() {
    if (this.form == null || this.form.length == 0) {
      console.log("form is null, use default form");
      this.curForm = this.defForm();
    } else {
      this.curForm = this.form;
    }
  },
};
</script>