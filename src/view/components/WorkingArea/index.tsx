import { connect } from 'react-redux'
import React, { Component, Dispatch } from 'react'
import { RootState } from '@/view/store/state'
import { AnyAction } from 'redux'
import { ISheet } from '@/core/base/sheet'
import { IBook } from '@/core/base/book'

type IWorkingAreaProps = {
  currentBook: IBook;
  currentSheet: ISheet;
  onCurrentSheetChange(sheet: ISheet): void;
}


export class WorkingArea extends Component<IWorkingAreaProps> {

  render() {
    return (
      <div>WorkingArea</div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WorkingArea)