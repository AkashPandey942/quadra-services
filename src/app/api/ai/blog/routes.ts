// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_KEY,
// });

// export async function POST(req: Request) {
//   const { topic } = await req.json();

//   const res = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: `Write a blog on ${topic}` }],
//   });

//   return Response.json({ content: res.choices[0].message.content });
// }
