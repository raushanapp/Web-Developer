import { memo } from "react";

export const CounterSummaryDetails = memo(function CounterSummaryDetails({
  name,
  total,
}) {
  // name.shortName = name.shortName + ":"; how should fixed this we
  //  we need first copy the object and create new object
  const cName = { ...name, shortName: name.shortName + ":" };
  return (
    <p>
      {cName.shortName} ({total})
    </p>
  );
});
