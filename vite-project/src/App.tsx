import { useState } from "react";
import { FormDialog } from "./FormDialog"; // 外部ファイルに記述されたコンポーネントをインポート
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";

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

  const handleTodo = <K extends keyof Todo, V extends Todo[K]>( 
    // K extends keyof Todoは 'id', 'value', 'checked', 'removed'のいずれか
    // V extends Todo[K]はtodo.id, todo.value, todo.checked, todo.removedのいずれか
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, [key]: value};
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

  return (
    <div>
      {/* ⇩セレクターが表示されるタグ */}
      <SideBar
        onSort={handleSort}
      />
      <FormDialog
        text={text}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
      <TodoItem
        todos={todos}
        filter={filter}
        onTodo={handleTodo}
      />
      <ActionButton
        todos={todos}
        onEmpty={handleEmpty}
      />
    </div>
  );
};