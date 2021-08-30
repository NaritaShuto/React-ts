import React, { FC, useEffect, useState, useCallback } from 'react'
import defaultDataset from './dataset'
import './assets/styles/style.css'
import { AnswersList, Chats } from './components/index'
import FormDialog from './components/Forms/FormDialog'

// type State = {
//     answers: {
//         content: string
//         nextId: string
//     }[]
//     chats: {
//         text: string
//         type: string
//     }[]
//     currentID: string
//     dataset: typeof defaultDataset
//     open: boolean
// }

// export default class App extends React.Component<{}, State> {
//   constructor(props: {}) {
//         super(props)
//         this.state = {
//             answers: [],
//             chats: [],
//             currentID: 'init',
//             dataset: defaultDataset,
//             open: false,
//         }
//         this.selectAnswer = this.selectAnswer.bind(this)
//         this.handleClose = this.handleClose.bind(this)
//         this.handleClickOpen = this.handleClickOpen.bind(this)
//     }

type Answer = {
    content: string
    nextId: string
}
type Chat = {
    text: string
    type: string
}

const App: FC<{}> = () => {
    const [answers, setAnswers] = useState<Answer[]>([])
    const [chats, setChats] = useState<Chat[]>([])
    const [currentID, setCurrentID] = useState('init')
    const [dataset, setDataset] = useState(defaultDataset)
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const addChats = (chat: Chat) => {
        setChats((prevChats) => {
            return [...prevChats, chat]
        })
    }

    const displayNextQuestion = (
        nextQuestionId: string,
        nextDataset: typeof defaultDataset
    ) => {
        addChats({
            text: nextDataset[nextQuestionId].question,
            type: 'question',
        })

        setAnswers(nextDataset[nextQuestionId].answers)
        setCurrentID(nextQuestionId)
    }

    const selectAnswer = (selectedAnswer: string, nextQuestionId: string) => {
        switch (true) {
            case nextQuestionId === 'contact': {
                handleClickOpen()
                break
            }
            case /^https:*/.test(nextQuestionId): {
                const a = document.createElement('a')
                a.href = nextQuestionId
                a.target = '_blank'
                a.click()
                break
            }
            default: {
                addChats({
                    text: selectedAnswer,
                    type: 'answer',
                })
                setTimeout(
                    () => displayNextQuestion(nextQuestionId, dataset),
                    1000
                )
                break
            }
        }
    }

    // componentDidMount() {
    //   const initAnswer = ''
    //   this.selectAnswer(initAnswer, this.state.currentID)
    // }
    useEffect(() => {
        // const initAnswer = ''
        // selectAnswer(initAnswer, currentID)
        setDataset(dataset)
        displayNextQuestion(currentID, dataset)
    }, [])

    // componentDidUpdate() {
    //   const scrollArea = document.getElementById('scroll-area')
    //   if (scrollArea) {
    //       scrollArea.scrollTop = scrollArea.scrollHeight
    //   }
    // }
    useEffect(() => {
        // scroll要素をもつDomのIDをscrollAreaに入れる
        const scrollArea = document.getElementById('scroll-area')
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight
        }
    })

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return (
        <div>
            <section className="c-section">
                <div className="c-box">
                    <Chats chats={chats} />
                    <AnswersList
                        answers={answers}
                        select={selectAnswer}
                    />
                    <FormDialog
                        open={open}
                        handleClose={handleClose}
                    />
                </div>
            </section>
        </div>
    )
    
}

export default App