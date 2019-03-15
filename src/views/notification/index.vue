<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="Update Time" width="100">
        <template slot-scope="scope">
          {{ scope.row.update_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Order ID" width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="goOrderDetail(scope.row)">{{ scope.row.order_id }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Create Time" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Content">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Read" width="180">
        <template slot-scope="scope">
          <p v-if="scope.row.has_read">Read</p>
          <el-button v-else type="primary" @click.prevent="markAsRead(scope.row)">Mark as read</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-count="totalPage"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { getMsgList, markRead } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      totalPage: 1
    }
  },
  created() {
    this.currentPage = 1
    this.fetchData(0)
  },
  methods: {
    fetchData(pageNum) {
      this.listLoading = true
      const data = { page: pageNum }
      getMsgList(data).then(response => {
        this.list = response.data.data
        this.currentPage = response.data.page + 1
        this.totalPage = response.data.total_page
        this.listLoading = false
      })
    },
    markAsRead(msg) {
      markRead(msg.id).then(response => {
        this.fetchData(this.currentPage - 1)
      })
    },
    goOrderDetail(msg) {
      const order = { id: msg.order_id }
      this.$router.push({ name: 'orderDetail', params: { order: order }})
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.fetchData(pageNum - 1)
    }
  }
}
</script>
