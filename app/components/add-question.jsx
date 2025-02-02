import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFile, faPencil, faXmark, faList, faMagicWandSparkles, faRotate, faEquals, faTimeline } from '@fortawesome/free-solid-svg-icons';
import MatchingQuestionEditor from './matching-question-editor';
import MultipleChoiceEditor from './multi-choice-editor';

const QuestionTypeButton = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 p-3 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-all"
  >
    <FontAwesomeIcon icon={Icon} className="w-5 h-5 text-indigo-600" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export const AddQuestion = ({isOpen, setIsOpen, onAdd }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [questionData, setQuestionData] = useState({
    type: '',
    question: '',
    answer: '',
    options: []
  });
  const [generating, setGenerating] = useState(false);
const [error, setError] = useState(null);

const generateAnswer = async (question) => {
  if (!question.trim()) return;
  
  try {
    setGenerating(true);
    setError(null);
    
    const response = await fetch('/api/generate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });

    if (!response.ok) throw new Error('API request failed');
    
    const { answer } = await response.json();
    
    setQuestionData(prev => ({
      ...prev,
      answer: answer || 'Could not generate answer'
    }));
  } catch (err) {
    setError(err);
  } finally {
    setGenerating(false);
  }
};

  const handleAddQuestion = async () => {
    // Auto-generate answer if empty
    if (
      (selectedType === 'flashcard' || selectedType === 'short-answer') &&
      !questionData.answer.trim()
    ) {
      await generateAnswer(questionData.question);
      if (!questionData.answer.trim()) {
        setError(new Error('Please provide an answer or generate one with AI'));
        return;
      }
    }
  
    // Rest of validation logic...
    let isValid = false;
    switch(questionData.type) {
      case 'flashcard':
      case 'short-answer':
        isValid = questionData.question.trim() && questionData.answer.trim();
        break;
      case 'mcq':
        isValid = questionData.question.trim() && 
                 questionData.options.length >= 2 && 
                 questionData.options.every(o => o.text.trim()) && 
                 questionData.correctIndex !== null;
        break;
    }
  
    if (isValid) {
      onAdd(questionData);
      setQuestionData({ type: '', question: '', answer: '', options: [] });
      setSelectedType(null);
    } else {
      setError(new Error('Please fill all required fields'));
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-10">
      {/* Speed Dial */}
      <div className={`flex flex-col items-end gap-3 mb-3 transition-all ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <QuestionTypeButton
          icon={faFile}
          label="Flashcard"
          onClick={() => {
            setSelectedType('flashcard');
            setQuestionData({ type: 'flashcard', question: '', answer: '' });
          }}
        />
        <QuestionTypeButton
          icon={faList}
          label="Multiple Choice"
          onClick={() => {
            setSelectedType('mcq');
            setQuestionData({
              type: 'mcq',
              question: '',
              options: [],
              correctIndex: null
            });
          }}
        />
        <QuestionTypeButton
          icon={faPencil}
          label="Short Answer"
          onClick={() => {
            setSelectedType('short-answer');
            setQuestionData({ type: 'short-answer', question: '', answer: '' });
          }}
        />
        <QuestionTypeButton
          icon={faEquals}
          label="Matching"
          onClick={() => {
            setSelectedType('matching');
            setQuestionData({ type: 'matching', question: '', pairs: [] });
          }}
        />
        <QuestionTypeButton
          icon={faTimeline}
          label="Sequence"
          onClick={() => {
            setSelectedType('sequence');
            setQuestionData({ type: 'sequence', question: '', correctOrder: [], items: [] });
          }}
        />
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg transition-all"
      >
        <FontAwesomeIcon icon={faPlus} className={`w-6 h-6 text-white transition-transform ${
          isOpen ? 'rotate-45' : ''
        }`} />
      </button>

      {/* Question Form Modal */}
      {selectedType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {selectedType === 'flashcard' && 'New Flashcard'}
                {selectedType === 'mcq' && 'New Multiple Choice Question'}
                {selectedType === 'short-answer' && 'New Short Answer Question'}
                {selectedType === 'sequence' && 'New Sequence Question'}
                {selectedType === 'matching' && 'New Matching Question'}
              </h3>
              <button
                onClick={() => setSelectedType(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
              </button>
            </div>

            {/* Question Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Question</label>
                <textarea
                  value={questionData.question}
                  onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  rows="2"
                />
              </div>

              {/* Answer/Options Section */}
              {selectedType === 'flashcard' && (
                <div>
                    <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium">Answer</label>
                  {!questionData.answer && (
                    <button
                    onClick={() => generateAnswer(questionData.question)}
                    className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                    disabled={!questionData.question.trim()}
                    >
                    {generating ? (
                        <FontAwesomeIcon icon={faRotate} className="w-4 h-4 animate-spin" />
                    ) : (
                        <FontAwesomeIcon icon={faMagicWandSparkles} className="w-4 h-4" />
                    )}
                    Generate with AI
                    </button>
                )}
                </div>
                  <textarea
                    value={questionData.answer}
                    onChange={(e) => setQuestionData({ ...questionData, answer: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                    placeholder="Leave empty to generate with AI"
                  />
                </div>
              )}

              {selectedType === 'mcq' && (
                <MultipleChoiceEditor questionData={questionData} setQuestionData={setQuestionData}/>
              )}

              {selectedType === 'short-answer' && (
                <div>
                    <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium">Expected Answer</label>
                  {!questionData.answer && (
                        <button
                        onClick={() => generateAnswer(questionData.question)}
                        className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                        disabled={!questionData.question.trim()}
                        >
                        {generating ? (
                            <FontAwesomeIcon icon={faRotate} className="w-4 h-4 animate-spin" />
                        ) : (
                            <FontAwesomeIcon icon={faMagicWandSparkles} className="w-4 h-4" />
                        )}
                        Generate with AI
                        </button>
                    )}
                  </div>
                  <textarea
                    value={questionData.answer}
                    onChange={(e) => setQuestionData({ ...questionData, answer: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    rows="2"
                    placeholder="Leave empty to generate with AI"
                  />
                </div>
              )}

              {selectedType === 'matching' && (
                <MatchingQuestionEditor content={questionData} onUpdate={(updateData) =>
                {
                  setQuestionData({...questionData, pairs: updateData.pairs})
                }} />
              )}

        {error && (
        <div className="text-red-500 text-sm">
            Error generating answer: {error.message}
        </div>
        )}

        <button
          onClick={handleAddQuestion}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          disabled={generating}
        >
          {generating ? 'Generating...' : 'Add Question'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};