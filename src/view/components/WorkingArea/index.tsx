import { connect } from 'react-redux'
import React, { Component, Dispatch } from 'react'
import { RootState } from '@/view/store/state'
import { AnyAction } from 'redux'
import { ISheet } from '@/core/base/sheet'
import { IBook } from '@/core/base/book'
import classnames from 'index.module.css'
import SheetUIWrapper from './SheetUIWrapper'
import NothingOpenScreen from './NothingOpenScreen'
import { ScrollBar } from './ScrollBar'
import { Stack } from '@fluentui/react'

type IWorkingAreaProps = {
  currentBook: IBook;
  currentSheet: ISheet;
  onCurrentSheetChange(sheet: ISheet): void;
}


export const WorkingArea: React.FC<IWorkingAreaProps> = (props) => {
  return (
    <>
      <div className={classnames.gridContainer}>
        {props.currentSheet ?
          (<SheetUIWrapper sheet={props.currentSheet}></SheetUIWrapper>) :
          (<NothingOpenScreen></NothingOpenScreen>)
        }
      </div>
      <ScrollBar
        orientation='vertical'
        current={0}
        currentPageSize={10}
        total={100}
      ></ScrollBar>
      <Stack horizontal>
        {/* TODO: Sheet tabs. */}
        <div></div>
        
        <ScrollBar
          orientation='horizental'
          current={0}
          currentPageSize={10}
          total={100}
        ></ScrollBar>
      </Stack>
    </>
  )
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WorkingArea)