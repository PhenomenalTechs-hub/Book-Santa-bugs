import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import SwipeableFlatList from '../components/SwipeableFlatList'

export default class NotificationScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      userId  : firebase.auth().currentUser.email,
      allNotifications : []
    }
  this.notificationRef= null
  }

  getNotifications =()=>{
    this.notificationRef = db.collection("all_notifications")
    .where("notification_status", "==", "unread")
    .where("targeted_user_id","==", this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications = [];
      snapshot.docs.map(doc=>{
        var notification = doc.data();
        notification["doc_id"] = doc.id;
        allNotifications.push(notification)
      })
      this.setState({
        allNotifications : allNotifications
      });
    })
  }

  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    this.notificationRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, index} ) =>{
    return (
      <ListItem
        key={index}
        leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
        title={item.book_name}
        subtitle={item.message}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Notifications" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>You have no Notification</Text>
              </View>
            )
            :(
             <SwipeableFlatList allNotifications={this.state.allNotifications} />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
