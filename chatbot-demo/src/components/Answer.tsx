import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// TODO: まず汎用的なボタンとして適宜し、Answerというコンポーネント名についても考え直すほうが良い。こいつは名前も作りも汎用性がなく、コンポーネント指向に反してる。
// TODO: そういうわけでPropsの型についても、ドメイン情報がはいってるため見直すべき。
//
type Props = {
  content?: string;
  // TODO: nextIdを持たす作りはいただけない。
  nextId?: string;
  // 追加した。上のレイヤーではexecutableだった内容を、disabled名称にしてる理由は、ドメインの色をなくすため。
  disabled?: boolean;
  // TODO: これも不要なはず。純粋にonClickを引数に取るように実装すべき。
  select?: (selectedAnswer: string, nextQuestionId: string) => void;
};

// TODO: 例えば、コンポーネントが任意の値を取って、onClick時に値を連携したいというのであればこんなインターフェイスのHogeButtonに
type HogeButtonProps<T extends any> = {
  /**
   * ボタンに設定する値です。
   */
  value: T;
  /**
   * ボタンの値をテキストに変換するレンダラです。
   */
  valueRender?: string | ((value: T) => string);
  /**
   * クリック時に呼ばれるイベントハンドラです。
   */
  onClick?: (value: T) => void;
  /**
   * 無効化するとき、trueに設定します。
   */
  disabled?: boolean;
};

// FIXME: eslint無効化してるので注意。
// eslint-disable-next-line
const HogeButton = <T extends any>({
  value,
  valueRender = (v: T) => `${v}`,
  onClick = (_v: T) => {},
  disabled = false,
}: HogeButtonProps<T>) => {
  const text =
    typeof valueRender === "string" ? valueRender : valueRender(value);
  return (
    <button disabled={disabled} onClick={() => onClick(value)} type="button">
      {text}
    </button>
  );
};

const useStyles = makeStyles((_theme) =>
  createStyles({
    root: {
      // TODO: Material-UIのカスタマイズについてドキュメントを読むべき。多分カスタマイズの方向性が間違っている。
      // おそらくcreateStylesでスタイル作るのは、Material-UIによって用意されていない完全自作のコンポーネントに対し、
      // 同じように同じガイドラインでスタイルを当てるために存在してる（と思う）。
      // https://material-ui.com/ja/customization/palette/
      // borderColor: theme.palette.error.light,
      // ↓リテラル値使わない。↑みたいに、テーマから値をとる。テーマ側の色とかはカスタマイズできるはず。
      borderColor: "#FFB549",
      color: "#FFB549",
      fontWeight: 600,
      marginBottom: "8px",
      "&:hover": {
        backgroundColor: "#FFB549",
        color: "#fff",
      },
    },
  })
);

// TODO: propsにはなるべくデフォルト値を設定する。他のコンポーネントもそのようにする。
const Answer = ({
  content = "",
  nextId = "",
  select = () => {},
  disabled = false,
}: Props) => {
  // TODO: lintの警告を安易に消さない。消してしまうと、↓のような問題コードを検出できなくなる。
  // おそらくButtonに `className={classes.root}` を追加するのでは？
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = useStyles();
  return (
    <Button
      type="button"
      variant="contained"
      className={classes.root}
      color="primary"
      disabled={disabled}
      onClick={() => select(content, nextId)}
    >
      {content}
    </Button>
  );
};

export default Answer;
