import { useEventChangeHandler } from './useEventChangeHandler';
import { renderHook, act } from '@testing-library/react-hooks';
import { EventEmitter } from 'typedemitter';

test('hook rebinds handler on dependency change', () => {
  const emitter = new EventEmitter<string>();
  const handler: jest.Mock = jest.fn();
  const { rerender, unmount } = renderHook(
    (dep) => useEventChangeHandler(emitter, handler, [dep]),
    { initialProps: { dep: 1 } }
  );
  emitter.emit("test");
  expect(handler).toBeCalledTimes(1);
  expect(handler).toBeCalledWith("test");
  handler.mockReset();
  rerender({ dep: 2 });
  emitter.emit("test2");
  expect(handler).toBeCalledTimes(1);
  expect(handler).toBeCalledWith("test2");
  handler.mockReset();
  unmount();
  emitter.emit("test3");
  expect(handler).toBeCalledTimes(0);
});
