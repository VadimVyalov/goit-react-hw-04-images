import { RotatingLines } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.stiled';
const Loader = () => (
  <LoaderWrapper>
    <RotatingLines
      strokeColor="#3f51b5"
      strokeWidth="4"
      animationDuration="1"
      width="70"
      visible={true}
    />
  </LoaderWrapper>
);

export default Loader;
