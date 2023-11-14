import styled from 'styled-components';
import { layout, space } from 'styled-system';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.5rem;
  background-color: #ffffff;
  width: 100%;
  min-height: 100vh;
  ${layout}
  ${space}
  @media (max-width: 768px) {
    padding: 1.5rem;
  }  
`;
