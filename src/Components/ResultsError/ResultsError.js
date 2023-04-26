import { useParams, useNavigate } from "react-router-dom";
const ResultsError = () => {
  const { uuid } = useParams()
  const navigate = useNavigate()

  return (
    <main>
      <h1>Looks like something went wrong</h1>
      <h2>Make sure that you have completed all the questions on the screen.</h2>
      <h3>If it continues not to work please contact [insert Brian's phone number]</h3>
      <button onClick={() => {navigate(`/${uuid}/confirm-information`)}}>Go back to screen</button>
    </main>
  )
};

export default ResultsError;
