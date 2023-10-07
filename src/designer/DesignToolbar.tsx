import React from "react";
import {Grid, IconButton, Tooltip} from "@mui/material";
import {
    Adjust,
    ArrowRightAlt,
    CheckBoxOutlineBlank,
    ControlCamera,
    Delete,
    HelpOutline,
    PlayCircleOutlined,
    RadioButtonUnchecked,
    StopCircleOutlined,
} from "@mui/icons-material";

import CameraIcon from "@mui/icons-material/Camera";
import {Action, MetaModel} from "../pflow";

interface DesignToolbarProps {
    metaModel: MetaModel;
}

type IconColors = "primary" | "default";

export default function DesignToolbar(props: DesignToolbarProps) {

    function menuAction(action: Action) {
        const {menuAction, unsetCurrentObj} = props.metaModel;
        menuAction(action);
        unsetCurrentObj();
        // setState({mode});
    }

    function getColor(mode: Action): IconColors {
        if (mode === props.metaModel.mode) {
            return "primary"
        } else {
            return "default"
        }
    }

    const ExecuteBtn = () => {
        if (props.metaModel.mode === "execute") {
            return <Tooltip title="Running">
                <IconButton aria-label="execute" color={getColor("execute")}
                            onClick={() => menuAction("execute")}>
                    <StopCircleOutlined/>
                </IconButton>
            </Tooltip>;
        } else {
            return <Tooltip title="Run">
                <IconButton aria-label="execute" color={getColor("execute")}
                            onClick={() => menuAction("execute")}>
                    <PlayCircleOutlined/>
                </IconButton>
            </Tooltip>;
        }
    };

    return <React.Fragment>
        <Grid container justifyContent="center">
            <Tooltip title="Select">
                <IconButton aria-label="select" target="select" color={getColor("select")}
                            onClick={() => menuAction("select")} href="">
                    <ControlCamera/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Snapshot">
                <IconButton onClick={() => menuAction("snapshot")} href="">
                    <CameraIcon/>
                </IconButton>
            </Tooltip>
            <ExecuteBtn/>
            <Tooltip title="Place">
                <IconButton aria-label="place" color={getColor("place")}
                            onClick={() => menuAction("place")}>
                    <RadioButtonUnchecked/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Transition">
                <IconButton aria-label="transition" color={getColor("transition")}
                            onClick={() => menuAction("transition")}>
                    <CheckBoxOutlineBlank/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Arc">
                <IconButton aria-label="arc" color={getColor("arc")}
                            onClick={() => menuAction("arc")}>
                    <ArrowRightAlt/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Token">
                <IconButton aria-label="token" color={getColor("token")}
                            onClick={() => menuAction("token")}>
                    <Adjust/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" color={getColor("delete")}
                            onClick={() => menuAction("delete")}>
                    <Delete/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Help & Info">
                <IconButton aria-label="help" color={getColor("help")}
                            onClick={() => menuAction("help")}>
                    <HelpOutline/>
                </IconButton>
            </Tooltip>
        </Grid>
    </React.Fragment>;
}