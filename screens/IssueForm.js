import React from 'react';
import {Text, View} from 'react-native';
import {Button, TextInput, Snackbar} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {PostIssue, ProductList} from '../api/issue';
import {Formik} from 'formik';
import * as yup from 'yup';

let validationSchema = yup.object().shape({
  title: yup
    .string()
    .label('Title')
    .required(),
  email: yup
    .string()
    .email()
    .label('Email')
    .required(),
  productVal: yup
    .string()
    .label('Product')
    .required(),
  priorityVal: yup
    .string()
    .label('Priority')
    .required(),
});

class IssueForm extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerShown: false,
    };
  };

  state = {
    productList: [],
    productId: '',
    priorityList: [
      {id: 1, value: 'Low Priority'},
      {id: 2, value: 'Medium Priority'},
      {id: 3, value: 'High Priority'},
    ],
    priorityId: '',
    snackbarVisible: false,
  };

  componentDidMount() {
    this.getProductList();
  }

  getProductList = () => {
    let list = [];
    ProductList().then(response => {
      response.data.map(obj => {
        list.push({id: obj.id, value: obj.name});
      });
      this.setState({productList: list});
    });
  };

  handleProductDropdown = (value, index, data) => {
    this.setState({productId: data[index].id});
  };

  handlePriorityDropdown = (value, index, data) => {
    this.setState({priorityId: data[index].id});
  };

  handleSubmit = (values, setSubmitting) => {
    console.log(values);
    let payload = {
      title: values.title,
      description: values.description,
      client_email: values.email,
      product: this.state.productId,
      priority: this.state.priorityId,
    };
    this.setState({
      snackbarVisible: true,
      snackbarText: 'Issue Submitted',
    });
    PostIssue(payload)
      .then(response => {
        console.log(response.data);
        this.setState({
          snackbarVisible: true,
          snackbarText: 'Issue Submitted',
        });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          snackbarVisible: true,
          snackbarText: 'Issue Submission Failed',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  render() {
    return (
      <Formik
        initialValues={{
          title: '',
          description: '',
          email: '',
          productVal: '',
          priorityVal: '',
        }}
        onSubmit={(values, {setSubmitting}) => {
          this.handleSubmit(values, setSubmitting);
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
          isSubmitting,
          setFieldTouched,
          touched,
        }) => (
          <KeyboardAwareScrollView
            style={{
              flex: 1,
              // backgroundColor: '#dfe6f1',
              backgroundColor: 'skyblue',
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                width: '80%',
                height: '100%',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  textDecorationLine: 'underline',
                  fontSize: 24,
                  marginTop: '5%',
                  color: 'white',
                }}>
                Issue Form
              </Text>
              <TextInput
                label="Issue Title*"
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={() => setFieldTouched('title')}
                dense={true}
                style={{marginTop: '10%'}}
              />
              {touched.title && (
                <Text style={{color: 'red'}}>{errors.title}</Text>
              )}
              <TextInput
                label="Issue Description"
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={() => setFieldTouched('description')}
                multiline={true}
                numberOfLines={3}
                dense={true}
                style={{marginTop: '10%'}}
              />
              <Dropdown
                label="Select Product*"
                data={this.state.productList}
                value={values.productVal}
                error={touched.productVal ? errors.productVal : ''}
                baseColor={'white'}
                // selectedItemColor={'white'}
                onBlur={() => setFieldTouched('productVal')}
                onChangeText={(value, index, data) => {
                  values.productVal = value;
                  this.handleProductDropdown(value, index, data);
                }}
              />
              <Dropdown
                label="Select Priority*"
                data={this.state.priorityList}
                value={values.priorityVal}
                error={touched.priorityVal ? errors.priorityVal : ''}
                baseColor={'white'}
                onBlur={() => setFieldTouched('priorityVal')}
                onChangeText={(value, index, data) => {
                  values.priorityVal = value;
                  this.handlePriorityDropdown(value, index, data);
                }}
              />
              <TextInput
                label="Email*"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                dense
                style={{marginTop: '10%'}}
              />
              {touched.email && (
                <Text style={{color: 'red'}}>{errors.email}</Text>
              )}
              <Text style={{marginTop: '15%'}}></Text>
              <Button
                mode="contained"
                style={{
                  width: '50%',
                  alignSelf: 'center',
                }}
                onPress={handleSubmit}
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}>
                Submit
              </Button>
              <Text style={{marginBottom: '15%'}}></Text>
              <Snackbar
                visible={this.state.snackbarVisible}
                duration={5000}
                onDismiss={() => this.setState({snackbarVisible: false})}
                action={{
                  label: 'Ok',
                  onPress: () => {
                    this.setState({snackbarVisible: false});
                  },
                }}>
                {this.state.snackbarText}
              </Snackbar>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    );
  }
}

export default IssueForm;
