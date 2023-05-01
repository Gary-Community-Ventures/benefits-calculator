import { useParams, useNavigate } from "react-router-dom";
const ResultsError = () => {
  const { uuid } = useParams()
  const navigate = useNavigate()

  return (
    <main>
      <h1>Oops! Looks like something went wrong</h1>
      <p>We're sorry. We are having </p>
      <button onClick={() => {navigate(`/${uuid}/confirm-information`)}}>Go back to screen</button>
    </main>
  )
};

export default ResultsError;
