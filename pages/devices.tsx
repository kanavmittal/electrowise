/* This example requires Tailwind CSS v2.0+ */
import axios from "axios";
import { useEffect, useState } from "react";
import SingleDeviceCard from "../components/devices/singleDeviceCard";
import AddDeviceSlideover from "../components/slideovers/addDeviceSlideover";

export default function rooms({ uid }) {
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [room,setRoom]=useState([]);
  useEffect(() => {
   getDevices();
  }, []);
  console.log(room);
  const getDevices=async()=>{
    await axios
    .get("/device/list")
    .then((res) => {
      setDevices(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <div className="h-screen bg-gray-100">
      <header className="relative flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">
          <time dateTime="2022">Your Devices</time>
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <span className="relative w-px h-5 -mx-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Devices
            </button>
          </div>
        </div>
      </header>
      <div className="px-4 mx-auto mt-5 max-w-7xl sm:px-6 lg:px-8">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {devices.map((device) => (
            <SingleDeviceCard
              key={device.id}
              deviceId={device.id}
              device={device}
              roomId={device.room_id}
            ></SingleDeviceCard>
          ))}
        </ul>
      </div>
      <AddDeviceSlideover
        uid={uid}
        open={open}
        setOpen={setOpen}
      ></AddDeviceSlideover>
    </div>
  );
}
