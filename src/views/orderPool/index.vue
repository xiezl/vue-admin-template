<template>
  <div class="app-container">
    <h1>Order Pool</h1>
    <el-input v-model="subjectCode" placeholder="Search by subject" style="display: inline-block; width: auto"/>
    <el-button type="primary" @click="search"> Search </el-button>
    <el-button v-if="roles[0] === 'admin'" type="primary" @click="addOrder"> Add Order </el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="Order ID" width="95">
        <template slot-scope="order">
          <el-button type="text" @click="goOrderDetail(order.row)">{{ order.row.id }}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Scheduled Time">
        <template slot-scope="order">
          {{ order.row.scheduled_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Subject">
        <template slot-scope="order">
          {{ order.row.subject }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Words">
        <template slot-scope="order">
          {{ order.row.word }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Detail File">
        <template slot-scope="order">
          <el-button v-if="order.row.detail_file" type="text" @click="downloadFile(order.row.detail_file)">{{ order.row.detail_file.file_name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Preview File">
        <template slot-scope="order">
          <el-button v-if="order.row.preview_file" type="text" @click="downloadFile(order.row.preview_file)">{{ order.row.preview_file.file_name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Number of Views">
        <template slot-scope="order">
          <span v-if="order.row.preview_file">{{ order.row.preview_file.download_times }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Bonus">
        <template slot-scope="order">
          {{ order.row.bonus }}
        </template>
      </el-table-column>
      <el-table-column v-if="roles[0] === 'admin'" align="center" label="Assign Order" width="300">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="16">
              <el-select v-model="scope.row.value" placeholder="Please select writer">
                <el-option
                  v-for="writer in scope.row.candidate_writers"
                  :key="writer.id"
                  :label="writer.name"
                  :value="writer.username" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="assignOrder(scope.row)"> Accept </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column v-else align="center" label="Accept Order">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="6">
              <el-button v-if="!scope.row.has_accepted" type="primary" @click="acceptOrder(scope.row)"> Accept Order</el-button>
              <el-button v-else type="primary" disabled> Accept Order</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, acceptOrder, assignOrder } from '@/api/table'
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
      listLoading: true,
      subjectCode: ''
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
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    acceptOrder(row) {
      acceptOrder(row.id).then(response => {
        this.$message({
          message: 'Accept Succeed',
          type: 'success'
        })
        this.listLoading = true
        getList().then(response => {
          const originList = response.data
          const list = []
          if (this.subjectCode) {
            originList.forEach(element => {
              if (element.subject === this.subjectCode) {
                list.push(element)
              }
            })
            this.list = list
            this.listLoading = false
          } else {
            this.list = originList
            this.listLoading = false
          }
        })
      })
    },
    assignOrder(row) {
      const data = {
        writer_username: row.value
      }
      assignOrder(row.id, data).then(response => {
        this.$message({
          message: 'Assign Succeed',
          type: 'success'
        })
        this.fetchData()
      })
    },
    goOrderDetail(order) {
      this.$router.push({ name: 'orderDetail', params: { order: order }})
    },
    downloadFile(file) {
      window.location.href = `http://192.168.0.100:8808/file/${file.id}`
      // download(file);
    },
    search() {
      this.listLoading = true
      const list = []
      let originList = []
      getList().then(response => {
        originList = response.data
        if (this.subjectCode) {
          originList.forEach(element => {
            if (element.subject === this.subjectCode) {
              list.push(element)
            }
          })
          this.list = list
          this.listLoading = false
        } else {
          this.list = originList
          this.listLoading = false
        }
      })
    },
    addOrder() {
      this.$router.push({ name: 'editOrder', params: { order: null }})
    }
  }
}
</script>

<style scoped>
.app-container /deep/ .el-select {
  width: 180px;
}
</style>
