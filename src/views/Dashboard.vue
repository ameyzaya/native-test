<template>
  <div class="container-div">
    <div class="top-bar">
      <div class="top-title">
        <span class="top-header">ZayaDesk</span>
        <span class="top-header-info">Issue Management System</span>
      </div>
      <div class="top-search">
        <a-select
          showSearch
          v-model="issueSearchVal"
          placeholder="Search Issues"
          style="width: 100%; margin-top: 1%; margin-bottom: 0%;"
          size="large"
          :defaultActiveFirstOption="false"
          :showArrow="false"
          :filterOption="false"
          @search="searchIssue"
          :notFoundContent="isLoading ?  'Loading...' : 'No Data Found'"
        >
          <a-select-option v-for="item in issueList" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </div>
      <div style="flex: 1"></div>
      <div class="top-logout">
        <span style="text-decoration: underline; cursor: pointer" @click="handleLogout">Logout</span>
      </div>
    </div>
    <div class="content">
      <div class="left-panel">
        <div class="left-title">My Queue</div>
        <!-- <a-tree
          :treeData="issueFilters"
          defaultExpandAll
          @select="treeClick"
          style="padding-left: 5%; cursor: pointer;"
        />-->
      </div>
      <div class="main-panel">
        <div class="list-panel">
          <div class="order-div">
            <a-select
              v-model="orderOption"
              placeholder="Sort by"
              :defaultActiveFirstOption="false"
              style="width: 40%; margin-bottom: 2%;"
              @change="orderIssueList"
            >
              <a-icon slot="suffixIcon" type="filter" />
              <a-select-option v-for="item in orderOptionList" :key="item.id">{{item.text}}</a-select-option>
            </a-select>
          </div>
          <div class="issue-list">
            <div v-for="issue in issueList" :key="issue.id" class="issue-item">
              <div
                v-if="issue.id === activeIssueId"
                class="issue-card issue-active"
                @click="loadIssue(issue.id)"
              >
                <div class="issue-head">
                  <span>{{issue.title}}</span>
                  <span>{{moment(issue.created).utc().format('DD-MM-YYYY')}}</span>
                </div>
                <div class="issue-description">{{issue.description}}</div>
              </div>
              <div v-else class="issue-card" @click="loadIssue(issue.id)">
                <div class="issue-head">
                  <span>{{issue.title}}</span>
                  <span>{{moment(issue.created).utc().format('DD-MM-YYYY')}}</span>
                </div>
                <div class="issue-description">{{issue.description}}</div>
              </div>
            </div>
          </div>
        </div>
        <IssueDetail
          v-if="activeIssueId.length"
          class="detail-panel"
          :key="activeIssueId"
          :issueId="activeIssueId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { IssueList } from "@/api/issue.js";
import IssueDetail from "@/views/IssueDetail.vue";
import moment from "moment";
// import { Select, Tree } from "ant-design-vue";

export default {
  name: "Dashboard",
  components: {
    IssueDetail
  },
  data: function() {
    return {
      issueSearchVal: "",
      isLoading: false,
      loading: false,
      issueList: [],
      activeFilter: [],
      orderOption: "-created",
      orderOptionList: [
        { id: "created", text: "Reported Date" },
        { id: "-created", text: "Reported Date Descinding" },
        { id: "-updated", text: "Last Updated" },
        { id: "title", text: "Product Name" }
      ],
      activeIssueId: ""
    };
  },
  created() {
    // this.loading = true;
    // if (
    //   !localStorage.getItem("ACCESS_TOKEN") ||
    //   !localStorage.getItem("ACCESS_TOKEN").length
    // )
    //   this.$router.push({ name: "Login" });
    // this.getIssueList();
  },
  computed: {
    issueFilters() {
      let issueObj = this.issueList[0];
      return [
        {
          key: 1,
          title: `Unassigned (${issueObj.unassigned_all.all})`,
          children: [
            {
              key: 2,
              title: `High Priority (${issueObj.unassigned_all.count_high})`
            },
            {
              key: 3,
              title: `Medium Priority (${issueObj.unassigned_all.count_med})`
            },
            {
              key: 4,
              title: `Low Priority (${issueObj.unassigned_all.count_low})`
            }
          ]
        },
        {
          key: 5,
          title: `Pending (${issueObj.pending_all.all})`,
          children: [
            {
              key: 6,
              title: `High Priority (${issueObj.pending_all.count_high})`
            },
            {
              key: 7,
              title: `Medium Priority (${issueObj.pending_all.count_med})`
            },
            {
              key: 8,
              title: `Low Priority (${issueObj.pending_all.count_low})`
            }
          ]
        },
        {
          key: 9,
          title: `In progress (${issueObj.inprogress_all.all})`,
          children: [
            {
              key: 10,
              title: `High Priority (${issueObj.inprogress_all.count_high})`
            },
            {
              key: 11,
              title: `Medium Priority (${issueObj.inprogress_all.count_med})`
            },
            {
              key: 12,
              title: `Low Priority (${issueObj.inprogress_all.count_low})`
            }
          ]
        },
        {
          key: 13,
          title: `Resolved (${issueObj.resolved_all.all})`,
          children: [
            {
              key: 14,
              title: `High Priority (${issueObj.resolved_all.count_high})`
            },
            {
              key: 15,
              title: `Medium Priority (${issueObj.resolved_all.count_med})`
            },
            {
              key: 16,
              title: `Low Priority (${issueObj.resolved_all.count_low})`
            }
          ]
        },
        {
          key: 17,
          title: `Closed (${issueObj.closed_all.all})`,
          children: [
            {
              key: 18,
              title: `High Priority (${issueObj.closed_all.count_high})`
            },
            {
              key: 19,
              title: `Medium Priority (${issueObj.closed_all.count_med})`
            },
            {
              key: 20,
              title: `Low Priority (${issueObj.closed_all.count_low})`
            }
          ]
        }
      ];
    }
  },
  methods: {
    searchIssue(val = "") {},
    moment: function() {
      return moment();
    },
    getIssueList(params = {}) {
      this.loading = true;
      let ordering = { ordering: this.orderOption };
      IssueList({ ...params, ...ordering })
        .then(response => {
          console.log(response);
          this.issueList = response.data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadIssue(id) {
      this.activeIssueId = id;
    },
    handleLogout() {
      localStorage.removeItem("YourItem");
      this.$router.push({ name: "Login" });
    },
    treeClick(val) {
      let value = val[0] - 1;
      const category = Math.floor(value / 4);
      const subCategory = value % 4;
      let params = { status: category };
      if (subCategory !== 0) params["priority"] = subCategory;
      this.getIssueList(params);
    },
    orderIssueList(val) {
      this.getIssueList();
      console.log(val);
    }
  }
};
</script>

<style scoped>
.container-div {
  width: 100vw;
  height: 100vh;
  margin: 0px;
  /* background-color: white; */
  background-color: #fafafa;
  /* overflow: auto; */
}
.top-bar {
  display: flex;
  flex-direction: row;
  /* width: 100%; */
  background-color: #4fc3f7;
  color: white;
  padding-top: 1%;
  height: 9.5vh;
}
.top-title {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-self: start;
  margin-left: 5%;
}
.top-header {
  font-size: 24px;
  font-weight: 700;
}
.top-header-info {
  font-size: 18px;
}
.top-search {
  display: flex;
  flex: 2;
  height: fit-content;
  /* justify-self: center; */
}
.top-logout {
  display: flex;
  justify-content: center;
  flex: 1;
  font-size: 20px;
  padding-top: 1%;
}
.content {
  display: flex;
  width: 100%;
  height: 90vh;
  padding-top: 2%;
}
.left-panel {
  display: fex;
  flex-direction: column;
  width: 15%;
  border-right: 1px solid lightgray;
}
.left-title {
  display: flex;
  font-size: 22px;
  font-weight: 700;
  color: #4fc3f7;
  padding-left: 15%;
  padding-bottom: 5%;
}
.main-panel {
  display: flex;
  flex-direction: row;
  width: 85%;
  border: 1px solid lightgray;
}
.list-panel {
  display: flex;
  flex-direction: column;
  width: 35%;
  border-right: 1px solid lightgray;
}
.order-div {
  display: flex;
  /* flex-direction: row; */
  justify-content: flex-end;
  width: 100%;
  padding-top: 2%;
  padding-right: 5%;
  border-bottom: 1px solid lightgray;
}
.ordering {
  width: fit-content;
}
.issue-list {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow-y: auto;
}
.issue-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4%;
  border-bottom: 1px solid lightgray;
}
.issue-active {
  border-left: 5px solid #1eabec;
}
.issue-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 700;
  padding-top: 2%;
  padding-bottom: 2%;
}
.issue-description {
  padding-bottom: 2%;
}
.detail-panel {
  width: 65%;
  overflow-y: auto;
}
</style>