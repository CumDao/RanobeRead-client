import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ChapterPage = () => {
  const { id, chapterNumber } = useParams<{ id: string; chapterNumber: string }>();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Произведение ID: {id}
      </Typography>
      <Typography variant="h5">Глава №{chapterNumber}</Typography>
      <Typography>Пупупу</Typography>
      <Typography>Update Jenkinsfile</Typography>
      <Typography>Update Jenkinsfile</Typography>
      <Typography>Update Jenkinsfile</Typography>
      <Typography>Update Jenkinsfile</Typography>
      <Typography>Update Jenkinsfile</Typography>
      <Typography>Update Jenkinsfile</Typography>
      <Typography>Update Jenkinsfile</Typography>
      <Typography>Update Jenkinsfile</Typography>
      <Typography>Update Jenkinsfile</Typography>
    </Container>
  );
};

export default ChapterPage;
