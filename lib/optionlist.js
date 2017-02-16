import React, {Component} from "react";
import ReactNative from "react-native";

var {
	StyleSheet,
	ScrollView,
	View,
	TouchableWithoutFeedback

} = ReactNative;


class OptionList extends Component {


	render() {
		const {style, children, onSelect, selectedStyle, selected} = this.props;
		const renderedItems = React.Children.map(children, (item) => {
		  let selectedOptionStyle = item.props.value === selected ? selectedStyle : null; 

		  
	      return (
	        <TouchableWithoutFeedback style = {{borderWidth : 0}} onPress={() => onSelect(item.props.children, item.props.value) }>
	          <View style = {[{borderWidth : 0}, selectedOptionStyle]}>
	            {item}
	          </View>
	        </TouchableWithoutFeedback>
	      );
	    });


		
		return (
			<View style = {[styles.scrollView, style]}>
				<ScrollView
					automaticallyAdjustContentInsets={false}
	          		bounces={false}
					>
				 {renderedItems}				
				</ScrollView>
			</View>	
		);
	}

	
}


var styles = StyleSheet.create({
	scrollView : {
		height : 120,
		width  : 300,
		borderWidth : 1,
	}
});


OptionList.propTypes = {
	style: View.propTypes.style,
 	onSelect : React.PropTypes.func
}

OptionList.defaultProps = {
  onSelect: () => {}
}

export default OptionList;

