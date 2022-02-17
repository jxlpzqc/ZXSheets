import { getTheme } from '@fluentui/react';
import React from 'react';
import { MainRibbon, RibbonPalette, RibbonTabPage } from '../../libs/ribbon';

export interface IRibbonProps {
  currentBookName?: string;
  enabled?: boolean;
}

export interface IRibbonState {
  currentTab: number;
}

export default class Ribbon extends React.Component<IRibbonProps, IRibbonState> {
  constructor(props: IRibbonProps) {
    super(props);
    this.state = {
      currentTab: 0
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
      tabHover:theme.palette.themeDark
    };

    const titleName = this.props.currentBookName ? `${this.props.currentBookName} - ZXSheets` : 'ZXSheets'

    return (
      <MainRibbon
        palette={ribbonPalette}
        text={titleName}
        currentTab={this.state.currentTab}
        tabEvents={{
          onClick: (key) => { this.setState({ currentTab: key }) }
        }}
        enabled={this.props.enabled}
        
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

    );
  }
}
