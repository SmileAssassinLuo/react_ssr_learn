/*
    分别创建一下客户端和服务器端的 store，将 reducer 导入一下，并且接入一下 thunk 的中间件，
    使得 dispatch 相关的函数支持异步函数的入参。

*/
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { demoReducer } from "@/pages/Demo/Store";

const clientStore = configureStore({
  reducer: { demo: demoReducer.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
const serverStore = configureStore({
  reducer: { demo: demoReducer.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export { clientStore, serverStore };
