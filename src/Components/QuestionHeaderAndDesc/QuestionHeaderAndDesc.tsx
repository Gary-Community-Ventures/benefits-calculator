import { FormattedMessageType } from "../../Types/Questions";

type QuestionHeaderAndDescProps = {
  question?: FormattedMessageType;
  description?: FormattedMessageType;
};

const QuestionHeaderAndDesc = ({ question, description }: QuestionHeaderAndDescProps) => {
  return (
    <>
      <h2 className="question-label">{question}</h2>
      {description && <p className="question-description">{description}</p>}
    </>
  ); 
}

export default QuestionHeaderAndDesc;