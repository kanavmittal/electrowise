import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import {
  ShieldCheckIcon,
  LightningBoltIcon,
  LightBulbIcon,
} from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function datacard({
  power,
  volt,
  curr,
  powerChange,
  voltChange,
  currChange,
}) {
  const stats = [
    {
      id: 1,
      name: "Power",
      stat: power,
      icon: LightBulbIcon,
      change: powerChange,
    },
    {
      id: 2,
      name: "Voltage",
      stat: volt,
      icon: ShieldCheckIcon,
      change: voltChange,
    },
    {
      id: 3,
      name: "Current",
      stat: curr,
      icon: LightningBoltIcon,
      change: currChange,
    },
  ];
  return (
    <div>
      <dl className=" mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="h-3/5 relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-14 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-14 pb-6 flex items-baseline sm:pb-7">
              <p className="text-xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.change >= 0 ? "text-green-600" : "text-red-600",
                  "ml-2 flex items-baseline text-sm font-semibold"
                )}
              >
                {item.change >= 0 ? (
                  <ArrowSmUpIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only ml-7">
                  {item.change >= 0 ? "Increased" : "Decreased"} by
                </span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
