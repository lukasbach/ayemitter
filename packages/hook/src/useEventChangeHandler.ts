import { useEffect, useRef } from 'react';
import { EventEmitter, EventHandler } from 'typedemitter';

export const useEventChangeHandler = <T>(eventEmitter: EventEmitter<T>, handler: EventHandler<T>, dependencies: any[] = []) => {
  const eventHandler = useRef<undefined | number>();

  useEffect(() => {
    if (eventHandler.current !== undefined) {
      eventEmitter.delete(eventHandler.current);
    }

    eventHandler.current = eventEmitter.on(handler);

    return () => {
      if (eventHandler.current !== undefined) {
        eventEmitter.delete(eventHandler.current);
      }
    }
  }, [eventEmitter, ...dependencies]);
};
