import React from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {List, ActivityIndicator} from 'react-native-paper';
import {OrganisationDetail} from '../../api/organisation';

export default class GroupView extends React.Component {
  state = {
    groupList: [],
    loading: true,
  };

  componentDidMount() {
    this.getGroupList();
  }

  getGroupList = () => {
    id = this.props.navigation.getParam('organisationId', '');
    OrganisationDetail(id)
      .then(response => {
        console.log(response.data);
        this.setState({
          groupList: response.data.groups_details,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  getListItems = () => {
    let list = [];
    let item = '';
    this.state.groupList.map(obj => {
      item = (
        <TouchableOpacity
          onPress={() => {
            this.goToDetail(obj.id);
          }}>
          <List.Item
            key={obj.id}
            title={obj.title}
            description={`Students : ${obj.students_count}`}
            right={props => <List.Icon color="blue" icon="arrow-right" />}
          />
        </TouchableOpacity>
      );
      list.push(item);
    });
    return list;
  };

  goToDetail = id => {
    this.props.navigation.navigate('Students', {groupId: id});
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
          {!this.state.loading && this.getListItems()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
