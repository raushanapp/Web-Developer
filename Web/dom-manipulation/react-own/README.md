# React Learning Notes

This folder is a hands-on React study notebook. The examples move from rendering elements manually to JSX, state, effects, Context, reducers, performance optimization, and selected React 19 APIs.

The code is intentionally small and experimental. Use this document to review the idea behind each example, then open the linked file and run it in the browser.

## How To Run The Examples

1. Open [index.html](index.html) with a local server, such as VS Code Live Server.
2. The active example is selected by the uncommented script tag near the bottom of `index.html`.
3. Keep only one example script active at a time.
4. Open the browser console for examples that demonstrate logging, rendering, equality, or memoization.
5. The React 19 experiments in `react_19_combined_useReducer_useContext/index.html`, `ref_as_props/index.html`, and `sandbox/index.html` can be opened separately.
6. The `vite_sandbox` folder is a separate project. Run `npm install` or `pnpm install` inside that folder, then use `npm run dev` or `pnpm dev`.

The current default entry point loads `es_modules/app.js`, which demonstrates a native JavaScript module import rather than a complete React UI.

## Learning Roadmap

### 1. React's Core Mental Model

React is a declarative UI library:

- Describe what the UI should look like for the current state.
- Store changing data in state.
- Render again when state changes.
- React compares the new element tree with the previous one and updates the necessary DOM nodes.

Compare the first two examples:

- [app.js](app.js) uses `React.createElement` directly.
- [app2.js](app2.js) uses JSX and hooks.

`React.createElement("button", { className: "button" }, "Click me")` is the JavaScript form of JSX such as `<button className="button">Click me</button>`.

`ReactDOM.createRoot(rootNode).render(<App />)` creates the React root and renders the component tree into the DOM element with id `app`.

### 2. Events, Event Propagation, and Re-rendering

[app1.js](app1.js) demonstrates React event handlers, bubbling, `preventDefault`, and `stopPropagation`.

- Events normally bubble from the target element to its ancestors.
- `event.preventDefault()` stops the browser's default action, such as following a link.
- `event.stopPropagation()` stops the event from continuing to parent handlers.
- React passes a normalized event object to the handler.
- Calling `root.render(<App />)` again recalculates the UI from the current variables, but changing a normal variable alone does not automatically update the UI.

Use a real `<button>` for an action. The examples use `<a href="#">` for tabs in a few places, which is why they need `preventDefault()`.

### 3. Components, Props, and JSX

A component is normally a function that returns JSX. Components should be named with an uppercase letter.

```jsx
function Counter({ name }) {
  return <h2>Counter {name}</h2>;
}

function App() {
  return <Counter name="First Counter" />;
}
```

Important rules:

- Props are inputs from a parent and should be treated as read-only.
- A component can have local variables, but changing a local variable does not trigger a render.
- Use JSX expressions with `{}` for JavaScript values.
- Use `className` instead of HTML `class`.
- Event handlers receive a function reference: `onClick={handleClick}`.
- Do not call the handler while rendering: `onClick={handleClick()}` runs immediately.
- Fragments (`<>...</>`) group elements without adding an extra DOM node.

The component composition and `children` pattern are shown in [components_design/app.js](components_design/app.js): `CounterTools` receives content from its parent and renders `{children}`.

### 4. State With `useState`

`useState` returns the current state and a setter:

```jsx
const [count, setCount] = React.useState(0);
```

Calling the setter schedules a re-render. State is a snapshot for the current render; it does not change synchronously inside the same event handler.

When the next state depends on the previous state, use the functional updater:

```jsx
setCount((previousCount) => previousCount + 1);
setCount((previousCount) => previousCount + 1);
setCount((previousCount) => previousCount + 1);
```

This is why the repeated-update comparison in [app2.js](app2.js) matters. Repeating `setCount(count + 1)` uses the same render snapshot, while functional updates are queued from the latest pending value.

For object state, replace the object instead of mutating it:

```jsx
setCounter((previousCounter) => ({
  ...previousCounter,
  total: previousCounter.total + 1,
}));
```

Do not do this:

```jsx
counter.total += 1;
setCounter(counter);
```

The reference did not change, and mutation can produce stale or inconsistent UI. Some early examples in this folder copy the array but mutate the object inside it. They are useful for spotting the problem, but the immutable version above is the preferred pattern.

### 5. State Preservation, Position, and Keys

React associates state with a component's position in the rendered tree. [app3.js](app3.js) demonstrates mounting, unmounting, and swapping counters.

Keys tell React which item is which when rendering a list:

```jsx
{
  counters.map((counter) => <Counter key={counter.id} counter={counter} />);
}
```

Interview points:

- A key must be stable and unique among siblings.
- Prefer a database or domain id over an array index.
- Changing a key can intentionally reset a component's state.
- `key` is used by React and is not passed to the component as a normal prop.

The progression from index keys to stable ids appears in [useContext_context/app.js](useContext_context/app.js), [use_id_key/app.js](use_id_key/app.js), and the memoization examples.

`useId` creates stable identifiers for accessibility relationships and server/client consistency. It is not a replacement for list keys and should not be used as a data id.

### 6. Effects and Cleanup With `useEffect`

Effects synchronize React with an external system: the document title, timers, subscriptions, network requests, or DOM APIs.

```jsx
React.useEffect(() => {
  document.title = `Clicks: ${count}`;

  return () => {
    // Undo the external effect when dependencies change or the component unmounts.
  };
}, [count]);
```

Dependency behavior:

- No dependency array: runs after every render.
- `[]`: runs after mount, with cleanup on unmount.
- `[value]`: runs after mount and when `value` changes.

Examples:

- Document title updates: [app2.js](app2.js), [app3.js](app3.js), and [custom_hooks/app.js](custom_hooks/app.js).
- Timer setup and cleanup: [app5.js](app5.js).
- Focus and DOM interaction: [app6.js](app6.js).
- Component unmount cleanup: [app3.js](app3.js).

Effects do not make rendering asynchronous, and they should not be used for values that can be calculated directly during render.

### 7. Async Effects and Race Conditions

[app4.js](app4.js) changes the selected person and fetches a bio. The cleanup sets an `ignore` flag so an older, slower request cannot overwrite the result for a newer selection.

The general shape is:

```jsx
React.useEffect(() => {
  let ignore = false;

  loadData(id).then((data) => {
    if (!ignore) setData(data);
  });

  return () => {
    ignore = true;
  };
}, [id]);
```

For production network code, also consider `AbortController`, loading and error states, retries, caching, and a data-fetching library when the application needs them.

The React 19 [sandbox/index.html](sandbox/index.html) explores `use()` with a cached promise and `<Suspense fallback={...}>`. Suspense handles the pending rendering state, while caching prevents a new promise from being created on every render.

### 8. `useRef`, DOM References, and React 19 Refs

A ref stores a mutable value that survives renders without causing a re-render when it changes.

```jsx
const inputRef = React.useRef(null);

React.useEffect(() => {
  inputRef.current?.focus();
}, []);
```

Use refs for:

- DOM focus, measurement, scrolling, and imperative APIs.
- A timer id or previous value that should persist without rendering.

Use state when the value belongs in the UI. Do not use refs as a hidden replacement for state.

[app6.js](app6.js) demonstrates `React.forwardRef` to pass a parent ref to a button. The React 19 [ref_as_props/index.html](ref_as_props/index.html) explores the newer ref-as-a-prop direction. That file is an experiment and currently contains an inconsistent variable reference (`buttonRef` inside `Counter`); treat it as a concept demo until corrected.

### 9. Custom Hooks

A custom hook extracts reusable stateful behavior. Its name starts with `use` and it may call other hooks.

- `useCounter` owns counter state and exposes an increment operation.
- `useDocumentTitle` synchronizes the browser title and restores the original title in cleanup.

Both are shown in [custom_hooks/app.js](custom_hooks/app.js). Custom hooks share logic, not state: every component calling `useCounter()` receives its own independent state.

Rules of Hooks:

- Call hooks only at the top level of a component or custom hook.
- Do not call hooks inside loops, conditions, nested functions, or event handlers.
- Call hooks only from React components or custom hooks.
- Keep hook call order stable across renders.

### 10. Props Drilling and Context

Props drilling means passing data through components that do not use it only to reach a deeper child. [useContext_context/app.js](useContext_context/app.js) first shows this pattern and then [useContext_context/context.js](useContext_context/context.js) replaces it with Context.

Context steps:

1. Create a context with `React.createContext(defaultValue)`.
2. Provide a value above the consumers.
3. Read it with `React.useContext(Context)`.

Context is useful for values needed by many distant components, such as a theme, current user, locale, or shared application state. It is not automatically a state manager, and every consumer can re-render when the provider value changes.

For larger state, separate state and dispatch contexts. [usecontextAndusereducer/app.js](usecontextAndusereducer/app.js) demonstrates this structure with counter and tab contexts.

Keep provider values stable where appropriate and split contexts by concern to reduce unnecessary re-renders.

### 11. Reducers and Predictable State Transitions

A reducer calculates the next state from the current state and an action:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    default:
      throw new Error("Unknown action");
  }
}

const [state, dispatch] = React.useReducer(reducer, 0);
dispatch({ type: "increment" });
```

Reducers should be pure:

- Do not mutate the existing state.
- Do not perform network requests or DOM work.
- Return the same state when an action changes nothing.
- Make actions describe events, not direct setter instructions.

The JavaScript reducer fundamentals are in [reducers.js](reducers.js). React examples are in [app2.js](app2.js) and [usecontextAndusereducer/app.js](usecontextAndusereducer/app.js). The combined Context and reducer pattern is a useful small-scale alternative to prop drilling.

### 12. Derived Data, `memo`, `useMemo`, and `useCallback`

Derived data should normally be calculated from props and state during render. Memoization is an optimization, not a correctness requirement.

- `React.memo(Component)` can skip a child render when its props are shallowly equal.
- `React.useMemo(() => value, dependencies)` caches a calculated value.
- `React.useCallback(() => ..., dependencies)` caches a function identity.

The examples are in [memo/app.js](memo/app.js), [usememo/app.js](usememo/app.js), and [usecallback/app.js](usecallback/app.js). [memo/memoize.js](memo/memoize.js) demonstrates the general memoization idea outside React.

A memoized child still re-renders when:

- Its props change by reference or value.
- Its own state changes.
- A consumed context value changes.
- Its parent passes a new callback or object each render.

Use the profiler or a measured expensive calculation to justify memoization. Also check dependency arrays carefully. In the study examples, calculations and callbacks are intentionally simplified; production code should include every reactive value they read.

### 13. Equality and Immutability

The supporting JavaScript examples explain why React state updates depend on references:

- `===` compares primitives by value and objects by reference.
- `Object.is` is similar but has special behavior for `NaN` and signed zero.
- Two separately created objects with the same fields are not reference-equal.
- A shallow comparison checks top-level properties only; nested objects still need the same reference.

Read [equality.js](equality.js) and [shallow_equality_is_object.js](shallow_equality_is_object.js).

This matters because React optimizations commonly use shallow/reference comparisons. Immutable updates make changed branches receive new references while unchanged branches can retain theirs.

### 14. Closures and Stale Values

[stale_closures.js](stale_closures.js) demonstrates a closure: an inner function keeps access to variables from its outer function even after the outer function has returned.

```js
function createCounter(incBy) {
  let value = 0;
  return [
    () => {
      value += incBy;
    },
    () => console.log(value),
  ];
}
```

The important React connection is that every render creates a new snapshot. An event handler or effect can close over the values from the render that created it. A missing effect dependency can therefore produce a stale value. The functional state updater and complete dependency arrays help avoid this class of bug.

### 15. React 19 APIs: `use`, Context, Suspense, and Refs

The React 19 files use the `use` API in two different ways:

- [use_context/index.html](use_context/index.html) uses `use(CounterContext)` to read Context. This is the React 19 alternative syntax to `useContext(CounterContext)` in the other examples.
- [react_19_combined_useReducer_useContext/index.html](react_19_combined_useReducer_useContext/index.html) combines `use(Context)` with `useReducer`, split state/dispatch contexts, stable keys, `useMemo`, and `useCallback`.
- [sandbox/index.html](sandbox/index.html) uses `use(fetchBio(person))` to read a cached promise and `<Suspense>` to show a fallback while it is pending.
- [ref_as_props/index.html](ref_as_props/index.html) explores passing a ref as a prop in React 19 instead of requiring `forwardRef` in the same way as older React examples.

Interview distinction: `use(Context)` reads a resource during rendering, while `useEffect` is used to synchronize with an external system after rendering. `Suspense` does not fetch data by itself; the promise/resource and its cache provide the data behavior.

### 16. JavaScript Modules and Data Structures

[es_modules/app.js](es_modules/app.js) and [es_modules/other_code.js](es_modules/other_code.js) demonstrate `import` and `export` with a native module script.

[linked_list_data_structure.js](linked_list_data_structure.js) and [queue_data_structure.js](queue_data_structure.js) cover linked-list nodes, head/tail references, append, traversal, and queue FIFO behavior. These are JavaScript fundamentals that support interview preparation and help explain why React state updates should preserve object identity intentionally.

### 17. Vite, Strict Mode, and Hot Module Replacement

[vite_sandbox](vite_sandbox) is a separate React 19 project created with Vite. Its important setup concepts are:

- [vite_sandbox/index.html](vite_sandbox/index.html) provides the HTML shell, the `root` mount element, the favicon, and the module entry point.
- [vite_sandbox/vite.config.js](vite_sandbox/vite.config.js) connects Vite with `@vitejs/plugin-react`, which transforms and refreshes React source files.
- [vite_sandbox/eslint.config.js](vite_sandbox/eslint.config.js) configures ESLint's recommended JavaScript rules, browser globals, React Hooks rules, and React Refresh rules while ignoring `dist`.
- [vite_sandbox/src/index.css](vite_sandbox/src/index.css) defines global layout, typography, color variables, responsive styles, and dark-mode styles. [vite_sandbox/src/App.css](vite_sandbox/src/App.css) defines the app-specific hero, counter, links, and responsive layout styles.
- [vite_sandbox/public](vite_sandbox/public) contains static files served from the site root, including the SVG icon sprite used by `<use href="/icons.svg#...">`.
- [vite_sandbox/src/assets](vite_sandbox/src/assets) contains imported image assets. Vite bundles imported assets and rewrites their URLs for the build.
- [vite_sandbox/README.md](vite_sandbox/README.md) records that the React Compiler is not enabled in this template and explains the available Vite plugin choices.
- [vite_sandbox/package.json](vite_sandbox/package.json) defines `dev`, `build`, `lint`, and `preview` scripts.
- Vite provides a development server, fast module replacement, and a production build. HMR updates the browser while developing without requiring a full manual reload.
- `StrictMode` is a development-only check that can intentionally re-run render/effect-related behavior to expose unsafe side effects. Code should remain correct when this happens.

The Vite template still contains starter content and is separate from the plain HTML examples. The root [index.html](index.html) loads local development React scripts and Babel, while Vite handles JSX and module transformation through its build toolchain.

## Complete File Map

Use this map when revising a particular concept:

| File or folder                                                                                           | Main learning topic                                                         |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [index.html](index.html)                                                                                 | Browser setup, local React scripts, Babel, and selecting one example        |
| [app.js](app.js)                                                                                         | `React.createElement`, root rendering, props read-only idea                 |
| [app1.js](app1.js)                                                                                       | Event handlers, bubbling, `preventDefault`, `stopPropagation`, re-rendering |
| [app2.js](app2.js)                                                                                       | `useState`, `useReducer`, functional updates, object state, effects         |
| [app3.js](app3.js)                                                                                       | Conditional rendering, mounting, unmounting, effect cleanup                 |
| [app4.js](app4.js)                                                                                       | Async effects, loading state, stale request protection                      |
| [app5.js](app5.js)                                                                                       | Closures in intervals and timer cleanup                                     |
| [app6.js](app6.js)                                                                                       | `useRef`, focus, `forwardRef`                                               |
| [stale_closures.js](stale_closures.js)                                                                   | JavaScript closures and stale captured values                               |
| [reducers.js](reducers.js)                                                                               | Array `reduce` and reducer state transitions                                |
| [equality.js](equality.js)                                                                               | `==`, `===`, object reference equality, `Object.is`                         |
| [shallow_equality_is_object.js](shallow_equality_is_object.js)                                           | Shallow comparison and nested object references                             |
| [linked_list_data_structure.js](linked_list_data_structure.js)                                           | Linked list nodes, head, tail, append, traversal                            |
| [queue_data_structure.js](queue_data_structure.js)                                                       | Queue FIFO behavior built on linked nodes                                   |
| [components_design/app.js](components_design/app.js)                                                     | Composition, `children`, custom hooks, props                                |
| [custom_hooks/app.js](custom_hooks/app.js)                                                               | `useCounter`, `useDocumentTitle`, custom hook rules                         |
| [useContext_context/app.js](useContext_context/app.js)                                                   | Props drilling                                                              |
| [useContext_context/context.js](useContext_context/context.js)                                           | Context providers, consumers, nested provider values                        |
| [use_context/index.html](use_context/index.html)                                                         | React 19 `use(Context)`                                                     |
| [use_id_key/app.js](use_id_key/app.js)                                                                   | Stable keys, `useId`, Context, derived summary                              |
| [usecontextAndusereducer/app.js](usecontextAndusereducer/app.js)                                         | Split Context state/dispatch, reducers, tabs                                |
| [memo/app.js](memo/app.js)                                                                               | `React.memo`, Context, shallow prop comparison                              |
| [memo/memoize.js](memo/memoize.js)                                                                       | General-purpose memoization and closure-based cache                         |
| [usememo/app.js](usememo/app.js)                                                                         | `useMemo` for derived filtering                                             |
| [usecallback/app.js](usecallback/app.js)                                                                 | `useCallback` with memoized child components                                |
| [react_19_combined_useReducer_useContext/index.html](react_19_combined_useReducer_useContext/index.html) | React 19 `use`, reducers, Context, memoization                              |
| [sandbox/index.html](sandbox/index.html)                                                                 | `use` with cached promises and `Suspense`                                   |
| [ref_as_props/index.html](ref_as_props/index.html)                                                       | React 19 ref-as-prop experiment                                             |
| [es_modules/app.js](es_modules/app.js)                                                                   | Native `import`                                                             |
| [es_modules/other_code.js](es_modules/other_code.js)                                                     | Named `export` and a model class                                            |
| [vite_sandbox/src/App.jsx](vite_sandbox/src/App.jsx)                                                     | Vite starter app, `useState`, functional updater, assets                    |
| [vite_sandbox/src/main.jsx](vite_sandbox/src/main.jsx)                                                   | `createRoot`, imports, `StrictMode`                                         |
| [vite_sandbox/index.html](vite_sandbox/index.html)                                                       | Vite HTML entry point and root mount element                                |
| [vite_sandbox/vite.config.js](vite_sandbox/vite.config.js)                                               | Vite React plugin configuration                                             |
| [vite_sandbox/eslint.config.js](vite_sandbox/eslint.config.js)                                           | ESLint and React Hooks/Refresh rules                                        |
| [vite_sandbox/src/index.css](vite_sandbox/src/index.css)                                                 | Global and responsive CSS                                                   |
| [vite_sandbox/src/App.css](vite_sandbox/src/App.css)                                                     | App-specific CSS and layout                                                 |
| [vite_sandbox/public](vite_sandbox/public)                                                               | Static favicon and SVG icon sprite                                          |
| [vite_sandbox/src/assets](vite_sandbox/src/assets)                                                       | Bundled React, Vite, and image assets                                       |
| [vite_sandbox/README.md](vite_sandbox/README.md)                                                         | Vite template and React Compiler notes                                      |
| [vite_sandbox/package.json](vite_sandbox/package.json)                                                   | Vite scripts and React dependencies                                         |

## Interview Revision Questions

### Beginner

1. What problem does React solve compared with manually changing the DOM?
2. What is the difference between a component, a prop, and state?
3. Why are props read-only?
4. What does `createRoot(...).render(...)` do?
5. What is JSX compiled into?
6. Why does a state setter cause a component to render again?
7. Why should a list use a stable key?
8. What is the difference between `onClick={handleClick}` and `onClick={handleClick()}`?

### Intermediate

1. Why can three `setCount(count + 1)` calls produce only one increment?
2. When should a functional state updater be used?
3. Why is mutating an object in state unsafe?
4. Explain the three dependency-array forms of `useEffect`.
5. Why does an effect need cleanup for timers and subscriptions?
6. How can an old network response overwrite newer UI, and how can cleanup prevent it?
7. What is the difference between state and a ref?
8. What does Context solve, and what problem does it not solve?
9. What makes a reducer pure?
10. Why is an index a risky key when list items can be inserted, deleted, or reordered?

### Advanced

1. How does React preserve or reset state based on tree position and keys?
2. Why can a Context provider cause many consumers to re-render?
3. When can `React.memo` fail to prevent a child render?
4. What is the difference between memoizing a value and memoizing a function?
5. Why must memoization dependencies include every reactive value used by the calculation?
6. When is derived data better calculated during render than stored in state?
7. How do immutable updates support shallow equality and structural sharing?
8. What does `use()` do in the React 19 Suspense example?
9. Why does promise caching matter when using `use()` during render?
10. When should a ref be used instead of state for an imperative value?

## Common Corrections To Remember

The examples are learning exercises, so keep these differences in mind when answering interviews or writing production code:

- Copying an array does not deep-copy its objects. Update the changed object with `{ ...object }` too.
- A decrement guard should prevent values below zero. Check the condition carefully when writing the reducer.
- In the current `counterReducer` examples, `counter.total >= 0 ? counter.total - 1 : 0` still returns `-1` when the total is zero. A correct guard is `counter.total > 0 ? counter.total - 1 : 0`.
- Include all reactive dependencies in `useEffect`, `useMemo`, and `useCallback` dependency arrays.
- Use buttons for actions instead of anchor elements with `href="#"`; this avoids unnecessary default navigation and `preventDefault` calls.
- `key` is not available through `props.key`.
- `useId` is for generated DOM ids, not list identity.
- Effects are for external synchronization, not ordinary calculations.
- `React.memo`, `useMemo`, and `useCallback` should be added after identifying a real rendering or calculation cost.
- In [shallow_equality_is_object.js](shallow_equality_is_object.js), `person1` and `person2` have separate nested `cours` objects, so a shallow comparison returns `false`; the nearby comment saying `true` is incorrect.
- In [stale_closures.js](stale_closures.js), calculating `message` outside `log()` would capture an old value. Calculating it inside `log()` reads the current closed-over value.
- The React 19 ref-as-prop example needs its ref variable naming fixed before it can run correctly.

## Suggested Next Topics

The current folder gives a strong hooks and state foundation. The next interview-focused topics to add are:

- Controlled versus uncontrolled forms and validation.
- Error boundaries and loading/error/empty UI states.
- Routing and nested layouts.
- Testing components with React Testing Library.
- Accessibility and keyboard interaction.
- Network caching and server state with a data-fetching library.
- Strict Mode, concurrent rendering, transitions, and `useDeferredValue`.
- React Server Components and framework routing when using a framework such as Next.js.
- TypeScript props, state, reducers, and custom hooks.

## Quick Glossary

- **Render:** React calls components to calculate the next UI description.
- **Commit:** React applies the required changes to the DOM.
- **Props:** Read-only data passed from parent to child.
- **State:** Component-owned data that can trigger rendering.
- **Effect:** Synchronization with something outside React.
- **Reducer:** Pure function from `(state, action)` to next state.
- **Context:** A way to read a value from a provider without passing it through every component.
- **Key:** Stable identity for an item in a rendered list.
- **Ref:** Persistent mutable container, often used for DOM nodes.
- **Memoization:** Reusing a previous result when its inputs have not changed.
