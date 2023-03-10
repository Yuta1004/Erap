import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteIcon from "@mui/icons-material/Delete";

import { gen_arm } from "erap_core";
import { RobotArmsContext, GameStatContext } from "../App";

const Control = () => {
    const [arms, setArms] = useContext(RobotArmsContext);
    const [gameStat, setGameStat] = useContext(GameStatContext);
    const [listEntries, setListEntries] = useState<JSX.Element[]>([]);

    const createListEntries = () => {
        return arms.map((arm, idx) => {
            return (<>
                <ListItem
                    sx={{
                        width: "100%",
                        margin: 0,
                        padding: "5px 0 5px 0",
                    }}
                >
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{
                            width: "100%",
                            padding: "5px"
                        }}
                    >
                        <b>アーム #{idx+1}</b>
                        <IconButton
                            size="small"
                            sx={{
                                position: "absolute",
                                top: "-10px",
                                right: "10px"
                            }}
                            onClick={() => {
                                arms.splice(idx, 1);
                                setArms([...arms]);
                            }}
                        >
                            <DeleteIcon/>
                        </IconButton>
                        <Stack
                            direction="row"
                            spacing={10}
                            sx={{
                                width: "100%",
                                padding: "5px"
                            }}
                        >
                            長さ（ { arm.length } ）
                            <input
                                id={ "length-" + idx }
                                style={{
                                    width: "60%",
                                    position: "absolute",
                                    right: "5%"
                                }}
                                type="range"
                                min={ 10 }
                                max={ 80 }
                                step={ 1 }
                                value={ arm.length }
                                onInput={() => {
                                    const elem = document.getElementById("length-" + idx)!! as HTMLInputElement;
                                    arms[idx].length = parseInt(elem.value);
                                    setArms([...arms]);
                                }}
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={10}
                            sx={{
                                width: "100%",
                                padding: "5px"
                            }}
                        >
                            角度（ { arm.theta } ）
                            <input
                                id={ "theta-" + idx }
                                style={{
                                    width: "60%",
                                    position: "absolute",
                                    right: "5%"
                                }}
                                type="range"
                                min={ -360 }
                                max={ 360 }
                                step={ 1 }
                                value={ arm.theta }
                                onInput={() => {
                                    const elem = document.getElementById("theta-" + idx)!! as HTMLInputElement;
                                    arms[idx].theta = parseInt(elem.value);
                                    setArms([...arms]);
                                }}
                            />
                        </Stack>
                    </Stack>
                </ListItem>
                <Divider/>
            </>);
        });
    }

    useEffect(() => {
        setListEntries(createListEntries());
    }, [arms]);

    return (
        <Box
            sx={{
                boxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                flexBasis: "30%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
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
                    onClick={() => setGameStat(true)}
                >
                    <PlayCircleOutlineIcon/>
                    <b>ゲーム開始</b>
                </Button>
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {
                        setGameStat(false);
                        setArms([gen_arm(15.0, 45.0)]);
                    }}
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
                    onClick={() => {
                        arms.push(gen_arm(15.0, 15.0));
                        setArms([...arms]);
                    }}
                >
                    アームを追加する
                </Button>
            </Stack>
            <Divider/>
            <List
                sx={{
                    overflowX: "hidden",
                    overflowY: "auto",
                    flexGrow: 1
                }}
            >
                {[ ...listEntries ]}
            </List>
        </Box>
    );
};

export default Control;
