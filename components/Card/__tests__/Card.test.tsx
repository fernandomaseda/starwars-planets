import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';
import { ThemeProvider } from 'styled-components';
import Config from '@config/index';

const CardWithTheme = (props) => (
  <ThemeProvider theme={Config.Theme}>
    <Card {...props} />
  </ThemeProvider>
);

describe('Card component', () => {
  test('renders card component correctly', () => {
    render(<CardWithTheme title="Test Title" description="Test Description" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('calls onClick function when card is clicked', () => {
    const onClickMock = jest.fn();
    render(<CardWithTheme onClick={onClickMock} />);

    fireEvent.click(screen.getByTestId('card-container'));

    expect(onClickMock).toHaveBeenCalled();
  });

  test('renders skeleton component when loading is true', () => {
    render(<CardWithTheme loading width={300} height={200} />);

    expect(screen.getByTestId('skeleton-component')).toBeInTheDocument();
  });

  test('renders image component when img prop is provided', () => {
    render(<CardWithTheme img="test-image.jpg" title="Test Title" />);

    expect(screen.getByAltText('Test Title')).toBeInTheDocument();
    expect(screen.getByAltText('Test Title')).toHaveAttribute('src', 'test-image.jpg');
  });
});
