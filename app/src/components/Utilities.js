import React from 'react';
import { GiWaterDrop, GiElectric } from 'react-icons/gi';
import { IoMdFlame } from 'react-icons/io';
import UtilityModal from './UtilityModal';

const Utilities = () => {
  const utilities = [
    { name: 'Electric', icon: <GiElectric /> },
    { name: 'Water', icon: <GiWaterDrop /> },
    { name: 'Natural Gas', icon: <IoMdFlame /> },
  ];

  return (
    <div style={{ flexDirection: 'column' }}>
      {utilities.map((utility) => (
        <div style={{ marginBottom: '10px' }}>
          <UtilityModal triggerName={utility.name} triggerIcon={utility.icon} />
        </div>
      ))}
    </div>
  );
};

export default Utilities;
