# ayemitter

![Testing](https://github.com/lukasbach/ayemitter/workflows/Testing/badge.svg)
![Pretty](https://github.com/lukasbach/ayemitter/workflows/Pretty/badge.svg)

A typed easy-to-use event emitter that you can just construct with a event
type and start adding handlers. Aye!

## Usage

    yarn add ayemitter

Create a `EventEmitter` instance typed to whatever your
payload type is, add handlers and emit a new event.

```typescript
import { EventEmitter } from 'ayemitter';

const emitter = new EventEmitter<string>();

emitter.on(payload => {
  console.log('Handler 1 ' + payload);
});

emitter.on(payload => {
  console.log('Handler 2 ' + payload);
});

emitter.emit('yup');
// Outputs:
//   Handler 1 yup
//   Handler 2 yup
```

If one or more handlers are asynchronous, the `emit`
call waits for all handlers to finish. All handlers are
invoked at the same time.

```typescript
import { EventEmitter } from 'ayemitter';

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

emitter.emit('yup').then(() => console.log('Done!'));
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

Use in conjunction with [TODO link] to use as React hook.

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

### Hook API

```typescript
const useEventChangeHandler: <T>(
  eventEmitter: EventEmitter<T>,
  handler: (payload: T) => void | Promise<void>,
  dependencies?: any[]
) => void;
```

## Development

When developing locally, run in the root directory...

- `yarn` to install dependencies
- `yarn test` to run tests in all packages
- `yarn build` to build distributables and typings in `packages/{package}/out`
- `yarn storybook` to run a local storybook server
- `yarn build-storybook` to build the storybook
- [`npx lerna version`](https://github.com/lerna/lerna/tree/main/commands/version#readme) to interactively bump the
  packages versions. This automatically commits the version, tags the commit and pushes to git remote.
- [`npx lerna publish`](https://github.com/lerna/lerna/tree/main/commands/publish#readme) to publish all packages
  to NPM that have changed since the last release. This automatically bumps the versions interactively.
