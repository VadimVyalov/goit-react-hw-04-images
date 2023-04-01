import PropTypes from 'prop-types';
import { ButtonWrapepr } from './Button.styled';

const Button = ({ loadMore }) => (
  <ButtonWrapepr>
    <button type="botton" onClick={loadMore}>
      load more
    </button>
  </ButtonWrapepr>
);

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
