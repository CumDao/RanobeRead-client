import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useChapterHistory } from '../../store/chaptersHistory';

interface RanobeDetailsProps {
  id: string;
}

const RanobeDetails = ({ id }: RanobeDetailsProps) => {
  const chapterNumber = useChapterHistory.use.getChapter()(id);
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/chapters/${id}/${chapterNumber ?? 0}`);
  };

  return (
    <>
      <p>Тут страница с id: {id}</p>
      <Button variant="contained" color="primary" onClick={() => handleNavigation()}>
        Начать читать
      </Button>
      {!!chapterNumber && (
        <Button variant="contained" color="primary" onClick={() => handleNavigation()}>
          Продолжить чтение
        </Button>
      )}
    </>
  );
};

export default RanobeDetails;
