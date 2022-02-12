import React, { useEffect, useState } from 'react';
import { ButtonWithSmallImage, MainRibbon, RibbonGroup, RibbonTabPage } from './libs/ribbon'
import ReactDOM from 'react-dom'
import DefaultView from './layout/DefaultView';
import { createTheme, loadTheme, ThemeProvider } from '@fluentui/react';
import { WindowButtons } from './components/WindowButtons';
import classnames from './App.module.css';
import { Sheet } from '../core/sheet/sheet';
import { Context } from '../core/global/context';
import { SheetView } from '../ui/painter/view';
import { isRunInElectron } from './utils';

// #217346
const myTheme = createTheme({
  palette: {
    themePrimary: '#217346',
    themeLighterAlt: '#f2f9f5',
    themeLighter: '#cee9da',
    themeLight: '#a8d5bc',
    themeTertiary: '#62ab83',
    themeSecondary: '#318456',
    themeDarkAlt: '#1e673f',
    themeDark: '#195735',
    themeDarker: '#134027',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  }
});

loadTheme(myTheme);


export default class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const sheet = new Sheet();
    Context.sheet = sheet;
    sheet.editCell("A1", "1");
    sheet.editCell("A2", "1");
    sheet.editCell("B2", "4");
    sheet.editCell("A3", "总和");
    sheet.editCell("B3", "=sum(A1:B2)");

    const painter = new SheetView('sheet', sheet);
    painter.draw();
  }

  public render() {
    const containerStyle: React.CSSProperties = {
      height: '100%'
    };
    return (
      <div style={containerStyle}>
        <DefaultView>
          <div id="sheet" style={{
            height: '100%',
            width: '100%'
          }}></div>
        </DefaultView>
        {isRunInElectron() &&
          <div className={classnames.closeBtns}>
            <WindowButtons></WindowButtons>
          </div>}
      </div>
    );
  }
}
