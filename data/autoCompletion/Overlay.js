import React, {Component} from 'react';
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

const window = Dimensions.get('window');

class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {pageX, pageY, show, onPress} = this.props;

    if (!show) {
      return null
    }

    return (
      <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
        <View style={[styles.overlay]}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Overlay.defaultProps = {
  pageX: 0,
  pageY: 0,
  show: false
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  overlay: {
    position: 'absolute',
    width: window.width,
    height: window.height * 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

module.exports = Overlay;
