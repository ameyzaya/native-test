import React from 'react';
import {ScrollView} from 'react-native';
import {Button, List, ActivityIndicator} from 'react-native-paper';
import {IssueList} from '../api/issue';

export default class IssueListView extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerShown: false,
    };
  };

  state = {
    list: [],
    loading: true,
  };

  componentDidMount() {
    this.getIssues();
  }

  getIssues = () => {
    IssueList()
      .then(response => {
        console.log(response.data);
        let itemList = [];
        let item = '';
        response.data.map(obj => {
          item = (
            <List.Item
              key={obj.id}
              title={obj.title}
              description={obj.description}
              right={props => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => {
                this.goToDetail(obj.id);
              }}
            />
          );
          itemList.push(item);
        });
        this.setState({list: itemList, loading: false});
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  goToDetail = id => {
    console.log(id);
    this.props.navigation.navigate('Detail', {issueId: id});
  };

  render() {
    return (
      <ScrollView style={{height: '100%', backgroundColor: '#dfe6f1'}}>
        {this.state.loading && (
          <ActivityIndicator
            animating={true}
            size={'large'}
            style={{padding: '10%'}}
          />
        )}
        {this.state.list}
      </ScrollView>
    );
  }
}
