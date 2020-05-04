import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faExclamationTriangle,
  faCheckCircle,
  faFan,
} from '@fortawesome/free-solid-svg-icons';
import { animated, useSpring } from 'react-spring';
import './Message.scss';

const icons = {
  danger: <FontAwesomeIcon icon={faExclamationCircle} />,
  info: <FontAwesomeIcon icon={faFan} spin />,
  warning: <FontAwesomeIcon icon={faExclamationTriangle} />,
  success: <FontAwesomeIcon icon={faCheckCircle} />,
};

export function Message({ type, text }) {
  return (
    <Alert variant={type} className="d-flex">
      {icons[type]}
      {text}
    </Alert>
  );
}

export function SelfDestructiveMessage({ type, text, dismiss }) {
  const message = useRef();

  const [props, setAnimationParams] = useSpring(() => ({
    from: { right: '100%' },
    to: { right: '0%' },
    config: { duration: 3000 },

    // Progress bar animation completion callback
    onRest: () => {
      if (message.current) {
        dismiss();
      }
    },
  }));

  // Close message to greatly speed up self-destruct
  const speedUp = () => {
    setAnimationParams({ config: { duration: 200 } });
  };

  return (
    <Alert variant={type} ref={message} className="d-flex" dismissible onClose={speedUp}>
      {icons[type]}
      {text}
      <animated.div className="zm-progress-bar" style={props} />
    </Alert>
  );
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

SelfDestructiveMessage.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  dismiss: PropTypes.func,
};

SelfDestructiveMessage.defaultProps = {
  dismiss: () => {},
};
