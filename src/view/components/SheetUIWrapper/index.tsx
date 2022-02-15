import * as React from 'react';
import { ICell } from '@/core/base/cell';
import { ISheet } from '@/core/base/sheet';
import SheetUI from '@/ui';
import { Context } from '@/core/global/context'

export interface ISheetUIWrapperProps {
  /**
   * Sheet ID (will be found in opened books) or sheet object.
   */
  sheet: string | ISheet;
  focusedCellID: string;
  focusedCellContent?: string;
  selection: string[];
  onFocusedCellIDChange(newID: string): void;
  onSelectionChange(selection: string[]): void;

}

export interface ISheetUIWrapperState { }

export default class SheetUIWrapper extends React.Component<ISheetUIWrapperProps, ISheetUIWrapperState> {

  private sheetRef;
  private sheetUI?: SheetUI;

  constructor(props: ISheetUIWrapperProps) {
    super(props);

    this.sheetRef = React.createRef<HTMLDivElement>();
    this.state = {}
  }

  private get sheet(): ISheet | undefined {
    let sheet: ISheet | undefined;
    if (typeof (this.props.sheet) === 'string') {
      sheet = Context.book?.sheets.find((u) => u.sheetID == this.props.sheet);
    }
    else {
      sheet = this.props.sheet;
    }
    return sheet;
  }

  componentDidMount() {
    // init sheetui
    const element = this.sheetRef.current;

    const sheet = this.sheet;

    if (element && sheet) {
      this.sheetUI = new SheetUI(element, sheet);
    }
    else {
      // TODO: Console output should be convert to logger
      console.error("Sheet UI initialize error!");
    }

    // bind event handler
    if (this.sheetUI) {
      this.sheetUI.onFoucusedChange = (value) => {
        this.props.onFocusedCellIDChange(value);
      };

      this.sheetUI.onSelectionChange = (value) => {
        this.props.onSelectionChange(value);
      };
    }
  }

  componentDidUpdate() {
    this.sheetUI?.draw();
  }

  componentWillUnmount() {
    if (this.sheetUI) {
      this.sheetUI.onFoucusedChange = undefined;
      this.sheetUI.onSelectionChange = undefined;
    }
  }

  public render() {
    return (
      <div ref={this.sheetRef}>
      </div>
    );
  }
}
