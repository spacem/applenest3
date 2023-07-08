import { Link } from 'react-router-dom';

type ActionProps = {
  title: string;
  action: string;
  param?: string;
  icon?: string;
  onClick?: () => void;
};

export function Action({ title, action, param, icon, onClick }: ActionProps) {
  if (action === 'nav' && param) {
    return (
      <Link to={param}>
        {icon && <img alt="icon" src={`assets/${icon}`} />}
        <span>{title}</span>
      </Link>
    );
  }
  return (
    <button onClick={onClick}>
      {icon && <img alt="icon" src={`assets/${icon}`} />}
      <span>{title}</span>
    </button>
  );
}
