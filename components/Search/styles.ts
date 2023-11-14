import styled from 'styled-components';
import Box from '@components/Box';
import Skeleton from 'react-loading-skeleton';
import { space } from 'styled-system';


export const CloseContainer = styled(Box)`
  :hover {
    background-color: ${({ theme: { colors } }) => colors.middleGrey};
  }
`;

export const SketelonStyle = styled(Skeleton)`
  ${space}
`;