import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SwipableFlatList from 'react-native-swipable-flatlist';


interface DataItem {
  id: string;
  text: string;
}

const initialData: DataItem[] = Array.from({length: 20}, (_, i) => ({
  id: `item-${i}`,
  text: `Item #${i}`,
}));


export default function App() {

  const [data, setData] = useState<DataItem[]>(initialData);

  const deleteItem = useCallback((id: string) => {
     setData((prevData) => prevData.filter((item) => item.id !== id));
  }, []);

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

  const renderItem = useCallback(({item}: {item: DataItem}) => (
        <View style={styles.item}>
           <Text>{item.text}</Text>
        </View>
  ), []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SwipableFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderLeftActions={renderLeftAction}
        renderRightActions={renderRightAction}
      />
      
    </View>
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
});