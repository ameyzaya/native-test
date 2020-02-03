import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import {GradeList, PassageList} from '../../api/organisation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    backgroundColor: 'teal',
  },
  view: {
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    width: '75%',
    height: '100%',
  },
  drop: {alignSelf: 'center', width: 200},
});

export default class StudentSelect extends React.Component {
  state = {
    gradeList: [],
    passageList: [],
    gradeVal: '',
    passageVal: '',
    gradeId: '',
    passageId: '',
    loading: true,
  };

  componentDidMount() {
    this.getGrades();
  }

  getGrades = () => {
    GradeList()
      .then(response => {
        let list = [];
        let item = '';
        response.data.results.map(obj => {
          item = {id: obj.id, value: obj.title};
          list.push(item);
        });
        this.setState({gradeList: list});
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  getPassages = () => {
    PassageList({grade__id: this.state.gradeId})
      .then(response => {
        console.log(response);

        let list = [];
        let item = '';
        response.data.results.map(obj => {
          item = {id: obj.id, value: obj.passage_name};
          list.push(item);
        });
        this.setState({passageList: list});
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleGradeDropdown = (value, index, data) => {
    this.setState({
      gradeId: data[index].id,
      gradeVal: value,
      passageId: '',
      passageVal: '',
    });
    this.getPassages();
  };

  handlePassageDropdown = (value, index, data) => {
    this.setState({passageId: data[index].id, passageVal: value});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Dropdown
            label="Select Grade*"
            data={this.state.gradeList}
            value={this.state.gradeVal}
            // error={touched.groupVal ? errors.groupVal : ''}
            baseColor={'white'}
            // selectedItemColor={'white'}
            // onBlur={() => setFieldTouched('groupVal')}
            onChangeText={(value, index, data) => {
              // values.groupVal = value;
              this.handleGradeDropdown(value, index, data);
            }}
            style={styles.drop}
          />
          <Dropdown
            label="Select Passage*"
            data={this.state.passageList}
            value={this.state.passageVal}
            // error={touched.passageVal ? errors.passageVal : ''}
            baseColor={'white'}
            // selectedItemColor={'white'}
            // onBlur={() => setFieldTouched('passageVal')}
            onChangeText={(value, index, data) => {
              // values.passageVal = value;
              this.handlePassageDropdown(value, index, data);
            }}
            style={styles.drop}
          />
        </View>
      </SafeAreaView>
    );
  }
}
