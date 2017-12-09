import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import {Select} from "react-native-chooser"

export default class Example extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          React Native Chooser
        </Text>

        <View style={styles.cooserContainer}>
          <Select
              onSelect={this.onSelect}
              defaultValue="Choose a name"
              direction={'fromLeft'}
              multiSelect={true}
              data={[
                {value: 'Motive', link: 'www.Motive.com'},
                {value: 'Presence', link: 'www.Presence.com'},
                {value: 'Bliss', link: 'www.Bliss.com'},
                {value: 'Heirloom', link: 'www.Heirloom.com'},
                {value: 'Utopia', link: 'www.Utopia.com'},
                {value: 'Corsair', link: 'www.Corsair.com'},
                {value: 'Mammoth', link: 'www.Mammoth.com'},
                {value: 'Warrior', link: 'www.Warrior.com'},
                {value: 'Scorpion', link: 'www.Scorpion.com'},
                {value: 'Corsair', link: 'www.Corsair.com'},
              ]}
            >
          </Select>

        </View>
      </View>
    );
  }
  onSelect = e => {
    console.log('Selected value(s) are:')
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

