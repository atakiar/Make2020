import React from 'react';
import { Button } from 'semantic-ui-react';
import colors from '../../utils/colors';

const UtilityButton = (props) => (
  <Button
    basic
    fluid
    style={{
      flexDirection: 'row',
      height: '136px',
      fontSize: '32px',
      color: colors.black,
      backgroundColor: colors.white,
    }}
    {...props}
  >
    {props.icon}
    <div>{props.name}</div>
  </Button>
);

export default UtilityButton;
