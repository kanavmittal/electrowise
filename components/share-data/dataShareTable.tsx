import { TrashIcon } from "@heroicons/react/outline";
import DeleteModal from "../modals/deleteModal";
import {CheckIcon} from "@heroicons/react/outline"
import axios from "axios";
import {Loader} from "../loader/Loader"
import {useEffect,useState} from "react"
export default function dataShareTable() {
  const [followers,setFollowers]=useState([]);
  const [pendingRequest,setPendingRequest]=useState([]);
  const [confirmData,setConfirmData]=useState({});
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{
    getFollowers();
    handleRequest();
  },[])
  var count=1;
  var count1=1;
  const getFollowers=async()=>{
    await axios.get('/sharing/followers').then((res)=>{
      setFollowers(res.data);
      setIsLoading(false);
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false);
    })
  }
  const handleRequest=async()=>{
    await axios.get('/sharing/getPendingRequest').then((res)=>{
      setPendingRequest(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  const confirmRequest=async(follow_id,user_id)=>{
    confirmData["follow_id"]=follow_id;
    confirmData["user_id"]=user_id
    await axios.post('/sharing/accept',confirmData).then((res)=>{
      console.log("accepted");
      window.location.reload();
    }).catch((err)=>{
      console.log(err);
    })
  }
  const rejectRequest=async(follow_id,user_id)=>{
    confirmData["follow_id"]=follow_id;
    confirmData["user_id"]=user_id 
    await axios.post('/sharing/deleteRequest',confirmData).then((res)=>{
      console.log("rejected");
      window.location.reload();  
    }).catch((err)=>{
      console.log(err);
    })

  }
  if(isLoading)
  {
    return <Loader />
  }
  else{
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="mt-10 text-xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users with whom you have shared your data.
            </p>
          </div>
  
        </div>
        <div className="flex flex-col mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="mb-10 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                  {pendingRequest.length>0 && (
               <tr>
               <th
                 scope="col"
                 className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
               >
                 S.No
               </th>
               <th
                 scope="col"
                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
               >
                 Name
               </th> 
               <th
                 scope="col"
                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
               >
                 Email
               </th>
               <th
                 scope="col"
                 className="relative py-3.5 pl-3 pr-4 sm:pr-6"
               >
                 <span className="sr-only">Send</span>
               </th>
             </tr> 
                )}
                    
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingRequest.map((person) => person.request.isPending && (
                      
                      <tr key={person.follower_data.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                          {count1++}
                        </td>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                          {person.follower_data.username}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {person.follower_data.email}
                        </td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                          <button className="p-1 px-2 mr-4 text-white bg-green-600 rounded hover:bg-green-700" 
                         onClick={()=>confirmRequest(person.request.follower_id,person.request.user_id)}
                      >
                        <div className="flex flex-row items-center mx-8 my-1 text-center">
                        <CheckIcon className="w-4 h-4 "/>   
                          <span className="px-2">Confirm</span></div>  
                          </button>
                          <button className="p-1 px-2 text-white bg-red-600 rounded hover:bg-red-700"
                      onClick={()=>rejectRequest(person.request.follower_id,person.request.user_id)}>
                        <div className="flex items-center mx-8 my-1 text-center -row">
                          <TrashIcon className="w-4 h-4" />
                          <span className="px-2">Reject</span>
                        </div>
                       
                          </button>
                        </td>
                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        S.No
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th> 
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Send</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {followers.map((person) =>  (
                      <tr key={person.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">{count++}</td>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                          {person.username}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {person.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    );
  }
  
}
