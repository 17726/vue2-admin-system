<template>
  <div class="user-management">
    <!-- 操作栏 -->
    <div class="toolbar">
      <div class="left">
        <button class="btn btn-primary">+ 新增用户</button>
        <button class="btn btn-danger">批量删除</button>
      </div>
      <div class="right">
        <input
          type="text"
          class="search-input"
          placeholder="搜索用户名、邮箱..."
        />
        <button class="btn btn-default">搜索</button>
      </div>
    </div>

    <!-- 用户列表表格 -->
    <div class="content-area">
      <table class="user-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>序号</th>
            <th>ID</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in userList" :key="item.id">
            <td><input type="checkbox" /></td>
            <td>{{ index + 1 }}</td>
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.role }}</td>
            <td>
              <button class="btn btn-link">编辑</button>
              <button class="btn btn-link btn-danger">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- 分页器 (后续实现) -->
      <div class="pagination">
        <span class="total">共 {{ userList.length }} 条</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [
        { id: 1, name: "张三", email: "zhangsan@test.com", role: "Admin" },
        { id: 2, name: "李四", email: "lisi@test.com", role: "User" },
        { id: 3, name: "王五", email: "wangwu@test.com", role: "Guest" },
        { id: 4, name: "赵六", email: "zhaoliu@test.com", role: "User" },
      ],
    };
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
    padding: $base-padding;
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
    background: #fff;
    border-radius: 4px;
    // min-height: 400px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
    .user-table{
        width: 100%;
        //边框合并
        // border-collapse: collapse;
        th,td{
            padding: 12px 15px;
            //文本左对齐
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }

    }
    .pagination{
        padding: $base-padding;
        text-align: left;
        .total{
            color: #606266;
        }
    }
  }
}
</style>
