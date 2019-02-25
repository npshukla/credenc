import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, TouchableWithoutFeedback, Text} from 'react-native';
import {Colors} from '@flavor/themeConfig';

class Items extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {
      items,
      positionX,
      positionY,
      show,
      onPress,
      width,
      height
    } = this.props;
    if (!show) {
      return <View/>;
    }

    let renderedItems = React.Children.map(items, (item) => {
      return (
        <TouchableWithoutFeedback onPress={() => onPress(item)}>
          <View
            style={{
              backgroundColor: this.props.backgroundColor
            }}>
            <Text style={[styles.textItem, this.props.textItemStyle]}>{item}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
    return (
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={[
          styles.container, {
            top: positionY,
            left: positionX,
            width,
            maxHeight: height
          },
          this.props.containerStyle
        ]}
        automaticallyAdjustContentInsets={false}
        bounces={false}>
        {renderedItems}
        <View
          style={{
            height: 1,
            width: null,
            backgroundColor: this.props.dividerColor
          }}/>
      </ScrollView>
    );
  }
}

Items.defaultProps = {
  width: 0,
  height: 0,
  positionX: 0,
  positionY: 0,
  show: false,
  backgroundColor: Colors.WHITE,
  dividerColor: Colors.BLACK_OPACITY_15,
  onPress: () => {}
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    margin: 16
  },
  textItem: {
    fontSize: 16,
    padding: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.BLACK_OPACITY_15
  }
});

module.exports = Items;
