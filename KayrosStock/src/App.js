import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar, useColorScheme} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {LocalizationProvider, useTranslation} from './hooks/Translation';
import HomeScreen from './Screen/Home';
import SettingScreen from './Screen/Settings';
import {theme} from './theme';
import {DrawerContent} from './components/Drawer';
import {ApiProvider, useApi} from './hooks/useApi';
import {SnackProvider} from './hooks/useSnack';
import RollCheckScreen from './Screen/RollCheck';
import RollManagmentScreen from './Screen/RollManagmentScreen';
import ItemManagmentScreen from './Screen/ItemManagmentScreen';
import {DataProvider, useData} from './hooks/data/provider';
import {HotKeysProvider} from './hooks/HotKeys';
import {DatalogicSDKProvider} from './hooks/DatalogicManager';
import {LOG} from './log';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  const {translate} = useTranslation();
  const {connected} = useApi();
  const {inventoryClosed} = useData();
  LOG.info(connected);
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      initialRouteName="Home"
      screenOptions={{unmountOnBlur: true}}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{title: translate('home.title')}}
      />
      <Drawer.Screen
        name="RollCheck"
        component={RollCheckScreen}
        options={{title: translate('rollCheck.title')}}
      />
      {inventoryClosed ? (
        <>
          <Drawer.Screen
            name="Delivery"
            options={{title: translate('rollDelivery.title')}}>
            {props => <RollManagmentScreen {...props} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="ItemDelivery"
            options={{title: translate('itemDelivery.title')}}>
            {props => <ItemManagmentScreen {...props} />}
          </Drawer.Screen>
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Inventory"
            options={{title: translate('rollInventory.title')}}>
            {props => <RollManagmentScreen inventory {...props} />}
          </Drawer.Screen>

          <Drawer.Screen
            name="ItemInventory"
            options={{title: translate('itemInventory.title')}}>
            {props => <ItemManagmentScreen inventory {...props} />}
          </Drawer.Screen>
        </>
      )}

      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{title: translate('settings.title')}}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer theme={theme}>
      <LocalizationProvider>
        <PaperProvider theme={theme}>
          <SnackProvider>
            <ApiProvider>
              <DataProvider>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                />
                <HotKeysProvider>
                  <DatalogicSDKProvider>
                    <MainNavigator />
                  </DatalogicSDKProvider>
                </HotKeysProvider>
              </DataProvider>
            </ApiProvider>
          </SnackProvider>
        </PaperProvider>
      </LocalizationProvider>
    </NavigationContainer>
  );
};

export default App;
