import { Stack } from '@fluentui/react';
import * as React from 'react';
import { getFormularBar } from '../components/FormulaBar';
import Ribbon from '../components/ribbon/Ribbon';
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
      {getFormularBar()}
      <Stack.Item grow>

        {props.children}

      </Stack.Item>
      <StatusBar desc='就绪' view='default' zoom={1} onzoom={(e) => { }} />

    </Stack>
  )
};

export default DefaultView;
