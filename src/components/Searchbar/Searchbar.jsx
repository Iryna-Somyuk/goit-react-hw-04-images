import {
  SearchbarForm,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnlLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

import { FcSearch } from 'react-icons/fc';

export const Searchbar = ({ onSubmit }) => {
  const handelSubmitForm = event => {
    event.preventDefault();

    const { query } = event.currentTarget.elements;

    if (query.value.trim() === '') {
      toast.error(
        'Sorry, there are no images matching your search query. Please enter something!',
        {
          duration: 4000,
        }
      );
      return;
    }
    onSubmit(query.value);
  };

  return (
    <SearchbarForm>
      <SearchForm onSubmit={handelSubmitForm}>
        <SearchFormBtn type="submit">
          <FcSearch size={40} />
          <SearchFormBtnlLabel>Search</SearchFormBtnlLabel>
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
      <Toaster position="top-center" reverseOrder={true} />
    </SearchbarForm>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
