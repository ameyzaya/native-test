import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {List, ActivityIndicator} from 'react-native-paper';
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
        let list = [];
        let item = '';
        response.data.results.map(obj => {
          item = (
            <List.Item
              key={obj.id}
              title={obj.user_detail.full_name}
              right={props => <List.Icon {...props} icon="arrow-right" />}
            />
          );
          list.push(item);
        });
        this.setState({studentList: list, loading: false});
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={{backgroundColor: 'lavender', height: '100%'}}>
          {this.state.loading && (
            <ActivityIndicator
              animating={true}
              size={'large'}
              style={{padding: '10%'}}
            />
          )}
          {!this.state.loading && this.state.studentList}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
