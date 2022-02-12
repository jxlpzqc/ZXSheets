import { Stack, StackItem, TextField } from '@fluentui/react';
import * as React from 'react';

export interface IFormulaBarProps {
  initialNameBoxWidth?: number;
  nameBoxText: string;
  onNameBoxTextChange(value: string): void;
  cellContent: string;
  onCellContentChange(value: string): void;
}

export interface IFormulaBarState {
  nameBoxWidth: number;
  nameBoxText: string;
  cellContent: string;
}

class FormulaBar extends React.Component<IFormulaBarProps, IFormulaBarState> {

  private static defaultProps: Partial<IFormulaBarProps> = {
    initialNameBoxWidth: 60
  };

  constructor(props: IFormulaBarProps) {
    super(props);

    this.state = {
      nameBoxWidth: props.initialNameBoxWidth!,
      nameBoxText: "",
      cellContent: ""
    }
  }

  public render() {
    return (
      <Stack horizontal>
        <TextField value={this.state.nameBoxText} width={this.props.initialNameBoxWidth}></TextField>
        <Stack.Item grow>
          <TextField value={this.state.cellContent}></TextField>
        </Stack.Item>
      </Stack>
    );
  }
}

export function getFormularBar(): React.ReactElement<FormulaBar> {

  return (<FormulaBar initialNameBoxWidth={50} nameBoxText='A1' onNameBoxTextChange={(e) => { }}
    cellContent='' onCellContentChange={(e) => { }}></FormulaBar>);
}

