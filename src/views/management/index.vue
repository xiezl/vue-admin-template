<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="orderID" width="95">
        <template slot-scope="order">
          {{ order.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="scheduledTime">
        <template slot-scope="order">
          {{ order.row.scheduled_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="subject">
        <template slot-scope="order">
          {{ order.row.subject }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="wordCount">
        <template slot-scope="order">
          {{ order.row.word }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="calculation">
        <template slot-scope="order">
          {{ order.row.calculation_status }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="specialRequirement">
        <template slot-scope="order">
          {{ order.row.special_requirement }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="referenceStyleAndSoftware">
        <template slot-scope="order">
          {{ order.row.special_requirement }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" label="details">
        <template slot-scope="order">
          {{ order.row.details }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="status">
        <template slot-scope="order">
          {{ order.row.status }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="dueTime">
        <template slot-scope="order">
          {{ order.row.due_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="remainingTime">
        <template slot-scope="order">
          {{ order.row.remain_time }}
        </template>
      </el-table-column>
      <el-table-column v-if="roles[0] === 'editor'" align="center" label="writerOperation">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="18">
              <el-input v-model="scope.row.writerName" placeholder="请输入账户名"/>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="acceptOrder(scope.row)"> Accept </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column v-else align="center" label="adminOperation">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="18">
              <el-input v-model="scope.row.assignee" placeholder="请输入账户名"/>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="assignOrder(scope.row)"> Assign </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { mapGetters } from 'vuex'

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
      listLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    acceptOrder(row) {
      console.log(row)
    },
    assignOrder(row) {
      console.log(row)
    }
  }
}
</script>
