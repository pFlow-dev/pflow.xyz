import React from 'react';
import {Box} from "@mui/material";
import CodeEditor from '@uiw/react-textarea-code-editor';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {MetaModel} from "../pflow";

interface TabPanelProps {
    metaModel?: MetaModel;
    children?: React.ReactNode;
    index: number;
    value: number;
    other?: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>{children}</Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface SouceViewProps {
    metaModel: MetaModel;
}

export default function SourceView(props: SouceViewProps) {
    const [value, setValue] = React.useState(0);
    const [code, setCode] = React.useState("m.source.code");

    if (!props.metaModel) {
        return <React.Fragment/>;
    }

    const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
    };


    return <React.Fragment>
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Model" {...a11yProps(0)} />
                    <Tab label={'label'} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <p>Markdown</p>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CodeEditor
                    value={code}
                    language="js"
                    placeholder="Please enter JS code."
                    onChange={(evn) => setCode(evn.target.value)}
                    padding={15}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </TabPanel>
        </Box>
    </React.Fragment>;
}