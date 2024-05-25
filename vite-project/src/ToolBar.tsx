import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Icon } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";

type Props = {
    filter: Filter;
    onToggleDrawer: () => void;
};

const translator = (arg: Filter) => {
    switch (arg) {
      case 'all':
        return 'すべてのタスク';
      case 'unchecked':
        return '現在のタスク';
      case 'checked':
        return '完了したタスク';
      case 'removed':
        return 'ごみ箱';
      default:
        return 'TODO';
    }
  };

export const ToolBar = (props: Props) => (
    <Box sx={{ flexGrow:1}}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                aria-label="menu-button" // 何に使われるのかを明示
                size="large" // ボタンのサイズを指定、small,medium,large
                edge="start" // ボタンがどの端に設置されるか、startだと左端
                color="inherit" // ボタンの色
                sx={{ mr:2 }} // MUIのスタイルを直接していできるらしい。よくわからん
                onClick={props.onToggleDrawer}
                >
                <Icon>menu</Icon>
                </IconButton>
                <Typography>{translator(props.filter)}</Typography>
            </Toolbar>
        </AppBar>
    </Box>
)
