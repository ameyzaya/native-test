import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Card,
  Text,
  Title,
  Paragraph,
  List,
  ActivityIndicator,
  Modal,
  Surface,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: 'teal',
    width: '100%',
    height: '100%',
  },
  modal: {
    height: '100%',
    width: '100%',
  },
  swiper: {},
});

function ImageCard({index, uri, path, handlePress}) {
  return (
    <TouchableOpacity
      onPress={() => {
        handlePress(index, uri);
      }}>
      <Card style={{width: '80%', alignSelf: 'center', marginBottom: 10}}>
        {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
        <Card.Cover source={{uri: uri}} />
        <Card.Content>
          <Paragraph>{path}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default class Uploader extends React.Component {
  state = {
    fileList: [],
    currentFilePath: '',
    currentFileIndex: 0,
    visible: false,
  };

  chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        // {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let list = this.state.fileList;
        list.push(response);
        this.setState({
          fileList: list,
        });
      }
    });
  };

  handlePress = (index, uri) => {
    this.setState({
      currentFileIndex: index,
      currentFilePath: uri,
      visible: true,
    });
  };

  _showModal = () => this.setState({visible: true});
  _hideModal = () => this.setState({visible: false});

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        {/* <Swiper style={styles.swiper} showsButtons={true}> */}
        <ScrollView style={{paddingTop: 15}}>
          {/* <Image
            source={{uri: this.state.filePath.uri}}
            style={{width: 50, height: 50}}
          /> */}
          <FlatList
            data={this.state.fileList}
            renderItem={({item, index}) => (
              <ImageCard
                index={index}
                uri={item.uri}
                path={item.path}
                handlePress={this.handlePress}
              />
            )}
            keyExtractor={item => item.path}
          />
        </ScrollView>
        {/* </Swiper> */}
        {!this.state.visible && (
          <Button
            mode="contained"
            style={{
              width: '40%',
              marginBottom: 20,
              marginTop: 10,
              alignSelf: 'center',
            }}
            onPress={() => this.chooseFile()}>
            Choose File
          </Button>
        )}
        <Modal
          visible={this.state.visible}
          onDismiss={this._hideModal}
          style={styles.modal}>
          <Image
            source={{uri: this.state.currentFilePath}}
            style={{width: '90%', height: '97.5%', alignSelf: 'center'}}
          />
        </Modal>
      </SafeAreaView>
    );
  }
}
