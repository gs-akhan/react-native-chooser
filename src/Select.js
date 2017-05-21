import React, {Component} 	from "react"
import {
	View,
	Text,
	Modal,
	Animated,
	Dimensions,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native"

import OptionList from "./Optionlist"
import Indicator from "./Indicator"

var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width

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
		indicatorStyle : View.propTypes.style,
		direction: 
	}

	state={
  	modalVisible : false, 
	  defaultText : this.props.defaultText, 
	  selected : this.props.selected,
	};

	selected = this.props.selected
  left = (this.props.direction == 'fromLeft')? new Animated.Value(-deviceWidth): null
  right = (this.props.direction == 'fromRight')? new Animated.Value(-deviceWidth): null
  top = (this.props.direction == 'fromTop')? new Animated.Value(-deviceHeight): null
  bottom = (this.props.direction == 'fromBottom')? new Animated.Value(-deviceHeight): null
	

	onSelect(label, value) {
		this.props.onSelect(value)
		this.setState({
			modalVisible : false,
			defaultText : label
		})
	}

	openModal = e => {
		this.setState({ modalVisible: true })
		switch(this.props.direction){
			case 'fromLeft': 
				Animated.timing(this.left, {toValue: 0, duration: 200}).start()
				break
			case 'fromRight': 
				Animated.timing(this.right, {toValue: 0}).start()
				break
			case 'fromTop': 
				Animated.timing(this.top, {toValue: 0}).start()
				break
			case 'fromBottom': 
				Animated.timing(this.bottom, {toValue: 0}).start()
				break
		}
	}

	closeModal = e => {
		switch(this.props.direction){
			case 'fromLeft': 
					Animated.timing(this.left, {toValue: -deviceWidth}).start()
					setTimeout( () => this.setState({ modalVisible: false }), 500)
				break
			case 'fromRight': 
				Animated.timing(this.right, {toValue: -deviceWidth}).start()
					setTimeout( () => this.setState({ modalVisible: false }), 500)
				break
			case 'fromTop': 
				Animated.timing(this.top, {toValue: -deviceHeight}).start()
					setTimeout( () => this.setState({ modalVisible: false }), 500)
				break
			case 'fromBottom': 
				Animated.timing(this.bottom, {toValue: -deviceHeight}).start()
					setTimeout( () => this.setState({ modalVisible: false }), 500)
				break
		}
	}

	render() {
		let {style, defaultText, textStyle, backdropStyle,
			optionListStyle, transparent, animationType,
			indicator, indicatorColor, indicatorSize, indicatorStyle, 
			selectedStyle, selected} = this.props

		return (
			<View>
				<TouchableWithoutFeedback onPress={this.openModal}>
				{
					(this.props.renderButton)?
					<View>
						{this.props.renderButton(this.state.defaultText)}
					</View>:
					<View style = {[styles.selectBox, style]}>
						<View style={styles.selectBoxContent}>
							<Text style = {textStyle}>{this.state.defaultText}</Text>
							<Indicator direction={indicator} color={indicatorColor} size={indicatorSize} style={indicatorStyle} />
						</View>
					</View>
				}
				</TouchableWithoutFeedback>

				<Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}
          >
					<Animated.View style={[styles.modal,{
						left: this.left,
						right: this.right,
						top: this.top,
						bottom: this.bottom,
					}]}>
						<TouchableWithoutFeedback onPress={this.closeModal}>
							<View style={[styles.modalOverlay, backdropStyle]}>
								<OptionList
								onSelect = {this.onSelect.bind(this)}
								selectedStyle = {selectedStyle}
								selected = {selected}
								style = {[optionListStyle]}
								>
									{this.props.children}
								</OptionList>
							</View>
						</TouchableWithoutFeedback>
					</Animated.View>
				</Modal>

			</View>
		)
	}

	setSelectedText(text){
		this.setState({
			defaultText: text
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
	},
	modal:{
		position: 'absolute',
		height: deviceHeight,
		width: deviceWidth,
	}
})
