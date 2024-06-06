import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

const allJobsQuery = (url, thunkAPI) => {
  return {
    queryKey: ["allJobs", url],
    queryFn: async () => {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    },
  };
};

export const getAllJobsThunk = async (queryClient, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = `${url}` + `&search=${search}`;
  }
  try {
    const data = await queryClient.fetchQuery(
      allJobsQuery(url, thunkAPI).queryKey,
      allJobsQuery(url, thunkAPI).queryFn
    );
    return data;
  } catch (error) {
    console.log(error);
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

const statsQuery = (thunkAPI) => {
  return {
    queryKey: ["stats", thunkAPI.getState().user.user.token],
    queryFn: async () => {
      const response = await customFetch.get("/jobs/stats", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return response.data;
    },
  };
};

export const showStatsThunk = async (queryClient, thunkAPI) => {
  try {
    const data = await queryClient.fetchQuery(
      statsQuery(thunkAPI).queryKey,
      statsQuery(thunkAPI).queryFn
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
