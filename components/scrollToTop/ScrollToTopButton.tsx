// for scroll to top button
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition } from '@mantine/core';


// saw this in mantine docs and liked it;
// lots of rows = lots of scrolling (not lots of fun)
// optimizes access to add+edit buttons
export const ScrollToTopButton = () =>
{
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <Affix className="bottom-6 right-6">
            <Transition transition="slide-up" mounted={scroll.y > 0}>
                {(transitionStyles) => (
                    <Button
                        className="bg-red-700"
                        style={transitionStyles}
                        onClick={() => scrollTo({ y: 0 })}
                        color="red"
                        size="md"
                        radius="xs"
                        compact
                    >
                        Scroll to top
                    </Button>
                )}
            </Transition>
        </Affix>
    );
};