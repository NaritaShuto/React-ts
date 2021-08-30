import React from 'react';
import {Answer} from './index';

type Props = {
    answers: {
        content: string
        nextId: string
    }[]
    select: (
        selectedAnswer: string, 
        nextQuestionId: string
    ) => void
}

const AnswersList: React.FC<Props> = ({ answers, select }) => {
    return (
        <div className='.c-grid__answer'>
            {answers.map((value, index) => {
                return <Answer content={value.content} nextId={value.nextId} key={index.toString()} select={select} />
            })}
        </div>
    )
}

export default AnswersList