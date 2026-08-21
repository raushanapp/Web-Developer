import { use } from "react";
import { CounterContext } from "../context/contexts";
import { useDocumentTitle } from "../hooks/use_document_title";
import { Counter } from "./Counter";

// CounterList
export function CounterList() {
  const counterData = use(CounterContext);
  useDocumentTitle(
    "Clicks : " +
      counterData
        ?.map((counter) => {
          return counter.total;
        })
        .join(","),
  );

  return (
    <section>
      {counterData.map((counter) => (
        <Counter key={counter.id} counter={counter} />
      ))}
    </section>
  );
}
