type Props = {
    todos: Todo[];
    filter: Filter;
    onTodo: <K extends keyof Todo, V extends Todo[K]>(
        id: number, 
        key: K, 
        value: V
    ) => void;
};

export const TodoItem = (props: Props) => {

    const filteredTodos = props.todos.filter((todo) => { // これは配列に対するfilterメソッドを使ってる
        // filter ステートの値に応じて異なる内容の配列を返す
        switch (props.filter) {
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

    return(
        <ul>
        {filteredTodos.map((todo) => {
            return (
                <li key={todo.id}>
                    <input
                        type='checkbox'
                        disabled={props.filter === 'checked' || props.filter === 'removed'}
                        checked={todo.checked}
                        onChange={() => props.onTodo(todo.id, 'checked', !todo.checked)} // ここでeを持ってこないのは、eは入力文字列の情報を持ってるから関係ない
                    />
                    <input 
                        type="text"
                        disabled={props.filter === 'checked' || props.filter === 'removed'}
                        value={todo.value}
                        onChange={(e) => props.onTodo(todo.id, 'value', e.target.value)}
                    />
                    <button onClick={() => props.onTodo(todo.id, 'removed', !todo.removed)}>{todo.removed ? '復元' : '削除'}</button>
                </li>
            );
        })}
        </ul>
    )
}