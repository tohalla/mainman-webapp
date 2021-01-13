// eslint-disable-next-line
import "rebass";

declare module "rebass" {
  export interface BoxKnownProps
    extends Omit<BaseProps, "css">,
      StyledSystem.SpaceProps,
      StyledSystem.LayoutProps,
      StyledSystem.FontSizeProps,
      StyledSystem.ColorProps,
      StyledSystem.FlexProps,
      StyledSystem.OrderProps,
      StyledSystem.AlignSelfProps,
      SxProps {
    variant?: StyledSystem.ResponsiveValue<string>;
    tx?: string;
  }

  export interface FlexKnownProps
    extends BoxKnownProps,
      StyledSystem.FlexGrowProps,
      StyledSystem.FlexShrinkProps,
      StyledSystem.FlexWrapProps,
      StyledSystem.FlexDirectionProps,
      StyledSystem.AlignItemsProps,
      StyledSystem.AlignContentProps,
      StyledSystem.AlignSelfProps,
      StyledSystem.JustifyItemsProps,
      StyledSystem.JustifyContentProps,
      StyledSystem.JustifySelfProps {}
}
