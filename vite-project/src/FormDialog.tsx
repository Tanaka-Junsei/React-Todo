// propsの定義
type Props = {
    text: string;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};


// 名前付きexport
export const FormDialog = (props: Props) => (
    <form onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit()
      }}>
        <input  // inputタグにはいろんな種類がある、それをtypeで指定してる
          type='text'
          // textステートが持ってる入力中のテキストの値をvalueとして表示
          value={props.text} // JSXの中でJSの変数の値を展開するときは{}で囲う必要がある. valueはinputタグの初期値を入れる
          // onChange イベント(入力テキストの変化)をtextステートに反映
          // disabled={filter === 'checked' || filter === 'removed'}
          onChange={props.onChange} />
        <input
          type="submit"
          value="追加"
          // disabled={filter === 'checked' || filter === 'removed'}
          onSubmit={props.onSubmit}
        />
      </form>
);
