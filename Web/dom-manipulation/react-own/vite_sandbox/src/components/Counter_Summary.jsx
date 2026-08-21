import { use, useMemo, useCallback } from "react";
import {
  TabDispatchContext,
  TabContext,
  CounterContext,
} from "../context/contexts";
import { CounterSummaryHeader } from "./Counter_Header_Summary";
import { CounterSummaryDetails } from "./Counter_Summary_Details";

export function CounterSummary() {
  const counterData = use(CounterContext);
  const visibleTab = use(TabContext);
  const tabDispatch = use(TabDispatchContext);

  const sortData = [...counterData].sort((a, b) => {
    return b.total - a.total;
  });
  //  this example of useMemo to memoizing the value
  const filterSortedData = useMemo(() => {
    // console.log("Filtering Data");
    return sortData.filter((counter) => counter.tab === visibleTab);
  }, [sortData, visibleTab]);

  const setVisibleTab1 = useCallback((event) => {
    tabDispatch({ type: "change-tab", tab: 1 });
    event.preventDefault();
  }, []);

  const setVisibleTab2 = useCallback((event) => {
    tabDispatch({ type: "change-tab", tab: 2 });
    event.preventDefault();
  }, []);
  return (
    <section>
      <CounterSummaryHeader
        setVisibleTab1={setVisibleTab1}
        setVisibleTab2={setVisibleTab2}
      />
      {filterSortedData.map((counter) => (
        <CounterSummaryDetails
          name={counter.name}
          total={counter.total}
          key={counter.id}
        />
      ))}
    </section>
  );
}
