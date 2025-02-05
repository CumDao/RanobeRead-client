import { Typography, useMediaQuery } from '@mui/material';
import classes from './Breadcrumbs.module.css';
import { Link } from 'react-router-dom';
import { Fragment, ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
  icon?: ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const isMobile = useMediaQuery('(max-width:960px)');
  const separator = isMobile ? '▼' : '»';

  return (
    <nav className={classes.navigation}>
      <ol className={classes.breadcrumbs}>
        {items.map((item, index) => (
          <Fragment key={index}>
            <li key={index}>
              {item.to ? (
                <Link to={item.to}>
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <Typography>
                  {item.icon}
                  {item.label}
                </Typography>
              )}
            </li>
            {index < items.length - 1 && <li className={classes.separator}>{separator}</li>}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
