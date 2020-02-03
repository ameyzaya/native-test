import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
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
        let list = [];
        let item = '';
        response.data.groups_details.map(obj => {
          item = (
            <List.Item
              key={obj.id}
              title={obj.title}
              description={`Students : ${obj.students_count}`}
              right={props => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => {
                this.goToDetail(obj.id);
              }}
            />
          );
          list.push(item);
        });
        this.setState({groupList: list, loading: false});
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  goToDetail = id => {
    this.props.navigation.navigate('Students', {groupId: id});
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
          {!this.state.loading && this.state.groupList}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
