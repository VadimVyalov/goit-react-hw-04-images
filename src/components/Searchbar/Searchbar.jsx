import PropTypes from 'prop-types';
import { Header } from './Searchbar.styled';
import { MdOutlineImageSearch } from 'react-icons/md';
const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <form onSubmit={onSubmit}>
        <button type="submit">
          <MdOutlineImageSearch />
        </button>
        <input
          name="searchString"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </Header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
