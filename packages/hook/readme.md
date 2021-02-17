## typedemitter-hook

React hook component for [typedemitter](https://github.com/lukasbach/typedemitter/tree/master/packages/core).

## Usage

    yarn add typedemitter typedemitter-hook

```typescript jsx
import { EventEmitter } from 'typedemitter';
import { useEventChangeHandler } from 'typedemitter-hook';

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
