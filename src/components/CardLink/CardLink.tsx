import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CardLink.module.css';

interface CardLink {
  id: string;
  children: ReactNode;
}

const CardLink = ({ id, children }: CardLink) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ranobe/${id}`);
  };
  return (
    <div onClick={handleClick} className={classes.cardLink}>
      {children}
    </div>
  );
};

export default CardLink;
