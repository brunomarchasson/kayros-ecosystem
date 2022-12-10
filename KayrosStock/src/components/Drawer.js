import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Avatar, Title, Drawer, Text} from 'react-native-paper';
import InventorySwitch from './InventorySwitch';
import DeviceInfo from 'react-native-device-info';

export const DrawerContent = props => {
  const [version, setVersion] = useState();
  useEffect(() => {
    setVersion(DeviceInfo.getVersion());
  }, []);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.titleSection}>
          <Avatar.Image
            source={require('../assets/fleur.png')}
            style={styles.logo}
            size={50}
          />
          <Title style={styles.title}>KAYROS</Title>
          <Text style={styles.version}>{version}</Text>
        </View>
        <InventorySwitch />
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItemList {...props} />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  titleSection: {
    alignItems: 'center',
  },
  logo: {backgroundColor: 'None'},
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  version: {
    fontSize: 12,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
