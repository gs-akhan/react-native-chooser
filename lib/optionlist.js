import React, {Component} from "react";
import {
	StyleSheet,
	FlatList,
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
		const keyExtractor = (item, index) => index;
		const renderItem = ({item}) => (
			<TouchableWithoutFeedback style={{borderWidth : 0}} onPress={() => onSelect(item.props.children, item.props.value) }>
				<View style = {[{borderWidth : 0}, (item.props.value === selected)? selectedStyle : null]}>
					{item}
				</View>
			</TouchableWithoutFeedback>
		)

		return (
			<View style = {[styles.scrollView, style]}>
				<FlatList
					data={this.props.children}
					keyExtractor={keyExtractor}
					renderItem={renderItem} 
				/>
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

