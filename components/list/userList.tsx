import axios from "axios";
import {useState} from "react"
export default function userList({data,uid, setOpen}) {
  const [datas,setDatas]=useState({});
  const sendRequest=async(follow_id)=>{
    datas["user_id"]=uid;
    datas["follow_id"]=follow_id
    await axios.post('/sharing/sendRequest',datas).then((res)=>{
      console.log("request sent");
      setDatas(res.data);
      setOpen(false);
    }).catch((err)=>{
      console.log(err);
    })
  }
  console.log(datas)
    return (
    
      <ul role="list" className="divide-y divide-gray-200">
        {data.map((person) => (
          <li key={person.email} className="py-4 flex">
            <img className="h-10 w-10 rounded-full" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" />
            <button onClick={(e)=>{
              e.preventDefault();
              sendRequest(person.id)
            }}>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 float-left">{person.username}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
            </button>
            
          </li>
        ))}
      </ul>
    )
  
  
}
