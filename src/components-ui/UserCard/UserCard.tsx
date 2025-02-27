import { refresh } from '../../api/auth';
import Avatar from '../Avatar';
import classes from './UserCard.module.css';

interface UserCardProps {
  login: string;
  avatarUrl: string | null;
}

const UserCard = ({ login, avatarUrl }: UserCardProps) => {
  const handleCock = async () => {
    const token = await refresh();
    console.log(token);
  };
  return (
    <>
      <div className={classes.userContainer}>
        <Avatar onClick={handleCock} avatarUrl={avatarUrl} login={login} />
        <p className={classes.login}>{login}</p>
      </div>
    </>
  );
};

export default UserCard;
