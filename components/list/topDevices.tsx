import axios from "axios";
import { useEffect,useState } from "react";
export default function topDevices({data}) {
    const [datas,setDatas]=useState([]);
    useEffect(()=>{
        getData();
    },[])

    const getData=()=>{
        data.map(async(device)=>{
        await axios.get(`/device/data/${device.id}`).then((res)=>{
            let rooms=res.data;
            if(rooms[rooms.length-1].avg_power>10)
            { 
                setDatas(res.data);
            } 
            }).catch((err)=>{
                console.log(err);

            })
        })
    }
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md lg:rounded-2xl">
          <ul role="list" className="divide-y divide-gray-200">
            {data.map((application) => (
              <li key={application.id}>
    
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80"
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {application.name.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                        <p className="bg-green-100 inline-flex items-center shadow-sm px-2.5 py-0.5  text-sm leading-5 font-medium rounded-full text-gray-700 hover:bg-green-200"  >
                      {datas[datas.length-1] && (
                        <p>{(datas[datas.length-1].avg_power).toPrecision(5)}</p>
                      )}
                      </p>
                    </div>
                  </div>
             
              </li>
            ))}
          </ul>
        </div>
      );
}
  

