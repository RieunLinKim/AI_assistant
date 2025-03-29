export const getAIMessage = async (userQuery) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-ai-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userQuery }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AI message:", error);
    return {
      role: "assistant",
      content: "Sorry, I encountered an error."
    };
  }
};