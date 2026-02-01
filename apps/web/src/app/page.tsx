'use client';

export default function Home() {
  return (
    <div>
      <h1>동문 네트워크 - 재학생</h1>
      <button
        type="button"
        className="m-3 cursor-pointer rounded-sm border border-gray-300 bg-gray-100 px-2 py-1 transition-colors duration-200 hover:bg-gray-200"
        onClick={() => {
          throw new Error('Sentry Test Error');
        }}
      >
        Break the world
      </button>
    </div>
  );
}
