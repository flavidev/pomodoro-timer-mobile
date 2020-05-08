import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableHighlightBase } from "react-native";

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: this.props.minutes,
      seconds: this.props.seconds,
    };
  }

  _interval = null;

  componentWillReceiveProps(newProps) {
    newProps.reset
      ? this.setState({
          minutes: newProps.minutes,
          seconds: newProps.seconds,
        })
      : null;
  }

  componentDidUpdate() {
    if (!this.props.runningClock) {
      clearInterval(this._interval);
      this._interval = null;
    } else if (!this._interval && this.props.runningClock) {
      this._interval = setInterval(() => {
        this.state.seconds > 0
          ? this.setState({ seconds: this.state.seconds - 1 })
          : this.state.minutes > 0
          ? this.setState({ minutes: this.state.minutes - 1, seconds: 59 })
          : (console.log("vibrate"), this.props.clockReachedZero());
      }, 1000);
    }
  }

  //Fix minutes and seconds on two decimals
  adjustNumber(num) {
    parseInt(num) >= 0 && parseInt(num) < 10
      ? (num = "0" + num)
      : num > 99
      ? (num = 99)
      : null;
    return num.length > 2 ? num[0] + num[1] : num;
  }

  render() {
    return (
      <View style={styles.clockContainer}>
        <Text style={styles.clockBox}>
          {this.adjustNumber(this.state.minutes)}
        </Text>
        <Text style={styles.clockBox}>
          {this.adjustNumber(this.state.seconds)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  clockContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  clockBox: {
    backgroundColor: "green",
    margin: 15,
    fontSize: 120,
    padding: 10,
    color: "white",
  },
});
