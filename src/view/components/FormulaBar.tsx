import {
  CommandBar,
  CommandButton,
  getTheme,
  IButtonStyles,
  IconButton,
  IStyleFunctionOrObject,
  ITextFieldStyleProps,
  ITextFieldStyles,
  Stack, StackItem, TextField
} from '@fluentui/react';
import * as React from 'react';
import { connect } from 'react-redux'
import { AnyAction, Dispatch } from 'redux';
import Actions from '../store/actions';
import { RootState } from '../store/state';

export interface IFormulaBarProps {
  initialNameBoxWidth?: number;
  nameBoxText?: string;
  onNameBoxTextChange(value: string): void;
  cellContent?: string;
  onCellContentChange(value: string): void;
}

export interface IFormulaBarState {
  nameBoxWidth: number;
  showButtons: boolean;
}

class FormulaBar extends React.Component<IFormulaBarProps, IFormulaBarState> {

  constructor(props: IFormulaBarProps) {
    super(props);

    this.state = {
      nameBoxWidth: props.initialNameBoxWidth ?? 60,
      showButtons: false
    }
  }

  public render() {

    const theme = getTheme();

    const cmdButtonsStyles: IButtonStyles = {
      root: {
        height: '30px'
      },
      rootDisabled: {
        background: 'transparent',
      },

    };


    return (
      <Stack styles={{
        root: {
          background: theme.palette.neutralLight
        }
      }} horizontal >
        <TextField
          styles={{
            root: {
              margin: '10px 20px'
            }
          }}
          onChange={(e, v) => { if (v !== undefined) this.props.onNameBoxTextChange(v) }}
          value={this.props.nameBoxText} width={this.props.initialNameBoxWidth}></TextField>

        <Stack styles={{
          root: {
            margin: '10px 0px',
            background: theme.palette.white,
            border: `${theme.palette.neutralSecondary} solid 1px`,
            borderRight: '0',
            height: '32px'
          }
        }} horizontal>
          <IconButton
            iconProps={{
              iconName: 'Cancel'
            }}
            styles={cmdButtonsStyles}
            disabled={!this.state.showButtons} />
          <IconButton
            iconProps={{
              iconName: 'CheckMark'
            }}
            styles={cmdButtonsStyles}
            disabled={!this.state.showButtons} />
          <IconButton
            iconProps={{
              // Replace to 'fx' icon
              iconName: 'Code'
            }}
            styles={cmdButtonsStyles} />
        </Stack>

        <Stack.Item grow>
          <TextField
            styles={{
              root: {
                margin: '10px 20px 10px 0',
              }
            }}
            onBlur={() => { this.setState({ showButtons: false }) }}
            onFocus={() => { this.setState({ showButtons: true }) }}
            onChange={(e, v) => { if (v !== undefined) this.props.onCellContentChange(v) }}
            value={this.props.cellContent}></TextField>
        </Stack.Item>
      </Stack >
    );
  }
}


const mapStateToProps = (state: RootState) => ({
  nameBoxText: state.view.focusedCellID,
  cellContent: state.view.focusedCellContent
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNameBoxTextChange: (value: string) => { dispatch(Actions.view.changeFocusedCellID(value)); },
  onCellContentChange: (value: string) => { dispatch(Actions.view.changeFocusedCellContent(value)); }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormulaBar)

