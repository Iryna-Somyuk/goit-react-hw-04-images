import { Btn, BtnContainer } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <BtnContainer>
      <Btn type="button" onClick={onLoadMore}>
        Load more
      </Btn>
    </BtnContainer>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
