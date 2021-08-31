import React, { useEffect, useState, useMemo } from "react";
import defaultDataset from "./dataset";
import type { Answer, Dataset, DatasetRecord } from "./dataset";
import "./assets/styles/style.css";
import { AnswersList, Chats } from "./components/index";
import FormDialog from "./components/Forms/FormDialog";

type Chat =
  // ユーザからの質問質問
  | {
      type: "question";
      text: string;
      // 型設計的には、↑のようにtextにしてしまうと、ユーザが何を選んだのかという、情報が欠落してしまうのでよろしくない。
      // ↓のように選択したレコードそのものを保持することが大事。
      // 実はここでrecordにAnswerを持ってる以上、textは冗長であり、single source of truthには反している。
      record: Answer;
    }
  // ボット応答。
  | {
      type: "answer";
      text: string;
      // ここも同じ理由で応答レコードを持たせる。
      record: DatasetRecord;
    };

// 型推論があるのでFCとかVFCは使わなくて良い。あまり意味ないって公式的に言われてる。
const App = () => {
  /**
   * answersは
   * - ユーザの最後の質問と、
   * - datasetが確定すること、
   * で一意的に求まるため、別途状態管理するのはNG。これは"single source of truth"の原則に反する。
   * FrontEndはユーザの行動自由度が高いため（めちゃくちゃにクリックするなど）、厳守しないとデータ破壊が起きやすい。
   * 以下参考。
   * https://ja.reactjs.org/docs/forms.html#controlled-components
   * https://ja.wikipedia.org/wiki/%E4%BF%A1%E9%A0%BC%E3%81%A7%E3%81%8D%E3%82%8B%E5%94%AF%E4%B8%80%E3%81%AE%E6%83%85%E5%A0%B1%E6%BA%90
   */
  // const [answers, setAnswers] = useState<Answer[]>([])
  // 単純なテキストではなく、
  const [chats, setChats] = useState<Chat[]>([]);
  // これも同じ理由でいらない。チャットの最後のログから取得すべき。
  // const [currentID, setCurrentID] = useState('init')
  const [dataset, setDataset] = useState<Dataset>({});
  // モーダルの表示状態の管理。
  const [open, setOpen] = useState(false);

  // 末尾と末尾から２番目のレコード。
  const [secondLastChat, lastChat] = [
    undefined,
    undefined,
    ...chats.slice(-2),
  ].slice(-2);
  // botの提供する選択肢。useMemoのサンプルがなかったから書いたけど、useMemoまでする必要はない。
  // 実はこれくらいは軽い処理のため、メモ化コストの方が高くつく。
  const { nextAnswers, executable } = useMemo(() => {
    if (lastChat && lastChat.type === "answer") {
      return {
        nextAnswers: lastChat.record.answers,
        executable: true,
      };
    }
    if (secondLastChat && secondLastChat.type === "answer") {
      return {
        nextAnswers: secondLastChat.record.answers,
        executable: false,
      };
    }
    return {
      nextAnswers: undefined,
      executable: false,
    };
  }, [secondLastChat, lastChat]);

  const selectAnswer = (question: Answer) => {
    if (!executable) {
      return;
    }
    switch (true) {
      case question.nextId === "contact": {
        setOpen(true);
        break;
      }
      // URLを開くというケースがあるのならnextIdにセットするのではなく、別のプロパティにすべき。（Datasetの型の修正）
      case /^https:*/.test(question.nextId): {
        // window.open(URL, "_blank", "noreferrer");
        // ↓のようにanchorタグを生成するより↑のようにすべき。1行で済むし。
        const a = document.createElement("a");
        a.href = question.nextId;
        a.target = "_blank";
        // 一般的なセキュリティ対策。同一ドメインなら不要。
        a.rel = "noopener noreferrer";
        // ブラウザによっては、配置されていないanchorのクリックイベントは処理されない。
        // なので、anchor要素はbody下に追加する必要がある。こういった処理もスマートではないため、避けたい。
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        break;
      }
      default: {
        setChats([
          ...chats,
          {
            type: "question",
            text: question.content,
            record: question,
          },
        ]);
        setTimeout(() => {
          setChats((newChats) => [
            ...newChats,
            {
              type: "answer",
              text: dataset[question.nextId].question,
              record: dataset[question.nextId],
            },
          ]);
          // タイマーを使用しているため、ここでアクセスできるchatsは過去のものになっている。
          // 上のコードはつまり下のようにしても同じように動く。
          // 一般的な例として、間に非同期処理を挟んだ場合は、他のアクションによりデータが更新されたかどうか、
          // チェックしなければならないケースが多いことを覚えておいてほしい。
          // その場合、引数のstate（新）と、useStateの戻り値（旧state）を比較する。
          // setChats([
          //     ...chats,
          //     {
          //         type: 'question',
          //         text: question.content,
          //         record: question,
          //     },
          //     {
          //         type: 'answer',
          //         text: dataset[question.nextId].question,
          //         record: dataset[question.nextId]
          //     }
          // ])
        }, 1000);
        break;
      }
    }
  };

  // 画面ロード直後の処理。
  useEffect(() => {
    // 最終的にAPIを通じてデータセットを取得為る想定？であるならば、データはここでセットする。
    // useStateの初期値としては、APIの応答を待てず、データをセットできないため。
    setDataset(defaultDataset);
    // ボットの提供する最初の解答、というか選択肢。
    setChats([
      {
        type: "answer",
        text: defaultDataset?.init?.question ?? "",
        record: defaultDataset.init,
      },
    ]);
    // datasetとsetDatasetは以降更新されないので、このeffectはロード直後にしか起こらない。
    // とにかく条件は明示する。
  }, [dataset, setDataset]);

  useEffect(() => {
    // scroll要素をもつDomのIDをscrollAreaに入れる
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
    // chatリストが更新されるたびに実行されることを明示する。
    // とにかく条件は明示する。
  }, [chats]);

  // useCallbackはReact.memoと一緒に使うものなので、これだと意味がない。
  // また、実はモーダルがひらいてる間、
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <section className="c-section">
        <div className="c-box">
          <Chats chats={chats} />
          {nextAnswers ? (
            <AnswersList
              answers={nextAnswers}
              select={selectAnswer}
              executable={executable}
            />
          ) : undefined}
          <FormDialog open={open} handleClose={handleClose} />
        </div>
      </section>
    </div>
  );
};

export default App;
