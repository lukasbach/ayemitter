## ayemitter-hook

React hook component for [ayemitter](https://github.com/lukasbach/ayemitter/tree/master/packages/core).

## Usage

    yarn add ayemitter ayemitter-hook

```typescript jsx
import { EventEmitter } from 'ayemitter';
import { useEventChangeHandler } from 'ayemitter-hook';

const emitter = new EventEmitter<string>();
const Component = () => {
  const [state, setState] = useState('state1');
  useEventChangeHandler(
    emitter,
    () => {
      console.log('Hello!');
    },
    [state]
  ); // state is a dependency

  // The handler is rebinded to the emitter everytime the
  // handler or a dependency changes.

  return; // ...
};
```

## API

```typescript
const useEventChangeHandler: <T>(
  eventEmitter: EventEmitter<T>,
  handler: (payload: T) => void | Promise<void>,
  dependencies?: any[]
) => void;
```
