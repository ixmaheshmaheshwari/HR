import { HashLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color={'#7986cb'} size={80} />
    </div>
  );
};

export default Spinner;
