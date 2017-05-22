import React 	from 'react'
import {
	View,
	Text,
	Modal,
	Animated,
	Dimensions,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback,
} from 'react-native'

import PropTypes from 'prop-types'

var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width

export default class Select extends React.PureComponent {

	/**
	 * Type Checking
	 */
	static propTypes = {
		defaultValue : PropTypes.string,
		onSelect : PropTypes.func,
		indicator : PropTypes.string,
		indicatorColor : PropTypes.string,
		indicatorSize : PropTypes.number,
		indicatorStyle : PropTypes.object,
		backgroundStyle : PropTypes.object,
		
		//Animation
		direction: PropTypes.string,
		duration: PropTypes.number,
		
		//Elements
		renderButton: PropTypes.element,
		renderOptionItem: PropTypes.element,
	};

	/**
	 * Default props as always
	 */
	static defaultProps = {
	  defaultValue : 'Click To Select',
	  onSelect  : () => {},
		indicator : 'none',
		indicatorColor: 'black',
		indicatorSize: 10,
		direction: 'fromBottom',
		duration: 200,
	};


	/**
	 * Settings state..
	 */
	state = {
  	modalVisible: false, 
	  selectedValue: this.props.defaultValue,
	  selected: {},
	};


	/**
	 * Animated libs
	 */
  left = (this.props.direction == 'fromLeft')? new Animated.Value(-deviceWidth): null
  right = (this.props.direction == 'fromRight')? new Animated.Value(-deviceWidth): null
  top = (this.props.direction == 'fromTop')? new Animated.Value(-deviceHeight): null
  bottom = (this.props.direction == 'fromBottom')? new Animated.Value(-deviceHeight): null
	

  /**
   * Open select
   */
	openModal = e => {
		this.setState({ modalVisible: true })
		this._animateIn(this.props.direction)
	}

  /**
   * Close select
   */
	closeModal = e => {
		this._animateOut(this.props.direction)
		setTimeout( () => this.setState({ modalVisible: false }), this.props.duration)
	}

	/**
	 * Internal animation function to transition out
	 * @param  {string} direction [Should be one of following: fromLeft, fromRight, fromTop, fromBottom]
	 */
	_animateIn(direction){
		switch(direction){
			case 'fromLeft': 
				Animated.timing(this.left, {toValue: 0, duration: this.props.duration}).start()
				break
			case 'fromRight': 
				Animated.timing(this.right, {toValue: 0, duration: this.props.duration}).start()
				break
			case 'fromTop': 
				Animated.timing(this.top, {toValue: 0, duration: this.props.duration}).start()
				break
			case 'fromBottom': 
				Animated.timing(this.bottom, {toValue: 0, duration: this.props.duration}).start()
				break
		}
	}

	/**
	 * Internal animation function to transition in
	 * @param  {string} direction [Should be one of following: fromLeft, fromRight, fromTop, fromBottom]
	 */
	_animateOut(direction){
		return new Promise( (resolve, reject) => {
			switch(direction){
				case 'fromLeft': 
					Animated.timing(this.left, {toValue: -deviceWidth, duration: this.props.duration}).start(resolve())
					break
				case 'fromRight': 
					Animated.timing(this.right, {toValue: -deviceWidth, duration: this.props.duration}).start(resolve())
					break
				case 'fromTop': 
					Animated.timing(this.top, {toValue: -deviceHeight, duration: this.props.duration}).start(resolve())
					break
				case 'fromBottom': 
					Animated.timing(this.bottom, {toValue: -deviceHeight, duration: this.props.duration}).start(resolve())
					break
			}
		})
	}


	/**
	 * Option is pressed
	 * @param  {integer} index [integer that defines what data[index] that has the option]
	 */
	_optionPress(index){
		// Todo add multiple options

		let pressedVal = this.props.data[index]
		if (pressedVal.value !== undefined) 
			this.setState({selectedValue: pressedVal.value})
		this.setState({selected: pressedVal})
		this.props.onSelect(pressedVal)
		this.closeModal()
	}

	/**
	 * Yet another render function
	 */
	render() {
		let {
			backgroundStyle,
			indicator, 
			indicatorColor, 
			indicatorSize, 
			indicatorStyle 
		} = this.props


		let items = []
		this.props.data.forEach( (item, index) => {
			if (this.props.renderOptionItem){
				items.push(
					<TouchableWithoutFeedback onPress={e => this._optionPress(index)} key={index}>
						{this.props.renderOptionItem(item, index)}
					</TouchableWithoutFeedback>
				)
			}else{
				items.push(
					<TouchableWithoutFeedback onPress={e => this._optionPress(index)} key={index}>
			      <View style={styles.optionItem} key={index}>
			        <Text style={styles.optionText}>{item.value}</Text>
			      </View>
					</TouchableWithoutFeedback>
		    )
			}
		})

		let OptionList = React.cloneElement(
			<ScrollView/>,
			{
				bounces: false,
				automaticallyAdjustContentInsets: false,
				style: [
					{
						height: 120,
						width: 300,
						borderWidth: 1,
						borderColor: 'grey',
						backgroundColor: 'white',
					},
					this.props.style
				],
			},
			items
		)

		return (
			<View>
				<TouchableWithoutFeedback onPress={this.openModal}>
					{
						(React.isValidElement(this.props.renderButton))?
						<View>
							{this.props.renderButton(this.state.selectedValue)}
						</View>:
						<View style = {[styles.selectBox]}>
							<View style={styles.selectBoxContent}>
								<Text>{this.state.selectedValue}</Text>
							</View>
						</View>
					}
				</TouchableWithoutFeedback>

				<Modal
          animationType={'none'}
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
							<View style={[styles.modalOverlay, backgroundStyle]}>
								<View style={{height: 200}}>
									{OptionList}
								</View>
							</View>
						</TouchableWithoutFeedback>
					</Animated.View>
				</Modal>

			</View>
		)
	}

	/**
	 * Reset selected
	 */
	reset(){
		this.setState({
			selectedValue: pressedVal.value,
			selected: pressedVal,
		})
	}

	/**
	 * Return selected object to the user
	 */
	getSelected(){
		return this.state.selected
	}

	/**
	 * Return selected value string to the user
	 */
	getSelectedValue(){
		return this.state.selectedValue
	}

	/**
	 * Manually set the selected state
	 * @param {object} object Object that the Select should have in memory
	 * @param {val} string String that should be placed into the selected value box
	 */
	setSelected(object, val){
		if (typeof object == Object) {
			console.log('ReactNativeChooser: Please pass correct object .setSelected(object, value)')
			return false
		}
		if (val.length == 0) {
			console.log('ReactNativeChooser: Please pass correct value .setSelected(object, value)')
			return false
		}
		this.setState({
			selected: object,
			selectedValue: val,
		})
		return true
	}
}


var styles = StyleSheet.create({
	selectBox:{
		borderWidth: 1,
		width: 200,
		padding: 10,
		borderColor : 'black'
	},
	selectBoxContent:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	modalOverlay:{
		flex : 1,
		justifyContent : 'center',
		alignItems : 'center',
	},
	modal:{
		position: 'absolute',
		height: deviceHeight,
		width: deviceWidth,
	},

	//OptionItems
	optionItem:{
		padding: 10,
	},
	optionText:{
		fontSize: 14
	}
})
