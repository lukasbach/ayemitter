import { useCustomHook } from './useCustomHook';
import { renderHook, act } from '@testing-library/react-hooks';

test('should increment counter', () => {
  const { result } = renderHook(() => useCustomHook());
  act(() => {
    result.current[1]();
  });
  expect(result.current[0]).toBe(1);
});
