import DashboardCard from "../components/data-card/dashboardCard";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import DashboardChart from "../components/charts/dashboardPowerChart";
import DashboardRadialChart from "../components/charts/dashboardRadialChart";
import TopRooms from "../components/list/topRooms";
import TopDevices from "../components/list/topDevices";
import SharedDataList from "../components/list/sharedDataList";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loader } from "../components/loader/Loader";
export default function Dashboard({cost}) {
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isLoadingDevices, setIsLoadingDevices] = useState(true);
  const [data, setData] = useState([]);
  const [followers,setFollowers]=useState([]);
  const [isLoading,setIsLoading]=useState(true);

  var costArr=[{}];
  useEffect(() => {
    getRooms();
    getDevices();
    getData();
    setCost();
    getFollowers();
  }, []);
 console.log(costArr)
   
 const getFollowers=async()=>{
  await axios.get('/sharing/followers').then((res)=>{
    setFollowers(res.data);
  }).catch((err)=>{
    console.log(err);
  })
}
 const powerChange=()=>{
  if(data[data.length-1] && data[data.length-2])
    return  (((data[data.length-1].avg_power/data[data.length-2].avg_power)*100)-100).toPrecision(3);
  else 
    return 0;  
  
}
const voltChange=()=>{
  if(data[data.length-1] && data[data.length-2])
    return (((data[data.length-1].avg_voltage/data[data.length-2].avg_voltage)*100)-100).toPrecision(2);
    else 
    return 0; 
}
const currChange=()=>{
  if(data[data.length-1] && data[data.length-2])
    return (((data[data.length-1].avg_current/data[data.length-2].avg_current)*100)-100).toPrecision(2);
    else 
    return 0; 
}
  const getRooms = async () => {
    await axios
      .get("/room/list")
      .then((res) => {
        setRooms(res.data);
        setIsLoadingRooms(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingRooms(false);
      });
  };
  const getDevices = async () => {
    await axios
      .get("/device/list")
      .then((res) => {
        setDevices(res.data);
        setIsLoadingDevices(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingDevices(false);
      });
  };
  const getData = async () => {
    await axios
      .get(`/device/alldata/get`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setCost=()=>{
    data.map((d)=>{
      costArr.push({bucket:d.bucket,setcost:cost*d.avg_power})
    })
    setIsLoading(false);
  }
  if (isLoadingRooms === false && isLoadingDevices == false) {
    return (
      <main className="h-full bg-gray-100">
        <div className="mt-10 mx-10">
          {/* content */}
          {data.length > 0 && (
            <DashboardCard
              power={(data[data.length - 1].avg_power).toPrecision(3)}
              voltage={(data[data.length - 1].avg_voltage).toPrecision(3)}
              current={(data[data.length - 1].avg_current).toPrecision(3)}
              powerChange={powerChange()}
              voltageChange={voltChange()}
              currentChange={currChange()}
            />
          )}
        </div>
        <div className="ml-10 w-full grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-2 ">
          <div className="h-96 w-11/12 ">
            <ParentSize>
              {({ width, height }) => (
                <DashboardChart width={width} height={height} datax={data}/>
              )}
            </ParentSize>
          </div>

        </div>
        <div className="grid lg:grid-cols-3 mx-10 mt-12 mb-10 gap-8 sm:grid-cols-1 md:grid-cols-1">
          <div>
            {" "}
            <TopRooms data={rooms} />
          </div>
          <div>
            <SharedDataList data={followers} />
          </div>
          <div>
            <TopDevices data={devices} />
          </div>
        </div>
      </main>
    );
  } else {
    return <Loader />;
  }
}
