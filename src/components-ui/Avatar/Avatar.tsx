import { MouseEvent } from 'react';
import classes from './Avatar.module.css';
import clsx from 'clsx';

interface AvatarProps {
  avatarUrl: string | null;
  login: string;
  size?: 'small' | 'medium';
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const Avatar = ({ avatarUrl, login, onClick, size = 'medium' }: AvatarProps) => {
  return (
    <>
      {avatarUrl ? (
        <img
          alt="avatar"
          className={clsx(classes.avatar, size === 'small' ? classes.small : '')}
          src={avatarUrl}
          onClick={onClick}
        />
      ) : (
        <div
          className={clsx(classes.avatarFallback, size === 'small' ? classes.small : '')}
          onClick={onClick}
        >
          {login.toUpperCase()[0]}
        </div>
      )}
    </>
  );
};

export default Avatar;
