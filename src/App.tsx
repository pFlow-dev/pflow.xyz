import React from 'react';
import './App.css';
import {getModel} from "./pflow";
import Designer from "./designer/Designer";
import {Container, Paper, Tooltip} from "@mui/material";
import DesignToolbar from "./designer/DesignToolbar";
import Editor from "./editor/Editor";

function App(): React.ReactElement {
    // REVIEW: why is this needed if we never call the update hook?
    const [metaModel,] = React.useState(getModel()); // <- this works
    // const metaModel = getModel(); // <- this doesn't work

    const [modelVersion, modelUpdated] = React.useState(0);
    metaModel.onUpdate(() => modelUpdated(modelVersion ? 0 : 1));

    return (<React.Fragment>
        <Paper sx={{marginBottom: "5px"}}>
            <Container sx={{position: "absolute"}}>
                <Tooltip title="pflow">
                    <a href={"./"}>
                        <svg width="200" height="45">
                            <path
                                d="M22.293 43.077c-1.266-.14-3.306-.542-4.646-.99-5.51-1.834-9.142-6.257-11.072-9.703-1.93-3.446-2.235-5.558-2.437-8.492-.14-2.045.133-4.032.871-6.089 1.558-4.342 4.184-7.533 8.422-10.233 2.703-1.723 5.62-2.658 9.153-2.933 3.997-.31 7.31.333 10.887 2.117 3.071 1.532 6.032 4.227 7.814 7.111 1.97 3.19 2.807 6.176 2.802 9.985-.004 2.959-.353 4.778-1.378 7.186-2.039 4.79-6.483 8.972-11.495 10.815-2.816 1.035-6.31 1.516-8.921 1.226zm-3.057-1.448c.067-.228.08-1.892.028-3.698-.052-1.806-.063-3.284-.024-3.284.038 0 .35.12.691.265.343.145 1.39.432 2.328.637 0 0 1.037.215 1.617.264.544.045 1.724.03 1.724.03 2.01-.097 2.93-.327 4.78-1.199 2.24-1.054 3.708-2.327 5.122-4.445 2.557-3.83 2.485-8.985-.182-12.921-3.463-5.111-12.434-8.559-19.606-1.521-1.57 1.541-2.5 2.87-3.187 4.565-.917 2.257-.9 2.07-.954 10.316l-.05 7.535 1.177.847c1.73 1.245 3.26 2.053 4.624 2.562 1.437.535 1.746.607 1.911.047zm-8.865-20.483 1.305-.09.55-1.141c1.527-3.17 3.556-5.351 6.497-6.987.694-.386 1.338-.774 1.431-.863.131-.124.124-.772-.03-2.857-.11-1.483-.202-2.824-.205-2.98a1.044 1.044 0 0 0-.183-.52l-.177-.235-1.06.286c-1.447.39-4.04 1.612-5.69 2.68-1.448.938-3.48 2.868-4.745 4.505-1.539 1.993-3.742 7.44-3.294 8.144.106.168 3.503.203 5.602.058z"/>
                            <circle cx="25" cy="23.9" r="4.4"/>
                            <text x="50" y="30"> {metaModel.m.def.schema}</text>
                        </svg>
                    </a>
                </Tooltip>
            </Container>
            <Designer metaModel={metaModel}/>
            <DesignToolbar metaModel={metaModel}/>
        </Paper>
        <Editor metaModel={metaModel}/>
    </React.Fragment>)
}

export default App;
