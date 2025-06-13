import { useEffect, useState } from "react";

function App() {
  const [points, setPoints] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5); // عداد 5 ثوانٍ
  const [canClaim, setCanClaim] = useState(false);

  // تحميل النقاط من localStorage عند بداية التشغيل
  useEffect(() => {
    const savedPoints = localStorage.getItem("points");
    if (savedPoints) {
      setPoints(parseInt(savedPoints));
    }
  }, []);

  // بدء العداد
  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClaim(true);
    }
  }, [secondsLeft]);

  // عند الضغط على الزر
  const handleClaim = () => {
    const newPoints = points + 10;
    setPoints(newPoints);
    localStorage.setItem("points", newPoints);
    setCanClaim(false);
    setSecondsLeft(5); // إعادة تشغيل العداد
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold mb-4">👑 نقاطك: <span className="text-green-600">{points}</span></h1>

      {!canClaim ? (
        <p className="text-lg text-gray-700">⏳ انتظر {secondsLeft} ثانية للحصول على النقاط</p>
      ) : (
        <button
          onClick={handleClaim}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          🎁 احصل على 10 نقاط
        </button>
      )}
    </div>
  );
}

export default App;
