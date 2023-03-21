import { FC ,useState,useEffect ,Fragment} from "react";
import axios  from 'axios';
import {connect } from 'react-redux'
import {getDemoData} from "./Store/demoReducer"
import { Helmet } from 'react-helmet'

// 可以在 network 中看到对应的请求，数据也没在服务器端请求的时候塞入 HTML，也就是说走的是客户端渲染，
//而不是服务端渲染，和我们预期的不一样，看来是不能直接用 hook 来常规请求的。
// const Demo: FC = () => {
//   const [content, setContent] = useState("")
//   useEffect(() => {
//     axios.post("api/getDemoData",{
//       content:"这是一个demo页面!!!"
//     })
//     .then((res:any) => {
//       setContent(res.data?.data?.content)
//     })
//   })
//   return <div>{content}</div>
// };


//connect 暴露了两个参数，一个 state，一个 dispatch，它会根据你的需要拼接成指定的参数，以装饰器的形式包装你定义的函数，这样我们的 Demo 就可以接收到我们定义的 content 和 getDemoData 参数了
interface IProps {
  content?:string;
  getDemoData?:(data:string) => void
}
const Demo:FC<IProps> = (data) => {

    return (
        <Fragment>
            <Helmet>
              <title>服务器端渲染框架-demo</title>
              <meta name="description" content="服务器端渲染框架"></meta>
            </Helmet>
            <div>
              <h1>{data.content}</h1>
              <button 
                  onClick = { () : void => {
                    data.getDemoData && data.getDemoData("刷新过后的数据")
                  }}
              >
                  刷新
              </button>
            </div>
        </Fragment>
    )
}

// 将对应reducer的内容透传回dom
const mapStateToProps = (state:any) => {
  return {
      content:state?.demo?.content
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    getDemoData:(data:string) => {
      dispatch(getDemoData(data))
    }
  }
}
const storeDemo:any = connect(mapStateToProps,mapDispatchToProps)(Demo)

storeDemo.getInitProps = (store:any,data?:string) => {
  return store.dispatch(getDemoData(data || "这是初始化的demo"))
}


export default storeDemo;
