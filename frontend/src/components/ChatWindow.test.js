import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatWindow from './ChatWindow';
import { getAIMessage } from '../api/api';

process.env.REACT_APP_BACKEND_URL = "http://dummy-url";

jest.mock('../api/api', () => ({
    __esModule: true,
    getAIMessage: jest.fn((input) =>
      Promise.resolve({
        role: "assistant",
        content: "This is a simulated response for: " + input,
      })
    ),
  }));

  test('mock getAIMessage works', async () => {
    // Force the mock to resolve a value for this call
    getAIMessage.mockResolvedValueOnce({
      role: "assistant",
      content: "This is a simulated response for: test query",
    });
  
    const response = await getAIMessage("test query");
    expect(response).toEqual({
      role: "assistant",
      content: "This is a simulated response for: test query",
    });
  });