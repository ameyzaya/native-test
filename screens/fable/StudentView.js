import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {List, ActivityIndicator, Text} from 'react-native-paper';
import {StudentList} from '../../api/organisation';

export default class OrganisationView extends React.Component {
  state = {
    studentList: [],
    loading: true,
  };

  componentDidMount() {
    this.getStudentList();
  }

  getStudentList = () => {
    id = this.props.navigation.getParam('groupId', '');
    StudentList({group__id: id})
      .then(response => {
        console.log(response.data);
        this.setState({studentList: response.data.results, loading: false});
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  getListItems = () => {
    let list = [];
    let item = '';
    this.state.studentList.map(obj => {
      item = (
        <List.Item
          key={obj.id}
          title={obj.user_detail.full_name}
          // right={props => <List.Icon {...props} icon="arrow-right" />}
        />
      );
      list.push(item);
    });
    return list;
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={{height: '100%'}}>
          {this.state.loading && (
            <ActivityIndicator
              animating={true}
              size={'large'}
              style={{padding: '10%'}}
            />
          )}
          {!this.state.loading && !this.state.studentList.length && (
            <Text style={{paddingTop: 25, paddingLeft: 25}}>
              No student present
            </Text>
          )}
          {!this.state.loading && this.getListItems()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
