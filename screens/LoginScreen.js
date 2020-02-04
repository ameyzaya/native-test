import React from 'react';
import {Text, View, AsyncStorage, SafeAreaView} from 'react-native';
import {
  Button,
  TextInput,
  Checkbox,
  Snackbar,
  ActivityIndicator,
} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Login} from '../api/auth';
import {NavigationActions, StackActions} from 'react-navigation';

// let yup = require('yup');

let validationSchema = yup.object().shape({
  username: yup
    .string()
    .label('Username')
    .required(),
  password: yup
    .string()
    .label('Password')
    .required(),
});

const flexBody = {flex: 1};

class LoginScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerShown: false,
    };
  };

  state = {
    // username: '',
    // password: '',
    rememberMe: false,
    snackbarVisible: false,
    loading: false,
  };

  componentDidMount() {
    // this.retrieveToken();
  }

  storeToken = async key => {
    try {
      await AsyncStorage.setItem('ACCESS_TOKEN', key);
    } catch (error) {
      console.log('Token not saved');
    }
  };

  // retrieveToken = async () => {
  //   await AsyncStorage.getItem('ACCESS_TOKEN', (err, result) => {
  //     if (result && result !== null) {
  //       // this.props.navigation.navigate('Home');
  //       this.resetStack();
  //     }
  //     setTimeout(() => {
  //       this.setState({loading: false});
  //     }, 1000);
  //   });
  // };

  handleSubmit = (values, setSubmitting) => {
    console.log(values.username, values.password);
    let payload = {
      username: values.username,
      password: values.password,
    };
    Login(payload)
      .then(response => {
        this.storeToken(response.data.key);
        // this.props.navigation.navigate('Home');
        this.resetStack();
      })
      .catch(error => {
        console.log(error.response);
        this.setState({snackbarVisible: true});
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  resetStack = () => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({routeName: 'Home'})],
    });
    this.props.navigation.dispatch(resetAction);
  };

  handleCheck = () => {
    this.setState({rememberMe: !this.state.rememberMe});
  };

  render() {
    return (
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={(values, {setSubmitting}) =>
          this.handleSubmit(values, setSubmitting)
        }
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          isValid,
          isSubmitting,
          setFieldTouched,
          touched,
        }) => (
          <View
            style={{
              ...flexBody,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Snackbar
              visible={this.state.snackbarVisible}
              onDismiss={() => this.setState({snackbarVisible: false})}
              style={{}}
              action={{
                label: 'Ok',
                onPress: () => {
                  this.setState({snackbarVisible: false});
                },
              }}>
              Invalid Credentials.
            </Snackbar>
            {this.state.loading && (
              <ActivityIndicator animating={true} style={{marginTop: 50}} />
            )}
            {!this.state.loading && (
              <View style={{width: '60%'}}>
                <TextInput
                  label="Username"
                  onChangeText={handleChange('username')}
                  onBlur={() => setFieldTouched('username')}
                  value={values.username}
                />
                {touched.username && (
                  <Text style={{color: 'red'}}>{errors.username}</Text>
                )}

                <TextInput
                  label="Password"
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  value={values.password}
                  style={{marginTop: '10%'}}
                />
                {touched.password && (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                )}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'baseline',
                  }}>
                  <Checkbox
                    status={this.state.rememberMe ? 'checked' : 'unchecked'}
                    onPress={this.handleCheck}
                  />
                  <Text style={{marginTop: '0%'}}>Remember Me</Text>
                </View>
                <Button
                  mode="contained"
                  style={{
                    marginTop: '20%',
                    width: '50%',
                    alignSelf: 'center',
                  }}
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={!isValid || isSubmitting}>
                  Submit
                </Button>
              </View>
            )}
          </View>
        )}
      </Formik>
    );
  }
}

export default LoginScreen;
