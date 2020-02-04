import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Button, text} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import {GradeList, PassageList} from '../../api/organisation';
import SearchableDropdown from 'react-native-searchable-dropdown';

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
  drop: {alignSelf: 'center', width: '75%', marginTop: 10},
  error: {color: 'red', fontSize: 14, marginLeft: '15%', marginBottom: 10},
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
          item = {id: obj.id, name: obj.title};
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
          item = {id: obj.id, name: obj.passage_name};
          list.push(item);
        });
        this.setState({passageList: list});
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleGradeDropdown = item => {
    this.setState({
      gradeId: item.id,
      gradeVal: item.name,
      passageList: [],
      passageId: '',
      passageVal: '',
    });
    this.getPassages();
  };

  handlePassageDropdown = item => {
    this.setState({passageId: item.id, passageVal: item.name});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          {/* <Dropdown
            label="Select Grade*"
            data={this.state.gradeList}
            value={this.state.gradeVal}
            // error={touched.groupVal ? errors.groupVal : ''}
            // baseColor={'white'}
            // selectedItemColor={'white'}
            // onBlur={() => setFieldTouched('groupVal')}
            onChangeText={(value, index, data) => {
              // values.groupVal = value;
              this.handleGradeDropdown(value, index, data);
            }}
            style={styles.drop}
          /> */}

          <SearchableDropdown
            onTextChange={text => {}}
            onItemSelect={item => this.handleGradeDropdown(item)}
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
            items={this.state.gradeList}
            placeholder="Select Grade*"
            resetValue={false}
            underlineColorAndroid="transparent"
          />

          <SearchableDropdown
            key={this.state.gradeId}
            onTextChange={text => {}}
            onItemSelect={item => this.handlePassageDropdown(item)}
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
            items={this.state.passageList}
            placeholder="Select Passage*"
            resetValue={false}
            underlineColorAndroid="transparent"
          />

          {/* <Dropdown
            label="Select Passage*"
            data={this.state.passageList}
            value={this.state.passageVal}
            // error={touched.passageVal ? errors.passageVal : ''}
            // baseColor={'white'}
            // selectedItemColor={'white'}
            // onBlur={() => setFieldTouched('passageVal')}
            onChangeText={(value, index, data) => {
              // values.passageVal = value;
              this.handlePassageDropdown(value, index, data);
            }}
            style={styles.drop}
          /> */}
        </View>
      </SafeAreaView>
    );
  }
}
