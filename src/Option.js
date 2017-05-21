import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback
} from "react-native";

export default class Option extends Component {
	static propTypes = {
		style: View.propTypes.style,
		styleText: Text.propTypes.style,
		children: React.PropTypes.string.isRequired
	};

	render() {
    const { style, styleText} = this.props;
    return (
      <View style={[styles.item, style]}>
        <Text style = {[styles.optionText, styleText]}> {this.props.children} </Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
	item : {
		padding : 10,
	},
	optionText  : {
		fontSize : 14
	}
})
