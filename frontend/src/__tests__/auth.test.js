import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import Register from '../../pages/Register';

test('shows password error when less than 6 characters', async () => {
  render(
    <Provider store={store}>
      <Register />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/password/i), { 
    target: { value: '12345' }
  });
  
  fireEvent.click(screen.getByText(/register/i));
  
  expect(await screen.findByText(/password must be at least 6 characters/i))
    .toBeInTheDocument();
});
