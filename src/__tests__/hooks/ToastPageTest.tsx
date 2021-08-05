import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ToastProvider, useToast } from '../../hooks/toast';
import { uuid } from 'uuidv4';

const ToastPageTest: React.FC = () => {
  const { addToast } = useToast();

  function handleAddToast(
    type?: 'success' | 'info' | 'error' | undefined
  ): void {
    addToast({
      type,
      title: 'title123',
      description: 'description123',
    });
  }

  return (
    <div>
      <h1>Test Toast</h1>
      <button type="button" onClick={() => handleAddToast()}>
        Add Toast
      </button>
      <button type="button" onClick={() => handleAddToast('success')}>
        Add Toast With Type
      </button>
    </div>
  );
};

jest.mock('uuidv4', () => {
  return {
    uuid: jest.fn(),
  };
});

describe('Toast hook', () => {
  beforeEach(() => {
    (uuid as jest.Mock).mockImplementation(() => 'unique-id');
  });

  it('should be able to add toast', () => {
    const { getByText } = render(<ToastPageTest />, {
      wrapper: ToastProvider,
    });

    const addToastButton = getByText('Add Toast');

    fireEvent.click(addToastButton);

    const titleElement = getByText('title123');
    const descriptionElement = getByText('description123');

    expect(uuid).toBeCalledTimes(1);
    expect(titleElement).toBeTruthy();
    expect(descriptionElement).toBeTruthy();
  });

  it('should be able to remove toast when clicked', async () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <ToastPageTest />,
      {
        wrapper: ToastProvider,
      }
    );

    const addToastButton = getByText('Add Toast With Type');

    fireEvent.click(addToastButton);

    const removeToastButton = getByTestId('remove-toast-button');

    fireEvent.click(removeToastButton);

    await waitFor(() => {
      expect(queryByTestId('toast-message')).not.toBeInTheDocument();
    });
  });

  it('should be able to remove toast when timeout', async () => {
    const { getByText, queryByTestId } = render(<ToastPageTest />, {
      wrapper: ToastProvider,
    });

    const addToastButton = getByText('Add Toast');

    fireEvent.click(addToastButton);

    await waitFor(
      () => {
        expect(queryByTestId('toast-message')).not.toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  });
});
