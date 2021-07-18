interface ErrorProps {
  error?: Error;
  errors?: Error[];
}

export function ErrorMessage(props: ErrorProps) {
  if (props.error) {
    if (props.error.message) {
      return <>Error: {props.error.message}</>;
    } else {
      return <>Error...</>;
    } 
  } else if(props.errors && props.errors.length) {
    return <>{props.errors.map(error => {
      return <>Error: {error.message}</>;
    })}</>;
  } else {
    return <></>;
  }
}
