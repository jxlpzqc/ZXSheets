import { connect } from 'react-redux'
import React, { Component, Dispatch } from 'react'
import { RootState } from '@/view/store/state'
import { AnyAction } from 'redux'
import { ISheet } from '@/core/base/sheet'
import { IBook } from '@/core/base/book'
import classnames from './index.module.css'
import SheetUIWrapper from './SheetUIWrapper'
import NothingOpenScreen from './NothingOpenScreen'
import { ScrollBar } from './ScrollBar'
import { Stack } from '@fluentui/react'
import Actions from '@/view/store/actions'

type IWorkingAreaProps = {
  currentBook?: IBook;
  currentSheet?: ISheet;
  onCurrentSheetChange(sheet: ISheet): void;
}


const WorkingArea: React.FC<IWorkingAreaProps> = (props) => {

  if (props.currentSheet) {
    return (
      <div className={classnames.gridContainer}>
        <SheetUIWrapper sheet={props.currentSheet}></SheetUIWrapper>
        <ScrollBar
          orientation='vertical'
          current={0}
          currentPageSize={10}
          total={100}
        ></ScrollBar>
        <Stack horizontal>
          {/* TODO: Sheet tabs. */}
          <div></div>
          <Stack.Item grow={1}>
            <ScrollBar
              orientation='horizontal'
              current={0}
              currentPageSize={10}
              total={100}
            ></ScrollBar>
          </Stack.Item>
        </Stack>
      </div >
    );
  }
  else {
    return (<NothingOpenScreen></NothingOpenScreen>);
  }

};

const mapStateToProps = (state: RootState) => ({
  currentBook: state.file.currentBook,
  currentSheet: state.file.currentSheet
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  const { file: FileActions } = Actions;
  return {
    onCurrentSheetChange(sheet: ISheet) {
      dispatch(FileActions.changeCurrentSheet(sheet))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkingArea)