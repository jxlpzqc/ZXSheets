import { getTheme } from '@fluentui/react';
import React from 'react';
import { MainRibbon, RibbonTabPage } from '../../libs/ribbon';

export interface IRibbonProps {
}

export interface IRibbonState {
}

export default class Ribbon extends React.Component<IRibbonProps, IRibbonState> {
  constructor(props: IRibbonProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    const theme = getTheme();
    const ribbonPalette = {
      main: theme.palette.themePrimary,
      inActiveTab: theme.palette.white,
      activeBackStageButton: theme.palette.themeDark,
      backStageButton: theme.palette.themeSecondary,
      tabBody: theme.palette.neutralLighter,
      backStageText: theme.palette.themeLight
    };
    return (
      <MainRibbon palette={ribbonPalette} text='Book1 - ZXSheet'>
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
