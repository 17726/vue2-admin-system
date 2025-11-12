<template>
  <!-- 点击背景关闭弹窗 -->
  <div class="modal-backdrop" @click.self="close">
    <!-- @click.self 为仅此元素点击触发，子元素被点击时不会触发 -->
    <div class="modal-content">
      <!-- 动态切换标题 -->
      <h3>{{ formTitle }}</h3>
      <!-- 表单实现增/改 -->
      <el-form
        ref="userForm"
        :model="formData"
        :rules="rules"
        label-position="right"
        label-width="5rem"
      >
        <!-- :model单向数据流：父组件传递数据，子组件props：{model：formData} -->

        <el-form-item prop="name" label="用户名">
          <!-- prop: el-form绑定model的对象的属性，用于校验 -->
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-select v-model="formData.role">
            <el-option value="User" label="User"></el-option>
            <el-option value="Admin" label="Admin"></el-option>
            <el-option value="Guest" label="Guest"></el-option>
          </el-select>
        </el-form-item>
        <div class="form-action">
          <el-button @click="close()">取消</el-button>
          <el-button type="success" @click="save()">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 接收当前编辑的用户对象
    user: {
      type: Object,
      default: null, // 新增时为 null，编辑时传入用户对象
    },
  },
  data() {
    const checkName = (rule, value, callback) => {
      /**练习自定义校验
       * 验证用户名（async-validator 规则用法）
       * @param {Object} rule
       * @param {string} value
       * @param {Function} callback
       */
      if (!value) {
        callback(new Error("请输入姓名")); // 已有 callback，但后面要移除 return
      } else if (value.length < 2) {
        callback(new Error("姓名至少2个字符"));
      } else if (value.length > 20) {
        callback(new Error("姓名不能超过20个字符"));
      } else {
        callback(); // 通过校验
      }
    };
    return {
      formData: {
        // id默认为空（不可编辑）
        // 新增时由父组件设置
        // 编辑时由watch监听赋值
        id: null,
        name: "",
        email: "",
        role: "",
      },
      // 表单校验规则
      rules: {
        // key对应formData
        // trigger(触发器)：blur表示输入框失去焦点时校验
        name: [
          // { required: true, message: "请输入用户", trigger: "blur" },
          { validator: checkName, required: true, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            // type:email为内置校验
            type: "email",
            message: "请输入正确的邮箱地址",
            // 失去焦点与改变时生效
            trigger: ["blur", "change"],
          },
        ],
        role: [{ required: true, message: "请输入用户", trigger: "blur" }],
      },
    };
  },
  methods: {
    close() {
      // 传递“关闭”事件
      // 清除表单校验状态？？
      // this.$refs.userForm.clearValidate();
      this.$emit("close");
    },
    save() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          // 表单校验通过
          this.$emit("save", this.formData);
        } else {
          // alert("请检查表单格式");
          console.log("表单校验失败！");
          return false;
        }
      });
    },
  },
  computed: {
    formTitle() {
      return this.user === null ? "添加用户" : "编辑用户";
    },
  },
  watch: {
    // 监听父组件传递的EditingUser对象，并实时渲染到表单
    user: {
      deep: true,
      immediate: true,
      handler(newValue) {
        // 当 user 变化时（打开弹窗或切换编辑对象）
        // 使用 nextTick 确保 DOM 更新完毕？？
        // this.$nextTick(() => {
        //   // 清除上一次的校验红字提示
        //   if (this.$refs.userForm) {
        //     this.$refs.userForm.clearValidate();
        //   }
        // });

        if (newValue !== null) {
          // 编辑模式
          // 深拷贝用户数据到表单
          // this.formData = { ...newValue };
          this.formData = {
            id: newValue.id,
            name: newValue.name,
            email: newValue.email,
            role: newValue.role,
          };
          // 或直接this.formData = newValue;？？
        } else {
          // 新增模式
          // form视图置空？？（是否必须）
          // this.formData = {
          //   id: null,
          //   name: "",
          //   email: "",
          //   role: "",
          // };
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  // 背景遮罩
  position: fixed; // 固定定位，相对视窗
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  // 显示在次上层
  z-index: 100;
}

.modal-content {
  // 弹窗位置由backdrop控制居中
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;

  padding: $base-padding;
  border-radius: $base-border-radius;
  min-width: 450px;
  padding-bottom: 30px;
  // min-height: 300px;
  box-shadow: $base-box-shadow;
  // 显示在弹窗之上
  z-index: 101;
  .form-action {
    // 表单按钮组
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
}
</style>
