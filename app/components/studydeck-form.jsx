import { useState } from 'react';
import AIForm from './ai-form';
import ManualForm from './manual-form';


export default function CreateDeckModal({ isOpen, onClose, onCreateDeck }) {
  const [useAI, setUseAI] = useState(true);
  const [manualQuestions, setManualQuestions] = useState([]);
  const [AIErrors, setAIErrors] = useState({});
  const [aiFormData, setAIFormData] = useState({
    topic: '',
    userNotes: '',
    uploadedFiles: [],
    questionCount: 10,
    allowedFormats: ['flashcards', 'mcq', 'short-answer'],
    difficulty: 'medium',
    includeDiagrams: false,
    bloomLevel: 'apply',
    language: 'English',
    additionalRequests: ''
  });
  const [title, setTitle] = useState('');

  
  if (!isOpen) return null;

  const maxQuestions = 75
  const minQuestions = 5

  const validateManualForm = () => {

    return true
  };

  const handleManualSubmit = async (e) => {

    if (!validateManualForm()) {
      return; // Prevent submission if errors exist
    }
    const newDeck = {
      id: Date.now(),
      title,
      content: manualQuestions
    };
    onCreateDeck(newDeck);
    onClose();
  };

  const validateAIForm = () => {
    const newErrors = {};
    
    // Question count validation
    if (aiFormData.questionCount > maxQuestions || aiFormData.questionCount < minQuestions) {
      newErrors.questionCount = `Number of questions must be between ${minQuestions} and ${maxQuestions}`;
    }

    setAIErrors(newErrors);
    return Object.keys(newErrors).length === 0 && Object.keys(AIErrors).length === 0;
  };

  const handleAISubmit = async (e) => {

    if (!validateAIForm()) {
      return; // Prevent submission if errors exist
    }
    const newDeck = {
      id: Date.now(),
      title: aiFormData.topic,
      ...aiFormData,
      content: [] // Will be populated via AI
    };
    onCreateDeck(newDeck);
    onClose();
  };

  function handleSubmit(e) {
    console.log("here")
    e.preventDefault()
    useAI ? handleAISubmit(e) : handleManualSubmit(e);
  }

  const handleFileUpload = (files) => {
    const validFiles = Array.from(files).filter(file => 
      file.type.startsWith('text/') || 
      file.type === 'application/pdf' ||
      file.type.includes('msword') ||
      file.type.includes('presentation') ||
      file.type.includes('spreadsheet')
    );

    const newFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      data: file
    }));

    setAIFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...newFiles]
    }));
  };

  const removeFile = (fileId) => {
    setAIFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter(file => file.id !== fileId)
    }));
  };

  return (
    <div className="fixed inset-0 z-10 text-slate-800 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col mx-4">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create New Study Deck</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Use AI Generation</h3>
              <p className="text-sm text-gray-600">
                {useAI ? 'AI will generate content based on your topic' : 'Manually create your study materials'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setUseAI(!useAI)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                useAI ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                useAI ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          {/* Topic Input */}
          {useAI ? (
            <AIForm formData={aiFormData} errors={AIErrors} setFormData={setAIFormData} handleFileUpload={handleFileUpload} setErrors={setAIErrors} removeFile={removeFile}/>
          ) : (
            <ManualForm setTitle={setTitle} title={title} manualQuestions={manualQuestions} setManualQuestions={setManualQuestions}/>
        )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 ">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {useAI ? "Generate Study Deck": "Build Study Deck"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}