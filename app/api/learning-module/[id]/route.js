const exStudyDeck = 
  [{
    id: 1,
    title: "World War II Timeline Analysis",
    progress: 65,
    tags: ["history", "advanced", "20th-century"],
    questionCount: 28,
    lastAccessed: "2023-08-15",
    aiGenerated: true,
    content: [
        {
          type: "flashcard",
          question: "When did WWII end in Europe?",
          answer: "May 8, 1945 (VE Day)",
          difficulty: "easy",
          tags: ["dates", "european-theater"]
        },
        {
          type: "mcq",
          question: "Which event directly triggered Britain's entry into WWII?",
          options: [
            "Invasion of Poland",
            "Bombing of Pearl Harbor",
            "Invasion of France",
            "Battle of Britain"
          ],
          correctIndex: 0,
          explanation: "Britain had pledged to defend Poland's sovereignty, leading to their declaration of war after the German invasion.",
          difficulty: "medium",
          tags: ["causes", "europe"]
        },
        {
          type: "short-answer",
          question: "What was the significance of the Battle of Midway?",
          answer: "Turning point in Pacific Theater - US destroyed 4 Japanese aircraft carriers, gaining naval supremacy",
          sampleAnswer: "The June 1942 battle marked Japan's first major naval defeat and halted their Pacific expansion.",
          difficulty: "hard",
          tags: ["pacific-theater", "naval-battles"]
        },
        {
          type: "essay",
          prompt: "Analyze the role of propaganda in maintaining civilian morale during WWII",
          guidelines: [
            "Compare Axis and Allied approaches",
            "Discuss different media formats used",
            "Consider long-term societal impacts"
          ],
          difficulty: "advanced",
          tags: ["society", "psychology"]
        },
        {
          type: "flashcard",
          question: "What was the 'Final Solution'?",
          answer: "Nazi plan for systematic genocide of Jewish people",
          context: "Part of Holocaust implementation decided at Wannsee Conference 1942",
          difficulty: "medium",
          tags: ["holocaust", "policy"]
        },
        {
          type: "mcq",
          question: "Which two cities were atomic bombed in 1945?",
          options: [
            "Hiroshima & Nagasaki",
            "Tokyo & Osaka",
            "Berlin & Dresden",
            "London & Manchester"
          ],
          correctIndex: 0,
          explanation: "The atomic bombings on August 6 and 9 forced Japan's surrender, avoiding a ground invasion.",
          difficulty: "easy",
          tags: ["pacific-theater", "technology"]
        },
        {
          type: "sequence",
          question: "Order these European battles chronologically:",
          items: [
            "Battle of Britain",
            "D-Day",
            "Stalingrad",
            "Invasion of Poland"
          ],
          correctOrder: [3, 0, 2, 1],
          difficulty: "hard",
          tags: ["chronology", "european-theater"]
        },
        {
          type: "matching",
          question: "Match leaders to their countries:",
          pairs: {
            "Churchill": "Britain",
            "Tojo": "Japan",
            "Roosevelt": "USA",
            "Stalin": "Soviet Union"
          },
          difficulty: "medium",
          tags: ["leadership", "countries"]
        }
      ] // AI-generated content
  },
  {
    id: 2,
    title: "Introduction to Quantum Mechanics",
    progress: 30,
    tags: ["physics", "science"],
    questionCount: 42,
    lastAccessed: null,
    aiGenerated: true
  }]

export async function GET(request, {params}) {
    const id = (await params).id 
    return Response.json(
        exStudyDeck.find((sd) => sd.id +"" === id)
    )
}