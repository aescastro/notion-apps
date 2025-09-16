import {
    Stack,
    useMediaQuery,
} from "@mui/material";

import styled from "@emotion/styled";

import {
    Header,
    MobileHeader
} from "../components";

import { MAIN_BACKGROUND_COLOUR } from "../constants";
import demo from "../assets/videos/demo.mp4";

const Video = styled.video(({isDesktopWidth}) => ({
    width: isDesktopWidth ? "50%" : "auto",
    marginRight: isDesktopWidth ? "15px" : "0",
    maxHeight: isDesktopWidth ? "100%" : "40vh"

}));

const Ol = styled.ol(() => ({
    padding: "15px"
}))

const AboutUs = () => {
    const isDesktopWidth = useMediaQuery('(min-width:1500px)');

    return (
        <Stack
            width="100%"
            height="max-content"
            sx={{
                backgroundColor: MAIN_BACKGROUND_COLOUR,
            }}
        >
            {
                isDesktopWidth ? <Header /> : <MobileHeader />
            }
            <Stack
                sx={{
                    padding: isDesktopWidth ? "60px 75px" : "40px",
                    gap: "15px",
                    flexGrow: 1,
                    position: isDesktopWidth ? "static" : "absolute",
                    backgroundColor: 'inherit',
                    top: "88px",
                    width: "100%",
                }}
            >
                <h1>Background</h1>
                <p>Hi there, I’m Adriana - an avid Notion user and computer engineering graduate. I love using widgets in my Notion pages but when I have used some  from other sources I found myself wanting widgets that were either more minimalist or customizeable. As such, I decided to create my own!  </p>
                <p>The Notion widgets I created combine all the features that I wanted  from other Notion widget sites. With my widgets, users can create minimalist widgets that can have aspects such as font or background colour customized while also ensuring that it is compatible with their Notion’s light/dark mode setting. I additionally created a reading tracker widget which I was unable to find elsewhere.</p>

                <h1>How to Use</h1>
                <Stack
                    direction={isDesktopWidth ? "row" : "column"}
                >
                    <Video
                        controls
                        src={demo}
                        isDesktopWidth={isDesktopWidth}
                    />
                    <Ol>
                        <li>Go to the home page and click the widget you would like to add to your Notion</li>
                        <li>Customize your widget using the fields on the right-hand side of the screen</li>
                        <li>Copy the embed URL </li>
                        <li>Go to Notion and embed the widget either by
                            <ol type="a">
                                <li>Pasting the link and clicking embed OR</li>
                                <li>Typing /embed and pasting the link</li>
                            </ol>
                        </li>
                    </Ol>
                </Stack>

            </Stack>
        </Stack>
    );
}

export default AboutUs;