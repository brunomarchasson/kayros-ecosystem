/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  List,
} from 'react-native-paper';
import {useApi} from '../../hooks/useApi';
import {NetworkInfo} from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';
import {LOG} from '../../log';
import {ScrollView} from 'react-native-gesture-handler';

const getNetworkInfo = async () => ({
  getIPAddress: await NetworkInfo.getIPAddress(),
  getIPV4Address: await NetworkInfo.getIPV4Address(),
  getBroadcast: await NetworkInfo.getBroadcast(),
  getSSID: await NetworkInfo.getSSID(),
  getBSSID: await NetworkInfo.getBSSID(),
  getSubnet: await NetworkInfo.getSubnet(),
  getGatewayIPAddress: await NetworkInfo.getGatewayIPAddress(),
  getFrequency: await NetworkInfo.getFrequency(),
});
const getDeviceInfo = async () => ({
  getAndroidId: await DeviceInfo.getAndroidId(),
  getApiLevel: await DeviceInfo.getApiLevel(),
  getApplicationName: await DeviceInfo.getApplicationName(),
  getAvailableLocationProviders:
    await DeviceInfo.getAvailableLocationProviders(),
  getBaseOs: await DeviceInfo.getBaseOs(),
  getBuildId: await DeviceInfo.getBuildId(),
  getBatteryLevel: await DeviceInfo.getBatteryLevel(),
  getBootloader: await DeviceInfo.getBootloader(),
  getBrand: await DeviceInfo.getBrand(),
  getBuildNumber: await DeviceInfo.getBuildNumber(),
  getBundleId: await DeviceInfo.getBundleId(),
  isCameraPresent: await DeviceInfo.isCameraPresent(),
  getCarrier: await DeviceInfo.getCarrier(),
  getCodename: await DeviceInfo.getCodename(),
  getDevice: await DeviceInfo.getDevice(),
  getDeviceId: await DeviceInfo.getDeviceId(),
  getDeviceType: await DeviceInfo.getDeviceType(),
  getDisplay: await DeviceInfo.getDisplay(),
  getDeviceName: await DeviceInfo.getDeviceName(),
  getDeviceToken: await DeviceInfo.getDeviceToken(),
  getFirstInstallTime: await DeviceInfo.getFirstInstallTime(),
  getFingerprint: await DeviceInfo.getFingerprint(),
  getFontScale: await DeviceInfo.getFontScale(),
  getFreeDiskStorage: await DeviceInfo.getFreeDiskStorage(),
  getFreeDiskStorageOld: await DeviceInfo.getFreeDiskStorageOld(),
  getHardware: await DeviceInfo.getHardware(),
  getHost: await DeviceInfo.getHost(),
  getIpAddress: await DeviceInfo.getIpAddress(),
  getIncremental: await DeviceInfo.getIncremental(),
  getInstallerPackageName: await DeviceInfo.getInstallerPackageName(),
  getInstallReferrer: await DeviceInfo.getInstallReferrer(),
  getInstanceId: await DeviceInfo.getInstanceId(),
  getLastUpdateTime: await DeviceInfo.getLastUpdateTime(),
  getMacAddress: await DeviceInfo.getMacAddress(),
  getManufacturer: await DeviceInfo.getManufacturer(),
  getMaxMemory: await DeviceInfo.getMaxMemory(),
  getModel: await DeviceInfo.getModel(),
  getPhoneNumber: await DeviceInfo.getPhoneNumber(),
  getPowerState: await DeviceInfo.getPowerState(),
  getProduct: await DeviceInfo.getProduct(),
  getPreviewSdkInt: await DeviceInfo.getPreviewSdkInt(),
  getReadableVersion: await DeviceInfo.getReadableVersion(),
  getSerialNumber: await DeviceInfo.getSerialNumber(),
  getSecurityPatch: await DeviceInfo.getSecurityPatch(),
  getSystemAvailableFeatures: await DeviceInfo.getSystemAvailableFeatures(),
  getSystemName: await DeviceInfo.getSystemName(),
  getSystemVersion: await DeviceInfo.getSystemVersion(),
  getTags: await DeviceInfo.getTags(),
  getType: await DeviceInfo.getType(),
  getTotalDiskCapacity: await DeviceInfo.getTotalDiskCapacity(),
  getTotalDiskCapacityOld: await DeviceInfo.getTotalDiskCapacityOld(),
  getTotalMemory: await DeviceInfo.getTotalMemory(),
  getUniqueId: await DeviceInfo.getUniqueId(),
  getUsedMemory: await DeviceInfo.getUsedMemory(),
  getUserAgent: await DeviceInfo.getUserAgent(),
  getUserAgentSync: await DeviceInfo.getUserAgentSync(),
  getVersion: await DeviceInfo.getVersion(),
  getBrightness: await DeviceInfo.getBrightness(),
  hasGms: await DeviceInfo.hasGms(),
  hasHms: await DeviceInfo.hasHms(),
  hasNotch: await DeviceInfo.hasNotch(),
  hasDynamicIsland: await DeviceInfo.hasDynamicIsland(),
  hasSystemFeature: await DeviceInfo.hasSystemFeature(),
  isAirplaneMode: await DeviceInfo.isAirplaneMode(),
  isBatteryCharging: await DeviceInfo.isBatteryCharging(),
  isEmulator: await DeviceInfo.isEmulator(),
  isKeyboardConnected: await DeviceInfo.isKeyboardConnected(),
  isLandscape: await DeviceInfo.isLandscape(),
  isLocationEnabled: await DeviceInfo.isLocationEnabled(),
  isMouseConnected: await DeviceInfo.isMouseConnected(),
  isHeadphonesConnected: await DeviceInfo.isHeadphonesConnected(),
  isPinOrFingerprintSet: await DeviceInfo.isPinOrFingerprintSet(),
  isTablet: await DeviceInfo.isTablet(),
  isTabletMode: await DeviceInfo.isTabletMode(),
  supported32BitAbis: await DeviceInfo.supported32BitAbis(),
  supported64BitAbis: await DeviceInfo.supported64BitAbis(),
  supportedAbis: await DeviceInfo.supportedAbis(),
  syncUniqueId: await DeviceInfo.syncUniqueId(),
});

const JSonDisplay = ({json}) => {
  return Object.entries(json).map(([k, v]) => (
    <List.Item title={k} description={JSON.stringify(v)} />
  ));
};
const Info = () => {
  const [deviceInfo, setDeviceInfo] = useState();
  const [networkInfo, setNetworkInfo] = useState();
  const {findBackend, setBackEnd, apiUrl} = useApi();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    // NetworkInfo.getIPV4Address().then(setIp);
    getDeviceInfo().then(setDeviceInfo);
    getNetworkInfo().then(setNetworkInfo);
  }, []);

  return (
    <>
      <Button icon = "cellphone-information" onPress={showDialog}>Afficher les infos</Button>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{maxHeight: '90%'}}>
          <Dialog.Title>Infos</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
              <List.Section title="Network">
                <JSonDisplay json={networkInfo} />
              </List.Section>
              <List.Section title="Device">
                <JSonDisplay json={deviceInfo} />
              </List.Section>

              {/* <Text>{JSON.stringify(networkInfo)}</Text>
              <Text>{JSON.stringify(deviceInfo)}</Text> */}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideDialog}>fermer</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default Info;

const styles = StyleSheet.create({});
