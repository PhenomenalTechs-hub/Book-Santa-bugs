import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { SwipeListView } from "react-native-swipe-list-view";

export default class SwipeableFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotifications: this.props.allNotifications,
    };
  }
  updateMarkAsRead = (notification) => {
    db.collection("all_notifications").doc(notification.doc_id).update({
      notification_status: "read",
    });
  };
  // closeRow = (item, key) =>{
  //     if(item[key]){
  //         item[key].closeRow();
  //     }
  // }
  // deleteRow = (item, key) => {
  //       var allNotifications = this.state.all_notification;
  //       this.closeRow(item,key)
  //       const newData = [...allNotifications];
  //       const prevIndex = allNotifications.findIndex(item => item.key == key)
  //       this.updateMarkAsRead(allNotifications[prevIndex]);
  //       newData.splice(prevIndex, 1)
  //       this.setState({
  //           allNotifications:newData
  //       })
  // }
  renderItem = (data) => {
    <Animated.View>
      <ListItem
        leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
        title={data.item.book_name}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        subtitle={data.item.message}
        bottomDivider
      />
    </Animated.View>;
  };

  getRequestedBooksList = () => {
    this.requestRef = db
      .collection("requested_books")
      .onSnapshot((snapshot) => {
        var requestedBooksList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          requestedBooksList: requestedBooksList,
        });
      });
  };

  componentDidMount() {
    this.getRequestedBooksList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={styles.backRightButton}>
        <Text>
          Mark as Read
        </Text>
      </View>
    </View>
  );
  onSwipeValueChange=(swipeData)=>{
    var allNotifications = this.state.allNotifications;
    const {key , value} = swipeData
    if(value<-Dimensions.get("window").width){
      const newData = [...allNotifications]
      this.updateMarkAsRead(allNotifications[key]);
      newData.splice(key, 1)
      this.setState({
        allNotifications:newData
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView disableRightSwipe
        data={this.state.allNotifications}
        renderItem={this.renderItem}
        renderHiddenItem={this.renderHiddenItem}
        rightOpenValue={-Dimensions.get("window").width}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onSwipeValueChange={this.onSwipeValueChange}
        keyExtractor={(item, index)=>index.toString()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  rowBack:{
    alignItems:"center",
    backgroundColor:"#29b6f6",
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:15
  },
  backRightButton:{
    alignItems:"center",
    position:"absolute",
    justifyContent:"center",
    top: 0,
    bottom: 0,
    width: 100,
  }
});
