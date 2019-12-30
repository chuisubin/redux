import React, { Component } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class items extends Component {
  state = {
    items: null
  };
  componentDidMount() {
    this.update();
  }
  render() {
    const { items } = this.state;
    if (items === null || items.length === 0) {
      return null;
    }
    return <View style={{ margin: 5 }}></View>;
  }
}
