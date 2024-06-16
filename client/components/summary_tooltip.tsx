import { Badge, CustomFlowbiteTheme, Tooltip } from "flowbite-react";

const tooltipTheme: CustomFlowbiteTheme["tooltip"] =
{
  "target": "w-fit",
  "animation": "transition-opacity",
  "arrow": {
    "base": "absolute z-50 h-2 w-2 rotate-45",
    "style": {
      "dark": "bg-gray-900 dark:bg-gray-700",
      "light": "bg-white",
      "auto": "bg-white dark:bg-gray-700"
    },
    "placement": "-4px"
  },
  "base": "absolute z-50 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm cursor-default",
  "hidden": "invisible opacity-0",
  "style": {
    "dark": "bg-gray-900 text-white dark:bg-gray-700",
    "light": "border border-gray-200 bg-white text-gray-900",
    "auto": "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
  },
  "content": "relative z-50 max-w-xl"
}

export default function SummaryTooltip({ children, content }: Readonly<{ children: React.ReactNode; content: string; }>) {
  const node = (
    <div>
      <Badge color="purple" className="w-full inline mr-1">요약</Badge>
      <p className="inline">{content}</p>
    </div>
  );
  return (
    <Tooltip content={node} style="light" animation="duration-150" theme={tooltipTheme}>
      {children}
    </Tooltip>
  )
}