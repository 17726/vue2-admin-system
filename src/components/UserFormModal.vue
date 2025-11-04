<template>
  <!-- 点击背景关闭弹窗 -->
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <h3>{{ formTitle }}</h3>

      <form @submit.prevent="save">
        <div class="form-group">
          <label for="name">姓名:</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>

        <div class="form-group">
          <label for="email">邮箱:</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>

        <div class="form-group">
          <label for="role">角色:</label>
          <select id="role" v-model="formData.role">
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Guest">Guest</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="close">取消</button>
          <button type="submit" class="btn-save">保存</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: null, // 新增时为 null，编辑时传入用户对象
    },
  },
  data() {
    return {
      formTitle: "添加用户",
      formData: {
        id: null,
        name: "",
        email: "",
        role: "User",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save", this.formData);
    },
  },
  watch: {
    user: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (newValue === null) {
          // 新增模式
          this.formTitle = "添加用户";

        } else {
          this.formTitle = "编辑用户";
          // 深拷贝用户数据到表单
          // this.formData = { ...newValue };
          this.formData = {
            id: newValue.id,
            name: newValue.name,
            email: newValue.email,
            role: newValue.role,
          }
        }
        
      }
    }
  }
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
  // 显示在最上层
  z-index: 100;
}
// 渐变动画
// @keyframes fadeIn {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }

.modal-content {
  background: white;
  padding: $base-padding;
  border-radius: $base-border-radius;
  min-width: 450px;
  box-shadow: $base-box-shadow;
  // 显示在弹窗之上
  z-index: 101;
}

// h3 {
//   margin-top: 0;
//   border-bottom: 1px solid #eee;
//   padding-bottom: $base-padding;
// }

// .form-group {
//   margin-bottom: 15px;

//   label {
//     display: block;
//     margin-bottom: 5px;
//     font-weight: bold;
//   }

//   input, select {
//     width: 100%;
//     padding: 10px;
//     border: 1px solid #ddd;
//     border-radius: $base-border-radius;
//   }
// }

// .form-actions {
//   text-align: right;
//   margin-top: 20px;

//   .btn-cancel, .btn-save {
//     border: none;
//     padding: 10px 15px;
//     border-radius: $base-border-radius;
//     cursor: pointer;
//     margin-left: 10px;
//   }

//   .btn-cancel {
//     background-color: #f0f0f0;
//   }

//   .btn-save {
//     background-color: $primary-color;
//     color: white;
//   }
// }
</style>
