import { BreedingRhombusSpinner } from 'react-epic-spinners'
import PropTypes from 'prop-types';
export function Loading() {
  
  return(
    <div className="flex flex-row items-center justify-center">
    <BreedingRhombusSpinner color="#00d1ff" className="loading" />
    </div>
  ) 
}