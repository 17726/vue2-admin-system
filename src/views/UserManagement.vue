<template>
  <div class="user-management">
    <!-- 操作栏 -->
    <div class="toolbar">
      <div class="left">
        <button class="btn btn-primary" @click="handleOpenAdd()">
          + 新增用户
        </button>
        <button
          class="btn btn-danger"
          :disabled="selectedIds.length <= 0"
          @click="delSelected()"
        >
          批量删除
        </button>
      </div>
      <div class="right">
        <input
          type="text"
          class="search-input"
          placeholder="搜索用户名、邮箱、角色..."
          v-model="filters.searchText"
        />
        <!-- 实时搜索不需按钮 -->
        <!-- <button class="btn btn-default" >搜索</button> -->
        <button class="btn btn-default" @click="clearSearchInput()">
          清空
        </button>
      </div>
    </div>

    <!-- 用户列表表格 -->
    <div class="content-area">
      <table class="user-table">
        <thead>
          <tr>
            <th>
              <!-- 绑定全选到计算属性 -->
              <input type="checkbox" v-model="selectedAll" />
            </th>
            <th>序号</th>
            <th>用户名</th>
            <!-- <th>ID</th> -->
            <th>邮箱</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredUserList" :key="item.id">
            <!-- 复选框绑定数组，勾选会自动将value加入到数组 -->
            <td>
              <input type="checkbox" :value="item.id" v-model="selectedIds" />
            </td>
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <!-- <td>{{ item.id }}</td> -->
            <td>{{ item.email }}</td>
            <td>{{ item.role }}</td>
            <td>
              <button class="btn btn-link" @click="handleOpenEdit(item)">
                编辑
              </button>
              <button class="btn btn-link btn-danger" @click="del(item.id)">
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 分页器 (后续实现) -->
      <div class="pagination">
        <span class="total">共 {{ userList.length }} 条</span>
      </div>
      <!-- 用户表单弹窗 -->
      <UserFormModal
        v-if="dialogVisible"
        :user="editingUser"
        @save="handleSave"
        @close="handleClose"
      >
        <!--:user 传递当前编辑的用户对象 -->
        <!--@save 监听保存事件 -->
        <!--@close 监听关闭事件 -->
      </UserFormModal>
    </div>
  </div>
</template>

<script>
import UserFormModal from "@/components/UserFormModal.vue";

export default {
  components: {
    UserFormModal,
  },
  data() {
    return {
      userList: [
        { id: 1, name: "张三", email: "zhangsan@test.com", role: "Admin" },
        { id: 2, name: "李四", email: "lisi@test.com", role: "User" },
        { id: 3, name: "王五", email: "wangwu@test.com", role: "Guest" },
        { id: 4, name: "赵六", email: "zhaoliu@test.com", role: "User" },
        { id: 5, name: "张七", email: "zhangqi@test.com", role: "User" },
      ],
      // 用于实现搜索过滤
      filters: {
        searchText: "",
      },
      // 控制用户表单弹窗显示与否
      dialogVisible: false,
      // 当前编辑的用户对象（数据）, null表示新增
      // 单向数据流：用于表单数据显示
      editingUser: null,
      // 批量选择的用户ID数组
      selectedIds: [],
    };
  },
  methods: {
    // "D"
    del(id) {
      this.userList = this.userList.filter((item) => item.id !== id);
      // 同时清除复选框记录
      this.selectedIds = this.selectedIds.filter(
        (selectedId) => selectedId !== id
      );
    },
    delSelected() {
      this.userList = this.userList.filter((user) => {
        return !this.selectedIds.includes(user.id);
      });
    },
    // 清空搜索框
    clearSearchInput() {
      this.filters.searchText = "";
    },

    // --- 弹窗控制表单 ---
    // "C" & "U"
    // 开启弹窗
    handleOpenAdd() {
      this.editingUser = null; // 新增模式
      this.dialogVisible = true;
    },

    handleOpenEdit(user) {
      // 传递用户对象
      this.editingUser = user; // 编辑模式
      // userFormModal接收该属性并填充表单
      this.dialogVisible = true;
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
      this.editingUser = null; // 关闭时清空
    },
    // 保存用户数据
    handleSave(formData) {
      // formData 来自子组件的表单数据，为用户数据对象
      // console.log("保存的用户数据:", formData);
      if (formData.id) {
        // 编辑模式：根据 id 查找并更新
        const index = this.userList.findIndex(
          (item) => item.id === formData.id
        );
        // findIndex找不到返回-1
        if (index !== -1) {
          // 或使用 Vue.set 或 $set 确保响应式更新 ?
          // this.$set(this.userList, index, formData);

          // 直接替换对象
          this.userList[index] = formData;
        }
      } else {
        // null新增模式
        this.userList.push({
          id: Date.now(),
          // 或用...formData,展开语法
          name: formData.name,
          email: formData.email,
          role: formData.role,
        });
      }
      this.dialogVisible = false;
      this.editingUser = null;
    },
  },
  computed: {
    // "R"
    // 搜索/筛选功能
    filteredUserList() {
      const list = this.userList;
      const searchText = this.filters.searchText.trim().toLowerCase();
      //为空返回全部列表
      if (!searchText) {
        return list;
      }
      return list.filter((user) => {
        //不区分大小写搜索
        return (
          user.name.toLocaleLowerCase().includes(searchText) ||
          user.email.toLocaleLowerCase().includes(searchText) ||
          user.role.toLocaleLowerCase().includes(searchText)
        );
      });
    },
    selectedAll: {
      // 部分全选与完全全选模式梳理
      // 当前实现的是全选框只与筛选后的结果相关联（即部分全选）
      get() {
        // 如果当前筛选框的每一项的id都在selectedIds数组中
        // 则为true
        if (
          this.selectedIds.length > 0 &&
          this.filteredUserList.every((user) =>
            this.selectedIds.includes(user.id)
          )
        ) {
          return 1;
        } else {
          return 0;
        }
        // return this.selectedIds.length > 0 && this.filteredUserList.every((user) =>this.selectedIds.includes(user.id))
      },
      set(newValue) {
        if (newValue) {
          // 当前筛选结果全选时，将当前所有id加入selectedIds
          // 为避免重复，先检查是否已存在？
          this.filteredUserList.forEach((user) => {
            if (!this.selectedIds.includes(user.id)) {
              this.selectedIds.push(user.id);
            }
          });
        } else {
          this.selectedIds = [];
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.user-management {
  padding: $base-padding;

  // 操作工具栏
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $bg-white;
    border-radius: $border-radius-base;
    box-shadow: $shadow-base;
    padding: $base-padding;
    margin-bottom: $base-padding;

    .left {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .right {
      display: flex;
      gap: 10px;
      align-items: center;

      .search-input {
        // width: min(240px,100%);
      }
    }
  }

  // 内容区域
  .content-area {
    background: $bg-white;
    // min-height: 400px;？
    border-radius: $border-radius-base;
    box-shadow: $shadow-base;
    // overflow: hidden;？

    .user-table {
      width: 100%;
      // 边框合并？
      // border-collapse: collapse;

      thead {
        background-color: $table-header-bg;

        th {
          padding: 12px 15px;
          text-align: left;
          font-weight: $font-weight-medium;
          font-size: $font-size-base;
          color: $text-primary;
          border-bottom: 1px solid $table-border;
        }
      }

      tbody {
        tr {
          // transition: $transition-fast;

          // &:hover {
          //   background-color: $table-hover-bg;
          // }
          // 下边框（非最后一行）
          &:not(:last-child) {
            border-bottom: 1px solid $table-border;
          }

          td {
            padding: 12px 15px;
            font-size: $font-size-base;
            color: $text-regular;
          }
        }
      }
    }

    .pagination {
      padding: $base-padding;
      text-align: left;
      border-top: 1px solid $table-border;

      .total {
        //边框
        // font-size: $font-size-base;
        color: $text-regular;
      }
    }
  }
}
</style>
