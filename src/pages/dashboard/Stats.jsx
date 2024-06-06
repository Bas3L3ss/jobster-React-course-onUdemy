import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/allJobs/allJobSlice";
import { ChartsContainer, Loading, StatsContainer } from "../../components";
const Stats = ({ queryClient }) => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStats(queryClient));
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
