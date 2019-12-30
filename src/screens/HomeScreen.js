import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  increaseCounter,
  DecreaseCounter,
  IsLogged,
  AddFdList
} from "../actions";
import { connect } from "react-redux";
import i18n from "../language";
const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%"
        }}
      >
        <TouchableOpacity onPress={() => props.decreaseCounter()}>
          <Text>減</Text>
        </TouchableOpacity>

        <Text>{props.counter}</Text>

        <TouchableOpacity onPress={() => props.increaseCounter()}>
          <Text>加</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginTop: 10 }} onPress={() => props.loggedChange()}>
        {props.isLogged == false ? "FALSE" : "TRUE"}
      </Text>

      <TouchableOpacity
        style={{ borderColor: "red", borderWidth: 1, padding: 5 }}
        onPress={() => props.AddFdList(props.counter)}
      >
        <Text style={{ fontSize: 20 }}>ADD FD</Text>
      </TouchableOpacity>

      {props.Fd && (
        <View>
          <Text>
            {i18n.t("name")}:{props.Fd.name}
          </Text>
          <Text>age:{props.Fd.age}</Text>
        </View>
      )}
    </View>
  );
};

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    // 获取 state 变化
    counter: state.counterReducer.counter,
    isLogged: state.loggedReducer.logged,
    Fd: state.friendList.fdList
  };
};

// 发送行为
const mapDispatchToProps = dispatch => {
  return {
    // 发送行为
    increaseCounter: () => dispatch(increaseCounter()),
    decreaseCounter: () => dispatch(DecreaseCounter()),
    loggedChange: () => dispatch(IsLogged()),
    AddFdList: age => dispatch(AddFdList(age))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
