/* This example requires Tailwind CSS v2.0+ */
import { ShareIcon, CloudDownloadIcon } from "@heroicons/react/outline";
import DataShareTable from "../components/share-data/dataShareTable"
import DataReceiveTable from "../components/share-data/dataReceiveTable"
import {useState} from "react";
export default function share({uid}) {

  const [check,setCheck]=useState({share:true,receive:false});
  const handleShare = (event) => {
    setCheck({ ...check, share: true,receive:false})
  };
  const handleReceive = (event) => {
    setCheck({ ...check, receive: true,share:false})
  };
  let style1={};
  let style2={};
  if(check.share)
  {
    style1={
      'background-color':'rgb(209 213 219)'
    }
    style2={
    'background-color':'inherit'  
   }
  }
  else{
    style2={
      'background-color':'rgb(209 213 219)'
    }
   style1={
    'background-color':'inherit'  
   } 
  }
  console.log(uid)
  return (
    <>
      <div className="h-full">
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            {
              check.share?(
                <main className="relative z-0 flex-1 h-screen overflow-y-auto focus:outline-none xl:order-last " >
                <DataShareTable />
                </main> 
              ):
              (
                <main className="relative z-0 flex-1 h-screen overflow-y-auto focus:outline-none xl:order-last" >
                <DataReceiveTable uid={uid}/>
                </main>
                
              )
            }
            <aside className="relative flex-shrink-0 w-20 h-screen overflow-y-auto bg-gray-200 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
              <div className="w-full pt-2 pl-2 pr-2 text-center ">

                    <button className="px-1 pt-4 pb-4 mb-6 rounded-md" onClick={handleShare} style={style1}>
                    <ShareIcon className="mb-2 ml-4 mr-4 " />
                    <span className="text-sm">Data Shared</span>
                  </button>
  
                  <button className="px-1 py-2 pb-4 mb-10 rounded-md" onClick={handleReceive} style={style2}>
                    <CloudDownloadIcon className="mb-2 ml-4 mr-4 rounded-md" />
                    <span className="text-sm">Data Received</span>
                  </button>
                  
              
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
