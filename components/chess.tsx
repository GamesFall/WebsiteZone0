import Link from 'next/link'

export default function ChessGame() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Play Chess</h1>

      <div className="w-full max-w-4xl aspect-video bg-gray-200 flex items-center justify-center">
        <iframe
          src="./chess-game.html"
          className="w-full h-full"
          title="Unity Chess Game"
        />
        <span>Unity Chess Game Coming Soon!</span>
      </div>
      <Link href="/">
        <button className="mt-8 px-4 py-2 bg-blue-600 text-white rounded">
          Back to Portfolio
        </button>
      </Link>
    </div>
  )
}
