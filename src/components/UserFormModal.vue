<template>
  <!-- 点击背景关闭弹窗 -->
  <div class="modal-backdrop" @click.self="close">
    <!-- @click.self ? -->
    <div class="modal-content">
      <!-- 动态切换标题 -->
      <h3>{{ formTitle }}</h3>
      <!-- 表单实现增/改 -->
      <el-form v-model="formData" ref="userForm">
        <el-form-item prop="name" label="用户名" :rules="[{required:true, message: '请输入用户名', trigger: 'blur'}]">
          <el-input type="text" v-model="formData.name"> </el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-select v-model="formData.role">
            <el-option label="User" value="User"></el-option>
            <el-option label="Admin" value="Admin"></el-option>
            <el-option label="Guest" value="Guest"></el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-button @click="close()">取消</el-button>
          <el-button type="primary" @click="save()">保存</el-button>
        </div>
      </el-form>
      <!-- 
      <form @submit.prevent="save()">
         纯前端不提交到后端，阻止默认提交action=""
        <div class="form-group">
          <label for="name">用户名</label>
          <input type="text" id="name" v-model="formData.name" required />
           设置required必选
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="role">角色</label>
          <select name="role" id="role" v-model="formData.role">
             name?
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Guest">Guest</option>
          </select>
        </div>
        <div class="form-action">
          <el-button type="button" class="btn-cancel" @click="close">取消</el-button>
           注意为button设置type
          <el-button type="submit" class="btn-save">保存</el-button>
           注意save-submit事件应与form元素的绑定
        </div>
      </form> 
      -->
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
    };
  },
  methods: {
    close() {
      // 传递“关闭”事件
      this.$emit("close");
    },
    save() {
      // 先执行表单校验在保存到父组件
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$emit("save", this.formData);
        } else {
          console.log("表单验证失败");
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
        if (newValue !== null) {
          // 新增模式
          // 深拷贝用户数据到表单
          // this.formData = { ...newValue };
          this.formData = {
            id: newValue.id,
            name: newValue.name,
            email: newValue.email,
            role: newValue.role,
          };
          // 或直接this.formData = newValue;？
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
  // form {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   gap: $base-padding;
  //   .form-group {
  //     display: flex;
  //     flex-direction: row;
  //     align-items: center;
  //     justify-content: space-between;
  //     gap: $base-padding;
  //   }
  //   .form-action {
  //     display: flex;
  //     justify-content: space-between;
  //     gap: $base-padding;
  //   }
  // }
}
</style>
