import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SelectInput from '../../../components/FormInput/SelectInput';
import SelectColor from '../../../components/SelectColor';
import GlidingSelect from '../components/GlidingSelect';
import VarnishSelect from '../components/VarnishSelect';
import LaminationSelect from '../components/LaminationSelect';
import SwitchInput from '../../../components/FormInput/SwitchInput';

function PrintSection({ form }) {
  const {
    control,
    watch,
  } = form;
  const { t } = useTranslation();
  const watchPrintProcess = watch('printProcess');

  return (
    <>
      <h2 id="printing">{ t('quotation.titles.print') }</h2>
      <SelectInput
        control={ control }
        name="printProcess"
        label={ t('quotation.printProcess') }
        options={ [
          { value: 103, label: t('quotation.printProcesses.flexo') },
          { value: 106, label: t('quotation.printProcesses.digital') },
        ] }
      />
      <SelectColor
        control={ control }
        name="print"
        label={ t('quotation.print') }
        process={ watchPrintProcess }
      />

      <GlidingSelect control={ control } label={ t('quotation.glidding') } />

      <VarnishSelect control={ control } label={ t('quotation.varnish') } />
      <LaminationSelect control={ control } label={ t('quotation.lamination') } />
      <SwitchInput
        control={ control }
        name="blackSpot"
        label={ t('quotation.blackSpot') }
      />
      <SwitchInput
        control={ control }
        name="perforation"
        label={ t('quotation.perforation') }
      />
    </>
  );
}

PrintSection.propTypes = {
  form: PropTypes.object,
};

export default PrintSection;
