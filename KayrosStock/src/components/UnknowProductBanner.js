import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Banner,
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import {useTranslation} from '../hooks/Translation';
import {StyleSheet} from 'react-native';
import {useApi} from '../hooks/useApi';

function UnknowProductBanner({
  visible: bannerVisible,
  productIdCode,
  onSetProduct,
}) {
  const {translate} = useTranslation();
  const [popupVisible, setPopupVisible] = useState(false);
  const [curValue, setCurValue] = useState('');
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(false);
  const {get, post} = useApi();

  const hideDialog = () => setPopupVisible(false);
  const showDialog = () => setPopupVisible(true);

  useEffect(() => {
    setCurValue('');
  }, [popupVisible]);

  useEffect(() => {
    setArticle(false);
    setLoading(true);
    get('roll/article/' + curValue)
      .then(setArticle)
      .finally(() => setLoading(false));
  }, [curValue, get]);
  //   const search = async() => {
  //     setArticle(false)
  //     setLoading(true)
  //     get("article/"+curValue).then(setArticle).finally(()=> setLoading(false))
  //   }

  const handleValidate = async () => {
    console.log('product/' + productIdCode + '/seq/' + curValue);
    await post('roll/product/' + productIdCode + '/seq/' + curValue);
    setPopupVisible(false);
    onSetProduct();
  };

  console.log(article);
  return (
    <>
      <Banner
        style={styles.bannerError}
        visible={bannerVisible}
        actions={[
          {
            label: translate('rollManagment.addProduct'),
            onPress: showDialog,
          },
        ]}>
        {translate('rollManagment.unknowProduct') +
          ' ' +
          productIdCode.substring(6, 12)}
      </Banner>
      <Portal>
        <Dialog visible={popupVisible} onDismiss={hideDialog}>
          <Dialog.Title>
            {translate('rollManagment.newProductTitle')}
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={curValue}
              autoFocus
              onChangeText={setCurValue}
              autoComplete="off"
              keyboardType="number-pad"
            />
            {loading ? <ActivityIndicator /> : null}
            {article ? <Text>{article.label}</Text> : null}
          </Dialog.Content>
          <Dialog.Actions>
            <Button disabled={!article} onPress={handleValidate}>
              {translate('ok')}
            </Button>
            <Button onPress={hideDialog}>{translate('cancel')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

UnknowProductBanner.propTypes = {};

export default UnknowProductBanner;

const styles = StyleSheet.create({
  bannerError: {
    backgroundColor: '#dc7c7c',
    color: 'blue',
  },
});
