import React 	          from "react";
import ReactNative  		from "react-native";

var {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Modal,
	Dimensions
} = ReactNative;

const Indicator = function({
  direction,
  size,
  color,
  style
}) {
  const styles = getStyles(size, color)

  if (direction === 'up') {
    return (
      <View style={[styles.triangle, style]} />
    );
  }
  else if (direction === 'down') {
    return (
      <View style={[styles.triangle, styles.triangleDown, style]} />
    );
  }

  return null
}

const getStyles = function(size, color) {
  return StyleSheet.create({
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: size / 2,
      borderRightWidth: size / 2,
      borderBottomWidth: size,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color
    },
    triangleDown: {
      transform: [
        {rotate: '180deg'}
      ]
    }
  });
}

Indicator.propTypes = {
  direction : React.PropTypes.string,
  size : React.PropTypes.number.isRequired,
  color : React.PropTypes.string.isRequired,
	style : View.propTypes.style
}

export default Indicator;
