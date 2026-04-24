import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: 'Gemini API key is not configured. Please add GEMINI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    
    if (!messages || messages.length === 0) {
      return Response.json({ error: 'No messages provided' }, { status: 400 });
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Extract the latest user message
    const latestMessage = messages[messages.length - 1].text;
    
    // Convert previous messages to Gemini history format (excluding the latest one)
    let history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Gemini startChat requires the history to begin with a 'user' message.
    // Remove the initial 'model' greeting if it exists at the start.
    if (history.length > 0 && history[0].role === 'model') {
      history = history.slice(1);
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: "You are an expert learning advisor for Accredian Enterprise. You help companies understand the benefits of upskilling their teams. Be concise, professional, friendly, and helpful. Try to keep responses under 3 paragraphs. Accredian offers programs in Product Management, Gen-AI, Data Science, Leadership, Fintech, and Operations. If they ask about pricing, say it depends on team size and to use the Enquire form."
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);
    const response = await result.response;
    const text = response.text();

    return Response.json({ text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return Response.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
