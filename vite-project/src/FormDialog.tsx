import { Button, Dialog, DialogActions, TextField } from "@mui/material";

// propsの定義
type Props = {
    text: string;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    dialogOpen: boolean;
    onToggleDialog: () => void;
};


// 名前付きexport
export const FormDialog = (props: Props) => (
  <Dialog fullWidth open={props.dialogOpen} onClose={props.onToggleDialog}>
    <form onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit()
      }}>
        <div style={{ margin: '1em' }}>
          <TextField
          aria-label="todo-input"
          variant="standard"
          style={{
            width: '100%',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
          }}
          label="タスクを入力..."
          onChange={(e) => props.onChange(e)}
          value={props.text}
          autoFocus
          />
          <DialogActions>
            <Button
              aria-label="form-add"
              color="secondary"
              onClick={props.onSubmit}
            >
              追加
            </Button>
          </DialogActions>
        </div>
      </form>
  </Dialog>
);
