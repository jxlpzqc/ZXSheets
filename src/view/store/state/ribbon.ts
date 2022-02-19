import { IBook } from '@/core/base/book'
import { ISheet } from '@/core/base/sheet';

export interface IBookTemplateViewModel {
  name: string;
  url: string;
  picUrl: string;
}

export interface IRibbonState {
  disabled: boolean | string[];
  backStageOpend: boolean;
  activeTab: number;
  localTemplateLoading: boolean;
  localTemplate: IBookTemplateViewModel[];
  remoteTemplateLoading: boolean;
  remoteTemplate: IBookTemplateViewModel[];
  activeStageTab: number;

}


const state: IRibbonState = {
  disabled: false,
  backStageOpend: false,
  activeTab: 0,
  localTemplateLoading: false,
  localTemplate: [],
  remoteTemplateLoading: false,
  remoteTemplate: [],
  activeStageTab: 0
}

export default state;