import styled from 'styled-components';
import { typography, layout, color, space, system, border, flexbox, position } from 'styled-system';
import type {TextProps} from './Text';
import Skeleton from 'react-loading-skeleton';

export const StyledText = styled.p<TextProps & {$hoverColor: string}>`
  display: inline-block;
  word-break: normal;
  ${layout}
  ${space}
  ${color}
  ${typography}
  ${border}
  ${flexbox}
  ${position}
  ${system({
    textTransform: true,
    textDecoration: true,
    textAlign: true,
    whiteSpace: true,
    wordBreak: true,
    cursor: true,
    textOverflow: true,
  })}
  & > b {
    font-weight: bold;
  }
  :hover{
    ${({ $hoverColor, theme: { colors } }) => $hoverColor && `color: ${colors[$hoverColor]};`}
  }
`;

export const SketelonStyle = styled<any>(Skeleton)`
  ${space}
`;