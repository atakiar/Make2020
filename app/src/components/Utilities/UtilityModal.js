import React from 'react';
import { Modal } from 'semantic-ui-react';
import Chart from 'react-apexcharts';
import UtilityButton from './UtilityButton';

const UtilityModal = (props) => (
  <Modal
    closeIcon
    closeOnDimmerClick
    closeOnDocumentClick
    trigger={<UtilityButton name={props.triggerName} icon={props.triggerIcon} />}
  >
    <Modal.Header>{props.name}</Modal.Header>
    <Modal.Content>
      <Chart options={props.chartOptions} series={props.chartSeries} type="area" height={500} />
    </Modal.Content>
  </Modal>
);

export default UtilityModal;
