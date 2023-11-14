import React, { forwardRef, useMemo, Ref, memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactSelect, {
  components as SelectComponents,
  OptionProps,
  Props as StateManagerProps,
} from 'react-select';
import type StateManagedSelect from 'react-select';
import { fromInputWrapper, FormInputProps } from '@utils/formHelper';
import { Box, SuffixContainer } from './styles';
import { SpaceProps, DisplayProps, LayoutProps } from 'styled-system';

export interface SelectProps extends SpaceProps, DisplayProps, LayoutProps {
  formInputProps: Omit<FormInputProps, 'onChange'> & Pick<StateManagerProps, 'onChange'>;
  loading?: boolean;
  options: { label: string; value: string }[];
  size?: 'small' | 'big';
  width?: string;
  height?: string;
  components?: typeof SelectComponents;
  isSearchable?: boolean;
  isMulti?: boolean;
  defaultValue: string | number | null;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  suffix?: React.ReactNode | string | string[];
}

const Select = forwardRef<StateManagedSelect, SelectProps>(
  (
    {
      formInputProps: {
        id,
        name,
        value,
        placeholder,
        required,
        disabled,
        onFocus,
        onBlur,
        onChange,
      },
      options,
      size = 'small',
      loading = false,
      width = '100%',
      height = '2.75rem',
      components,
      isSearchable = false,
      isMulti = false,
      defaultValue,
      menuPlacement = 'auto',
      suffix,
      ...rest
    }: SelectProps,
    ref
  ) => {
    const defaultInputValue = useMemo(() => {
      if (defaultValue) {
        if (typeof defaultValue === 'object') {
          return defaultValue;
        }
        return options.find((o) => o.label === defaultValue || o.value === defaultValue);
      }
      return null;
    }, [defaultValue, options]);

    const selectedValue = useMemo(() => {
      if (value) {
        if (typeof value === 'object') {
          return value;
        }
        return options.find((o) => o.label === value || o.value === value);
      }
      return null;
    }, [value, options]);

    if (loading) {
      return <Skeleton width={width} height={height} />;
    }
    return (
      <Box width={width} height={height} hasSuffix={!!suffix} {...rest}>
        <ReactSelect
          ref={ref as Ref<any>}
          id={id}
          name={name}
          className={`Select Theme-transparent ${size}`}
          classNamePrefix="react-select"
          options={options}
          onChange={onChange}
          isSearchable={isSearchable}
          isMulti={isMulti}
          value={selectedValue}
          defaultValue={defaultInputValue}
          required={required}
          placeholder={placeholder || 'Select'}
          isDisabled={disabled}
          components={{ IndicatorSeparator: () => null, ...components }}
          isOptionDisabled={(option: OptionProps) => !!option.isDisabled}
          menuPlacement={menuPlacement}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {suffix && <SuffixContainer>{suffix}</SuffixContainer>}
      </Box>
    );
  }
);

Select.displayName = 'Select';

export default memo(fromInputWrapper<SelectProps>(Select));
