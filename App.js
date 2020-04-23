import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { vibrate } from "./utils";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workMinutes: 25,
      workSeconds: 0,
      breakMinutes: 5,
      breakSeconds: 0,
      clockMinutes: null,
      clockSeconds: null,
      breakTime: false,
      play: false,
    };
  }

  newText = null;
  interval = null;

  componentDidMount() {
    this.setState({
      clockMinutes: this.state.workMinutes,
      clockSeconds: this.state.workSeconds,
    });
  }

  componentDidUpdate() {
    if (!this.state.play) clearInterval(this.interval);
    else if (this.state.clockSeconds < 0) {
      this.state.clockMinutes > 0
        ? this.setState({
            clockMinutes: this.state.clockMinutes - 1,
            clockSeconds: 59,
          })
        : this.state.breakTime
        ? (vibrate(), this.reset())
        : this.setState({
            clockMinutes: this.state.breakMinutes,
            clockSeconds: this.state.breakSeconds,
            breakTime: true,
          }),
        !this.state.clockMinutes ? vibrate() : null;
    }
  }

  changeTime(text) {
    this.newText = text;
  }

  // Reset function
  reset() {
    this.setState({
      clockMinutes: this.state.workMinutes,
      clockSeconds: this.state.workSeconds,
      breakTime: false,
      play: false,
    });
  }

  // Start timer
  play() {
    !this.state.play && (this.state.clockMinutes || this.state.clockSeconds)
      ? (this.setState({ play: true }),
        (this.interval = setInterval(
          () => this.setState({ clockSeconds: this.state.clockSeconds - 1 }),
          1000
        )))
      : vibrate();
  }

  // Pause timer
  pause() {
    clearInterval(this.interval);
  }

  // Display "0" before numbers between 0 and 9.
  displayZero(num) {
    return num >= 0 && num < 10
      ? ((num = "0" + num), (num = num[num.length - 2] + num[num.length - 1]))
      : String(num);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require("./assets/pomodoro.jpg")}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.title_font}>POMODORO TIMER</Text>
          </View>

          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={styles.clockTimer}>
              {this.displayZero(this.state.clockMinutes)}
            </Text>

            <Text style={styles.clockTimer}>
              {this.displayZero(this.state.clockSeconds)}
            </Text>
          </View>

          <View style={{ flex: 1.5 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "5%",
                flex: 1,
              }}
            >
              <TouchableOpacity onPress={() => this.reset()}>
                <Image
                  source={require("./assets/reset.png")}
                  style={styles.controlButtons}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.play()}>
                <Image
                  source={require("./assets/play.png")}
                  style={styles.controlButtons}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.pause()}>
                <Image
                  source={require("./assets/pause.png")}
                  style={styles.controlButtons}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 2, marginHorizontal: "5%" }}>
              <View style={{ flexDirection: "row", flex: 0.5 }}>
                <Text style={styles.adjustTime}>WORK</Text>
                <TextInput
                  style={styles.adjustTimeInput}
                  keyboardType={"numeric"}
                  placeholder={this.displayZero(this.state.workMinutes)}
                  onChangeText={(text) => this.changeTime(text)}
                  onEndEditing={() =>
                    this.setState({ workMinutes: this.newText })
                  }
                />
                <TextInput
                  style={styles.adjustTimeInput}
                  keyboardType={"numeric"}
                  placeholder={this.displayZero(this.state.workSeconds)}
                  onChangeText={(text) => this.changeTime(text)}
                  onEndEditing={() =>
                    this.setState({ workSeconds: this.newText })
                  }
                />
              </View>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={styles.adjustTime}>BREAK</Text>
                <TextInput
                  style={styles.adjustTimeInput}
                  keyboardType={"numeric"}
                  placeholder={this.displayZero(this.state.breakMinutes)}
                  onChangeText={(text) => this.changeTime(text)}
                  onEndEditing={() =>
                    this.setState({ breakMinutes: this.newText })
                  }
                />
                <TextInput
                  style={styles.adjustTimeInput}
                  keyboardType={"numeric"}
                  placeholder={this.displayZero(this.state.breakSeconds)}
                  onChangeText={(text) => this.changeTime(text)}
                  onEndEditing={() =>
                    this.setState({ breakSeconds: this.newText })
                  }
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
  },

  title_font: {
    fontSize: 40,
    color: "white",
    backgroundColor: "green",
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    marginVertical: "15%",
    fontWeight: "bold",
  },

  clockTimer: {
    fontSize: 100,
    color: "white",
    backgroundColor: "green",
    padding: 25,
    alignSelf: "center",
  },

  controlButtons: {
    marginTop: "35%",
    width: 80,
    height: 80,
  },
  adjustTime: {
    fontSize: 25,
    color: "white",
    alignSelf: "center",
    flex: 1,
    fontWeight: "bold",
  },

  adjustTimeInput: {
    backgroundColor: "green",
    alignSelf: "center",
    textAlign: "center",
    padding: 5,
    marginRight: "5%",
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
  },
});
