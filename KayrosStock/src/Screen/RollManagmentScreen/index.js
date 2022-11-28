import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ScanerManager, {detectCodeType} from '../../components/ScanerManager';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Banner, Button, Card} from 'react-native-paper';
import {useTranslation} from '../../hooks/Translation';
import {useSnack} from '../../hooks/useSnack';
import {useData} from '../../hooks/data/provider';
import {useApi} from '../../hooks/useApi';
import InputPopup from '../../components/InputPopup';
import UnknowProductBanner from '../../components/UnknowProductBanner';

const RollManagmentScreen = ({inventory}) => {
  const [rollIdCode, setRollIdCode] = useState('');
  const [productIdCode, setProductIdCode] = useState('');
  const [rollDetailCode, setRollDetailCode] = useState('');
  const [bestBeforeCode, setBestBeforeCode] = useState('');
  const [supplierCode, setSupplierCode] = useState('');
  const [supplier, setSupplier] = useState();
  const [currentRoll, setCurrentRoll] = useState();
  const [product, setProduct] = useState();
  const [scanComplete, setScanComplete] = useState(false);
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});

  const {translate} = useTranslation();
  const {snack} = useSnack();
  const {providers} = useData();
  const {get, post} = useApi();

  const handleScan = code => {
    const codeType = detectCodeType(code);
    if (codeType === 'rollDetail') {
      return setRollDetailCode(code);
    }
    if (codeType === 'rollId') {
      setSupplierCode(code.substring(3, 9));
      return setRollIdCode(code);
    }
    if (codeType === 'bestBefore') {
      return setBestBeforeCode(code);
    }
    if (codeType === 'productCode') {
      // setSupplierCode(code.substring(0, 6));
      return setProductIdCode(code);
    }
    snack.error(translate('rollManagment.unknowCode'));
  };

  useEffect(() => {
    setSupplier(providers?.find?.(s => s.eanCode === supplierCode));
  }, [supplierCode, providers]);

  useEffect(() => {
    if (rollDetailCode) {
      setCurrentRoll({
        width: parseInt(rollDetailCode.substring(4, 8), 10),
        length: parseInt(rollDetailCode.substring(8, 13), 10),
        mandrelSize: parseInt(rollDetailCode.substring(13, 16), 10),
        windingDirection: rollDetailCode.substring(16, 17),
        fitting: rollDetailCode.substring(17, 18),
      });
    } else {
      setCurrentRoll(null);
    }
  }, [rollDetailCode]);

  useEffect(() => {
    setProduct(null);
    if (productIdCode) {
      get('roll/product/' + productIdCode.slice(0, 12))
        .then(p => {
          setProduct(p);
          setErrors(cur => ({...cur, unknowProduct: !p}));
        })
        .catch(e => console.error(e));
    } else {
      setErrors(cur => ({...cur, unknowProduct: false}));
    }
  }, [productIdCode, get, errors.unknowProduct]);

  useEffect(() => {
    const iscomplete = () => {
      if (errors && Object.values(errors).filter(e => e).length) {
        return false;
      }
      if (supplier?.codeCount === 3) {
        return rollIdCode && productIdCode && rollDetailCode;
      }
      return rollIdCode && productIdCode && rollDetailCode && bestBeforeCode;
    };
    setScanComplete(iscomplete);
  }, [
    supplier,
    rollIdCode,
    productIdCode,
    rollDetailCode,
    bestBeforeCode,
    errors,
  ]);

  useEffect(() => {
    if (rollIdCode) {
      get('roll/' + rollIdCode.slice(0, 20)).then(r => {
        if (r) {
          snack.error(translate('rollManagment.rollExists'));
          setErrors(cur => ({...cur, rollExists: true}));
        } else {
          setErrors(cur => ({...cur, rollExists: false}));
        }
      });
    } else {
      setErrors(cur => ({...cur, rollExists: false}));
    }
  }, [rollIdCode, get, snack, translate]);

  const reset = () => {
    setRollIdCode('');
    setProductIdCode('');
    setRollDetailCode('');
    setBestBeforeCode('');
    setSupplierCode('');
    setSupplier(null);
    setProduct(null);
    setCurrentRoll(null);
    setErrors({});
    setScanComplete(false);
  };
  const save = async () => {
    try {
      await post('/roll', {
        mode: inventory ? 'I' : 'L',
        rollIdCode,
        productIdCode,
        rollDetailCode,
        bestBeforeCode,
        location,
        length: currentRoll.length,
      });
      snack.success(translate('rollManagment.saveSuccess'));
      reset();
    } catch (e) {
      snack.error(translate('rollManagment.saveError'));
    }
  };

  const editLength = val => {
    setCurrentRoll(cur => ({...cur, length: val}));
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Text>{`${translate(
            'rollManagment.productIdCode',
          )}: ${productIdCode}`}</Text>
          <Text>{`${translate(
            'rollManagment.rollIdCode',
          )}: ${rollIdCode}`}</Text>
          <Text>{`${translate(
            'rollManagment.rollDetailCode',
          )}: ${rollDetailCode}`}</Text>
          <Text>{`${translate(
            'rollManagment.bestBeforeCode',
          )}: ${bestBeforeCode}`}</Text>
        </Card.Content>
      </Card>
      <Card style={styles.rollDetail}>
        <Card.Title title={supplier?.name} />
        <Card.Content>
          {product ? <Text>{product?.id + ' - ' + product?.name}</Text> : null}
          <UnknowProductBanner
            visible={errors.unknowProduct}
            productIdCode={productIdCode}
            onSetProduct={() =>
              setErrors(cur => ({...cur, unknowProduct: false}))
            }
          />
          {/* <Banner
            style={styles.bannerError}
            visible={errors.unknowProduct}
            actions={[
              {
                label: translate('rollManagment.addProduct'),
                onPress: addProduct,
              },
            ]}>
            {translate('rollManagment.unknowProduct') +
              ' ' +
              productIdCode.substring(6, 12)}
            <InputPopup
              value=""
              icon={translate('rollManagment.addProduct')}
              onChange={setNewArticle}
            />
          </Banner> */}
          <Text>{rollIdCode}</Text>
          <Banner
            style={styles.bannerError}
            visible={errors.rollExists}
            actions={[]}>
            {translate('rollManagment.rollExists')}
          </Banner>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text>{translate('roll.width')}</Text>
              <Text>
                {currentRoll?.width ? currentRoll?.width + ' mm' : ''}
              </Text>
            </View>
            <View style={styles.col}>
              <Text>{translate('roll.length')}</Text>
              <InputPopup
                value={currentRoll?.length}
                icon="pencil"
                onChange={editLength}
                hotKeys={['F2']}
              />
            </View>
            <View style={styles.col}>
              <Text>{translate('roll.location')}</Text>
              <InputPopup
                value={location}
                icon="pencil"
                onChange={setLocation}
                keyboardType="default"
                hotKeys={['F2']}
              />
            </View>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button onPress={reset}>{translate('cancel')}</Button>
          <Button disabled={!scanComplete} onPress={save}>
            {translate('ok')}
          </Button>
        </Card.Actions>
      </Card>
      <ScanerManager disabled={scanComplete} onScan={handleScan} />
    </ScrollView>
  );
};

export default RollManagmentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  bannerError: {
    backgroundColor: '#dc7c7c',
    color: 'blue',
  },
  rollDetail: {
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
  },
  hotkeys: {
    fontSize: 5,
  },
  col: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
