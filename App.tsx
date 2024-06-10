import React, { useCallback, useRef, useState } from 'react';
import { Alert, Modal,  SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeableFlatList, { SwipeableFlatListRef } from 'rn-gesture-swipeable-flatlist';
import { MaterialIcons } from '@expo/vector-icons';

interface DataItem {
  id: string;
  text: string;
}

interface ListItemProps {
  item: DataItem;
}

const initialData: DataItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i}`,
  text: `Item #${i}`,
}));

export default function App() {
  const [data, setData] = useState<DataItem[]>(initialData);
  const [menuVisible, setMenuVisible] = useState(false);
  const flatlistRef = useRef<SwipeableFlatListRef<DataItem> | null>(null);

  const deleteItem = useCallback((id: string) => {
    setData(prevData => prevData.filter(item => item.id !== id));
    setMenuVisible(false);
  }, []);

  const scrollToEnd = () => {
    flatlistRef.current?.scrollToEnd();
    setMenuVisible(false);
  };
  const scrollToTop = () => {
   flatlistRef.current?.scrollToIndex({index: 0});
   setMenuVisible(false);
 };

  const closeAnyOpenRows = () => {
    flatlistRef.current?.closeAnyOpenRows();
    setMenuVisible(false);
  };

  const editItem = useCallback((id: string) => {
    Alert.alert(`Editing item with id ${id}`);
    setMenuVisible(false);
  }, []);

  const renderItem = useCallback(({ item }: ListItemProps) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  ), []);


  const renderLeftAction = useCallback((item: DataItem) => (
   <TouchableOpacity onPress={() => editItem(item.id)} style={[styles.action, { backgroundColor: '#34A853' }]}>
      <Text style={styles.actionText}>Edit</Text>
   </TouchableOpacity>

), [editItem]);

  const renderRightAction = useCallback((item: DataItem) => (
   <TouchableOpacity onPress={() => deleteItem(item.id)} style={[styles.action, { backgroundColor: '#EA4335' }]}>
      <Text style={styles.actionText}>Delete</Text>
   </TouchableOpacity>
), [deleteItem]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>rn-gesture-swipeable-flatlist</Text>
          </View>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
            <MaterialIcons name="more-vert" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          visible={menuVisible}
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
            <View style={styles.modalMenu}>
              <TouchableOpacity onPress={scrollToEnd} style={styles.menuOption}>
                <Text style={styles.menuText}>Scroll to End</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={scrollToTop} style={styles.menuOption}>
                <Text style={styles.menuText}>Scroll to Top</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeAnyOpenRows} style={styles.menuOption}>
                <Text style={styles.menuText}>Close Any Open Rows</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <SwipeableFlatList
          ref={flatlistRef}
          data={data}
          keyExtractor={item => item.id}
          enableOpenMultipleRows={false}
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
    backgroundColor: '#F0F1F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginLeft:30,
      alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    paddingVertical: 10,
    paddingHorizontal:5,
  },
  item: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333333',
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    width: 200,
    alignItems: 'center',
  },
  menuOption: {
    padding: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
  },
});
