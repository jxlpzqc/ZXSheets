import { stageLayerID } from '@/view/App'
import BackStagePage from '@/view/libs/ribbon/BackStage/Page'
import BackStageView from '@/view/libs/ribbon/BackStage/View'
import { Layer } from '@fluentui/react'
import { number } from 'prop-types'
import React, { useState } from 'react'

type IStageProps = {
  enabled?: boolean,
  show?: boolean,
  currentStageTab: number
  onClose(): void
  onStageTabChange(t:number): void;
}

function Stage(props: IStageProps) {
  const { enabled, show, onClose } = props;
  if (show) {
    return (
      <Layer styles={{
        root: {
          pointerEvents: 'all'
        }
      }} hostId={stageLayerID}>
        <BackStageView
          events={{
            onClick: onClose
          }}
          currentPage={props.currentStageTab}
          onTabClick={(e)=>props.onStageTabChange(e)}
          enable={enabled}
          visible={true}
        >
          <BackStagePage text='主页'>

          </BackStagePage>
          <BackStagePage text='新建'>
            <NewPage></NewPage>
          </BackStagePage>
          <BackStagePage text='打开'>

          </BackStagePage>
        </BackStageView>
      </Layer>
    )
  }
  else {
    return <></>
  }
}
import Actions from '@/view/store/actions'
import { connect } from 'react-redux';
import { RootState } from '@/view/store/state'
import { AnyAction, Dispatch } from 'redux'
import { getRibbonEnabled } from '..'
import NewPage from './NewPage'


const mapStateToProps = (state: RootState) => ({
  enabled: getRibbonEnabled(state.ribbon.disabled, 'stage'),
  show: state.ribbon.backStageOpend,
  currentStageTab: state.ribbon.activeStageTab
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  onClose() {
    dispatch(Actions.ribbon.changeBackStageOpend(false));
  },
  onStageTabChange(tab: number) {
    dispatch(Actions.ribbon.changeActiveStageTab(tab));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Stage);