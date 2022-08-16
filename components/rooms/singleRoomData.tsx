import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import DataCard from "../data-card/dataCard";
import RoomChart from "../charts/roomChart";
import DeviceList from "../list/deviceList";
import axios from "axios";
import Alert from "../alert/dataAlert";
export default function singleRoomData({ open, setOpen, data, roomId }) {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getDevices();
  }, []);

  const getDevices = async () => {
    await axios
      .get(`/room/device/${roomId}`)
      .then((res) => {
        setDevices(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  if (isLoading == true) return <div>Loading...</div>;
  else {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-2xl pointer-events-auto">
                  <form className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="px-4 py-6 bg-gray-50 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              {" "}
                              Room Name{" "}
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Get your room information here.
                            </p>
                          </div>
                          <div className="flex items-center h-7">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="w-6 h-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <h1 className="mt-5 mb-3 ml-10 text-xl font-bold text-indigo-500">
                        Power Usage
                      </h1>
                      {data.length > 0 ? (
                        <div className="w-10/12 mx-auto h-96 mb-10">
                          <ParentSize>
                            {({ width, height }) => (
                              <RoomChart
                                width={width}
                                height={height}
                                data={data}
                              />
                            )}
                          </ParentSize>
                        </div>
                      ) : (
                        <div className="w-10/12 mx-auto mb-10">
                          <Alert description="No data present" />
                        </div>
                      )}
                      <div className="mt-10 ml-10 mr-10">
                        {data.length > 0 && (
                          <DataCard
                            power={data[data.length - 1].avg_power.toPrecision(
                              4
                            )}
                            volt={data[data.length - 1].avg_voltage.toPrecision(
                              4
                            )}
                            curr={data[data.length - 1].avg_current.toPrecision(
                              4
                            )}
                            powerChange={10}
                            voltChange={20}
                            currChange={30}
                          ></DataCard>
                        )}
                      </div>
                      <h1 className="mt-5 mb-3 ml-10 text-xl font-bold text-indigo-500">
                        Devices
                      </h1>
                      <div className="w-10/12 mx-auto mb-10">
                        {devices.devices.length > 0 ? (
                          <DeviceList data={devices.devices} />
                        ) : (
                          <Alert description="No data present"/>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          Close
                        </button>
                        
                      </div>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }
}
