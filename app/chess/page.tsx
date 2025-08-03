import Link from 'next/link'

export default function ChessGame() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 mt-8">Play Chess</h1>
      <div className="w-[1920px] h-[1080px]">
        <iframe
          src="/chess/index.html"
          title="Unity Chess Game"
          className="w-full h-full"
        />
      </div>
      <Link href="/">
        <button className="mt-8 px-4 py-2 bg-blue-600 text-white rounded">
          Back to Portfolio
        </button>
      </Link>
    </div>
  )
}
