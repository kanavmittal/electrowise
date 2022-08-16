import { AtomSpinner } from 'react-epic-spinners'

export function Loader() {
  
  return(
    <div className="flex flex-row items-center justify-center">
    <AtomSpinner color="#00d1ff" className="loading" />
    </div>
  ) 
}