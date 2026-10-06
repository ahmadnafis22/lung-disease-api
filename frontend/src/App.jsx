import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImage(file);
    setResult(null); س
  };

  const handlePredict = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/predict`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();

      setResult(data);

    } catch (error) {
      console.error(error);

      setResult({
        error: "Unable to connect to the prediction API.",
      });

    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-3xl">

        {/* Header */}

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            🫁
          </div>

          <h1 className="text-4xl font-bold">
            Lung Disease Detection
          </h1>

          <p className="text-slate-400 mt-3">
            AI-powered chest X-ray analysis
          </p>

        </div>


        {/* Main Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          {/* Upload Area */}

          {!image && (

            <label
              htmlFor="image-upload"
              className="border-2 border-dashed border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition"
            >

              <div className="text-5xl mb-4">
                📤
              </div>

              <h2 className="text-xl font-semibold">
                Upload Chest X-Ray
              </h2>

              <p className="text-slate-400 mt-2">
                PNG or JPG
              </p>

              <span className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition">
                Choose Image
              </span>

              <input
                id="image-upload"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

          )}


          {/* Image Preview */}

          {image && (

            <div>

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-semibold">
                  X-Ray Preview
                </h2>

                <button
                  onClick={handleReset}
                  className="text-sm text-slate-400 hover:text-white transition"
                >
                  Remove
                </button>

              </div>


              <div className="bg-black rounded-2xl p-4">

                <img
                  src={URL.createObjectURL(image)}
                  alt="Chest X-Ray"
                  className="max-h-96 mx-auto rounded-xl object-contain"
                />

              </div>


              {/* Predict Button */}

              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 py-4 rounded-xl font-semibold text-lg transition"
              >

                {loading ? (
                  <span>
                    🔄 Analyzing...
                  </span>
                ) : (
                  <span>
                    🔍 Analyze X-Ray
                  </span>
                )}

              </button>

            </div>

          )}


          {/* Result */}

          {result && !result.error && (

            <div className="mt-8 border border-slate-700 rounded-2xl p-6">

              <p className="text-slate-400 text-sm">
                Prediction Result
              </p>

              <h2
                className={`text-4xl font-bold mt-2 ${result.prediction === "PNEUMONIA"
                    ? "text-red-400"
                    : "text-green-400"
                  }`}
              >
                {result.prediction}
              </h2>


              {/* Confidence */}

              <div className="mt-6">

                <div className="flex justify-between mb-2">

                  <span className="text-slate-400">
                    Confidence
                  </span>

                  <span className="font-semibold">
                    {result.confidence}%
                  </span>

                </div>


                <div className="w-full bg-slate-700 rounded-full h-3">

                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${result.confidence}%`,
                    }}
                  />

                </div>

              </div>


              {/* Analyze Another */}

              <button
                onClick={handleReset}
                className="w-full mt-6 border border-slate-700 hover:bg-slate-800 py-3 rounded-xl transition"
              >
                Analyze Another Image
              </button>

            </div>

          )}


          {/* Error */}

          {result?.error && (

            <div className="mt-6 bg-red-950 border border-red-800 text-red-300 p-4 rounded-xl text-center">
              {result.error}
            </div>

          )}

        </div>


        {/* Footer */}

        <p className="text-center text-slate-500 text-sm mt-6">
          AI prediction for educational purposes only — not a medical diagnosis.
        </p>

      </div>

    </div>
  );
}

export default App;

