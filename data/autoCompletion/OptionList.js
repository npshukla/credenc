const Overlay = require('./Overlay');
const Items = require('./Items');

import React, {Component} from 'react';
import {View} from 'react-native';

/* *    AUTHOR :
*    Rohit
*
*    CUSTOMIZABLE ITEMS :
*    backgroundColor
 * (default:Colors.WHITE)
*    dividerColor (default:'#d0d0d0')
*
 * textItemStyle
*    containerStyle
 */

export default class OptionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,

      width: 0,
      height: 0,

      pageX: 0,
      pageY: 0,

      positionX: 0,
      positionY: 0,

      items: [],
      onSelect: () => {}
    };
  }

  _show(items, positionX, positionY, currentWidth, currentHeight, onSelect) {
    if (!items || items.length < 1) {
      return;
    }
    this.setState({
      ...this.state,
      positionX,
      positionY,
      pageX: positionX,
      pageY: positionY,
      width: currentWidth,
      height: currentHeight,
      items,
      onSelect,
      show: true
    });
  }

  _onOverlayPress() {
    let {onSelect} = this.state;
    onSelect(null);

    this.setState({
      ...this.state,
      show: false
    });
  }

  _onItemPress(item) {
    let {onSelect} = this.state;
    onSelect(item);

    this.setState({
      ...this.state,
      show: false
    });
  }

  hide() {
    this.setState({
      ...this.state,
      show: false
    });
  }

  isVisible() {
    return this.state.show;
  }

  render() {
    let {
      items,
      pageX,
      pageY,
      positionX,
      positionY,
      width,
      height,
      show
    } = this.state;
    let {overlayStyles, useSelectHeight} = this.props;

    if (!show) {
      return null;
    }

    return (
      <View style={{
          position: 'absolute'
        }}>
        <Overlay
          pageX={pageX}
          pageY={pageY}
          show={show}
          onPress={this._onOverlayPress.bind(this)}/>
        <Items
          items={items}
          positionX={positionX}
          positionY={positionY}
          width={width}
          height={height}
          show={show}
          useSelectHeight={useSelectHeight}
          onPress={this._onItemPress.bind(this)}
          backgroundColor={this.props.backgroundColor}
          textItemStyle={this.props.textItemStyle}
          containerStyle={this.props.containerStyle}
          dividerColor={this.props.dividerColor}/>
      </View>
    );
  }
}
