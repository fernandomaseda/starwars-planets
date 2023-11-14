import styled, { css } from 'styled-components';
import { typography, layout, space, border } from 'styled-system';
import type { FormInputProps } from '@utils/formHelper';
import type { SelectProps } from './Select';

export const Box = styled.div<Partial<FormInputProps> & Partial<SelectProps> & { hasSuffix: boolean, menuOverlap?: boolean }>`
  display: inline-block;
  position: relative;
  ${layout}
  ${typography}
  ${space}
  ${border}
  .Theme-transparent {
    .react-select__menu-list {
      ${({ menuOverlap }) => menuOverlap && `overflow-y: initial;`}
    }
    .react-select__control {
      background: ${({ theme }) => theme.colors.almostWhite};
      border: none;
      border-radius: 0px;
      outline: none;
      box-shadow: none;
      text-decoration: none;
      padding: 3px 7px;
      cursor: pointer;
      min-height: 2.625rem;
      :hover {
        background: ${({ theme }) => theme.colors.lightGrey};
      }
    }
    .react-select__single-value,
    .react-select__placeholder {
      color: ${({ theme }) => theme.colors.black};
      font-size: 14px;
      font-weight: 600;
    }
    .react-select__indicators {
      max-height: 2.125rem;
    } 
    .react-select__indicator {
      color: ${({ theme }) => theme.colors.black};
      ${({ hasSuffix }) => hasSuffix && `visibility: hidden;`}
    }
    .react-select__menu {
      margin: 0;
      border-radius: 0;
    }
    .react-select__option {
      &:not(.react-select__option--is-disabled) {
        cursor: pointer;
      }
      &:hover {
        background-color: ${({ theme }) => theme.colors.n_20};
      }
      &.react-select__option--is-focused {
        background-color: ${({ theme }) => theme.colors.n_20};
      }
      &.react-select__option--is-selected {
        background-color: ${({ theme }) => theme.colors.info_alt};
        color: ${({ theme }) => theme.colors.black};
      }
      &.react-select__option--is-disabled {
        background-color: ${({ theme }) => theme.colors.n_10};
      }
    }
    .react-select__value-container {
      flex-wrap: nowrap;
    }
  }
  .Select {
    font-family: 'Overpass', sans-serif;
    cursor: pointer;
  }
  .Select {
    &.react-select--is-disabled {
      cursor: not-allowed;
      .react-select__single-value,
      .react-select__placeholder {
        color: ${({ theme }) => theme.colors.lightGrey};
      }
      .react-select__indicator {
        color: ${({ theme }) => theme.colors.lightGrey};
      }
    }
  }
  .Select.disabled {
    font-family: 'Overpass', sans-serif;
  }
  .Select.big {
    .react-select__single-value,
    .react-select__placeholder {
      font-size: 1.250rem;
    }
  }
  .Select.small {
    .react-select__single-value,
    .react-select__placeholder {
      font-size: 0.875rem;
    }
  }
`;

export const floatingContainerStyles = css`
  position: absolute;
  top: 0.75rem;
  width: 2.125rem;
  height: 2.125rem;
  display: inline-block;
`;

export const PrefixContainer = styled.div`
  ${floatingContainerStyles}
  left: 1rem;
`;

export const SuffixContainer = styled.div`
  ${floatingContainerStyles}
  right: 0rem;
`;
