import { Chip } from '@mui/material';
import { Tag } from '../../types/ranobe';

interface TagListProps {
  tags: Tag[];
}

const TagList = ({ tags }: TagListProps) => {
  return tags.map((tag) => (
    <Chip key={tag.id} sx={{ padding: 0 }} label={tag.name} color="primary" size="small" />
  ));
};

export default TagList;
