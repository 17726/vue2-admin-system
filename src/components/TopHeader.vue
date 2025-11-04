<template>
    <header class="top-header">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            <span class="breadcrumb-item">首页</span>
            <span class="separator">/</span>
            <span class="breadcrumb-item active">用户管理</span>
        </div>
        <!-- 右侧用户信息 -->
        <div class="user-info">
            <span class="welcome">欢迎,</span>
            <span class="username">admin</span>
        </div>
    </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.top-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $top-header-height;
    padding: 0 $base-padding;
    background-color: #ffffff;
    border-bottom: 1px solid #e0e0e0;
    // box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    
    // 面包屑导航
    .breadcrumb{
        display: flex;
        align-items: center;
        font-size: $font-size-small;
        
        .breadcrumb-item{
            color: #606266;
            
            &.active{
                color: $primary-color;
                font-weight: 500;
            }
        }
        
        .separator{
            margin: 0 8px;
            color: #c0c4cc;
        }
    }
    
    // 用户信息
    .user-info{
        display: flex;
        align-items: center;
        font-size: $font-size-small;
        color: #606266;
        gap: 4px;
        .username{
            color: $primary-color;
            font-weight: 500;
        }
    }
}
</style>