import React from "react";
import { Answer } from "./index";

type Props = {
  answers: {
    content: string;
    nextId: string;
  }[];
  executable?: boolean;
  select: (param: { content: string; nextId: string }) => void;
};

// TODO: AnswersList -> AnswerListとする。●●Listや●●Arrayとして複数化する場合、●●は単数系にする。
const AnswersList = ({ answers, select, executable = true }: Props) => {
  return (
    <div className=".c-grid__answer">
      {answers.map((value, index) => {
        return (
          <Answer
            content={value.content}
            nextId={value.nextId}
            disabled={!executable}
            key={index.toString()}
            select={() => select(value)}
          />
        );
      })}
    </div>
  );
};

export default AnswersList;
