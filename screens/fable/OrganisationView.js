import React from 'react';
import {SafeAreaView, ScrollView, RefreshControl} from 'react-native';
import {List, Colors, ActivityIndicator} from 'react-native-paper';
import {OrganisationList} from '../../api/organisation';

export default class OrganisationView extends React.Component {
  state = {
    orgList: [],
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.getOrganisationList();
  }

  getOrganisationList = () => {
    OrganisationList()
      .then(response => {
        console.log(response.data);
        this.setState({orgList: response.data.results, loading: false});
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  getListItems = () => {
    let list = [];
    let item = '';
    this.state.orgList.map(obj => {
      item = (
        <List.Item
          key={obj.id}
          title={obj.title}
          description={`Students : ${obj.students_count}`}
          right={props => (
            <List.Icon color={Colors.blue500} icon="arrow-right" />
          )}
          onPress={() => {
            this.goToDetail(obj.id);
          }}
        />
      );
      list.push(item);
    });
    return list;
  };

  goToDetail = id => {
    this.props.navigation.navigate('Groups', {organisationId: id});
  };

  onRefresh = () => {
    this.setState({refreshing: true, orgList: []});
    this.getOrganisationList();
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 2000);
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView
          style={{backgroundColor: 'lavender', height: '100%'}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
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
