import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  ViewPropTypes
} from "react-native";

export default class Option extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    styleText: Text.propTypes.style,
    children: PropTypes.string.isRequired
  };

  render() {
    const { style, styleText } = this.props;
    return (
      <View style={[styles.item, style]}>
        <Text style={[styles.optionText, styleText]}>
          {" "}{this.props.children}{" "}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  item: {
    padding: 10
  },
  optionText: {
    fontSize: 14
  }
});
