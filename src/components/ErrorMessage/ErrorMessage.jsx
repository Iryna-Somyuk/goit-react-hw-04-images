import PropTypes from 'prop-types';
import { FcAbout } from 'react-icons/fc';
import { Message } from './ErrorMessage.styled';

export const Notification = () => {
  return (
    <Message>
      "We're sorry, something's wrong. Please try again later!"
      <FcAbout size={45} />
    </Message>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
