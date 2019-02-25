import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  BackHandler,
  Dimensions,
  ListView,
  Platform,
  StyleSheet,
  TextInput,
  View,
  NativeModules,
  findNodeHandle,
  Keyboard
} from 'react-native';
import {TextInputLayout} from '@granulars';
import {Colors} from '@flavor/themeConfig';

/* *    AUTHOR :
*    Rohit
*
*    CUSTOMIZABLE ITEMS :
*    textColor
 * (default:Colors.BLACK)
*    placeholder: edit text placeholder (default: '')
 * *    defaultValue: default text value
*    visible: to hide or show
*
 * textInputStyle, inputContainerStyle, containerStyle
*
*    DEPENDENCIES :
*
 * allowedValues: array of allowed values
*    optionListRef: function that
 * returns reference to autocomplete option list
*    changeScrollEnable:
 * function to enable/disable scrolling of parent scroll view
*    scrollView:
 * reference to parent scroll view
*    onSelect: callback to get selected item
 * in autocomplete options list
*    getParentView: function that returns
 * reference to parent view of AutoComplete
 */

const window = Dimensions.get('window');

class AutoComplete extends Component {

  static defaultProps = {
    allowedValues: [],
    defaultValue: '',
    textColor: Colors.BLACK,
    placeholder: '',
    visible: true,
    changeScrollEnable: () => {}
  };

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.allowedValues),
      query: this.props.defaultValue
        ? this.props.defaultValue
        : '',
      hideResults: true
    };
    this.filteredData = [];
  }

  filterData(allowedValues, query) {
    if (!query) {
      return [];
    }
    return allowedValues.filter(
      item => item.toLowerCase().startsWith(query.toLowerCase())
    );
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.hideResults)
        return false;
      this.hideOptionsList();
      return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  componentWillUpdate(nextProps, nextState) {
    this.filteredData = this.filterData(nextProps.allowedValues, nextState.query);
    nextState.dataSource = this.state.dataSource.cloneWithRows(this.filteredData);
  }

  componentDidMount() {
    this.renderResultList();
  }

  componentDidUpdate() {
    this.renderResultList();
  }

  /**
   * Proxy `blur()` to autocomplete's text input.
   */
  blur() {
    const {textInput} = this;
    textInput && textInput.blur();
  }

  /**
   * Proxy `focus()` to autocomplete's text input.
   */
  focus() {
    const {textInput} = this;
    textInput && textInput.focus();
  }

  hideOptionsList() {
    if (this.props.optionListRef()) {
      this.props.optionListRef().hide();
      if (!this.state.hideResults) {
        this.setState({hideResults: true});
      }
    }
    this.props.changeScrollEnable(true);
  }

  renderResultList() {
    let {optionListRef, getParentView} = this.props;
    if (!this.filteredData || this.filteredData.length < 1 || this.state.hideResults) {
      this.hideOptionsList();
      return false;
    }

    const UIManager = require('NativeModules').UIManager;
    const handle = findNodeHandle(getParentView());
    UIManager.measureLayoutRelativeToParent(handle, (e) => {
      console.error(e)
    }, (x, y, width, height) => {
      optionListRef()._show(
        this.filteredData,
        x,
        y + height - 32,
        width - 32,
        200,
        (item) => {
          if (item) {
            this.props.onSelect && this.props.onSelect(item);
            this.setState({query: item});
          }
          this.hideOptionsList();
          Keyboard.dismiss();
        }
      );

      this.props.changeScrollEnable(false);
      this.props.scrollView && this.props.scrollView.scrollTo({x, y, animated: true});
      if (this.state.hideResults) {
        this.setState({hideResults: false});
      }
    });
  }

  renderTextInput() {
    const props = {
      style: [styles.input],
      ref: ref => (this.textInput = ref),
      ...this.props
    };

    return this.getTextInput(props);
  }

  render() {
    const {dataSource} = this.state;
    const {containerStyle, inputContainerStyle, onShowResults} = this.props;
    const showResults = dataSource.getRowCount() > 0;

    // Notify listener if the suggestion will be shown.
    onShowResults && onShowResults(showResults);

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {this.renderTextInput()}
        </View>
      </View>
    );
  }

  getTextInput(props) {
    return (
      <TextInputLayout
        ref='textInputLayout'
        style={{
          zIndex: -1
        }}
        marginHorizontal={this.props.marginHorizontal}
        visible={this.props.visible}
        displayName={this.props.displayName}
        allowEmpty={this.props.allowEmpty}
        data={this.props.data}
        hintColor={this.props.hintColor}
        focusColor={this.props.focusColor}
        checkValid={this.props.checkValid}>
        <TextInput
          style={[styles.textInput, this.props.textInputStyle]}
          value={this.state.query}
          returnKeyType={Platform.OS == 'ios'?'default':'none'}
          multiline={false}
          defaultValue={this.props.defaultValue}
          placeholder={this.props.placeholder}
          onFocus={() => this.renderResultList()}
          onBlur={() => this.hideOptionsList()}
          onChangeText={text => {
            if (!text || text.length < 1) {
              this.setState({query: text, hideResults: true});
            } else {
              this.setState({query: text, hideResults: false});
            }
          }}
          textColor={this.props.textColor}/>
      </TextInputLayout>
    );
  }

  setVisibility(visible) {
    this.refs['textInputLayout'] && this.refs['textInputLayout'].setVisibility(
      visible
    );
    this.hideOptionsList();
  }

  isVisible() {
    return this.refs['textInputLayout'] && this.refs['textInputLayout'].isVisible();
  }

  getTextValue() {
    return this.refs['textInputLayout'] && this.refs['textInputLayout'].getTextValue();
  }

  getAllowedValues() {
    return this.props.allowedValues;
  }
}

const androidStyles = {
  container: {
    flex: 1
  },
  inputContainer: {
    marginBottom: 0
  }
};

const iosStyles = {
  container: {
    zIndex: 1
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  }
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },
  textInput: {
    alignSelf: 'stretch',
    textAlign: 'center',
    color: Colors.ENQUIRY_SCREEN_TEXT_COLOR,
    fontSize: 14,
    height: 36,
    fontFamily: 'Roboto-Regular'
  },
  ...Platform.select({
    android: {
      ...androidStyles
    },
    ios: {
      ...iosStyles
    }
  })
});

export default AutoComplete;
