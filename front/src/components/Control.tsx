import { useState, useEffect, useContext, InputHTMLAttributes } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { gen_arm } from "erap_core";
import { RobotArmsContext } from "../App";

const Control = () => {
    const [arms, setArms] = useContext(RobotArmsContext);
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
                        <Stack
                            direction="row"
                            spacing={10}
                            sx={{
                                width: "100%",
                                padding: "5px"
                            }}
                        >
                            長さ（ { arm.length } ）：
                            <input
                                id={ "length-" + idx }
                                style={{ width: "60%" }}
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
                            角度（ { arm.theta } ）：
                            <input
                                id={ "theta-" + idx }
                                style={{ width: "60%" }}
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
                    onClick={() => {
                        arms.push(gen_arm(15.0, 15.0));
                        setArms([...arms]);
                    }}
                >
                    アームを追加する
                </Button>
            </Stack>
            <Divider/>
            <List>
                {[ ...listEntries ]}
            </List>
        </Box>
    );
};

export default Control;
