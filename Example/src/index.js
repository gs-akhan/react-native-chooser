import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import {Select, Option} from "./react-native-chooser"

export default class Example extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          React Native Chooser
        </Text>
        <View style={styles.cooserContainer}>
          <Select
              onSelect = {this.onSelect}
              defaultText  = "Choose a name"
              style = {{borderWidth : 1, borderColor : "#d3d5d6"}}
              textStyle = {{}}
              backdropStyle  = {{backgroundColor : "#d3d5d6"}}
              optionListStyle = {{backgroundColor : "#F5FCFF"}}
              animationType={'fade'}
              transparent={false}
              direction={'fromLeft'}
              renderButton={ currentValue => <Text>{'Current Value: ' + currentValue}</Text> }
            >
            
            <Option value = {{name : "azhar"}}>Azhar</Option>
            <Option value = "johnceena">Johnceena</Option>
            <Option value = "undertaker">Undertaker</Option>
            <Option value = "Daniel">Daniel</Option>
            <Option value = "Roman">Roman</Option>
            <Option value = "Stonecold">Stonecold</Option>
            <Option value = "Rock">Rock</Option>
            <Option value = "Sheild">Sheild</Option>
            <Option value = "Orton">Orton</Option>

          </Select>
        </View>
      </View>
    );
  }

  onSelect = e => {
    console.log(e)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

