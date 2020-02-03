import React from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import {Button, TextInput, Checkbox, Snackbar} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Login} from '../api/auth';

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
  };

  storeToken = async key => {
    try {
      console.log(key);
      await AsyncStorage.setItem('ACCESS_TOKEN', key);
    } catch (error) {
      console.log('Token not saved');
    }

    await AsyncStorage.getItem('ACCESS_TOKEN', (err, result) => {
      if (result) {
        console.log('checker token', result);
      }
    });
  };

  handleSubmit = (values, setSubmitting) => {
    console.log(values.username, values.password);
    let payload = {
      username: values.username,
      password: values.password,
    };
    Login(payload)
      .then(response => {
        this.storeToken(response.data.key);
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error.response);
        this.setState({snackbarVisible: true});
      })
      .finally(() => {
        setSubmitting(false);
      });
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
                style={{marginTop: '20%', width: '50%', alignSelf: 'center'}}
                onPress={handleSubmit}
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}>
                Submit
              </Button>
              <Snackbar
                visible={this.state.snackbarVisible}
                onDismiss={() => this.setState({snackbarVisible: false})}
                action={{
                  label: 'Ok',
                  onPress: () => {
                    this.setState({snackbarVisible: false});
                  },
                }}>
                Invalid Credentials.
              </Snackbar>
            </View>
          </View>
        )}
      </Formik>
    );
  }
}

export default LoginScreen;
