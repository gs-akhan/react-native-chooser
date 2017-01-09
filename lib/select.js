import React, {Component} 	from "react";
import ReactNative  		from "react-native";
import OptionList    		from "./optionlist";
import Indicator    		from "./indicator";

var {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Modal,
	Dimensions
} = ReactNative;


const window = Dimensions.get('window');


class Select extends Component {
	constructor(props) {
	  super(props);

	  this.state = {modalVisible : false, defaultText : this.props.defaultText};
	}

	onSelect(label, value) {
		this.props.onSelect(value);
		this.setState({
			...this.state,
			modalVisible : false,
			defaultText : label
		});
	}


	render() {
		let {style, defaultText, textStyle, backdropStyle,
			optionListStyle, transparent, animationType,
			indicator, indicatorColor, indicatorSize, indicatorStyle} = this.props;

		return (
			<View style = {[styles.selectBox, style]}>

			<TouchableWithoutFeedback
					onPress = {this.onPress.bind(this)}
					>
					<View style={styles.selectBoxContent}>
						<Text style = {textStyle}>{this.state.defaultText}</Text>
						<Indicator direction={indicator} color={indicatorColor} size={indicatorSize} style={indicatorStyle} />
					</View>
				</TouchableWithoutFeedback>

				<Modal
							transparent={transparent}
							animationType={animationType}
		          visible={this.state.modalVisible}
		          >

				 <TouchableWithoutFeedback

				 	onPress ={this.onModalPress.bind(this)}>

					<View style={[styles.modalOverlay, backdropStyle]}>
			         	<OptionList onSelect = {this.onSelect.bind(this)}
			         		style = {[optionListStyle]}>
							 {this.props.children}
						</OptionList>
			        </View>
				 </TouchableWithoutFeedback>

		        </Modal>
			</View>
		);
	}
	/*
		Fired when user clicks the button
	 */
	onPress() {
		this.setState({
			...this.state,
			modalVisible : !this.state.modalVisible
		});
	}

	/*
	 Fires when user clicks on modal. primarily used to close
	 the select box
	 */

	onModalPress() {

		this.setState({
			...this.state,
			modalVisible : false
		});
	}
}

var styles = StyleSheet.create({
	selectBox : {
		borderWidth : 1,
		width  : 200,
		padding : 10,
		borderColor : "black"
	},
	selectBoxContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	modalOverlay : {
		flex : 1,
		justifyContent : "center",
		alignItems : "center",
		width: window.width,
    	height: window.height
	}
});


Select.propTypes = {
	style : View.propTypes.style,
	defaultText : React.PropTypes.string,
	onSelect : React.PropTypes.func,
	textStyle : Text.propTypes.style,
	backdropStyle : View.propTypes.style,
	optionListStyle : View.propTypes.style,
	indicator : React.PropTypes.string,
	indicatorColor : React.PropTypes.string,
	indicatorSize : React.PropTypes.number,
	indicatorStyle : View.propTypes.style
}

Select.defaultProps = {
  defaultText : "Click To Select",
  onSelect  : () => {},
	transparent : false,
	animationType : "none",
	indicator : "none",
	indicatorColor: "black",
	indicatorSize: 10
}
export default Select;
