declare type Todo = { // declareをつけると、TypeScriptコンパイラが型チェックしてくれる、.d.tsファイルはそのアンビエント宣言をまとめるための専用ファイル
    value: string;
    readonly id: number;
    checked: boolean;
    removed: boolean;
};
