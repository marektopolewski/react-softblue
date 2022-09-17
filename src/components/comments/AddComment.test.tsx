import { render, screen } from '@testing-library/react';
import { click } from '@testing-library/user-event/dist/click';
import { type } from '@testing-library/user-event/dist/type';

import AddComment from './AddComment';
import { AnimatedButton, AnimatedButtonProps } from '../AnimatedButton';
import { useHttpRequest } from '../../hooks/UseHttpRequestHook';

type RequestFooArgs = Parameters<ReturnType<typeof useHttpRequest>[1]>[0];

jest.mock('../../hooks/UseHttpRequestHook');
jest.mock('../AnimatedButton');
jest.spyOn(window, 'alert');

describe('Test adding comments', () => {

  beforeEach(() => {
    (AnimatedButton as jest.Mock).mockImplementation((props: AnimatedButtonProps) => {
      return <button type={props.type}>{props.text}</button>;
    });
  });

  test('Form submited on "Send" clicked', () => {

    const mockOnAddedCallback = jest.fn();
    const mockFetch = jest.fn();
    (useHttpRequest as jest.Mock).mockReturnValue([null, (o: RequestFooArgs) => { mockFetch(o); }]);

    render(<AddComment onAdded={mockOnAddedCallback} />);

    const nameInput = screen.getByPlaceholderText(/Your Name/i);
    const emailInput = screen.getByPlaceholderText(/Your Email/i);
    const messageInput = screen.getByPlaceholderText(/Your Message/i);

    type(emailInput, 'test@email.com');
    type(messageInput, 'test message');
    type(nameInput, 'Test Name');

    const submitButton = screen.getByRole('button', { name: 'Send' });
    click(submitButton);

    const expectedArgs: RequestFooArgs = {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Name',
        email: 'test@email.com',
        content: 'test message'
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    expect(mockFetch).toBeCalled();
    expect(mockFetch).toBeCalledWith(expectedArgs);
    expect(mockOnAddedCallback).toBeCalled();
  });

  test('Do not submit if some form values are not provided', () => {

    const mockFetch = jest.fn();
    (useHttpRequest as jest.Mock).mockReturnValue([null, () => { mockFetch(); }]);

    render(<AddComment onAdded={() => {}} />);

    const emailInput = screen.getByPlaceholderText(/Your Email/i);
    const messageInput = screen.getByPlaceholderText(/Your Message/i);
    const submitButton = screen.getByRole('button', { name: 'Send' });

    click(submitButton);
    expect(mockFetch).not.toBeCalled();

    type(emailInput, 'test@email.com');
    type(messageInput, 'test message');

    click(submitButton);
    expect(mockFetch).not.toBeCalled();
  });

});
