import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import {OrganisationDetail, StudentList} from '../../api/organisation';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  view: {
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: '35%',
  },
  drop: {alignSelf: 'center', width: '75%'},
  error: {color: 'red', fontSize: 14, marginLeft: '15%', marginBottom: 10},
});

export default class StudentSelect extends React.Component {
  state = {
    orgId: '24f8ea8f-bee1-4a00-80b3-156aa1aa58e0',
    groupList: [],
    studentList: [],
    groupVal: '',
    studentVal: '',
    groupId: '',
    studentId: '',
    loading: true,
    errors: {
      group: '',
      student: '',
    },
    resetStudents: false,
  };

  componentDidMount() {
    this.getGroups();
  }

  getGroups = () => {
    OrganisationDetail(this.state.orgId)
      .then(response => {
        let list = [];
        let item = '';
        response.data.groups_details.map(obj => {
          item = {id: obj.id, name: obj.title};
          list.push(item);
        });
        this.setState({groupList: list});
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  getStudents = () => {
    StudentList({group__id: this.state.groupId})
      .then(response => {
        console.log(response);

        let list = [];
        let item = '';
        response.data.results.map(obj => {
          item = {id: obj.id, name: obj.user_detail.full_name};
          list.push(item);
        });
        this.setState({studentList: list});
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleGroupDropdown = item => {
    let err = this.state.errors;
    err.group = '';
    this.setState({
      groupId: item.id,
      groupVal: item.name,
      studentList: [],
      studentId: '',
      studentVal: '',
      errors: err,
    });
    this.getStudents();
  };

  handleStudentDropdown = item => {
    let err = this.state.errors;
    err.student = '';
    this.setState({studentId: item.id, studentVal: item.name, errors: err});
  };

  handleSubmit = () => {
    if (this.state.groupId.length && this.state.studentId.length)
      this.props.navigation.navigate('PassageSelect');
    else {
      let err = this.state.errors;
      if (!this.state.groupId.length) err.group = 'required';
      if (!this.state.studentId.length) err.student = 'required';
      this.setState({errors: err});
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <SearchableDropdown
            onTextChange={text => {}}
            onItemSelect={item => this.handleGroupDropdown(item)}
            containerStyle={{padding: 5}}
            textInputStyle={{
              ...styles.drop,
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#FAF7F6',
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#FAF9F8',
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              color: '#222',
            }}
            itemsContainerStyle={{
              ...styles.drop,
              maxHeight: '65%',
            }}
            items={this.state.groupList}
            placeholder="Select Group*"
            resetValue={false}
            underlineColorAndroid="transparent"
          />
          <Text style={styles.error}>
            {this.state.errors.group.length ? this.state.errors.group : ''}
          </Text>

          <SearchableDropdown
            key={this.state.groupId}
            onTextChange={text => {}}
            onItemSelect={item => this.handleStudentDropdown(item)}
            containerStyle={{padding: 5}}
            textInputStyle={{
              ...styles.drop,
              marginTop: 5,
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#FAF7F6',
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#FAF9F8',
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              color: '#222',
            }}
            itemsContainerStyle={{
              ...styles.drop,
              maxHeight: '65%',
            }}
            items={this.state.studentList}
            placeholder={
              this.state.groupId.length && this.state.studentList.length
                ? 'Select Student*'
                : 'No Student to select'
            }
            resetValue={this.state.resetStudents}
            underlineColorAndroid="transparent"
          />
          <Text style={styles.error}>
            {this.state.errors.student.length ? this.state.errors.student : ''}
          </Text>

          <Button
            mode="contained"
            style={{width: '40%', marginTop: '15%', alignSelf: 'center'}}
            onPress={() => this.handleSubmit()}>
            OK
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
