import express from "express";
import childProcess from "child_process";
import { renderToString } from "react-dom/server";
import path from "path";
// 引入路由相关
import { Route, Routes,matchRoutes, RouteObject } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import router from "@/router";
import { Helmet } from "react-helmet"; //修改页面header
import { serverStore } from "@/store"; // 在服务端注入store
import { Provider } from "react-redux"; // 通过 Provider 全局注入
const app = express();

const bodyParser = require("body-parser");

//客户端和服务端的返回需要保持一致，不然会有客户端的报错，页面也没办法正常匹配。
//所以需要同时为客户端和服务端的入口都加上对应的路由配置。
//不再固定Home
//const content = renderToString(<Home />);

app.use(express.static(path.resolve(process.cwd(), "client_build")));
//解析请求body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/getDemoData", (req, res) => {
  res.send({
    data: req.body,
    status_code: 0,
  });
});

// app.get("*", (req, res) => {
//   const content = renderToString(
//     <Provider store={serverStore} children={undefined}>
//       <StaticRouter location={req.path}>
//         <Routes>
//           {router?.map((item, index) => {
//             return <Route {...item} key={index} />;
//           })}
//         </Routes>
//       </StaticRouter>
//     </Provider>
//   );
  
  //在服务器端拉取对应的初始化方法，并统一请求注入它们了，我们只需要改造 get 方法就可以，遍历所有的初始化方法，然后统一请求塞进 store 里
  app.get("*", (req, res) => {
    const routeMap = new Map<string, () => Promise<any>>(); // path - loaddata 的map
    router.forEach((item) => {
      if (item.path && item.loadData) {
        routeMap.set(item.path, item.loadData(serverStore));
      }
    });
  
    // 匹配当前路由的routes
    const matchedRoutes = matchRoutes(router as RouteObject[], req.path);
  
    const promises: Array<() => Promise<any>> = [];
    matchedRoutes?.forEach((item) => {
      if (routeMap.has(item.pathname)) {
        promises.push(routeMap.get(item.pathname) as () => Promise<any>);
      }
    });
  
    Promise.all(promises).then((data) => {
      // 统一放到state里
      // 编译需要渲染的JSX, 转成对应的HTML STRING
      const content = renderToString(
        <Provider store={serverStore} children={""}>
          <StaticRouter location={req.path}>
            <Routes>
              {router?.map((item, index) => {
                return <Route {...item} key={index} />;
              })}
            </Routes>
          </StaticRouter>
        </Provider>
      );

    const helmet = Helmet.renderStatic();

    res.send(`
      <html>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
        </head>
        <body>
          <div id="root">${content}</div>
          <script src="/index.js"></script>
        </body>
      </html>
    `);
  });
});

app.listen(3000, () => {
  console.log("ssr-server listen on 3000");
});

//childProcess.exec("start http://127.0.0.1:3000");
