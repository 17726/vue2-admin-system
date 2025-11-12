<template>
  <div class="user-management">
    <!-- 操作栏 -->
    <div class="toolbar">
      <div class="left">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleOpenAdd()"
          size="medium"
        >
          新增用户
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          :disabled="selectedIds.length <= 0"
          @click="delSelected()"
          size="medium"
        >
          批量删除
        </el-button>
      </div>
      <div class="right">
        <el-input
          type="text"
          size="medium"
          placeholder="搜索用户名、邮箱、角色..."
          v-model="filters.searchText"
        />
        <!-- 实时搜索不需按钮 -->
        <!-- <button class="btn btn-default" >搜索</button> -->
        <el-button
          type="primary"
          plain
          size="medium"
          @click="clearSearchInput()"
        >
          清空
        </el-button>
      </div>
    </div>

    <!-- 用户列表表格 -->
    <div class="content-area">
      <el-table
        :data="filteredUserList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        row-key="id"
      >
        <!--selection-change事件返回当前选中项的对象数组 -->
        <el-table-column type="selection" width="40"></el-table-column>

        <el-table-column
          type="index"
          label="序号"
          align="center"
          header-align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="60"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
          <!--show-overflow-tooltip 会在内容溢出时显示提示信息 -->
        </el-table-column>
        <el-table-column prop="role" label="角色" min-width="60">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="140"
        >
          <template slot-scope="scope">
            <div class="ops">
              <el-button
                size="medium"
                type="primary"
                plain
                @click="handleOpenEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                plain
                @click="del(scope.row.id)"
                icon="el-icon-delete"
                circle
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 (后续实现) -->
      <div class="pagination">
        <span class="total">共 {{ filteredUserList.length }} 条</span>
      </div>
      <!-- 用户表单弹窗 -->
      <UserFormModal
        v-if="dialogVisible"
        :user="editingUser"
        @save="handleSave"
        @close="handleClose"
      >
        <!--:user 传递当前编辑的用户对象(父传子) -->
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
    handleSelectionChange(selection) {
      // console.log("选中项：", selection);
      // selection为当前选中的行 对象 数组

      this.selectedIds = selection.map((item) => {
        return item.id;
      });
      console.log(this.selectedIds);
    },
    // "D"
    del(id) {
      // if (confirm("确定删除该用户吗？")) {
      //   this.userList = this.userList.filter((item) => item.id !== id);
      //   // 同时清除复选框记录
      //   this.selectedIds = this.selectedIds.filter(
      //     (selectedId) => selectedId !== id
      //   );
      // }

      // 使用$confirm方法
      // 注意：第二个参数title必须定义为String类型
      this.$confirm("确定删除该用户吗？", "提示")
        .then(() => {
          this.userList = this.userList.filter((item) => item.id !== id);
          // 同时清除复选框记录
          this.selectedIds = this.selectedIds.filter(
            (selectedId) => selectedId !== id
          );
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          // 取消删除
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    delSelected() {
      this.$confirm(
        `确定删除选中的${this.selectedIds.length}个用户吗？`,
        "提示"
      )
        .then(() => {
          this.userList = this.userList.filter((user) => {
            return !this.selectedIds.includes(user.id);
          });

          this.$message({
            type: "success",
            message: `已成功删除${this.selectedIds.length}个用户`,
          });
          // 清空已选择的ID
          this.selectedIds = [];
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
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
      // formData 来自子组件的表单数据，为一个用户数据对象
      if (formData.id) {
        // 编辑模式：根据 id 查找并更新
        // map方法
        this.userList = this.userList.map((item) => {
          // if (item.id === formData.id) {
          //   return formData;
          // } else {
          //   return item;
          // }
          const result = item.id === formData.id ? formData : item;
          return result;
        });
        // index替换方法
        // const index = this.userList.findIndex(
        //   (item) => item.id === formData.id
        // );
        // // findIndex找不到返回-1
        // if (index !== -1) {
        //   // 或使用 Vue.set 或 $set 确保响应式更新
        //   // this.$set(this.userList, index, formData);

        //   // 直接替换对象（不推荐）
        //   this.userList[index] = formData;
        // }
      } else {
        // null新增模式
        this.userList.push({
          // ...formData,展开语法
          ...formData,
          //注意id需要位于formData展开之后，覆盖
          id: Date.now(),
        });
        // console.log(this.userList);
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
    // 使用UI库table的全选功能
    // selectedAll: {
    //   // 部分全选与完全全选模式梳理
    //   // 当前实现的是全选框只与筛选后的结果相关联（即部分全选）
    //   get() {
    //     // 如果当前筛选框的每一项的id都在selectedIds数组中
    //     // 则为true
    //     if (
    //       this.selectedIds.length > 0 &&
    //       this.filteredUserList.every((user) =>
    //         this.selectedIds.includes(user.id)
    //       )
    //     ) {
    //       return 1;
    //     } else {
    //       return 0;
    //     }
    //     // return this.selectedIds.length > 0 && this.filteredUserList.every((user) =>this.selectedIds.includes(user.id))
    //   },
    //   set(newValue) {
    //     if (newValue) {
    //       // 当前筛选结果全选时，将当前所有id加入selectedIds
    //       // 为避免重复，先检查是否已存在
    //       this.filteredUserList.forEach((user) => {
    //         if (!this.selectedIds.includes(user.id)) {
    //           this.selectedIds.push(user.id); //??还有更好的方法吗
    //         }
    //       });
    //     } else {
    //       this.selectedIds = [];
    //     }
    //   },
    // },
  },
};
</script>

<style lang="scss" scoped>
.user-management {
  // min-width: max-content;
  padding: $base-padding;

  // 操作工具栏
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // 未达到断点不换行
    flex-wrap: nowrap;
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
    }
  }

  // 内容区域
  .content-area {
    padding: $base-padding;
    background: $bg-white;
    // min-height: 400px;？？
    border-radius: $border-radius-base;
    box-shadow: $shadow-base;
    // overflow: hidden;？？

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

/* 操作按钮居中样式 - 使用深度选择器 */
// ::v-deep .el-table .cell .ops {
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   gap: 6px;
// }

@media (max-width: 768px) {
  .user-management {
    .toolbar {
      flex-wrap: wrap;
      gap: 1rem;
      // justify-content: center;
      .left,
      .right {
        width: 100%;
        justify-content: space-between;
      }
      .right {
        order: -1;
      }
    }
  }
}
</style>
