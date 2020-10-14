import { h } from 'preact';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../button';
import Text from '../text';
import style from './style.css';

const Message = props => {
    const { children=null, onClose, text, type } = props;
    const className = `${style.message} ${style[type]}`;
    const { isAuthenticated, logout } = useAuth0();

    return (
        <div className={className}>
            <Text className={style.messageText}>
                {text}
            </Text>

            {children}

            {isAuthenticated && type === 'success' &&
                <Button actionType="confirm" htmlType="button" onClick={logout} className={style.logoutButton}>
                    Log Out
                </Button>
            }

            {onClose && 
                <Button actionType="cancel" htmlType="button" onClick={onClose} className={style.closeButton}>
                    <i aria-label="Close" className={style.closeIcon} />
                </Button>
            }
        </div>
    );
}

export default Message;