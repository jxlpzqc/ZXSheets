import React, { useEffect, useState } from 'react';
import { ButtonWithSmallImage, MainRibbon, RibbonGroup, RibbonTabPage } from './libs/ribbon'
import ReactDOM from 'react-dom'
import DefaultView from './layout/DefaultView';
import { createTheme, LayerHost, loadTheme, ThemeProvider } from '@fluentui/react';
import WindowButtons from './components/WindowButtons';
import classnames from './App.module.css';
import { isRunInElectron } from './utils';
import { Provider } from 'react-redux';
import store from './store'
import WorkingArea from './components/WorkingArea';

// Core theme color: #217346
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


export const stageLayerID = "__ZXSheets.Layers.Stage.Primary";

export default class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {
    }
  }


  public render() {

    const containerStyle: React.CSSProperties = {
      height: '100%'
    };
    return (
      <Provider store={store}>
        <div style={containerStyle}>
          <DefaultView>
            <WorkingArea/>
          </DefaultView>
        </div>
        <LayerHost className={classnames.layerStyle} id={stageLayerID}/>
        {/* Show window buttons only in electron mode. */}
        {isRunInElectron() &&
          <div className={classnames.closeBtns}>
            <WindowButtons/>
          </div>}
      </Provider>
    );
  }
}
