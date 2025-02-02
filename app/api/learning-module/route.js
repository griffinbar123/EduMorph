

function createStudyDeck(topic, data, files) {
    console.log("Creating study deck")
    console.log(topic, data, files)
}

export async function POST(request) {
    const formData = await request.formData()
    const topic = formData.get('topic')
    const data = formData.get('additionalData')
    const files = formData.get('files')
    console.log(formData)
    createStudyDeck(topic, data, files)
    return Response.json({ topic, data })
}

const exStudyDeck = 
  [{
    id: 1,
    title: "World War II Timeline Analysis",
    progress: 65,
    tags: ["history", "advanced", "20th-century"],
    questionCount: 28,
    lastAccessed: "2023-08-15",
    aiGenerated: true
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

export async function GET(request) {
    return Response.json(exStudyDeck)
}