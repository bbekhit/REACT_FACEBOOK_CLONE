export default {
  get: jest.fn(() => Promise.resolve({ data: "mocked" })),
  post: jest.fn(() => Promise.resolve({ data: "mocked" })),
  // get: jest.fn().mockResolveValue({data:{}}),
  default: jest.fn(() => Promise.resolve({ data: "mocked" })),
};
