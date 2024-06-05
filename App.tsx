import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import { Alert, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeableFlatList, { SwipeableFlatListRef } from 'rn-gesture-swipeable-flatlist';

interface DataItem {
   id: string;
   text: string;
}

const initialData: DataItem[] = Array.from({ length: 20 }, (_, i) => ({
   id: `item-${i}`,
   text: `Item #${i}`,
}));


export default function App() {

   const [data, setData] = useState<DataItem[]>(initialData);
   const flatlistRef = useRef<SwipeableFlatListRef<DataItem> | null>(null);
   const deleteItem = useCallback((id: string) => {
      setData((prevData) => prevData.filter((item) => item.id !== id));
   }, []);

   const scrollToEnd = () => {
      flatlistRef.current?.scrollToEnd();
   }

   const closeAnyOpenRows = () => {
    flatlistRef.current?.closeAnyOpenRows()
   }
   
   const editItem = useCallback((id: string) => {
      Alert.alert(`Editing item with id ${id}`)
   }, []);

   const renderRightAction = useCallback((item: DataItem) => (
      <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.rightAction}>
         <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
   ), [deleteItem]);

   const renderLeftAction = useCallback((item: DataItem) => (
      <TouchableOpacity onPress={() => editItem(item.id)} style={styles.leftAction}>
         <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
   ), [editItem]);

   const renderItem = useCallback(({ item }: { item: DataItem }) => (
      <View style={styles.item}>
         <Text>{item.text}</Text>
      </View>
   ), []);

  

   return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
         <StatusBar style="auto" />
         <TouchableOpacity style={styles.touchableStyle} onPress={scrollToEnd}>
            <Text>Scroll to end</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.touchableStyle} onPress={closeAnyOpenRows}>
            <Text>Close any open rows</Text>
         </TouchableOpacity>
         <SwipeableFlatList
            ref={flatlistRef}
            data={data}
            keyExtractor={(item) => item.id}
            enableOpenMultipleRows={false} //make sure to refresh the list once you alter this
            renderItem={renderItem}
            renderLeftActions={renderLeftAction}
            renderRightActions={renderRightAction}
         />

      </SafeAreaView>
    </GestureHandlerRootView>
   );
}




const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   item: {
      padding: 20,
      backgroundColor: '#fff',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
   },
   rightAction: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: '100%',
   },
   leftAction: {
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: '100%',
   },
   actionText: {
      color: '#fff',
      fontWeight: '600',
      padding: 20,
   },
   touchableStyle:{
      backgroundColor: 'red',
      padding: 10,
      marginTop:Platform.select({
        android:20,
        ios:0
      }),
      borderRadius: 5,
      alignItems: 'center',
      marginBottom:5
   },

   buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
   },
});