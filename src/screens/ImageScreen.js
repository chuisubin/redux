// import React, { useEffect, useState, Component } from "react";
// import { View, Text, Button, Image, ScrollView } from "react-native";
// import { connect } from "react-redux";
// import * as ImagePicker from "expo-image-picker";
// // import { items } from "../components/items";
// import * as SQLite from "expo-sqlite";

// const db = SQLite.openDatabase({ name: "db.db" });

// class Items extends React.Component {
//   state = {
//     items: null
//   };

//   componentDidMount() {
//     console.log("componentDidMount done:", this.props.done);

//     this.update();
//   }

//   render() {
//     const { items } = this.state;
//     if (items === null || items.length === 0) {
//       return null;
//     }
//     return (
//       <View>
//         <Text>123</Text>
//         {items.map(({ id, value }) => {
//           <TouchableOpacity key={id}>
//             <Image
//               source={{ uri: value }}
//               style={{
//                 width: null,
//                 height: 400
//               }}
//             />
//           </TouchableOpacity>;
//         })}
//       </View>
//     );
//   }

//   update() {
//     console.log("update done:", this.props.done);
//     db.transaction(tx => {
//       tx.executeSql(
//         `select * from items where done = ?;`,
//         [this.props.done ? 1 : 0],
//         (_, { rows: { _array } }) => {
//           console.log("RUN UPDATE1");

//           this.setState({
//             items: _array
//           });
//         }
//       );
//     });
//   }
// }

// export default class ImageScreen extends React.Component {
//   state = {
//     imageUrl: null,
//     base64URI: null,
//     text: null
//   };

//   update = () => {
//     this.todo && this.todo.update();
//     this.done && this.done.update();
//   };
//   render() {
//     const { imageUrl } = this.state;
//     return (
//       <View>
//         <ScrollView>
//           <Button title="Add" onPress={() => this._pickImage()} />
//           <Items done={false} ref={todo => (this.todo = todo)} />
//         </ScrollView>
//       </View>
//     );
//   }
//   _pickImage = async () => {
//     console.log("RUN PICK");

//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       base64: true
//     });
//     console.log("result.uri : ", result.uri);

//     if (!result.cancelled) {
//       try {
//         let messageImg = "data:image/png;base64, " + result.base64;
//         this.setState({
//           imageUrl: result.uri
//         });
//         this.add(result.uri);
//         this.setState({
//           text: null
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   add = text => {
//     console.log("RUN ADD");
//     db.transaction(
//       tx => {
//         tx.executeSql("insert into items (done,value) values (0,?)", [text]);
//         tx.executeSql("select * from items", [], (_, { rows }) =>
//           console.log(JSON.stringify(rows))
//         );
//       },
//       null,
//       this.update
//     );
//   };
//   componentDidMount() {
//     db.transaction(tx => {
//       tx.executeSql(
//         "create table if not exists items (id integer primary key not null, done int, value text);"
//       );
//     });
//   }
// }
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import {
  OPEN_DB,
  SELECT_ALL_WHERE_DONE,
  CREATE_TABLE,
  SET_DONE_1,
  DELETE_ITEM,
  INSERT_ITEM,
  SELECT_ALL
} from "../SQLite";

const db = OPEN_DB;

class Items extends React.Component {
  state = {
    items: null
  };

  componentDidMount() {
    this.update();
  }

  render() {
    const { done: doneHeading } = this.props;
    const { items } = this.state;
    const heading = doneHeading ? "Completed" : "Todo";

    if (items === null || items.length === 0) {
      return null;
    }

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>{heading}</Text>
        {items.map(({ id, done, value }) => (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.onPressItem && this.props.onPressItem(id)}
            style={{
              backgroundColor: done ? "#1c9963" : "#fff",
              borderColor: "#000",
              borderWidth: 1,
              padding: 8
            }}
          >
            <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  update() {
    db.transaction(tx => {
      tx.executeSql(
        SELECT_ALL_WHERE_DONE,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
}

export default class App extends React.Component {
  state = {
    text: null
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(CREATE_TABLE);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>SQLite Example</Text>
        <View style={styles.flexRow}>
          <TextInput
            onChangeText={text => this.setState({ text })}
            onSubmitEditing={() => {
              this.add(this.state.text);
              this.setState({ text: null });
            }}
            placeholder="what do you need to do?"
            style={styles.input}
            value={this.state.text}
          />
        </View>
        <ScrollView style={styles.listArea}>
          <Items
            done={false}
            ref={todo => (this.todo = todo)}
            onPressItem={id =>
              db.transaction(
                tx => {
                  tx.executeSql(SET_DONE_1, [id]);
                },
                null,
                this.update
              )
            }
          />
          <Items
            done={true}
            ref={done => (this.done = done)}
            onPressItem={id =>
              db.transaction(
                tx => {
                  tx.executeSql(DELETE_ITEM, [id]);
                },
                null,
                this.update
              )
            }
          />
        </ScrollView>
      </View>
    );
  }

  add(text) {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql(INSERT_ITEM, [text]);
        tx.executeSql(SELECT_ALL, [], (_, { rows }) =>
          console.log("ROWS:", JSON.stringify(rows))
        );
      },
      null,
      this.update
    );
  }

  update = () => {
    this.todo && this.todo.update();
    this.done && this.done.update();
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row"
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  }
});
