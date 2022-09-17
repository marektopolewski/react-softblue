import { render, screen, getByRole } from '@testing-library/react';
import { click } from '@testing-library/user-event/dist/click';

import { useHttpRequest } from './hooks/UseHttpRequestHook';
import App from './App';

jest.mock('./hooks/UseHttpRequestHook');

describe('General app test', () => {

  test('comments button in nav invokes scroll', async () => {
    (useHttpRequest as jest.Mock).mockReturnValue([null, () => {}]);
    render(<App />);

    // wait for lazy to load
    const whatWeDo = await screen.findByText('WHAT WE DO');
    expect(whatWeDo).toBeVisible();

    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const navigation = screen.getByRole('navigation');
    const commentButton = getByRole(navigation, 'button', { name: 'Comments' })
    click(commentButton);

    expect(scrollIntoViewMock).toBeCalled();
  });

});
