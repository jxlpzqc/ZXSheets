import * as React from 'react';
import { ICell } from '@/core/base/cell';
import { ISheet } from '@/core/base/sheet';
import SheetUI from '@/ui';
import { Context } from '@/core/global/context'
import { connect } from 'react-redux';
import { RootState } from '@/view/store/state';
import { AnyAction, Dispatch } from 'redux';
import Actions from '@/view/store/actions';

export interface ISheetUIWrapperProps {
  /**
   * Sheet ID (will be found in opened books) or sheet object.
   */
  sheet: string | ISheet;
  focusedCellID: string;
  // Useless
  // focusedCellContent?: string;
  selection: string[];
  onFocusedCellIDChange(newID: string): void;
  onSelectionChange(selection: string[]): void;
  onFocusedCellContentChange(newContent: string): void;
  leftTopCellID: string;
  shouldUpdate: boolean;
  onUpdateFinish(): void;
}

export interface ISheetUIWrapperState { }

class SheetUIWrapper extends React.Component<ISheetUIWrapperProps, ISheetUIWrapperState> {

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


  componentDidUpdate(preProps: ISheetUIWrapperProps) {
    if (this.props.leftTopCellID !== preProps.leftTopCellID || this.props.shouldUpdate) {

      this.sheetUI!.startCellIndex = this.props.leftTopCellID;
      // draw and call finish update event
      this.sheetUI?.draw();
      this.props.onUpdateFinish();
    }
    else if (this.props.selection !== preProps.selection || this.props.focusedCellID !== preProps.focusedCellID) {
      this.sheetUI?.drawSelectionLayer();
    }
    else {
      // TODO: convert to logger
      console.log("Component updated, but there is no need to update canvas.");
    }
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

const mapStateToProps = (state: RootState) => ({
  focusedCellID: state.view.focusedCellID,
  selection: state.view.selection,
  leftTopCellID: state.view.leftTopCellID,
  shouldUpdate: state.view.shouldUpdate

});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  onFocusedCellIDChange(newID: string): void {
    dispatch(Actions.view.changeFocusedCellID(newID));
  },
  onSelectionChange(selection: string[]): void {
    dispatch(Actions.view.changeSelection(selection));
  },
  onFocusedCellContentChange(newContent: string): void {
    dispatch(Actions.view.changeFocusedCellContent(newContent));
  },
  onUpdateFinish() {
    dispatch(Actions.view.finishUpdate());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SheetUIWrapper);