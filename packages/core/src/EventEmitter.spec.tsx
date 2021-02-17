import React from 'react';
import { EventEmitter } from './EventEmitter';

test('number of handlers are computed properly', () => {
  const emitter = new EventEmitter<string>();
  expect(emitter.numberOfHandlers).toBe(0);
  const handler1 = emitter.on(() => {});
  expect(emitter.numberOfHandlers).toBe(1);
  const handler2 = emitter.on(() => {});
  expect(emitter.numberOfHandlers).toBe(2);
  emitter.delete(handler1);
  expect(emitter.numberOfHandlers).toBe(1);
  emitter.off(handler2);
  expect(emitter.numberOfHandlers).toBe(0);
});

test('all handlers are called properly', () => {
  const fn1: jest.Mock = jest.fn();
  const fn2: jest.Mock = jest.fn();
  const emitter = new EventEmitter<string>();
  emitter.on(fn1);
  emitter.emit("test");
  expect(fn1).toBeCalledTimes(1);
  expect(fn1).toBeCalledWith("test");
  fn1.mockReset();
  const handler2 = emitter.on(fn2);
  emitter.emit("test2");
  expect(fn1).toBeCalledTimes(1);
  expect(fn1).toBeCalledWith("test2");
  expect(fn2).toBeCalledTimes(1);
  expect(fn2).toBeCalledWith("test2");
  fn1.mockReset();
  fn2.mockReset();
  emitter.off(handler2);
  emitter.emit("test3");
  expect(fn1).toBeCalledTimes(1);
  expect(fn1).toBeCalledWith("test3");
  expect(fn2).toBeCalledTimes(0);
});

test('async handlers are waited for', async () => {
  const emitter = new EventEmitter<string>();
  const completed: jest.Mock = jest.fn();
  const innerFn1: jest.Mock = jest.fn();
  const innerFn2: jest.Mock = jest.fn();
  const fn1: jest.Mock = jest.fn().mockImplementation(() =>
    new Promise<void>(res =>
      setTimeout(() => {
        innerFn1();
        res();
      })
    )
  );
  const fn2: jest.Mock = jest.fn().mockImplementation(() =>
    new Promise<void>(res =>
      setTimeout(() => {
        innerFn2();
        res();
      })
    )
  );
  emitter.on(fn1);
  emitter.on(fn2);
  emitter.emit("test").then(completed);
  expect(fn1).toBeCalledWith("test");
  expect(fn2).toBeCalledWith("test");
  expect(innerFn1).toBeCalledTimes(0);
  expect(innerFn2).toBeCalledTimes(0);
  expect(completed).toBeCalledTimes(0);
  await new Promise<void>(res => {
    setTimeout(() => {
      expect(innerFn1).toBeCalledTimes(1);
      expect(innerFn2).toBeCalledTimes(1);
      expect(completed).toBeCalledTimes(1);
      res();
    }, 100);
  });
});
