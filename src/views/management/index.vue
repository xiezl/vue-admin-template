<template>
  <div class="app-container">
    <el-row v-if="roles[0] !== 'admin'">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <h1> Assigned Orders </h1>
          </template>
          <el-table
            v-loading="todoListLoading"
            :data="todoList"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>
            <el-table-column align="center" label="orderID" width="95">
              <template slot-scope="order">
                <el-button type="text" @click="goOrderDetail(order.row)">{{ order.row.id }}</el-button>
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
            <el-table-column align="center" label="detailFile">
              <template slot-scope="order">
                <el-button v-if="order.row.detail_file" type="text" @click="downloadFile(order.row.detail_file)">{{ order.row.detail_file.file_name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="remainingTime">
              <template slot-scope="order">
                {{ order.row.remain_time }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="bonus">
              <template slot-scope="order">
                {{ order.row.bonus }}
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="Completed Orders" name="2">
          <template slot="title">
            <h1> Completed Orders </h1>
          </template>
          <el-date-picker
            v-model="selectedMonth"
            type="month"
            format="yyyy-MM"
            placeholder="Select Month" />
          <el-button type="primary" @click.prevent="submitMonth()">Submit</el-button>
          <p> Word Count this month: {{ wordCount }}</p>
          <p> Average marks this month: {{ avgMarks }}</p>
          <p> Bonus Count this month: {{ avgMarks }}</p>
          <el-table
            v-loading="completeListLoading"
            :data="completeList"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>
            <el-table-column align="center" label="orderID" width="95">
              <template slot-scope="order">
                <el-button type="text" @click="goOrderDetail(order.row)">{{ order.row.id }}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="scheduledTime">
              <template slot-scope="order">
                <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                  {{ order.row.scheduled_time }}
                </p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="subject">
              <template slot-scope="order">
                <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                  {{ order.row.subject }}
                </p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="wordCount">
              <template slot-scope="order">
                <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                  {{ order.row.word }}
                </p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="detailFile">
              <template slot-scope="order">
                <el-button v-if="order.row.detail_file" type="text" @click="downloadFile(order.row.detail_file)">{{ order.row.detail_file.file_name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="overdueTime">
              <template slot-scope="order">
                <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                  {{ order.row.over_due }}
                </p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="marks">
              <template slot-scope="order">
                <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                  {{ order.row.marks }}
                </p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="bonus">
              <template slot-scope="order">
                <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                  {{ order.row.bonus }}
                </p>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-count="totalPage"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange" />
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <el-row v-else>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">Orders</span>
          <h1> All Orders</h1>
          <el-table
            v-loading="orderListLoading"
            :data="orderList"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>
            <el-table-column align="center" label="orderID" width="95">
              <template slot-scope="order">
                <el-button type="text" @click="goOrderDetail(order.row)">{{ order.row.id }}</el-button>
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
            <el-table-column align="center" label="bonus">
              <template slot-scope="order">
                {{ order.row.bonus }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="remainingTime">
              <template slot-scope="order">
                {{ order.row.remain_time }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="marks">
              <template slot-scope="order">
                {{ order.row.marks }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="writer">
              <template slot-scope="order">
                <p v-if="order.row.writer">{{ order.row.writer.name }}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="status">
              <template slot-scope="order">
                {{ order.row.status }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="overdueTime">
              <template slot-scope="order">
                {{ order.row.over_due }}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-count="totalPage"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange" />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">Statistics</span>
          <el-select v-model="selectedWriter" placeholder="Please select a writer">
            <el-option
              v-for="w in writerList"
              :key="w.id"
              :label="w.name"
              :value="w.id"/>
          </el-select>
          <el-date-picker
            v-model="selectedMonth"
            type="month"
            format="yyyy-MM"
            placeholder="Select Month" />
          <el-button type="primary" @click.prevent="submitWriter()">Submit</el-button>
          <el-row v-if="showTable">
            <p> Word Count this month: {{ wordCount }}</p>
            <p> Average marks this month: {{ avgMarks }}</p>
            <p> Total bonus this month: {{ bonusCount }}</p>
            <h1> Completed Orders </h1>
            <el-table
              v-loading="completeListLoading"
              :data="completeList"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row>
              <el-table-column align="center" label="orderID" width="95">
                <template slot-scope="order">
                  <el-button type="text" @click="goOrderDetail(order.row)">{{ order.row.id }}</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="scheduledTime">
                <template slot-scope="order">
                  <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                    {{ order.row.scheduled_time }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="center" label="subject">
                <template slot-scope="order">
                  <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                    {{ order.row.subject }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="center" label="wordCount">
                <template slot-scope="order">
                  <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                    {{ order.row.word }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="center" label="detailFile">
                <template slot-scope="order">
                  <el-button v-if="order.row.detail_file" type="text" @click="downloadFile(order.row.detail_file)">{{ order.row.detail_file.file_name }}</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="overdueTime">
                <template slot-scope="order">
                  <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                    {{ order.row.over_due }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="center" label="marks">
                <template slot-scope="order">
                  <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                    {{ order.row.marks }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="center" label="bonus">
                <template slot-scope="order">
                  <p :style="order.row.over_due > 0 ? 'color: red' : ''">
                    {{ order.row.bonus }}
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">User</span>
          <el-row>
            <h1> Change existing user's password</h1>
            <el-select v-model="selectedWriter" placeholder="Please select a writer">
              <el-option
                v-for="w in writerList"
                :key="w.id"
                :label="w.name"
                :value="w.id"/>
            </el-select>
            <el-input v-model="pwdToChange" placeholder="Set a new password" autosize />
            <el-button type="primary" @click.prevent="changePwd()">Submit</el-button>
          </el-row>
          <el-row>
            <h1> Add a new user</h1>
            <p>User Account: <el-input v-model="newUserAcc" placeholder="Set a username" autosize /></p>
            <p>Password: <el-input v-model="newUserPwd" placeholder="Set a password" autosize /></p>
            <p>User's Name: <el-input v-model="newUserName" placeholder="Set a name" autosize /></p>
            <p>Email: <el-input v-model="newUserEmail" placeholder="Set an email add" autosize /></p>
            <el-button type="primary" @click.prevent="addUser()">Submit</el-button>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import { getOrderList, getAllOrder, getWriterList, changeWriterPwd, addWriter } from '@/api/table'
import store from '@/store'
import { count } from '@/utils/count'
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
      todoList: null,
      todoListLoading: true,
      completeList: null,
      completeListLoading: true,
      orderList: null,
      orderListLoading: true,
      wordCount: 0,
      avgMarks: 0,
      bonusCount: 0,
      showTable: false,
      selectedWriter: null,
      selectedMonth: null,
      writerList: null,
      pwdToChange: null,
      newUserAcc: null,
      newUserPwd: null,
      newUserEmail: null,
      newUserName: null,
      pageSize: 10,
      currentPage: 1,
      totalPage: 1,
      activeNames: ['1', '2']
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.currentPage = 1
    this.fetchData(0)
  },
  methods: {
    fetchWriterData(pageNum) {
      this.todolistLoading = true
      this.completeListLoading = false
      const data1 = { status: 1 }
      getOrderList(data1).then(response => {
        this.todoList = response.data.data
        this.todoListLoading = false
      })
    },
    fetchAdminData(pageNum) {
      this.orderListLoading = true
      const data = { page: pageNum }
      getAllOrder(data).then(response => {
        this.orderList = response.data.data
        this.currentPage = response.data.page + 1
        this.totalPage = response.data.total_page
        this.orderListLoading = false
      })
      getWriterList().then(response => {
        this.writerList = response.data
      })
    },
    fetchData(pageNum) {
      const role = store.getters.roles
      if (role[0] !== 'admin') {
        this.fetchWriterData(pageNum)
      } else {
        this.fetchAdminData(pageNum)
      }
    },
    goOrderDetail(order) {
      this.$router.push({ name: 'orderDetail', params: { order: order }})
    },
    downloadFile(file) {
      window.location.href = `http://192.168.0.100:8808/file/${file.id}`
    },
    submitWriter() {
      this.completeListLoading = true
      this.completeList = []
      const date = this.selectedMonth
      const data = {
        writer_id: this.selectedWriter,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        status: 2
      }
      getAllOrder(data).then(response => {
        this.completeList = response.data.data
        this.showTable = true
        this.completeListLoading = false
        const result = count(response.data.data)
        this.wordCount = result.countWord
        this.avgMarks = result.avgMarks
        this.bonusCount = result.countBonus
      })
    },
    submitMonth() {
      this.completeList = []
      this.completeListLoading = true
      const date = this.selectedMonth
      const data3 = { status: 2, year: date.getFullYear(), month: date.getMonth() + 1 }
      getOrderList(data3).then(response => {
        const result = count(response.data.data)
        this.wordCount = result.countWord
        this.avgMarks = result.avgMarks
        this.bonusCount = result.countBonus
        this.completeList = response.data.data
        this.completeListLoading = false
      })
    },
    changePwd() {
      const data = {
        password: this.pwdToChange
      }
      const id = this.selectedWriter
      changeWriterPwd(id, data).then(response => {
        this.$message({
          message: 'Change Succeed',
          type: 'success'
        })
      })
    },
    addUser() {
      const user = {
        username: this.newUserAcc,
        name: this.newUserName,
        email: this.newUserEmail,
        password: this.newUserPwd
      }
      addWriter(user).then(response => {
        this.$message({
          message: 'Adding new user succeed',
          type: 'success'
        })
      })
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.fetchData(pageNum - 1)
    }
  }
}
</script>
