import {useBlocks} from "../blocks";
import {formatDistanceToNowStrict} from "date-fns";

export function HomePage() {
  const blocks = useBlocks();

  const getRelativeTime = (date: Date) => {
    const formatted = formatDistanceToNowStrict(date);
    return formatted
      .replace(" seconds", "s")
      .replace(" second", "s")
      .replace(" minutes", "m")
      .replace(" minute", "m")
      .replace(" hours", "h")
      .replace(" hour", "h")
      .replace(" days", "d")
      .replace(" day", "d")
      .replace(" weeks", "w")
      .replace(" week", "w")
      .replace(" months", "mo")
      .replace(" month", "mo")
      .replace(" years", "y")
      .replace(" year", "y");
  };

  return (
    <main className="w-full max-w-4xl mx-auto p-4 pt-20">
      <div className="w-full h-16 flex items-center justify-start font-rubik-bubbles text-4xl text-slate-900">
        POLKADOT
      </div>
      <table className="w-full mt-2">
        <thead className="bg-transparent border-b border-slate-300 text-slate-800 text-lg">
          <tr>
            <th className="py-3 text-start">Hash</th>
            <th className="py-3 text-start">Extrinsics</th>
            <th className="py-3 text-start">Events</th>
            <th className="py-3 text-start">Time</th>
            <th className="py-3 text-start">Status</th>
          </tr>
        </thead>
        <tbody>
          {blocks
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .map((block, index) => (
              <tr
                key={index}
                className="h-12 border-b border-slate-200 text-lg"
              >
                <td className="text-blue-400 transition-all duration-200 ease-in hover:text-blue-500 cursor-pointer">
                  {block.hash.substring(0, 6)}
                  ...
                  {block.hash.substring(60)}
                </td>
                <td className="text-slate-500">{block.extrinsics}</td>
                <td className="text-slate-500">{block.events}</td>
                <td className="text-slate-500">
                  {getRelativeTime(block.timestamp)} ago
                </td>
                <td>
                  {block.status === "Processing" && (
                    <img className="w-[21.34px]" src="./waiting.png" />
                  )}
                  {block.status === "Success" && (
                    <svg
                      className="w-[21.34px] text-green-400"
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M512 32c265.12000031 0 480 214.87999969 480 480s-214.97599969 480-480 480S32 777.02400031 32 512 246.87999969 32 512 32z m0 68.57599969C284.73600031 100.57599969 100.57599969 284.79999969 100.57599969 512 100.57599969 739.16799969 284.79999969 923.42400031 512 923.42400031c227.16799969 0 411.42400031-184.15999969 411.42400031-411.42400031 0-227.26399969-184.15999969-411.42400031-411.42400031-411.42400031z m206.208 222.528l48.48 48.48-274.752 274.78400062-48.48 48.51199969-169.69600031-169.69600031 48.48-48.51199969 121.18400062 121.21600031 274.78399969-274.78400062z"></path>
                    </svg>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
