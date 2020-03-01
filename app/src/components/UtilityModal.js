import React from 'react';
import { Modal, Image, Header } from 'semantic-ui-react';
import UtilityButton from './UtilityButton';

const UtilityModal = (props) => (
  <Modal
    open={props.open}
    closeIcon
    closeOnDimmerClick
    closeOnDocumentClick
    trigger={<UtilityButton name={props.triggerName} icon={props.triggerIcon} />}
  >
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image
        wrapped
        size="medium"
        src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
      />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>Weve found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default UtilityModal;
