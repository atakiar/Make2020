import React from 'react';
import { Card, Statistic } from 'semantic-ui-react';

const StatisticWrapper = (props) => (
  <Card centered>
    <Card.Content style={{ textAlign: 'center' }}>
      <Statistic size="small">
        <Statistic.Value>{props.title}</Statistic.Value>
        <Statistic.Label>{props.subtitle}</Statistic.Label>
      </Statistic>
    </Card.Content>
  </Card>
);

export default StatisticWrapper;
