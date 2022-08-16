import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import DataCard from "../data-card/dataCard";
import DeviceChart from "../charts/deviceChart";
import axios from "axios";
import Alert from "../alert/dataAlert"
export default function dataReceiveSlideover({ open, setOpen,data}) {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />
  
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-2xl">
                  <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              {" "}
                              User Name{" "}
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Get the user information here.
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Divider container */}
                      <h1 className="text-indigo-500 font-bold ml-10 mt-5 mb-3 text-xl">Power Usage</h1>
                      {data.length>0 ? (
                      <div className="w-10/12 mx-auto mb-10 h-96">
                        
                            <ParentSize>
                            {({ width, height }) => (
                              <DeviceChart width={width} height={height} data={data}/>
                            )}
                            </ParentSize>
                            </div>
                        ):(
                          <div className="mx-10 mb-10">
                          <Alert description="No data present" />
                        </div>
                        )}
                       
         
                      <div className="ml-10 mr-10 mt-10">
                        {data.length>0 && (
                          <DataCard
                            power={(data[data.length-1].avg_power).toPrecision(4)}
                            volt={(data[data.length-1].avg_voltage).toPrecision(4)}
                            curr={(data[data.length-1].avg_current).toPrecision(4)}
                            powerChange={10}
                            voltChange={20}
                            currChange={30}
                            ></DataCard>
                        )}
                            
                      </div>
                    </div>
  
                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Create
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
  

