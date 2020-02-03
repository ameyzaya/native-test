import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Button, List, Text, ActivityIndicator} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import {IssueDetail, UserList, PatchIssue} from '../api/issue';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    padding: '10%',
    width: '100%',
    backgroundColor: '#dfe6f1',
  },
});

export default class IssueDetailView extends React.Component {
  state = {
    loading: true,
    issue: '',
    priorityList: [
      {id: 1, value: 'Low Priority'},
      {id: 2, value: 'Medium Priority'},
      {id: 3, value: 'High Priority'},
    ],
    priorityVal: '',
    statusList: [
      {id: 0, value: 'Unassigned'},
      {id: 1, value: 'Pending'},
      {id: 2, value: 'In Progress'},
      {id: 3, value: 'Done'},
      {id: 4, value: 'Resolved'},
    ],
    statusVal: '',
    assignedToVal: '',
    userList: [],
  };

  componentDidMount() {
    id = this.props.navigation.getParam('issueId', '');
    this.getIssue(id);
    this.getUserList();
  }

  getIssue = id => {
    IssueDetail(id)
      .then(response => {
        console.log(response.data);
        this.setState({issue: response.data, loading: false});
        this.getPriority(response.data.priority);
        this.getStatus(response.data.status);
        if (response.data.assigned_to)
          this.getAssigned(response.data.assigned_to);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getUserList = () => {
    UserList()
      .then(response => {
        console.log(response);
        let list = [];
        response.data.map(obj => {
          list.push({id: obj.user.id, value: obj.user.full_name});
        });
        this.setState({userList: list});
      })
      .catch(error => {
        console.log(error);
      });
  };

  getPriority = id => {
    for (let obj of this.state.priorityList) {
      if (obj.id === id) {
        this.setState({priorityVal: obj.value});
        break;
      }
    }
  };

  getStatus = id => {
    for (let obj of this.state.statusList) {
      if (obj.id === id) {
        this.setState({statusVal: obj.value});
        break;
      }
    }
  };

  getAssigned = id => {
    for (let obj of this.state.userList) {
      if (obj.id === id) {
        obj.value;
        this.setState({assignedToVal: obj.value});
        break;
      }
    }
  };

  handleAssignedDropdown = (value, index, data) => {
    this.setState({priorityVal: value});
    let payload = {
      priority: data[index].id,
    };
    PatchIssue(this.state.issue.id, payload)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    let {
      title,
      description,
      priority,
      client_email,
      created,
      product_detail,
    } = this.state.issue;
    return (
      <ScrollView style={styles.container}>
        {this.state.loading && (
          <ActivityIndicator animating={true} size={'large'} />
        )}
        {!this.state.loading && (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>{title}</Text>
            <Text style={{marginTop: '5%'}}>{description}</Text>
            <Text style={{marginTop: '5%'}}>
              Product: {product_detail.name}
            </Text>
            <Text style={{marginTop: '5%'}}>email : {client_email}</Text>
            <Text style={{marginTop: '5%'}}>
              date :{' '}
              {moment(created)
                .utc()
                .format('DD-MM-YYYY')}
            </Text>
            <Dropdown
              label="Priority"
              data={this.state.priorityList}
              value={this.state.priorityVal}
              onChangeText={(value, index, data) => {
                this.setState({priorityVal: value});
              }}
            />
            <Dropdown
              label="Status"
              data={this.state.statusList}
              value={this.state.statusVal}
              onChangeText={(value, index, data) => {
                this.setState({statusVal: value});
              }}
            />
            {!!this.state.userList.length && (
              <Dropdown
                label="Assigned To"
                data={this.state.userList}
                value={this.state.assignedToVal}
                onChangeText={(value, index, data) => {
                  this.handleAssignedDropdown(value, index, data);
                }}
              />
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}
