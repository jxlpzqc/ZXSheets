import { Stack } from '@fluentui/react';
import * as React from 'react';
import FormulaBar from '../components/FormulaBar';

import Ribbon from '../components/Ribbon';
import StatusBar from '../components/StatusBar';
import { LayoutContainer } from './LayoutContainer';

interface IDefaultViewProps {
  showRibbon?: boolean;
  showStatusBar?: boolean;
}

const DefaultView: React.FunctionComponent<IDefaultViewProps> = (props) => {
  return (
    <Stack styles={{
      root: {
        height: '100%'
      }
    }}>
      <div>
        <Ribbon />
      </div>
      <FormulaBar initialNameBoxWidth={60}></FormulaBar>
      <Stack.Item grow>
        <div>
          {props.children}
        </div>
      </Stack.Item>
      <StatusBar desc='就绪' view='default' zoom={1} onzoom={(e) => { }} />

    </Stack>
  )
};

export default DefaultView;
