import React, {Component} 	from "react"
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Modal,
	Dimensions
} from "react-native"

import OptionList from "./optionlist"
import Option from './option'
import Indicator from "./indicator"

const window = Dimensions.get('window')


export default class Select extends Component {
	static defaultProps = {
	  defaultText : "Click To Select",
	  onSelect  : () => {},
		transparent : false,
		animationType : "none",
		indicator : "none",
		indicatorColor: "black",
		indicatorSize: 10
	}
	static propTypes = {
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


	constructor(props) {
	  super(props)
	  this.state = {
	  	modalVisible : false
		}
	}

	getSelectedText() {
		if (this.props.selected) {
			for (const child of this.props.children) {
				if (child.type === Option && child.props.value === this.props.selected) {
				  return child.props.children
				}
			}
		}
		return this.props.defaultText
	}

	onSelect(label, value) {
		this.props.onSelect(value)
		this.setState({
			modalVisible : false
		})
	}

	onClose() {
		this.setState({
			modalVisible: false
		})
	}

	render() {
		const {style, textStyle, backdropStyle,
			optionListStyle, transparent, animationType,
			indicator, indicatorColor, indicatorSize, indicatorStyle, 
			selectedStyle, selected} = this.props
		const selectedText = this.getSelectedText()

		return (
			<View>
				<TouchableWithoutFeedback onPress = {this.onPress.bind(this)}>
					<View style = {[styles.selectBox, style]}>
						<View style={styles.selectBoxContent}>
							<Text style = {textStyle}>{selectedText}</Text>
							<Indicator direction={indicator} color={indicatorColor} size={indicatorSize} style={indicatorStyle} />
						</View>
					</View>
				</TouchableWithoutFeedback>

				<Modal
					transparent={transparent}
					animationType={animationType}
					visible={this.state.modalVisible}
					onRequestClose={this.onClose.bind(this)}
			  	>
				 <TouchableWithoutFeedback onPress ={this.onModalPress.bind(this)}>
					<View style={[styles.modalOverlay, backdropStyle]}>
						<OptionList
							onSelect = {this.onSelect.bind(this)}
							selectedStyle = {selectedStyle}
							selected = {selected}
							style = {[optionListStyle]}>
							{this.props.children}
						</OptionList>
					</View>
				 </TouchableWithoutFeedback>

				</Modal>
			</View>
		)
	}
	/*
		Fired when user clicks the button
	 */
	onPress() {
		this.setState({
			modalVisible : !this.state.modalVisible
		})
	}

	/*
	 Fires when user clicks on modal. primarily used to close
	 the select box
	 */

	onModalPress() {
		this.setState({
			modalVisible : false
		})
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
})
