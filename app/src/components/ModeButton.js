import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import colors from '../utils/colors';

const ModeButton = (props) => (
  <Button
    fluid
    onClick={props.onClick}
    style={{
      height: '100px',
      fontSize: '32px',
      textAlign: 'left',
      color: colors.black,
      backgroundColor: props.selected ? colors.primary : colors.white,
    }}
  >
    <Icon name={props.icon} />
    {props.name}
  </Button>
);

export default ModeButton;
