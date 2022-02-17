import { RootState } from '@/view/store/state';
import { getTheme } from '@fluentui/react';
import React, { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { MainRibbon, RibbonPalette, RibbonTabPage } from '../../libs/ribbon';
import Stage from './Stage';

export interface IRibbonProps {
  currentBookName?: string;
  disabled?: boolean | string[];
  currentTab: number;
  onCurrentTabChange: (tab: number) => void;
  stageOpend: boolean;
  onStageOpen: () => void;
}

export function getRibbonEnabled(disabled: boolean | string[] = false, moduleName: string = ""): boolean {
  if (typeof (disabled) == 'boolean') return !disabled;
  else {
    return (disabled.indexOf(moduleName) === -1);
  }
}

class Ribbon extends React.Component<IRibbonProps> {
  constructor(props: IRibbonProps) {
    super(props);
    this.state = {
      currentTab: 0,
      stageOpend: false
    }
  }

  public render() {
    const theme = getTheme();
    const ribbonPalette: RibbonPalette = {
      main: theme.palette.themePrimary,
      inActiveTab: theme.palette.white,
      activeBackStageButton: theme.palette.themeDark,
      backStageButton: theme.palette.themeSecondary,
      tabBody: theme.palette.neutralLighter,
      backStageText: theme.palette.themeLight,
      tabHover: theme.palette.themeDark
    };

    const titleName = this.props.currentBookName ? `${this.props.currentBookName} - ZXSheets` : 'ZXSheets'


    return (

      <>
        <MainRibbon
          palette={ribbonPalette}
          text={titleName}
          currentTab={this.props.currentTab}
          tabEvents={{
            onClick: this.props.onCurrentTabChange
          }}
          enabled={getRibbonEnabled(this.props.disabled, 'root')}
          fileButtonEvents={{
            onClick: this.props.onStageOpen
          }}
        >
          <RibbonTabPage text='开始'>

          </RibbonTabPage>
          <RibbonTabPage text='插入'>

          </RibbonTabPage>
          <RibbonTabPage text='页面布局'>

          </RibbonTabPage>
          <RibbonTabPage text='公式'>

          </RibbonTabPage>
        </MainRibbon>
        <Stage></Stage>
      </>
    );
  }
}

import Actions from '@/view/store/actions'
import { connect } from 'react-redux';



const mapStateToProps = (state: RootState) => ({
  enabled: state.ribbon.disabled !== true,
  currentTab: state.ribbon.activeTab,
  stageOpend: state.ribbon.backStageOpend
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({

  onCurrentTabChange(tab: number) {
    dispatch(Actions.ribbon.changeActiveTab(tab));
  },
  onStageOpen() {
    dispatch(Actions.ribbon.changeBackStageOpend(true));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Ribbon);