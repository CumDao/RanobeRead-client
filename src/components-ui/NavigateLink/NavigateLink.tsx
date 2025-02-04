import { NavLink, NavLinkProps } from 'react-router-dom';
import classes from './NavigateLink.module.css';

interface NavigateLinkProps extends NavLinkProps {
  linkType?: 'title' | 'image';
}

const NavigateLink = ({ children, linkType = 'title', ...args }: NavigateLinkProps) => {
  return (
    <NavLink className={linkType === 'title' ? classes.nameLink : ''} {...args}>
      {children}
    </NavLink>
  );
};

export default NavigateLink;
