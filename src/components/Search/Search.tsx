import { InputAdornment, TextField } from '@mui/material';
import styles from './Search.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useState } from 'react';

const Search = () => {
  const [_, setSearch] = useState('');
  const heandleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <TextField
      className={styles.search}
      size="small"
      placeholder="Поиск"
      onChange={heandleSearch}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
export default Search;
