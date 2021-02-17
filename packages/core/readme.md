# typedemitter

A typed easy-to-use event emitter that you can just construct with a event
type and start adding handlers.

## Usage

    yarn add typedemitter

Create a ``EventEmitter`` instance typed to whatever your
payload type is, add handlers and emit a new event.

```typescript
import { EventEmitter } from 'typedemitter';

const emitter = new EventEmitter<string>();

emitter.on(payload => {
  console.log("Handler 1 " + payload);
});

emitter.on(payload => {
  console.log("Handler 2 " + payload);
});

emitter.emit("yup");
// Outputs:
//   Handler 1 yup
//   Handler 2 yup
```

If one or more handlers are asynchronous, the ``emit`` 
call waits for all handlers to finish. All handlers are
invoked at the same time.

```typescript
import { EventEmitter } from 'typedemitter';

const emitter = new EventEmitter<string>();

emitter.on(async payload => {
  // waits for 2 seconds
});

emitter.on(async payload => {
  // waits for 1 second
});

emitter.on(async payload => {
  // immediately returns
});

emitter.emit("yup").then(() => console.log("Done!"));
// All three handlers are invoked at the same time
// "Done!" is outputted after 2 seconds, i.e. after 
// all handlers are finished
```

## API
```typescript
interface EventEmitter<EventPayload> {
  constructor(options?: EventEmitterOptions<EventPayload>);
  get numberOfHandlers(): number;
  emit(payload: EventPayload): Promise<void>;
  on(handler: EventHandler<EventPayload>): number;
  off(handlerId: number): void;
  delete(handlerId: number): void;
}

interface EventEmitterOptions<EventPayload = any> {
    logger?: (log: string, payload?: EventPayload) => void;
}

type EventHandler<EventPayload> = ((payload: EventPayload) => Promise<void> | void) | null | undefined;
```

## React Hook

Use in conjunction with [typedemitter-hook](https://github.com/lukasbach/typedemitter/tree/master/packages/hook) to use as React hook.

```typescript jsx
import { EventEmitter } from 'typedemitter';
import { useEventChangeHandler } from 'typedemitter-hook';

const emitter = new EventEmitter<string>();
const Component = () => {
  const [state, setState] = useState("state1");
  useEventChangeHandler(emitter, () => {
    console.log("Hello!");
  }, [state]); // state is a dependency
  
  // The handler is rebinded to the emitter everytime the
  // handler or a dependency changes.
  
  return // ...
}
```
