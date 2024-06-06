import { Carousel, CustomFlowbiteTheme } from "flowbite-react";

const articleTheme: CustomFlowbiteTheme["carousel"] =
{
    "root": {
        "base": "px-12 pb-10 bg-gray-100 relative h-full w-full rounded-xl",
        "leftControl": "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
        "rightControl": "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none"
    },
    "indicators": {
        "active": {
            "off": "bg-gray-800/50 hover:bg-gray-800",
            "on": "bg-gray-800"
        },
        "base": "h-3 w-3 rounded-full",
        "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
    },
    "item": {
        "base": "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
        "wrapper": {
            "off": "w-full flex-shrink-0 transform cursor-default snap-center",
            "on": "w-full flex-shrink-0 transform cursor-pointer snap-center"
        }
    },
    "control": {
        "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:outline-none group-focus:ring-4 group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
        "icon": "h-5 w-5 text-gray-500 sm:h-6 sm:w-6"
    },
    "scrollContainer": {
        "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
        "snap": "snap-x"
    }
}

export default function HeadlineCarousel({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Carousel slide={false} theme={articleTheme}>
            {children}
        </Carousel>
    )
}