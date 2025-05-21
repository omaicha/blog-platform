import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PostDetail from '../pages/PostDetail';

const mockStore = configureStore([thunk]);

test('displays post content and comments', async () => {
  const mockPost = {
    title: 'Test Post',
    content: '<p>Test content</p>',
    comments: [
      { text: 'Great post!', user: { username: 'user1' } }
    ]
  };

  jest.spyOn(axios, 'get').mockResolvedValue({ data: mockPost });

  render(
    <Provider store={mockStore({ auth: { user: null } })}>
      <PostDetail />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('Great post!')).toBeInTheDocument();
  });
});
