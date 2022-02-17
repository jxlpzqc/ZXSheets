interface FullRibbonPalette {
  main: string;
  inActiveTab: string;
  tabHover: string;
  tabBody: string;
  backStageButton: string;
  backStageText: string;
  activeBackStageButton: string;
}

export type RibbonPalette = Partial<FullRibbonPalette>;

