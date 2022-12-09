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
  IPAddress: await NetworkInfo.getIPAddress(),
  IPV4Address: await NetworkInfo.getIPV4Address(),
  Broadcast: await NetworkInfo.getBroadcast(),
  SSID: await NetworkInfo.getSSID(),
  BSSID: await NetworkInfo.getBSSID(),
  Subnet: await NetworkInfo.getSubnet(),
  GatewayIPAddress: await NetworkInfo.getGatewayIPAddress(),
  Frequency: await NetworkInfo.getFrequency(),
});
const getDeviceInfo = async () => ({
  AndroidId: await DeviceInfo.getAndroidId(),
  ApiLevel: await DeviceInfo.getApiLevel(),
  ApplicationName: await DeviceInfo.getApplicationName(),
  AvailableLocationProviders: await DeviceInfo.getAvailableLocationProviders(),
  BaseOs: await DeviceInfo.getBaseOs(),
  BuildId: await DeviceInfo.getBuildId(),
  BatteryLevel: await DeviceInfo.getBatteryLevel(),
  Bootloader: await DeviceInfo.getBootloader(),
  Brand: await DeviceInfo.getBrand(),
  BuildNumber: await DeviceInfo.getBuildNumber(),
  BundleId: await DeviceInfo.getBundleId(),
  isCameraPresent: await DeviceInfo.isCameraPresent(),
  Carrier: await DeviceInfo.getCarrier(),
  Codename: await DeviceInfo.getCodename(),
  Device: await DeviceInfo.getDevice(),
  DeviceId: await DeviceInfo.getDeviceId(),
  DeviceType: await DeviceInfo.getDeviceType(),
  Display: await DeviceInfo.getDisplay(),
  DeviceName: await DeviceInfo.getDeviceName(),
  DeviceToken: await DeviceInfo.getDeviceToken(),
  FirstInstallTime: await DeviceInfo.getFirstInstallTime(),
  Fingerprint: await DeviceInfo.getFingerprint(),
  FontScale: await DeviceInfo.getFontScale(),
  FreeDiskStorage: await DeviceInfo.getFreeDiskStorage(),
  FreeDiskStorageOld: await DeviceInfo.getFreeDiskStorageOld(),
  Hardware: await DeviceInfo.getHardware(),
  Host: await DeviceInfo.getHost(),
  IpAddress: await DeviceInfo.getIpAddress(),
  Incremental: await DeviceInfo.getIncremental(),
  InstallerPackageName: await DeviceInfo.getInstallerPackageName(),
  InstallReferrer: await DeviceInfo.getInstallReferrer(),
  InstanceId: await DeviceInfo.getInstanceId(),
  LastUpdateTime: await DeviceInfo.getLastUpdateTime(),
  MacAddress: await DeviceInfo.getMacAddress(),
  Manufacturer: await DeviceInfo.getManufacturer(),
  MaxMemory: await DeviceInfo.getMaxMemory(),
  Model: await DeviceInfo.getModel(),
  PhoneNumber: await DeviceInfo.getPhoneNumber(),
  PowerState: await DeviceInfo.getPowerState(),
  Product: await DeviceInfo.getProduct(),
  PreviewSdkInt: await DeviceInfo.getPreviewSdkInt(),
  ReadableVersion: await DeviceInfo.getReadableVersion(),
  SerialNumber: await DeviceInfo.getSerialNumber(),
  SecurityPatch: await DeviceInfo.getSecurityPatch(),
  SystemAvailableFeatures: await DeviceInfo.getSystemAvailableFeatures(),
  SystemName: await DeviceInfo.getSystemName(),
  SystemVersion: await DeviceInfo.getSystemVersion(),
  Tags: await DeviceInfo.getTags(),
  Type: await DeviceInfo.getType(),
  TotalDiskCapacity: await DeviceInfo.getTotalDiskCapacity(),
  TotalDiskCapacityOld: await DeviceInfo.getTotalDiskCapacityOld(),
  TotalMemory: await DeviceInfo.getTotalMemory(),
  UniqueId: await DeviceInfo.getUniqueId(),
  UsedMemory: await DeviceInfo.getUsedMemory(),
  UserAgent: await DeviceInfo.getUserAgent(),
  UserAgentSync: await DeviceInfo.getUserAgentSync(),
  Version: await DeviceInfo.getVersion(),
  Brightness: await DeviceInfo.getBrightness(),
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
