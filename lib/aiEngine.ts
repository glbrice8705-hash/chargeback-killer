const apiKey = process.env.GEMINI_API_KEY || '';

export async function runRepresentmentEngine(disputeData: any) {
  try {
    const prompt = `Generate a rigorous merchant dispute representment letter and evidence packet based on the following case data:\n${JSON.stringify(disputeData, null, 2)}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      },
    );

    if (!response.ok) {
      throw new Error(`Gemini API returned ${response.status}: ${await response.text()}`);
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? '')
      .join('');
    if (!text) throw new Error('Gemini API returned no generated text');
    return text;
  } catch (error: any) {
    console.error('AI Engine Generation Error:', error);
    throw new Error(`AI Engine Failure: ${error.message}`);
  }
}