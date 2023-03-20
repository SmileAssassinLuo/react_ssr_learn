import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

//因为存在客户端路由和服务端路由，所以服务器端渲染通过不同的方式跳转也会采用不同的渲染方式，当使用 React 内置的路由跳转的时候，会进行客户端路由的跳转，采用客户端渲染；而通过 a 标签，或者原生方式打开一个新页面的时候，才会进行服务器端路由的跳转，使用服务器端渲染。
const Home = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Helmet>
        <title>简易的服务器端渲染 - HOME</title>
        <meta name="description" content="服务器端渲染"></meta>
      </Helmet>
      <div>
        <h3>ssr-react</h3>
        <button
          onClick={(): void => {
            alert("srr-react");
          }}
        >
          alert ssr-react
        </button>
        <a href="http://127.0.0.1:3000/demo">链接跳转</a>
        <span
          onClick={(): void => {
            navigate("/demo");
          }}
        >
          客户端路由跳转
        </span>
      </div>
    </Fragment>
  );
};

export default Home;
