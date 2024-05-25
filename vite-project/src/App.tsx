import { useState } from "react";
import { FormDialog } from "./FormDialog"; // 外部ファイルに記述されたコンポーネントをインポート
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";
import { ToolBar } from "./ToolBar";
import { QR } from "./QR";
import { GlobalStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { indigo, pink } from "@mui/material/colors";
import { AlertDialog } from "./AlertDialog";

const theme = createTheme({ // App内に置いちゃうと、Appがビルドされるたびにこれも計算されちゃう
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
});

export const App = () => {

  const [text, setText] = useState(''); // set+ステートにするのが通例, setTextがFlutterでいうところのProviderの中身の処理に近い

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<Todo[]>([]); // <>で型を囲っておくと、それ以外の型がステーどに代入できなくなるから安全

  const [filter, setFilter] = useState<Filter>('all');

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [qrOpen, setQrOpen] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);

  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen);
  };

  const handleToggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen);
    setText(''); // フォームをクリアにする
  };

  const handleToggleQR = () => {
    setQrOpen((qrOpen) => !qrOpen);
  };

  const handleToggleDrawer = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  };

  const handleSubmit = () => {
    // 何も入力されてなかったらそのまま返す
    if (!text) {
      setDialogOpen((dialogOpen) => !dialogOpen);
      return;
    }
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false
    }
    setTodos((todos) => [newTodo, ...todos]); // ...todosはtodos配列の全ての要素を列挙している
    setText('');
    setDialogOpen((dialogOpen) => !todos); // ここよくわからん
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0}}} />
      {/* ↑これをつけると、ドキュメント全体のスタイルをいじれる */}
      <ToolBar 
      filter={filter} 
      onToggleDrawer={handleToggleDrawer}
      />
      {/* ⇩セレクターが表示されるタグ */}
      <SideBar
        onSort={handleSort}
        onToggleDrawer={handleToggleDrawer}
        drawerOpen={drawerOpen}
        onToggleQR={handleToggleQR}
      />
      <QR open={qrOpen} onClose={handleToggleQR}/>
      <FormDialog
        text={text}
        onSubmit={handleSubmit}
        onChange={handleChange}
        dialogOpen={dialogOpen}
        onToggleDialog={handleToggleDialog}
      />
      <AlertDialog
      alertOpen={alertOpen}
      onEmpty={handleEmpty}
      onToggleAlert={handleToggleAlert}
      />
      <TodoItem
        todos={todos}
        filter={filter}
        onTodo={handleTodo}
      />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  );
};