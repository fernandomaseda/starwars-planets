import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../Input';
import { ThemeProvider } from 'styled-components';
import Config from '@config/index';

const InputWithTheme = (props) => (
  <ThemeProvider theme={Config.Theme}>
    <Input id="inputId" name="inputName" value="inputValue" {...props} />
  </ThemeProvider>
);

describe('Input component', () => {
  // Positive test case for rendering the component
  it('should render the Input component', () => {
    const { getByPlaceholderText } = render(<InputWithTheme onChange={jest.fn()} />);
    const inputElement = getByPlaceholderText('Type a text...');
    expect(inputElement).toBeInTheDocument();
  });

  // Positive test case for handling onChange event
  it('should handle onChange event', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(<InputWithTheme onChange={handleChange} />);
    const inputElement = getByPlaceholderText('Type a text...');
    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  // Positive test case for handling onFocus event
  it('should handle onFocus event', () => {
    const handleFocus = jest.fn();
    const { getByPlaceholderText } = render(
      <InputWithTheme onChange={jest.fn()} onFocus={handleFocus} />
    );
    const inputElement = getByPlaceholderText('Type a text...');
    fireEvent.focus(inputElement);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleFocus).toHaveBeenCalledWith(expect.any(Object));
  });

  // Positive test case for handling onBlur event
  it('should handle onBlur event', () => {
    const handleBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <InputWithTheme onChange={jest.fn()} onBlur={handleBlur} />
    );
    const inputElement = getByPlaceholderText('Type a text...');
    fireEvent.blur(inputElement);
    expect(handleBlur).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledWith(expect.any(Object));
  });

  // Positive test case for rendering with a prefix
  it('should render with a prefix', () => {
    const { getByTestId } = render(
      <InputWithTheme onChange={jest.fn()} prefix={<span data-testid="prefix">Prefix</span>} />
    );
    const prefixElement = getByTestId('prefix');
    expect(prefixElement).toBeInTheDocument();
  });

  // Positive test case for rendering with a suffix
  it('should render with a suffix', () => {
    const { getByTestId } = render(
      <InputWithTheme onChange={jest.fn()} suffix={<span data-testid="suffix">Suffix</span>} />
    );
    const suffixElement = getByTestId('suffix');
    expect(suffixElement).toBeInTheDocument();
  });
});
