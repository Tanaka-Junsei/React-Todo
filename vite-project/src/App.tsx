import { useState } from "react";

type Todo = {
  value : string;
  readonly id: number;
  checked : boolean;
  removed : boolean;
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

export const App = () => {

  const [text, setText] = useState(''); // set+ステートにするのが通例, setTextがFlutterでいうところのProviderの中身の処理に近い

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<Todo[]>([]); // <>で型を囲っておくと、それ以外の型がステーどに代入できなくなるから安全

  const [filter, setFilter] = useState<Filter>('all');

  const handleSubmit = () => {
    // 何も入力されてなかったらそのまま返す
    if (!text) return;
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false
    }
    setTodos((todos) => [newTodo, ...todos]); // ...todosはtodos配列の全ての要素を列挙している
    setText('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      /**
       * 引数として渡された todo の id が一致する
       * 更新前の todos ステート内の todo の
       * value プロパティを引数 value (= e.target.value) に書き換える
       */
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, value: value};
        }
        return todo;
      });
      // todos ステートを更新
      return newTodos;
    });
  };

  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todos) => {
      /**
       * 引数として渡された todo の id が一致する
       * 更新前の todos ステート内の todo の
       * value プロパティを引数 value (= e.target.value) に書き換える
       */
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, checked: checked};
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, removed: removed};
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  const handleEmpty = () => { // 消すだけだからシャローコピーで大丈夫
    setTodos((todos) => todos.filter((todo) => !todo.removed)); // filterはtrueの要素だけを残すから、removedがfalseだけ持ってきてる
  }

  const filteredTodos = todos.filter((todo) => { // これは配列に対するfilterメソッドを使ってる
    // filter ステートの値に応じて異なる内容の配列を返す
    switch (filter) {
      case 'all':
        // 削除されていないもの
        return !todo.removed;
      case 'checked':
        // 完了済 **かつ** 削除されていないもの
        return todo.checked && !todo.removed;
      case 'unchecked':
        // 未完了 **かつ** 削除されていないもの
        return !todo.checked && !todo.removed;
      case 'removed':
        // 削除済みのもの
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <div>
      {/* ⇩セレクターが表示されるタグ */}
      <select 
      defaultValue='all'
      onChange={(e) => handleSort(e.target.value as Filter)}
      > 
        <option value="all">全てのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ゴミ箱</option>
      </select>
      {filter === 'removed' ? (
        <button 
        onClick={handleEmpty}
        disabled={todos.filter((todo) => todo.removed).length === 0} // removedになっているtodoのインスタンスの要素数が0なら見せない
        >
          ゴミ箱を空にする
        </button>
      ) : (
        filter !== 'checked' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit()
          }}>
            <input  // inputタグにはいろんな種類がある、それをtypeで指定してる
              type='text'
              // textステートが持ってる入力中のテキストの値をvalueとして表示
              value={text} // JSXの中でJSの変数の値を展開するときは{}で囲う必要がある. valueはinputタグの初期値を入れる
              // onChange イベント(入力テキストの変化)をtextステートに反映
              // disabled={filter === 'checked' || filter === 'removed'}
              onChange={(e) => handleChange(e)} />
            <input
              type="submit"
              value="追加"
              // disabled={filter === 'checked' || filter === 'removed'}
              onSubmit={handleSubmit}
            />
          </form>
        )
      )}
      <ul>
        {filteredTodos.map((todo) => {
          return (
          <li key={todo.id}>
            <input
            type='checkbox'
            disabled={filter === 'checked' || filter === 'removed'}
            checked={todo.checked}
            onChange={() => handleCheck(todo.id, !todo.checked)} // ここでeを持ってこないのは、eは入力文字列の情報を持ってるから関係ない
            />
            <input 
              type="text"
              disabled={filter === 'checked' || filter === 'removed'}
              value={todo.value}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
            <button onClick={() => handleRemove(todo.id, !todo.removed)}>{todo.removed ? '復元' : '削除'}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};