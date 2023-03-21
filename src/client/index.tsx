import { hydrateRoot } from "react-dom/client";
import router from "@/router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { clientStore } from "@/store"; // 在客户端注入store
import { Provider } from "react-redux"; // 通过 Provider 全局注入

//客户端和服务端的返回需要保持一致，不然会有客户端的报错，页面也没办法正常匹配。
//所以需要同时为客户端和服务端的入口都加上对应的路由配置。
const Client = (): JSX.Element => {
  return (
    <Provider store={clientStore} children={undefined}>
      <BrowserRouter>
        <Routes>
          {router?.map((item, index) => {
            return <Route {...item} key={index} />;
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

// 将事件处理加到ID为root的dom下
hydrateRoot(document.getElementById("root") as Document | Element, <Client />);
