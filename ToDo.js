import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { idEditing: false, toDoValue: props.text };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    completeToDo: PropTypes.func.isRequired,
    uncompleteToDo: PropTypes.func.isRequired
  };
  /* state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: ""
  } */
  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo, isCompleted } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}
            ></View>
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[styles.input, styles.scrollText]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={"done"}
              onBlur={this._finishEditing}
            />
          ) : (
            <Text
              style={[
                styles.scrollText,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        <View styles={styles.column}>
          {isEditing ? (
            <View styles={styles.actions}>
              <TouchableOpacity onPressOut={this._finishEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>
                    <Icon name="check"></Icon>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View styles={styles.actions}>
              <TouchableOpacity onPressOut={this._startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>
                    <Icon name="edit"></Icon>
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>
                    <Icon name="trash-o"></Icon>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
  _toggleComplete = event => {
    const { isCompleted, uncompleteToDo, completeToDo, id } = this.props;
    if (isCompleted) {
      uncompleteToDo(id);
    } else {
      completeToDo(id);
    }
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };
  _startEditing = () => {
    //const { text } = this.props
    this.setState({
      isEditing: true
      //toDoValue: text
    });
  };
  _finishEditing = () => {
    const { toDoValue } = this.state;
    const { id, updateToDo } = this.props;
    updateToDo(id, toDoValue);
    this.setState({
      isEditing: false
    });
  };
  _controlInput = text => {
    this.setState({
      toDoValue: text
    });
  };
  _completeToDo = () => {};
  _uncompleteToDo = () => {};
}

const styles = StyleSheet.create({
  scrollText: {
    color: "#333",
    fontSize: 20,
    marginVertical: 20
  },
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 3,
    marginRight: 20
    //backgroundColor: "red"
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#f23657"
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
    justifyContent: "space-between"
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    marginVertical: 10,
    width: width / 2
  }
});
