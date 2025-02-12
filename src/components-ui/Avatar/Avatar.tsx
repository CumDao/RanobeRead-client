import classes from './Avatar.module.css';

interface AvatarProps {
  avatarUrl: string | null;
  login: string;
}

const Avatar = ({ avatarUrl, login }: AvatarProps) => {
  return (
    <>
      {avatarUrl ? (
        <img
          alt="avatar"
          className={classes.avatar}
          src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
        />
      ) : (
        <div className={classes.avatarFallback}>{login.toUpperCase()[0]}</div>
      )}
    </>
  );
};

export default Avatar;
