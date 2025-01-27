import { Box, Breadcrumbs as BreadcrumbsMUI, Typography, useMediaQuery } from '@mui/material';
import classes from './Breadcrumbs.module.css';
import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

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
  return (
    <Box className={classes.navigation}>
      <BreadcrumbsMUI separator={isMobile ? '▼' : '»'} className={classes.breadcrumbs}>
        {items.map((item, index) =>
          item.to ? (
            <NavLink key={index} to={item.to}>
              {item.icon}
              {item.label}
            </NavLink>
          ) : (
            <Typography key={index}>
              {item.icon}
              {item.label}
            </Typography>
          ),
        )}
      </BreadcrumbsMUI>
    </Box>
  );
};

export default Breadcrumbs;
