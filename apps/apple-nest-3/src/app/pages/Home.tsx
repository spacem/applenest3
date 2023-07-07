import { Link, useHistory } from 'react-router-dom';

interface HomeProps {
  userId: string | null;
  onCreate: () => void;
}

export function Home(props: HomeProps) {
  const history = useHistory();
  function createPlayer() {
    props.onCreate();
    history.push('/create-character');
  }
  
  function fetchAction(userId: string | null) {
    if (userId) {
      return <div>
        <Link to="/select-character">Sign In</Link>
        <Link to="/returning-player">Switch User</Link>
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
      <img alt="Farmer" src="assets/apple_nest.jpg" height="100%"></img>
      <p>Welcome. </p>
      {fetchAction(props.userId)}
    </>
  );
}
