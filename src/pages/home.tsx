import {useBlocks} from "../blocks";

export function HomePage() {
  const blocks = useBlocks();

  return (
    <main className="w-full max-w-5xl mx-auto p-4 pt-40">
      <div className="w-full h-16 flex items-center justify-start font-rubik-bubbles text-3xl">
        POLKADOT
      </div>
    </main>
  );
}
