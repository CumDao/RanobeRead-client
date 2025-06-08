import { Typography } from '@mui/material';
import css from './OptionText.module.css';

interface OptionTextProps {
  title: string;
  value: string;
}

const OptionText = ({ title, value }: OptionTextProps) => {
  return (
    <div className={css.wrapper}>
      <Typography>{title}</Typography>
      <Typography>{value}</Typography>
    </div>
  );
};

export default OptionText;
