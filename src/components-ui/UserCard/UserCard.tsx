import Avatar from '../Avatar';
import classes from './UserCard.module.css';

interface UserCardProps {
  login: string;
  avatarUrl: string | null;
}

const UserCard = ({ login, avatarUrl }: UserCardProps) => {
  return (
    <>
      <div className={classes.userContainer}>
        <Avatar avatarUrl={avatarUrl} login={login} />
        <p className={classes.login}>{login}</p>
      </div>
    </>
  );
};

export default UserCard;
