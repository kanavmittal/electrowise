export default function deviceList({data}) {
    console.log(data);
    return (
      <ul role="list" className="divide-y divide-gray-200">
        {data.map((device) => (
          <li key={device.id} className="flex py-4">
            <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80" alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{device.name.toUpperCase()}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }