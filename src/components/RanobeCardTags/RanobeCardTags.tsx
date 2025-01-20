import { Chip } from '@mui/material';
import { Tag } from '../../types/ranobe';
import classes from './RanobeCardTags.module.css';

interface TagListProps {
  tags: Tag[];
}
const TagList = ({ tags }: TagListProps) => {
  return tags.map((tag) => (
    <Chip className={classes.tag} label={tag.name} color="primary" size="small" />
  ));
};
export default TagList;
