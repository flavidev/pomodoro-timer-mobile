import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import { vibrate } from "./utils";
import Title from "./components/Title";
import Clock from "./components/Clock";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Pomodoro",
      clockMinutes: "25",
      clockSeconds: "00",
      workMinutes: "25",
      workSeconds: "00",
      breakMinutes: "05",
      breakSeconds: "00",
      runningClock: true,
      breakTime: false,
      reset: false,
      vibrate: false,
    };
  }

  _buffer = "";

  play() {
    this.setState({
      runningClock: true,
      reset: false,
      title: !this.state.breakTime ? "Work" : "Break",
    });
  }

  pause() {
    this.setState({ runningClock: false });
  }

  reset() {
    this.setState({
      reset: true,
      runningClock: false,
      title: "Pomodoro",
      clockMinutes: !this.state.breakTime? this.state.workMinutes:this.state.breakMinutes,
      clockSeconds: !this.state.breakTime? this.state.workSeconds:this.state.breakSeconds,
    });
  }

  clockReachedZero = () => {
    (this.setState({
          breakTime: !this.state.breakTime,
        }),
        (this.reset(),
        setTimeout(() => {
          this.play();
        }, 200))),console.log("vibrate!!!")
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/pomodoro.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Title style={styles.titleContainer} title={this.state.title} />

          <Clock
            style={styles.clockContainer}
            minutes={this.state.clockMinutes}
            seconds={this.state.clockSeconds}
            reset={this.state.reset}
            runningClock={this.state.runningClock}
            clockReachedZero={this.clockReachedZero}
          />

          <View style={styles.settingsContainer}>
            <View style={styles.touchControlsContainer}>
              <TouchableOpacity
                style={styles.touchControls}
                onPress={() => (this.setState({breakTime:false}),this.reset())}
              >
                <Image source={require("./assets/reset.png")} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.play()}
                style={styles.touchControls}
              >
                <Image source={require("./assets/play.png")} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.touchControls}
                onPress={() => this.pause()}
              >
                <Image source={require("./assets/pause.png")} />
              </TouchableOpacity>
            </View>

            <View style={styles.customInputsContainer}>
              <Text style={styles.typeOfTimerText}>Work </Text>
              <TextInput
                keyboardType="number-pad"
                placeholder={this.state.workMinutes}
                style={styles.customInputBox}
                onChangeText={(text) => (this._buffer = text)}
                onEndEditing={() =>
                  this.setState({ workMinutes: this._buffer })
                }
              />
              <TextInput
                keyboardType="number-pad"
                placeholder={this.state.workSeconds}
                style={styles.customInputBox}
                onChangeText={(text) => (this._buffer = text)}
                onEndEditing={() =>
                  this.setState({ workSeconds: this._buffer })
                }
              />
            </View>
            <View style={styles.customInputsContainer}>
              <Text style={styles.typeOfTimerText}>Break</Text>
              <TextInput
                keyboardType="number-pad"
                placeholder={this.state.breakMinutes}
                style={styles.customInputBox}
                onChangeText={(text) => (this._buffer = text)}
                onEndEditing={() =>
                  this.setState({ breakMinutes: this._buffer })
                }
              />
              <TextInput
                keyboardType="number-pad"
                placeholder={this.state.breakSeconds}
                style={styles.customInputBox}
                onChangeText={(text) => (this._buffer = text)}
                onEndEditing={() =>
                  this.setState({ breakSeconds: this._buffer })
                }
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  titleContainer: {
    flex: 1,
  },
  clockContainer: {
    flex: 1,
  },
  settingsContainer: {
    flex: 1,
  },
  touchControlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    //backgroundColor: "green",
  },
  touchControls: {
    marginHorizontal: 15,
  },
  typeOfTimerText: {
    fontSize: 40,
    color: "white",
  },
  customInputsContainer: {
    flexDirection: "row",
    margin: 20,
    marginLeft: 35,
    justifyContent: "center",
  },
  customInputBox: {
    height: 50,
    width: 80,
    backgroundColor: "white",
    marginHorizontal: 22,
    textAlign: "center",
    fontSize: 40,
  },
});
