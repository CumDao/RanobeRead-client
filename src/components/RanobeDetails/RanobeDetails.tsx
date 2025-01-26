import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface RanobeDetailsProps {
  id: string;
}

const RanobeDetails = ({ id }: RanobeDetailsProps) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/chapters/${id}/${1}`);
  };

  return (
    <>
      <p>Тут страница с id: {id}</p>
      <Button variant="contained" color="primary" onClick={handleNavigation}>
        Начать читать
      </Button>
    </>
  );
};

export default RanobeDetails;
