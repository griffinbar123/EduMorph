'use server'

// import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateFlashCards(numberOfCards, user_prompt, extraData) {
    
    var prompt = `The user will provide a topic (called prompt), potentially some clarifying data, and a number. They would like the given number of flashcards on whatever topic they provide 
    Parse the topic and any additional data and create the front and backs to flashcards that would be helpful for studying. 
    This is the example to follow:
    EXAMPLE JSON INPUT: 
    {
        numberOfCards: 25,
        prompt: "Roman history",
        extraData: null
    }
    
    EXAMPLE JSON OUTPUT:
    [
        {
            "Front": "Famous emporer of rome who killed Christians",
            "Back": "Emporer Nero"
        },
        {
            "Front": "Who said, et tu brute?",
            "Back": "Julias Caesar"
        },
        ...
    ]

    This is the input:
    {
        numberOfCards: ${numberOfCards},
        prompt: ${user_prompt},
        extraData: ${extraData}
    }
    `

    const genAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}

