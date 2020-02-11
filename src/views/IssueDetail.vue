<template>
  <div class="container-detail">
    <div>
      <div class="header">{{issueObject.title}}</div>
      <div class="content">
        <div class="info-left">
          <div class="date">
            <span>Reported Date</span>
            <span>: {{moment(issueObject.created).utc().format('DD-MM-YYYY')}}</span>
          </div>
          <div class="date">
            <span>Last Updated Date</span>
            <span>: {{moment(issueObject.updated).utc().format('DD-MM-YYYY')}}</span>
          </div>
          <div class="dropdown">
            <span>Assigned to:</span>
            <a-select
              v-model="assignedTo"
              placeholder="Select User"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              @change="editAssignedTo"
            >
              <a-select-option v-for="item in userList" :key="item.user.id">{{item.user.full_name}}</a-select-option>
            </a-select>
          </div>
          <div class="dropdown">
            <span>Priority:</span>
            <a-select
              v-model="priority"
              placeholder="Select Priority"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              @change="editPriority"
            >
              <a-select-option v-for="item in priorityList" :key="item.id">{{item.title}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="info-right">
          <span
            style="font-weight:700; padding-top: 2px; padding-bottom: 2px;"
          >{{ issueObject.product_detail.name }}</span>
          <span style="padding-top: 2px;">Client Email: {{issueObject.client_email}}</span>
          <div class="dropdown">
            <span style="margin-top:7%; margin-right: 10%;">Status:</span>
            <a-select
              v-model="status"
              placeholder="Select Status"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              @change="editStatus"
            >
              <a-select-option v-for="item in statusList" :key="item.id">{{item.title}}</a-select-option>
            </a-select>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="issue-desc">
      <pre class="description">{{issueObject.description}}</pre>
      <div class="attach-div"></div>
    </div>
    <hr />
    <div class="comment-div">
      <div class="comment-head">
        <span style="margin-top: 1%;">Comments :</span>
        <a-button color="primary" @click="handleNewComment">New Comment</a-button>
      </div>
      <div class="comment-list">
        <div class="comment-content" :key="commentKey" v-for="comment in issueObject.comments">
          <div class="comment-top">
            <span style="font-weight: 700;">{{comment.employee_detail.user.full_name}}</span>
            <span>{{moment(comment.updated).utc().format('DD-MM-YYYY, hh:mm')}}</span>
          </div>
          <pre class="comment-description">{{comment.description}}</pre>
        </div>
      </div>
      <a-modal
        title="Add Comment"
        :visible="dialog"
        maskClosable="false"
        closable="false"
        max-width="60%"
      >
        <div class="modal-content">
          <div class="modal-text">{{commentText}}</div>
          <div>
            <a-textarea
              v-model="liveComment"
              size="large"
              placeholder="Comment"
              :autosize="{ minRows: 4, maxRows: 8 }"
              @change="commentError = ''"
            ></a-textarea>
            <div class="errors">
              <span>{{commentError}}</span>
            </div>
            <br />
            <div class="button-container">
              <a-button type="primary" @click="addComment">Submit</a-button>
            </div>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { IssueDetail, UpdateIssue } from "@/api/issue.js";
import { ProductList } from "@/api/product.js";
import { UserList } from "@/api/user.js";
import { PostComment } from "@/api/comment.js";
import moment from "moment";
// import { Button, Input, Select, Modal } from "ant-design-vue";

export default {
  name: "IssueDetail",
  props: ["issueId"],
  data: function() {
    return {
      issueObject: "",
      isLoading: false,
      assignedTo: "",
      userList: [],
      priority: "",
      priorityList: [
        { id: 1, title: "Low Priority" },
        { id: 2, title: "Medium Priority" },
        { id: 3, title: "High Priority" }
      ],
      status: "",
      statusList: [
        { id: 0, title: "Unassigned" },
        { id: 1, title: "Pending" },
        { id: 2, title: "In Progress" },
        { id: 3, title: "Resolved" },
        { id: 4, title: "Closed" }
      ],
      liveComment: "",
      commentEdit: false,
      commentError: "",
      dialog: false,
      commentKey: 0,
      commentText: ""
    };
  },
  created() {
    if (this.issueId && this.issueId.length) this.getIssue();
    this.getUserList();
  },
  methods: {
    moment: function() {
      return moment();
    },
    getIssue() {
      IssueDetail(this.issueId)
        .then(response => {
          console.log(response.data);
          this.issueObject = response.data;
          this.priority = response.data.priority;
          this.status = response.data.status;
          this.assignedTo = response.data.assigned_to;
          this.product = response.data.product;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUserList() {
      UserList()
        .then(response => {
          console.log(response);
          this.userList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleNewComment() {
      this.commentEdit = false;
      this.dialog = true;
    },
    addComment() {
      if (!this.liveComment.length) this.commentError = "*required";
      else {
        let payload = {
          description: this.liveComment,
          issue: this.issueId,
          // employee: this.currentUserId,
          employee: 1,
          status: this.status
        };
        PostComment(payload)
          .then(response => {
            this.getIssue();
            this.commentKey = this.commentKey + 1;
            this.dialog = false;
            this.commentText = "";
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    editAssignedTo(val) {
      let payload = { assigned_to: val };
      UpdateIssue(this.issueId, payload)
        .then(response => {
          console.log(response.data);
        })
        .error(error => {
          console.log(error);
        });
    },
    editStatus(val) {
      let payload = { status: val };
      this.forceComment();
      UpdateIssue(this.issueId, payload)
        .then(response => {
          console.log(response.data);
        })
        .error(error => {
          console.log(error);
        });
    },
    editPriority(val) {
      let payload = { priority: val };
      UpdateIssue(this.issueId, payload)
        .then(response => {
          console.log(response.data);
        })
        .error(error => {
          console.log(error);
        });
    },
    forceComment() {
      this.dialog = true;
      this.commentText = "comment is mandatory when status is changed!";
    }
  }
};
</script>

<style scoped>
.container-detail {
  display: flex;
  flex-direction: column;
  padding: 2%;
  width: 100%;
  background-color: white;
}
.header {
  display: flex;
  font-size: 22px;
  font-weight: 700;
  padding: 1% 0%;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.info-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 35%;
  width: 38%;
}
.date {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 2px;
  padding-bottom: 2px;
  width: 60%;
}
.dropdown {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.dropdown span {
  margin-top: 5%;
  margin-right: 10%;
}
.info-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 22%;
  width: 32%;
}
.issue-desc {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.description {
  padding: 2%;
}
.attach-div {
  display: flex;
  width: 100%;
}
.comment-div {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.comment-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 2% 0%;
}
.comment-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.comment-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.comment-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.6% 0%;
}
.comment-description {
  width: 70%;
  padding: 0.6% 0%;
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.modal-header {
  display: flex;
  justify-content: center;
  font-size: 18px;
}
.modal-text {
  display: flex;
  justify-content: center;
  /* width: 50%; */
}
.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 5%;
}
</style>