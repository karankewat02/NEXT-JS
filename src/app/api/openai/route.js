// import axios from "axios";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});
export async function POST(req, res) {
  const data = await req.json();
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `You have to act like a Therapist. There is a person who is facing mental illness he is asking few questions and you have to assist him in a positive way. He is asking "${data.prompt}"` }],
      model: "gpt-3.5-turbo",
    });
    const theResponse = completion.choices[0].message.content;
    return NextResponse.json({ output: theResponse }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ output: error }, { status: 500 });
  }
}
