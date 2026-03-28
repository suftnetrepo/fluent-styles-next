import React from "react";

function useFakeApi() {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState("No request yet");

  const callFakeApi = async (delay = 3000) => {
    setLoading(true);
    setResult("Calling fake API...");

    try {
      await new Promise(resolve => setTimeout(resolve, delay));
      setResult(`Fake API finished after ${delay / 1000}s`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, callFakeApi };
}

export { useFakeApi };