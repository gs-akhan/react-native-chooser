import React, {Component} from "react";
import {
	StyleSheet,
	ScrollView,
	View,
	TouchableWithoutFeedback,
} from "react-native";

export default class OptionList extends Component {
	static defaultProps = {
	  onSelect: () => {}
	};
	static propTypes = {
		style: View.propTypes.style,
	 	onSelect : React.PropTypes.func,
	};

	render() {
		const {style, children, onSelect, selectedStyle, selected} = this.props;
		const renderedItems = React.Children.map(children, (item, key) =>
      <TouchableWithoutFeedback key={key} style={{borderWidth : 0}} onPress={() => onSelect(item.props.children, item.props.value) }>
        <View style = {[{borderWidth : 0}, (item.props.value === selected)? selectedStyle : null]}>
          {item}
        </View>
      </TouchableWithoutFeedback>
    )

		return (
			<View style = {[styles.scrollView, style]}>
				<ScrollView
					automaticallyAdjustContentInsets={false}
					bounces={false} >
				 {renderedItems}
				</ScrollView>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	scrollView : {
		height : 120,
		width  : 300,
		borderWidth : 1,
	}
});

