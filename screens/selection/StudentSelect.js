import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import {OrganisationDetail, StudentList} from '../../api/organisation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    backgroundColor: 'teal',
  },
  drop: {alignSelf: 'center', width: 200},
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
          item = {id: obj.id, value: obj.title};
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
          item = {id: obj.id, value: obj.user_detail.full_name};
          list.push(item);
        });
        this.setState({studentList: list});
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleGroupDropdown = (value, index, data) => {
    this.setState({
      groupId: data[index].id,
      groupVal: value,
      studentId: '',
      studentVal: '',
    });
    this.getStudents();
  };

  handleStudentDropdown = (value, index, data) => {
    this.setState({studentId: data[index].id, studentVal: value});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Dropdown
          label="Select Group*"
          data={this.state.groupList}
          value={this.state.groupVal}
          // error={touched.groupVal ? errors.groupVal : ''}
          baseColor={'white'}
          // selectedItemColor={'white'}
          // onBlur={() => setFieldTouched('groupVal')}
          onChangeText={(value, index, data) => {
            // values.groupVal = value;
            this.handleGroupDropdown(value, index, data);
          }}
          style={styles.drop}
        />
        <Dropdown
          label="Select Student*"
          data={this.state.studentList}
          value={this.state.studentVal}
          // error={touched.studentVal ? errors.studentVal : ''}
          baseColor={'white'}
          // selectedItemColor={'white'}
          // onBlur={() => setFieldTouched('studentVal')}
          onChangeText={(value, index, data) => {
            // values.studentVal = value;
            this.handleStudentDropdown(value, index, data);
          }}
          style={styles.drop}
        />
        <Button
          mode="contained"
          style={{width: '40%', alignSelf: 'center'}}
          onPress={() => this.props.navigation.navigate('PassageSelect')}>
          OK
        </Button>
      </SafeAreaView>
    );
  }
}
