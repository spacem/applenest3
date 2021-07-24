import { useHistory } from 'react-router-dom';

interface SwitchPlayerProps {
  userId: string | null;
  onDelete: () => void;
}

export function DeletePlayer(props: SwitchPlayerProps) {
  const history = useHistory();
  return <>
  <div>
    If this account is not linked to any social media service you can keep the user ID to recover it in future
  </div>
  <div>
    The ID is {props.userId}
  </div>
  <div>
    WARNING: Unless the account is linked it will be unrecoverable without the userId.
  </div>
  <div>
    <button onClick={() => {
      props.onDelete();
      history.push('/');
    }}>
      Delete Current Player
    </button>
  </div>
  </>;
}
