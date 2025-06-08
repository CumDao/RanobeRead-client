import { Button, Rating, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import css from './RanobeDetails.module.css';
import { useChapterHistory } from '../../store/chaptersHistory';
import { useRanobe } from '../../store/ranobe';
import { getFullUrl } from '../../helpers/getFullUrl';
import OptionText from '../../components-ui/OptionText';
import { formatDate } from '../../helpers/dateUtils';
import TagList from '../../components-ui/RanobeCardTags/RanobeCardTags';

interface RanobeDetailsProps {
  id: string;
}

const RanobeDetails = ({ id }: RanobeDetailsProps) => {
  const chapterNumber = useChapterHistory.use.getChapterById()(id);
  const ranobe = useRanobe.use.ranobe();
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/chapters/${id}/${chapterNumber ?? 1}`);
  };

  if (!ranobe) return;

  const starRating = ranobe.rating ? ranobe.rating / 2 : 0;
  // const alternativeName = ranobe.nameSecond ? `${ranobe.nameSecond}${ranobe.nameThird ? ` / ${ranobe.nameThird}` : ''}` : null;

  return (
    <div>
      <div className={css.detailsWrapper}>
        <img
          loading="lazy"
          src={getFullUrl(ranobe.image)}
          alt="auth image"
          className={css.ranobeImage}
        />
        <div className={css.contentWrapper}>
          <Typography variant="h4">{ranobe.nameFirst}</Typography>
          {ranobe.nameSecond && <Typography variant="h6">{ranobe.nameSecond}</Typography>}
          <div className={css.tagsWrapper}>
            <TagList tags={ranobe.tags} />
          </div>
          <div className={css.ratingWrapper}>
            <Rating value={starRating} precision={0.1} readOnly max={5} />
            <div className={css.flex}>
              <Typography variant="h6">{ranobe.rating}</Typography>
              <Typography variant="h6">({ranobe.ratingCount})</Typography>
            </div>
          </div>
          <div className={css.optionsWrapper}>
            <OptionText title="Страна" value={ranobe.country.name} />
            <OptionText title="Статус" value={ranobe.status} />
            <OptionText title="Автор" value={ranobe.author.nameFirst} />
            <OptionText title="Дата последнего обновления" value={formatDate(ranobe.updatedAt)} />
            <OptionText title="Глав" value={`${ranobe.chapters}`} />
            <OptionText title="Выпуск" value={`${ranobe.year} г.`} />
            <OptionText title="Переводчик" value={ranobe.translator.name} />
            {ranobe.nameThird && (
              <OptionText title="Альтернативное название" value={ranobe.nameThird} />
            )}
          </div>
          <Button
            className={css.continueButton}
            variant="contained"
            color="info"
            onClick={handleNavigation}
          >
            {chapterNumber ? 'Продолжить чтение' : 'Начать читать'}
          </Button>
        </div>
      </div>
      <div className={css.descriptionWrapper}>
        <Typography variant="h4">Описание</Typography>
        <Typography variant="h6">{ranobe.description}</Typography>
      </div>
    </div>
  );
};

export default RanobeDetails;
