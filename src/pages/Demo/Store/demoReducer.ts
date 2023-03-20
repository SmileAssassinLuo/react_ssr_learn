import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getDemoData = createAsyncThunk(
  "/demo/getData",
  async (initData: string) => {
    const res = await axios.post("http://127.0.0.1:3000/api/getDemoData", {
      content: initData,
    });
    return res.data?.data?.content;
  }
);
/*
createSlice 是 redux 比较新的版本，参数如下是:
    reducers：可以存放同步的 reducers（不需要请求参数）；
    initialState：可以理解成原来的 state；
    name： 是这个 reducer 的空间，后面取 store 的时候会根据这个进行区分；
    extraReducers：这个是我们这里需要的异步 reducer，其中包含三个状态，pending、fulfilled 和 rejected，分别对应到请求的三种状态。

*/
const demoReducer = createSlice({
  name: "demo",
  initialState: {
    content: "默认数据",
  },
  // 同步reducer
  reducers: {},
  // 异步reducer
  extraReducers(build) {
    build
      .addCase(getDemoData.pending, (state, action) => {
        state.content = "pending";
      })
      .addCase(getDemoData.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(getDemoData.rejected, (state, action) => {
        state.content = "rejected";
      });
  },
});

export { demoReducer, getDemoData };
