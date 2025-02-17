import { MouseEvent } from 'react';
import classes from './Avatar.module.css';

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
          src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
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
