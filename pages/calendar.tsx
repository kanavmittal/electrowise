/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import axios from "axios";
import {useState,useEffect} from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function calendar() {
  const [data,setData]=useState([]);
  useEffect(()=>{
    getData();
  },[])
console.log(data);
  const getData=async()=>{
    await axios.get('/cost/get').then((res)=>{
      setData(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div>
      <div className="bg-gray-100">
        <div className="grid max-w-3xl grid-cols-1 px-4 py-16 mx-auto gap-x-8 gap-y-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
          {data.map((month) => (
            <section key={month.name} className="text-center">
              <h2 className="font-semibold text-gray-900">{month.name}</h2>
              <div className="grid grid-cols-7 mt-6 text-xs leading-6 text-gray-500">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
              </div>
              <div className="grid grid-cols-7 gap-px mt-2 text-sm bg-gray-200 rounded-lg shadow isolate ring-1 ring-gray-200">
                {month.days.map((day, dayIdx) => (
                  <button
                    key={day.date}
                    type="button"
                    className={classNames(
                      day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
                      dayIdx === 0 && 'rounded-tl-lg',
                      dayIdx === 6 && 'rounded-tr-lg',
                      dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                      dayIdx === month.days.length - 1 && 'rounded-br-lg',
                      'py-2  hover:bg-gray-100 focus:z-10 '
                    )}
                  >
                    <time
                      dateTime={day.date}
                      className={classNames(
                        day.isToday && 'bg-indigo-600 font-semibold text-white',
                        'mx-auto flex flex-col h-11 w-13 items-center justify-center rounded-full '
                      )}
                    >
                      {day.date.split('-').pop().replace(/^0/, '')}
                      {day.data!=0 && (
 <span className="text-green-500">₹{(day.data).toPrecision(5)}</span>
                      )}
                     
                    </time>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
