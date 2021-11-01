import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
const Header = () => {
    return (
       <View style={styles.header}>
           <Text style={styles.headerText} >
               WALKR
           </Text>
       </View>
    );
};

const styles = StyleSheet.create({
    headerText: {textAlign:'center',
    color:'#f0f',
},
    header:{
        width:"100%",
        
    }
 })


export default Header;