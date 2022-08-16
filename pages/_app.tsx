import "../styles/global.css";
import Sidebar from "../components/sidebar/sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Shield } from "../components/shield/Shield";
export default function App({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [uid, setUid] = useState();
  const [cost,setCost]=useState();
  const [name,setName]=useState();
  const [greenCoins,setGreenCoins]=useState();
  const withoutSidebar = ["/auth/[type]", "/contact"];
  const { asPath, pathname } = useRouter();
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;
  useEffect(() => {
    verifyAuth();
  });
  const verifyAuth = async () => {
    await axios
      .get("/auth/verify")
      .then((res) => {
        if (res.data.statusCode == 200) {
          setIsAuth(true);
          setUid(res.data.uid);
          setCost(res.data.electricity_cost)
          setName(res.data.username)
          setGreenCoins(res.data.green_coin)
          setisLoading(false);
        }
      })
      .catch((err) => {
        setIsAuth(false);
        setisLoading(false);
      });
  };

  if (withoutSidebar.includes(pathname) && !isAuth) {
    return <Component {...pageProps}></Component>;
  } else {
    if(isLoading)
    {
      return <div>Loading...</div>
    }
    else
    {
      return (
      <Shield isAuth={isAuth} isLoading={isLoading}>
        <Sidebar
          {...pageProps}
          uid={uid}
          cost={cost}
          username={name}
          coin={greenCoins}
          Component={Component}
          classname="bg-gray-100"
        />
      </Shield>
    );
  }
}
}
