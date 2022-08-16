import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import SingleDeviceData from "./singleDeviceData.tsx";
import DeleteModal from "../modals/deleteModal";
import axios from "axios";
import Alert from "../modals/alertModal";
import { Loader} from "../loader/Loader";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function singleDeviceCard({ device, deviceId, roomId }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [devices, setDevices] = useState([]);
  const [room, setRoom] = useState([]);
  useEffect(() => {
    getDeviceData();
    getDevice();
    getRoom();
  }, []);
  const getDevice = async () => {
    await axios.get(`/device/${deviceId}`).then((res) => {
      setDevices(res.data);
    });
  };
  const getRoom = async () => {
    await axios
      .get(`/room/${roomId}`)
      .then((res) => {
        setRoom(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = async () => {
    await axios
      .delete(`/device/delete/${deviceId}`)
      .then((res) => {
        console.log("data deleted");
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDuplicate = async () => {
    await axios
      .post("/device/create", devices)
      .then((res) => {
        console.log(res);
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDeviceData = async () => {
    try {
      var deviceData = await axios.get(`/device/data/${deviceId}`);
      setData(deviceData.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  if (isLoading == false) {
    return (
      <div>
        <li
          key={device.id}
          className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow"
        >
          <div className="flex flex-col flex-1 p-8">
            <div>
              <Menu
                as="div"
                className="relative inline-block float-right mb-3 text-left"
              >
                <div>
                  <Menu.Button className="flex items-center text-gray-400  hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 w-30 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm w-full"
                            )}
                            onClick={handleDuplicate}
                          >
                            {" "}
                            Duplicate
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm w-full"
                            )}
                            onClick={() => setShowModal(true)}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <img
              className="flex-shrink-0 w-32 h-32 mx-auto rounded-full"
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80"
              alt=""
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {device.name.toUpperCase()}
            </h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dt className="sr-only">Room Name</dt>
              <dd className="mt-3">
                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {room.name}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="flex -mt-px divide-x divide-gray-200">
              <div className="flex flex-1 w-0">
                <button
                  onClick={() => {
                    if (data.length == 0) {
                      setOpen(false);
                      setAlert(true);
                    } else setOpen(true);
                  }}
                  className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span className="ml-3 text-md">View</span>
                </button>
              </div>
            </div>
          </div>
        </li>
        <SingleDeviceData
          data={data}
          open={open}
          setOpen={setOpen}
          deviceName={device.name}
        ></SingleDeviceData>
        <DeleteModal
          open={showModal}
          setOpen={setShowModal}
          description="Are you sure you want to delete the device. Once the device is deleted you will not be able to see its data."
          handleDelete={handleDelete}
        ></DeleteModal>
        <Alert open={alert} setOpen={setAlert} />
      </div>
    );
  } else {
    return <Loader />;
  }
}
