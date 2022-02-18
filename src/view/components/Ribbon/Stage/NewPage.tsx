import { RootState } from '@/view/store/state'
import { IBookTemplateViewModel } from '@/view/store/state/ribbon'
import React from 'react'
import { AnyAction, Dispatch } from 'redux'

type INewPageProps = {
  localTemplate: IBookTemplateViewModel[],
  remoteTemplate: IBookTemplateViewModel[],
  loadingLocal: boolean;
  loadingRemote: boolean;
  newBook(template: IBookTemplateViewModel): void;
  fetchLocal(): void;
  fetchRemote(): void;
  cancel(): void;
}

function NewPage(props: INewPageProps) {


  React.useEffect(() => {
    props.fetchLocal();
    props.fetchRemote();
  }, []);

  const renderCard = (u: IBookTemplateViewModel) => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: u.picUrl,
          imageFit: ImageFit.centerContain,
          width: 200,
          height: 150,
        },
      ],
    };
    return (
      <DocumentCard
        onClick={() => { props.newBook(u) }}
        key={u.url}
      >
        <DocumentCardPreview {...previewProps} />
        <DocumentCardTitle
          title={u.name}
          shouldTruncate
        />
      </DocumentCard>)
  }
  const cardContainerTokens: IStackTokens = {
    childrenGap: 10,
  }


  return (
    <Page title='新建'>
      {/* 本地模板 */}
      {props.loadingLocal ?
        <div>
          <Spinner label="正在载入模板..." />
        </div> :
        <Stack horizontal tokens={cardContainerTokens}>
          {props.localTemplate.map(renderCard)}
        </Stack>
      }
      <Separator></Separator>
      <h2>联机模板</h2>
      {props.loadingRemote ?
        <div>
          <Spinner label="正在载入模板..." />
          <div style={{ textAlign: 'center', margin: '8px' }}>
            <DefaultButton text="取消" onClick={props.cancel} />
          </div>
        </div> :
        <Stack horizontal tokens={cardContainerTokens}>
          {props.remoteTemplate.map(renderCard)}
        </Stack>
      }

    </Page>
  )
}

import Actions from '@/view/store/actions'
import { DefaultButton, divProperties, DocumentCard, DocumentCardActivity, DocumentCardPreview, DocumentCardTitle, IDocumentCardPreviewProps, ImageFit, IStackTokens, Label, Separator, Spinner, Stack } from '@fluentui/react'
import { connect } from 'react-redux'
import Page from './Page'
const { ribbon: RibbonActions } = Actions;

const mapStateToProps = (state: RootState) => ({
  localTemplate: state.ribbon.localTemplate,
  remoteTemplate: state.ribbon.remoteTemplate,
  loadingLocal: state.ribbon.localTemplateLoading,
  loadingRemote: state.ribbon.remoteTemplateLoading
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  fetchLocal() {
    dispatch(RibbonActions.fetchLocalTemplate());
  },
  fetchRemote() {
    dispatch(RibbonActions.fetchRemoteTemplate());
  },
  cancel() {
    dispatch(RibbonActions.cancelFetchRemoteTemplate());
  },
  newBook(template: IBookTemplateViewModel) {
    // TODO:
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(NewPage)