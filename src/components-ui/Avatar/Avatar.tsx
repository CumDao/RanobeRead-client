import { MouseEvent } from 'react';
import classes from './Avatar.module.css';
import { getFullUrl } from '../../helpers/getFullUrl';

interface AvatarProps {
  avatarUrl: string | null;
  login: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const Avatar = ({ avatarUrl, login, onClick }: AvatarProps) => {
  return (
    <>
      {avatarUrl ? (
        <img
          alt="avatar"
          className={classes.avatar}
          src={getFullUrl(avatarUrl)}
          onClick={onClick}
        />
      ) : (
        <div className={classes.avatarFallback} onClick={onClick}>
          {login.toUpperCase()[0]}
        </div>
      )}
    </>
  );
};

export default Avatar;
