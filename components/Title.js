import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class Title extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
    };
  }

  componentWillReceiveProps(newProps){
      
    this.setState({
        title:newProps.title
    })
  }

  render() {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleTextStyle}> {this.state.title} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: 25,
    backgroundColor: "green",
  },
  titleTextStyle: {
    fontSize: 60,
    alignSelf: "center",
    color: "white",
  },
});
