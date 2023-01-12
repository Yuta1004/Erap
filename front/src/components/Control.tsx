import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Control = () => {
    return (
        <Box
            sx={{
                boxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                flexBasis: "30%",
                height: "100%"
            }}
        >
            <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{ padding: "5px" }}
            >
                <Button
                    variant="outlined"
                    size="medium"
                >
                    <PlayCircleOutlineIcon/>
                    <b>ゲーム開始</b>
                </Button>
                <Button
                    variant="outlined"
                    size="medium"
                >
                    <RestartAltIcon/>
                    <b>リセット</b>
                </Button>
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{ padding: "5px" }}
            >
                <Button
                    variant="outlined"
                    size="small"
                    sx={{ width: "80%" }}
                >
                    アームを追加する
                </Button>
            </Stack>
            <Divider/>
            <List>
            </List>
        </Box>
    );
};

export default Control;
