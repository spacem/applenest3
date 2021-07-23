import { Link } from 'react-router-dom';

interface HomeProps {
  userId: string | null;
  onCreate: () => void;
}

export function Home(props: HomeProps) {
  function createPlayer() {
    props.onCreate();
  }
  
  function fetchAction(userId: string | null) {
    if (userId) {
      return <div>
        <Link to="/select-character">Sign In</Link>
        <Link to="/returning-player">Siwtch User</Link>
        </div>
    } else {
      return <div>
        <button onClick={() => createPlayer()}>New Player</button>
        <Link to="/returning-player">Returning Player</Link>
      </div>
    }
  }

  return (
    <>
      <h1>Apple Nest</h1>
      <p>Welcome. </p>
      {fetchAction(props.userId)}
    </>
  );
}
