import workoutLogo from '../imgs/workout.png';
import Descriptions from './Descriptions';

const Banner = () => {
  return (
    <div className='home-logo'>
      <img src={workoutLogo} alt='Logo' />
      <Descriptions />
    </div>
  );
};

export default Banner;
