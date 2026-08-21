import { useReducer } from "react";
import "./App.css";

import { CounterObj } from "./models/counter_obj";
import { counterReducer } from "./reducers/counter_reducer";
import { tabReducer } from "./reducers/tab_reducer";
import {
  CounterContext,
  CounterDispatchContext,
  TabContext,
  TabDispatchContext,
} from "./context/contexts";
import { CounterList } from "./components/Counter_List";
import { CounterTools } from "./components/Counter_Tools";

function App() {
  const [counterData, counterDispatch] = useReducer(counterReducer, [
    new CounterObj(1, { longName: "Counter A", shortName: "A" }, 1, 0),
    new CounterObj(2, { longName: "Counter B", shortName: "B" }, 2, 0),
    new CounterObj(3, { longName: "Counter C", shortName: "C" }, 1, 0),
  ]);

  const [visibleTab, visibleDispatch] = useReducer(tabReducer, 1);

  return (
    <>
      <CounterContext value={counterData}>
        <CounterDispatchContext value={counterDispatch}>
          <TabContext value={visibleTab}>
            <TabDispatchContext value={visibleDispatch}>
              <h1>Counters</h1>
              <section>
                <CounterList />
                <CounterTools />
              </section>
            </TabDispatchContext>
          </TabContext>
        </CounterDispatchContext>
      </CounterContext>
    </>
  );
}

export default App;
