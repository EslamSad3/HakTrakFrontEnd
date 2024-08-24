import { useState } from "react";
import moment from "moment";

const useDateFilter = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filterMultipleDataSets = (dataSets) => {
    return dataSets.map(({ data, dateKey }) => {
      const filteredData = data?.filter((item) => {
        if (!startDate || !endDate) return true;
        const itemDate = moment(item[dateKey]);
        return (
          itemDate.isSameOrAfter(startDate, "day") &&
          itemDate.isSameOrBefore(endDate, "day")
        );
      });
      return filteredData;
    });
  };

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    filterMultipleDataSets,
  };
};

export default useDateFilter;
