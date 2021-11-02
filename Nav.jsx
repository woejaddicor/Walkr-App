import React from 'react';
import { StyleSheet, Text, View } from 'react-native'

const Nav = () => {
    return (
       <View style = {styles.drawer}>
          <Text>navbar</Text>
       </View>
    );
};
const styles = StyleSheet.create({
    drawer:{
        backgroundColor:"red",
        minHeight:40,
        

    }
})
    
export default Nav;