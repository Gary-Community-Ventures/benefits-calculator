import { FormattedMessageType } from "../../Types/Questions";
import HelpButton from "../HelpBubbleIcon/HelpButton";

type QuestionHeaderAndDescProps = {
  question?: FormattedMessageType;
  helpText?: string;
  helpId?: string;
  description?: FormattedMessageType;
};

const QuestionHeaderAndDesc = ({ question, helpText, helpId, description }: QuestionHeaderAndDescProps) => {
  const hasHelpButton = helpText && helpId;
  return (
    <>
      <h2 className="question-label">
        {question}
        {hasHelpButton && <HelpButton helpText={helpText} helpId={helpId} />}
      </h2>
      {description && <p className="question-description">{description}</p>}
    </>
  );
};

export default QuestionHeaderAndDesc;