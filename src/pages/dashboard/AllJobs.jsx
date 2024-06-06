import { JobsContainer, SearchContainer } from "../../components";

const AllJobs = ({ queryClient }) => {
  return (
    <>
      <SearchContainer />
      <JobsContainer queryClient={queryClient} />
    </>
  );
};

export default AllJobs;
